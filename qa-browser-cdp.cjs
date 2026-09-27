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
  await send('Page.navigate',{url:'http://127.0.0.1:8092/'});await waitFor(async()=>{const r=await send('Runtime.evaluate',{expression:'document.readyState==="complete" && !!window.RVTest',returnByValue:true});return r.result.value;},60000);
  const evalv=async expression=>(await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true})).result.value;
  await evalv("document.querySelector('#newProject').click(); true");
  await waitFor(()=>evalv("RVTest.state.screen==='studio' && RVTest.state.stage==='2d'"));
  await evalv("document.querySelector('[data-tool=\"circle\"]').click(); true");
  const box=await evalv("(()=>{const r=document.querySelector('#editor').getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height}})()");
  assert(box.w>300&&box.h>200,'Sketch canvas must be visible');
  const x=box.x+box.w*.48,y=box.y+box.h*.48;
  await send('Input.dispatchMouseEvent',{type:'mouseMoved',x,y,button:'none'});
  await send('Input.dispatchMouseEvent',{type:'mousePressed',x,y,button:'left',clickCount:1});
  await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:x+80,y,button:'left'});
  await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:x+80,y,button:'left',clickCount:1});
  await waitFor(()=>evalv("RVTest.active().sketch.entities.length===1"));
  assert.equal(await evalv("RVTest.active().sketch.entities[0].type"),'circle');
  await evalv("(()=>{const i=document.querySelector('#sketchDimension');i.value='18';document.querySelector('#applySketchDimension').click();return true})()");
  await waitFor(()=>evalv("Math.abs(RVTest.active().params.size-36)<0.001"));
  assert(await evalv("document.querySelectorAll('.sketch-dimension').length>=1"),'Driving dimension must render on canvas');
  assert(await evalv("document.querySelector('#sketchStatusChip').dataset.state.length>0"),'Sketch status must render');
  const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync('audit-sketch-14.24.png',Buffer.from(shot.data,'base64'));
  await evalv("document.querySelector('#homeBtn').click();true");await waitFor(()=>evalv("document.querySelector('#leaveProjectDialog').open"));
  await evalv("document.querySelector('#leaveCancel').click();true");await waitFor(()=>evalv("!document.querySelector('#leaveProjectDialog').open"));
  assert.equal(await evalv("RVTest.state.screen"),'studio');

  // SAVE: persist the current semantic Sketch, close every active resource, and show it in the library.
  await evalv("document.querySelector('#homeBtn').click();true");await waitFor(()=>evalv("document.querySelector('#leaveProjectDialog').open"));
  await evalv("document.querySelector('#leaveSave').click();true");await waitFor(()=>evalv("RVTest.state.screen==='home'"));
  assert.equal(await evalv("RVTest.state.objects.length"),0);
  assert.equal(await evalv("RVTest.diagnostics().worker"),false);
  assert(await evalv("RVTest.catalog().then(x=>x.length>=1)"),'Saved project must exist in the library');

  // Reopen from the library; this must create a fresh session and restore semantic entities.
  await waitFor(()=>evalv("document.querySelectorAll('.recent-card').length>=1"));
  await evalv("document.querySelector('.recent-card').click();true");await waitFor(()=>evalv("RVTest.state.screen==='studio'"));
  assert.equal(await evalv("RVTest.active().sketch.entities[0].type"),'circle');
  assert.equal(await evalv("RVTest.active().sketch.entities[0].radius"),18);

  // DISCARD: leave the reopened project without writing a new library version and fully tear down the session.
  await evalv("document.querySelector('#homeBtn').click();true");await waitFor(()=>evalv("document.querySelector('#leaveProjectDialog').open"));
  await evalv("document.querySelector('#leaveDiscard').click();true");await waitFor(()=>evalv("RVTest.state.screen==='home'"));
  assert.equal(await evalv("RVTest.state.objects.length"),0);
  assert.equal(await evalv("RVTest.diagnostics().worker"),false);
  const exceptions=dev.events.filter(e=>e.method==='Runtime.exceptionThrown');
  const severe=dev.events.filter(e=>e.method==='Log.entryAdded'&&['error'].includes(e.params?.entry?.level));
  assert.deepEqual(exceptions.map(e=>e.params?.exceptionDetails?.text),[]);
  assert.deepEqual(severe.map(e=>e.params?.entry?.text),[]);
  dev.close();
  console.log('CDP browser smoke: Sketch draw + dimension + Cancel + Save + reopen + Discard + full session close PASS');
 }finally{
  proc.kill('SIGKILL');server.close();fs.rmSync(userData,{recursive:true,force:true});
  if(proc.exitCode&&!proc.killed)console.error(stderr.slice(-4000));
 }
})().catch(e=>{console.error(e);process.exit(1);});
