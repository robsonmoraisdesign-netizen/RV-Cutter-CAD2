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
  const evalv=async expression=>(await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true})).result.value;
  assert(await evalv("document.querySelector('#home').classList.contains('home-v4')"),'V4 library must be active');
  const homeShot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync('audit-home-14.27.png',Buffer.from(homeShot.data,'base64'));
  await evalv("document.querySelector('#newProject').click(); true");
  await waitFor(()=>evalv("RVTest.state.screen==='studio' && !!RVTest.state.editingSketchId"));
  assert(await evalv("document.querySelector('#tab2d').hidden"),'Sketch must not be a separate visible workspace tab');
  assert(await evalv("!document.querySelector('#three').hidden && !document.querySelector('#editor').hidden"),'Sketch must edit inside the same graphics workspace');
  assert(await evalv("!!document.querySelector('.onshape-ribbon')"),'Contextual Sketch ribbon must be visible');
  assert(await evalv("!!document.querySelector('[data-tool=\"trim\"]') && !!document.querySelector('[data-tool=\"extend\"]') && !!document.querySelector('[data-tool=\"bezier\"]')"),'Phase 2 CAD tools must be present');
  assert.equal(await evalv("RVTest.active().features.length"),0,'New Sketch must not auto-create a cutter feature');

  await evalv("document.querySelector('[data-tool=\"circle\"]').click(); true");
  const box=await evalv("(()=>{const e=document.querySelector('#editor'),r=e.getBoundingClientRect(),v=document.querySelector('#viewport').getBoundingClientRect(),w=document.querySelector('.workspace').getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,viewport:{w:v.width,h:v.height},workspace:{w:w.width,h:w.height},hidden:e.hidden,display:getComputedStyle(e).display}})()");
  console.log('Sketch viewport diagnostics',JSON.stringify(box));
  assert(box.w>300&&box.h>200,'Sketch canvas must be visible: '+JSON.stringify(box));
  const x=box.x+box.w*.48,y=box.y+box.h*.48;
  await send('Input.dispatchMouseEvent',{type:'mouseMoved',x,y,button:'none'});
  await send('Input.dispatchMouseEvent',{type:'mousePressed',x,y,button:'left',clickCount:1});
  await send('Input.dispatchMouseEvent',{type:'mouseReleased',x,y,button:'left',clickCount:1});
  await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:x+80,y,button:'none'});
  await send('Input.dispatchMouseEvent',{type:'mousePressed',x:x+80,y,button:'left',clickCount:1});
  await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:x+80,y,button:'left',clickCount:1});
  await waitFor(()=>evalv("RVTest.active().sketch.entities.length===1"));
  assert.equal(await evalv("RVTest.active().sketch.entities[0].type"),'circle');
  await evalv("(()=>{const i=document.querySelector('#sketchDimension');i.value='18';document.querySelector('#applySketchDimension').click();return true})()");
  await waitFor(()=>evalv("Math.abs(RVTest.active().params.size-36)<0.001"));
  assert.equal(await evalv("RVTest.active().result"),null,'Sketch alone must not generate 3D');
  assert(await evalv("document.querySelectorAll('.sketch-dimension').length>=1"),'Driving dimension must render on canvas');
  assert(await evalv("document.querySelectorAll('.sketch-entity-hit').length>=1"),'Sketch selection must keep hit geometry');
  const sketchShot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync('audit-sketch-14.27.png',Buffer.from(sketchShot.data,'base64'));

  await evalv("document.querySelector('#finishSketch').click();true");await waitFor(()=>evalv("!RVTest.state.editingSketchId"));
  await evalv("document.querySelector('#convertCutter').click();true");
  await waitFor(()=>evalv("RVTest.active().features.some(f=>f.type==='cookie-cutter')"));
  await evalv("RVTest.wait()");
  await waitFor(()=>evalv("!!RVTest.active().result && RVTest.active().result.parts.length>0"));
  await evalv("RVTest.setStage('3d');true");
  await sleep(250);
  const render3d=await evalv("RVTest.viewer.diagnostics()");
  console.log('3D render diagnostics',JSON.stringify(render3d));
  assert(render3d.host.width>300&&render3d.host.height>200,'3D host must have visible dimensions: '+JSON.stringify(render3d));
  assert(render3d.canvas.cssWidth>300&&render3d.canvas.cssHeight>200,'WebGL canvas must fill the viewport');
  assert(render3d.groups>=1&&render3d.visibleMeshes>=1,'3D scene must contain visible generated meshes');
  assert(render3d.renderCalls>0,'Three.js renderer must execute draw calls');
  assert(render3d.nonTransparentSamples>0,'3D framebuffer must contain rendered pixels');
  const shot3d=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync('audit-3d-14.27.png',Buffer.from(shot3d.data,'base64'));

  await evalv("document.querySelector('#tabPresentation').click();true");await waitFor(()=>evalv("RVTest.state.stage==='presentation'"));
  await sleep(250);
  const renderPresentation=await evalv("RVTest.viewer.diagnostics()");
  console.log('Presentation render diagnostics',JSON.stringify(renderPresentation));
  assert(renderPresentation.groups>=1&&renderPresentation.visibleMeshes>=1,'Presentation scene must retain generated geometry: '+JSON.stringify(renderPresentation));
  assert(renderPresentation.renderCalls>0,'Presentation must execute draw calls');
  const shotPres=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync('audit-presentation-14.27.png',Buffer.from(shotPres.data,'base64'));

  await evalv("RVTest.setStage('3d');RVTest.enterSketch();true");await waitFor(()=>evalv("!!RVTest.state.editingSketchId"));
  assert(await evalv("!document.querySelector('#three').hidden && !document.querySelector('#editor').hidden"),'Re-entering Sketch must keep the unified graphics workspace');
  await evalv("RVTest.finishSketch(true);true");

  await evalv("document.querySelector('#homeBtn').click();true");await waitFor(()=>evalv("document.querySelector('#leaveProjectDialog').open"));
  await evalv("document.querySelector('#leaveCancel').click();true");await waitFor(()=>evalv("!document.querySelector('#leaveProjectDialog').open"));
  assert.equal(await evalv("RVTest.state.screen"),'studio');

  await evalv("document.querySelector('#homeBtn').click();true");await waitFor(()=>evalv("document.querySelector('#leaveProjectDialog').open"));
  await evalv("document.querySelector('#leaveSave').click();true");
  try{await waitFor(()=>evalv("RVTest.state.screen==='home'"),8000);}
  catch(e){console.log('Save/close diagnostics',JSON.stringify(await evalv("RVTest.diagnostics()")));throw e;}
  assert.equal(await evalv("RVTest.state.objects.length"),0);
  assert.equal(await evalv("RVTest.diagnostics().worker"),false);
  assert(await evalv("RVTest.catalog().then(x=>x.length>=1)"),'Saved project must exist in the library');

  await waitFor(()=>evalv("document.querySelectorAll('.recent-card').length>=1"));
  await evalv("document.querySelector('.recent-card').click();true");await waitFor(()=>evalv("RVTest.state.screen==='studio'"));
  assert.equal(await evalv("RVTest.active().sketch.entities[0].type"),'circle');
  assert.equal(await evalv("RVTest.active().features[0].type"),'cookie-cutter');
  assert.equal(await evalv("RVTest.active().sketch.entities[0].radius"),18);

  await evalv("document.querySelector('#homeBtn').click();true");await waitFor(()=>evalv("document.querySelector('#leaveProjectDialog').open"));
  await evalv("document.querySelector('#leaveDiscard').click();true");await waitFor(()=>evalv("RVTest.state.screen==='home'"));
  assert.equal(await evalv("RVTest.state.objects.length"),0);
  assert.equal(await evalv("RVTest.diagnostics().worker"),false);
  const exceptions=dev.events.filter(e=>e.method==='Runtime.exceptionThrown');
  const severe=dev.events.filter(e=>e.method==='Log.entryAdded'&&['error'].includes(e.params?.entry?.level));
  assert.deepEqual(exceptions.map(e=>e.params?.exceptionDetails?.text),[]);
  assert.deepEqual(severe.map(e=>e.params?.entry?.text),[]);
  dev.close();
  console.log('CDP browser smoke: unified Sketch/Feature workspace + verified 3D rendering PASS');
 }finally{
  proc.kill('SIGKILL');server.close();fs.rmSync(userData,{recursive:true,force:true});
  if(proc.exitCode&&!proc.killed)console.error(stderr.slice(-4000));
 }
})().catch(e=>{console.error(e);process.exit(1);});
