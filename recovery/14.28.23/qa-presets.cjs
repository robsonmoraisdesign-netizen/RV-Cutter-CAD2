const fs=require('fs'),path=require('path'),http=require('http'),{spawn}=require('child_process'),assert=require('node:assert/strict');
const chromiumModule=require('@sparticuz/chromium');
const chromium=chromiumModule.default||chromiumModule;

const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function waitFor(fn,timeout=60000){const end=Date.now()+timeout;let last;while(Date.now()<end){try{const v=await fn();if(v)return v;}catch(e){last=e;}await sleep(100);}throw last||new Error('Timeout');}
function serve(root,port){
 const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.wasm':'application/wasm','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.json':'application/json'};
 const server=http.createServer((req,res)=>{const clean=decodeURIComponent(req.url.split('?')[0]),rel=clean==='/'?'index.html':clean.replace(/^\//,'');const file=path.resolve(root,rel);if(!file.startsWith(path.resolve(root)+path.sep)&&file!==path.resolve(root,'index.html')){res.statusCode=403;return res.end();}try{const data=fs.readFileSync(file);res.setHeader('Content-Type',mime[path.extname(file).toLowerCase()]||'application/octet-stream');res.end(data);}catch{res.statusCode=404;res.end('not found');}});
 return new Promise(resolve=>server.listen(port,'127.0.0.1',()=>resolve(server)));
}
async function cdp(url){
 const ws=new WebSocket(url);await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject;});
 let seq=0;const pending=new Map(),events=[];
 ws.onmessage=e=>{const msg=JSON.parse(e.data);if(msg.id){const p=pending.get(msg.id);if(!p)return;pending.delete(msg.id);msg.error?p.reject(Error(msg.error.message)):p.resolve(msg.result);}else events.push(msg);};
 const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
 return {send,events,close:()=>ws.close()};
}
(async()=>{
 const root=path.resolve('app'),server=await serve(root,8092),exe=await chromium.executablePath(),userData=path.resolve('.cdp-profile');
 fs.rmSync(userData,{recursive:true,force:true});
 const args=[...chromium.args,'--headless=new','--remote-debugging-port=9223','--remote-debugging-address=127.0.0.1','--user-data-dir='+userData,'--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','about:blank'];
 const proc=spawn(exe,args,{stdio:['ignore','pipe','pipe']});let stderr='';proc.stderr.on('data',d=>stderr+=d);
 try{
  const target=await waitFor(async()=>{const list=await (await fetch('http://127.0.0.1:9223/json/list')).json();return list.find(x=>x.type==='page');},45000);
  const dev=await cdp(target.webSocketDebuggerUrl),send=dev.send;
  await send('Page.enable');await send('Runtime.enable');await send('Log.enable');await send('Emulation.setDeviceMetricsOverride',{width:1500,height:900,deviceScaleFactor:1,mobile:false});
  await send('Page.addScriptToEvaluateOnNewDocument',{source:`(()=>{
    const records=new Map();let presets=[];
    globalThis.desktop={
      catalogSave:async data=>{const p=JSON.parse(data);records.set(p.id,data);return {id:p.id};},
      catalogList:async()=>[...records.values()].map(data=>{const p=JSON.parse(data);return {id:p.id,name:p.name,updatedAt:p.savedAt,count:p.objects.length,preview:p.objects[0]?.loops?.[0]?.filter((_,i)=>i%8===0),previewImage:p.previewImage||null};}).sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt)),
      catalogOpen:async id=>records.get(id)??null,
      catalogRename:async(id,name)=>{const raw=records.get(id);if(!raw)return false;const p=JSON.parse(raw);p.name=name;records.set(id,JSON.stringify(p));return true;},
      catalogDelete:async id=>records.delete(id),
      presetsList:async()=>JSON.parse(localStorage.getItem("qa-presets")||"[]"),
      presetsSave:async rows=>{localStorage.setItem("qa-presets",JSON.stringify(rows));return true;},
      autosave:async()=>true,
      recovery:async()=>null,
      clearRecovery:async()=>true,
      save:async()=>'/tmp/qa-output'
    };
  })();`});
  await send('Page.navigate',{url:'http://127.0.0.1:8092/'});await waitFor(async()=>{const r=await send('Runtime.evaluate',{expression:'document.readyState==="complete" && !!window.RVTest',returnByValue:true});return r.result.value;},60000);
  const evalv=async expression=>{const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result.value;};
  await evalv('RVTest.newProject()');
  await evalv('document.getElementById("savePreset").click()');
  assert(await evalv('document.getElementById("nameDialog").open'));
  await evalv('document.getElementById("entryName").value="Flores 6 cm";document.getElementById("nameDialog").close("ok")');
  await waitFor(()=>evalv('RVTest.listPresets().length===1'));
  const id=await evalv('RVTest.listPresets()[0].id');
  await evalv('document.getElementById("renamePreset").click()');
  assert.equal(await evalv('document.getElementById("entryName").value'),'Flores 6 cm');
  await evalv('document.getElementById("entryName").value="Botânico 6 cm";document.getElementById("nameDialog").close("ok")');
  await waitFor(()=>evalv('RVTest.listPresets()[0].name==="Botânico 6 cm"'));
  assert.equal(await evalv('RVTest.listPresets()[0].id'),id);
  await evalv('document.getElementById("renamePreset").click();document.getElementById("entryName").value="Não salvar"');
  await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
  await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
  await sleep(100);assert.equal(await evalv('RVTest.listPresets()[0].name'),'Botânico 6 cm');
  await evalv(`RVTest.active().params.wall=1.7;RVTest.updatePreset(${JSON.stringify(id)})`);
  assert.equal(await evalv('RVTest.listPresets()[0].params.wall'),1.7);
  assert.equal(await evalv('RVTest.listPresets().length'),1);
  await evalv(`(async()=>{const old=desktop.presetsSave;desktop.presetsSave=async()=>{throw Error('disco indisponível')};try{await RVTest.renamePreset(${JSON.stringify(id)},'Falha');throw Error('Falha não propagada')}catch(e){if(e.message!=='disco indisponível')throw e;}finally{desktop.presetsSave=old}})()`);
  assert.equal(await evalv('RVTest.listPresets()[0].name'),'Botânico 6 cm');
  await evalv(`Promise.all([RVTest.renamePreset(${JSON.stringify(id)},'Nome final'),RVTest.savePreset('Segundo preset')])`);
  assert.equal(await evalv('RVTest.listPresets().length'),2);
  await send('Page.reload');await waitFor(()=>evalv('!!window.RVTest && RVTest.listPresets().length===2'));
  assert.equal(await evalv('RVTest.listPresets()[0].name'),'Nome final');
  assert.equal(await evalv('RVTest.listPresets()[0].params.wall'),1.7);
  assert.equal(dev.events.filter(e=>e.method==='Runtime.exceptionThrown').length,0);
  console.log('PASS: criar/nomear, renomear sem duplicar, atualizar parâmetros, cancelar Escape, erro de gravação, operações concorrentes e persistência após reload.');
  dev.close();
 }finally{proc.kill('SIGKILL');server.close();fs.rmSync(userData,{recursive:true,force:true});}
})().catch(e=>{console.error(e);process.exit(1)});
