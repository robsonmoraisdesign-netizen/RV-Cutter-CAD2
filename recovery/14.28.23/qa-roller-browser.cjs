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
      presetsList:async()=>presets,
      presetsSave:async rows=>(presets=structuredClone(rows),true),
      autosave:async()=>true,
      recovery:async()=>null,
      clearRecovery:async()=>true,
      save:async()=>'/tmp/qa-output'
    };
  })();`});
  await send('Page.navigate',{url:'http://127.0.0.1:8092/'});await waitFor(async()=>{const r=await send('Runtime.evaluate',{expression:'document.readyState==="complete" && !!window.RVTest',returnByValue:true});return r.result.value;},60000);
  const evalv=async expression=>{const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result.value;};
  await evalv('document.getElementById("newRollerProject").click()');
  const initial=await evalv('RVRoller.wait()');assert(initial.triangles>1000);
  assert.equal(await evalv('RVRoller.snapshot().roller.params.mirror'),true);
  assert.equal(await evalv('RVTest.diagnostics().worker'),false);
  await evalv('RVRoller.change("diameter",36);RVRoller.change("length",120);RVRoller.change("depth",1.5)');
  await evalv('RVRoller.wait()');
  assert.equal(await evalv('RVRoller.snapshot().roller.params.length'),120);
  const before=await evalv('RVRoller.diagnostics().revision');
  await evalv('document.getElementById("rollerColor").value="#bd6c92";document.getElementById("rollerColor").dispatchEvent(new Event("input"))');
  assert.equal(await evalv('RVRoller.diagnostics().revision'),before);
  await evalv('RVRoller.save()');
  const id=await evalv('RVRoller.snapshot().id');
  const length=await evalv('RVRoller.exportSTL().byteLength');assert(length>100000);
  fs.writeFileSync('roller-preview.png',Buffer.from((await send('Page.captureScreenshot',{format:'png'})).data,'base64'));
  await evalv('RVRoller.close()');
  assert.equal(await evalv('RVRoller.diagnostics().worker'),false);
  assert.equal(await evalv('RVRoller.diagnostics().mesh'),null);
  assert.equal(await evalv('RVTest.diagnostics().screen'),'home');
  await evalv('document.querySelector(".recent-card").click()');
  await evalv('RVRoller.wait()');
  assert.equal(await evalv('RVRoller.snapshot().id'),id);
  assert.equal(await evalv('RVRoller.snapshot().roller.params.length'),120);
  await evalv('RVRoller.change("relief","recessed");RVRoller.change("axle",10)');await evalv('RVRoller.wait()');
  await evalv(`(()=>{const d=new DataTransfer();d.items.add(new File(['<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><rect width="256" height="256" fill="white"/><circle cx="128" cy="128" r="70" fill="black"/></svg>'],'teste.svg',{type:'image/svg+xml'}));const e=document.getElementById('rollerImage');e.files=d.files;e.dispatchEvent(new Event('change'));})()`);
  await waitFor(()=>evalv('RVRoller.snapshot().roller.artName === "teste.svg"'));
  await evalv('RVRoller.wait()');
  const portable=await evalv('JSON.stringify(RVRoller.snapshot())');
  await evalv('RVRoller.close()');
  await evalv(`(()=>{const d=new DataTransfer();d.items.add(new File([${JSON.stringify(portable)}],'rolo.rvcad',{type:'application/json'}));const e=document.getElementById('projectFile');e.files=d.files;e.dispatchEvent(new Event('change'));})()`);
  await evalv('RVRoller.wait()');assert.equal(await evalv('RVRoller.snapshot().roller.artName'),'teste.svg');
  assert.equal(await evalv('RVDesktopFlush()'),true);
  await evalv('RVRoller.close()');
  await evalv('RVTest.newProject()');
  assert.equal(await evalv('RVTest.diagnostics().screen'),'studio');
  const errors=dev.events.filter(x=>x.method==='Runtime.exceptionThrown');assert.equal(errors.length,0,JSON.stringify(errors));
  console.log(JSON.stringify({passed:true,initial,exportBytes:length,historyReopen:true,appearanceDoesNotRegenerate:true,releaseOnClose:true}));
  dev.close();
 }finally{
  proc.kill('SIGKILL');server.close();fs.rmSync(userData,{recursive:true,force:true});
 }
})().catch(e=>{console.error(e);process.exit(1);});
