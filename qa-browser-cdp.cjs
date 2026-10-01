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
  assert(await evalv("document.querySelector('#home').classList.contains('home-v4')"),'V4 library must be active');
  const homeShot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync('audit-home-14.27.png',Buffer.from(homeShot.data,'base64'));
  await evalv("document.querySelector('#newProject').click(); true");
  await waitFor(()=>evalv("RVTest.state.screen==='studio' && !!RVTest.state.editingSketchId"));
  assert(await evalv("!document.querySelector('#tab2d').hidden && getComputedStyle(document.querySelector('#tab2d')).display!=='none'"),'Sketch 2D must be a visible persistent workspace tab');
  assert(await evalv("document.querySelector('#tab2d').classList.contains('active') && RVTest.state.stage==='2d'"),'New project must enter the Sketch 2D workspace');
  assert(await evalv("!document.querySelector('#three').hidden && !document.querySelector('#editor').hasAttribute('hidden')"),'Sketch workspace must retain the shared graphics viewport');
  assert(await evalv("!!document.querySelector('.v4-sketchbar')"),'Approved grouped Sketch toolbar must be visible');
  assert(await evalv("document.querySelectorAll('.v4-menu-group').length>=4"),'Sketch must expose grouped Create/Modify/Constrain/Reference menus');
  assert(await evalv("document.querySelector('#inspectorLevels') && !!document.querySelector('[data-inspector-level=\"essential\"]')"),'Inspector levels must exist');
  assert(await evalv("!!document.querySelector('[data-tool=\"trim\"]') && !!document.querySelector('[data-tool=\"extend\"]') && !!document.querySelector('[data-tool=\"bezier\"]')"),'Phase 2 CAD tools must be present');
  assert.equal(await evalv("RVTest.active().features.length"),0,'New Sketch must not auto-create a cutter feature');

  await evalv("document.querySelector('[data-tool=\"circle\"]').click(); true");
  const box=await evalv("(()=>{const e=document.querySelector('#editor'),r=e.getBoundingClientRect(),v=document.querySelector('#viewport').getBoundingClientRect(),w=document.querySelector('.workspace').getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height,right:r.right,viewport:{x:v.x,w:v.width,h:v.height,right:v.right},workspace:{x:w.x,w:w.width,h:w.height,right:w.right},hidden:e.hidden,display:getComputedStyle(e).display}})()");
  console.log('Sketch viewport diagnostics',JSON.stringify(box));
  assert(box.w>300&&box.h>200,'Sketch canvas must be visible: '+JSON.stringify(box));
  assert(box.viewport.right<=box.workspace.right+1,'Sketch viewport must stay inside workspace and not cover the inspector: '+JSON.stringify(box));
  assert(box.right<=box.workspace.right+1,'Sketch canvas must stay inside workspace and not cover the inspector: '+JSON.stringify(box));
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
  await evalv("document.querySelector('#undo').click();true");
  assert(await evalv("!!RVTest.state.editingSketchId && !document.querySelector('#editor').hasAttribute('hidden')"),'Undo must retain Sketch editing');
  await evalv("document.querySelector('#redo').click();true");
  assert.equal(await evalv("RVTest.active().sketch.entities[0].radius"),18);
  assert(await evalv("RVTest.state.editingSketchId===RVTest.state.activeId"),'Redo must restore active editing context');
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

  await evalv("(async()=>{const r=await RVTest.savePreset('QA preset');RVTest.setParam('wall',2);RVTest.applyPreset(r.id);await RVTest.wait();return true;})()");
  assert(await evalv("RVTest.active().params.wall===RVTest.active().features[0].params.wall && RVTest.active().params.wall!==2"),'Preset must update persistent feature parameters');
  assert(await evalv("(async()=>{const files=await RVTest.exportData('all',true);return Object.values(files).every(b=>b.length===84+50*new DataView(b.buffer,b.byteOffset,b.byteLength).getUint32(80,true));})()"),'STL triangle count must match exported payload');
  await evalv("document.querySelector('#tabPresentation').click();true");await waitFor(()=>evalv("RVTest.state.stage==='presentation'"));
  await sleep(250);
  const renderPresentation=await evalv("RVTest.viewer.diagnostics()");
  console.log('Presentation render diagnostics',JSON.stringify(renderPresentation));
  assert(renderPresentation.groups>=1&&renderPresentation.visibleMeshes>=1,'Presentation scene must retain generated geometry: '+JSON.stringify(renderPresentation));
  assert(renderPresentation.renderCalls>0,'Presentation must execute draw calls');
  const shotPres=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync('audit-presentation-14.27.png',Buffer.from(shotPres.data,'base64'));

  await evalv("RVTest.setStage('3d');RVTest.enterSketch();true");await waitFor(()=>evalv("!!RVTest.state.editingSketchId"));
  assert(await evalv("RVTest.state.stage==='2d' && document.querySelector('#tab2d').classList.contains('active')"),'Re-entering Sketch must activate the Sketch 2D workspace');
  assert(await evalv("!document.querySelector('#three').hidden && !document.querySelector('#editor').hasAttribute('hidden')"),'Re-entering Sketch must keep the shared graphics viewport');
  await evalv("RVTest.finishSketch(true);true");

  await evalv("document.querySelector('#homeBtn').click();true");await waitFor(()=>evalv("document.querySelector('#leaveProjectDialog').open"));
  await evalv("document.querySelector('#leaveCancel').click();true");
  await waitFor(()=>evalv("!document.querySelector('#leaveProjectDialog').open && !RVTest.diagnostics().navigationBusy"));
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
  await evalv("RVTest.newProject()");
  await evalv("window.firstSketch=RVTest.active().id;RVTest.createNewSketch();RVTest.selectObject(firstSketch);true");
  assert(await evalv("RVTest.state.editingSketchId===firstSketch && RVTest.state.activeId===firstSketch"),'Selecting another Sketch must switch editor context');
  await evalv("RVTest.commitImport([[[[-.5,-.5],[.5,-.5],[.5,.5],[-.5,.5]]]],'Imported square',null);true");
  assert(await evalv("RVTest.state.stage==='2d' && !!RVTest.state.editingSketchId && !document.querySelector('#editor').hasAttribute('hidden') && document.body.classList.contains('sketching')"),'Import must enter the Sketch workspace with the imported art active');
  await evalv("RVTest.editor.setTool('select');true");
  await sleep(100);
  const pick=await evalv("(()=>{const s=document.querySelector('#editor'),p=new DOMPoint(0,.5).matrixTransform(s.getScreenCTM());return {x:p.x,y:p.y-6};})()");
  await send('Input.dispatchMouseEvent',{type:'mouseMoved',...pick,button:'none'});
  await send('Input.dispatchMouseEvent',{type:'mousePressed',...pick,button:'left',clickCount:1});
  await send('Input.dispatchMouseEvent',{type:'mouseReleased',...pick,button:'left',clickCount:1});
  assert(await evalv("!!document.querySelector('#editor path[data-loop][stroke=\"#e5852d\"]')"),'Imported contour must be selectable six pixels away');
  console.log('Integration regressions: undo/redo, preset, STL, Sketch switch, import, proximity picking PASS');

  await evalv("RVTest.finishSketch(true);true");
  await evalv(`RVTest.commitImport([
    [[[-.46,-.46],[.46,-.46],[.46,.46],[-.46,.46]]],
    [[[0,-.48],[.46,.40],[-.46,.40]]],
    [[[0,-.50],[.48,0],[0,.50],[-.48,0]]]
  ],'Colecao QA',null,false);true`);
  await waitFor(()=>evalv("RVTest.state.objects.length===3 && RVTest.state.stage==='2d' && !!RVTest.state.editingSketchId"));
  assert.equal(await evalv("document.querySelectorAll('#layers .layer[data-object-id]').length"),3,'Outliner must list every imported Sketch');
  assert.equal(await evalv("document.querySelectorAll('.sketch-reference-tile').length"),2,'All non-active arts must remain visible as Sketch references');
  assert(await evalv("!document.body.classList.contains('drawer-collapsed') && document.querySelector('#layers').getBoundingClientRect().height>=120"),'Outliner must stay visibly open for multi-object work');
  const beforeActive=await evalv("RVTest.state.editingSketchId");
  await evalv("document.querySelector('.sketch-reference-tile').dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,pointerId:77}));true");
  await waitFor(()=>evalv("RVTest.state.editingSketchId!=="+JSON.stringify(beforeActive)));
  assert.equal(await evalv("document.querySelectorAll('.sketch-reference-tile').length"),2,'Switching active Sketch must keep the other arts visible');
  await evalv("document.querySelector('#convertAllCutters').click();true");
  await waitFor(()=>evalv("RVTest.state.objects.every(o=>o.features.some(f=>f.type==='cookie-cutter'))"));
  await evalv("RVTest.wait()");
  await evalv("RVTest.setStage('3d');true");await sleep(250);
  const multiRender=await evalv("RVTest.viewer.diagnostics()");
  console.log('Multi-object render diagnostics',JSON.stringify(multiRender));
  assert(multiRender.groups>=3&&multiRender.visibleMeshes>=3,'Bulk conversion must place all imported arts in the 3D scene');
  assert.equal(await evalv("RVTest.state.view.material"),'cad','CAD technical style must be the default model display');
  assert(multiRender.cadEdgeSets>=3,'CAD technical style must expose thresholded feature-edge sets without triangle wireframe');
  assert.equal(multiRender.background,'f7fafc','CAD technical style must use the neutral light viewport background');
  const roleColors=Object.values(multiRender.roleColors||{});
  assert(roleColors.length>=3&&new Set(roleColors).size>=3,'CAD mode must preserve distinct vivid colors for cutter base, blade, stamp base and relief');
  const theme=await evalv("({bg:getComputedStyle(document.documentElement).getPropertyValue('--v4-bg').trim(),text:getComputedStyle(document.documentElement).getPropertyValue('--v4-text').trim(),brand:getComputedStyle(document.documentElement).getPropertyValue('--v4-brand').trim()})");
  assert.deepEqual(theme,{bg:'#080c10',text:'#ffffff',brand:'#22ddb9'},'Global UI must use the stronger high-contrast palette');
  const chromeRects=await evalv("(()=>{const a=document.querySelector('#pieceModeHost .mode-block')?.getBoundingClientRect(),b=document.querySelector('.viewport-title')?.getBoundingClientRect();return a&&b?{a:{l:a.left,r:a.right,t:a.top,b:a.bottom},b:{l:b.left,r:b.right,t:b.top,b:b.bottom}}:null})()");
  assert(chromeRects&&!(chromeRects.a.l<chromeRects.b.r&&chromeRects.a.r>chromeRects.b.l&&chromeRects.a.t<chromeRects.b.b&&chromeRects.a.b>chromeRects.b.t),'Piece selector and object title must never overlap');
  console.log('Multi-object regression: Outliner + persistent Sketch references + bulk 3D conversion PASS');
  await evalv("window.__showAllRefs=RVTest.state.objects.map(o=>o.result);RVTest.toggleIsolation(RVTest.state.objects[0].id);RVTest.state.objects[1].visible=false;document.querySelector('#showAll').click();true");
  await waitFor(()=>evalv("RVTest.state.objects.every(o=>o.visible) && document.querySelector('#isolationBanner').hidden"));
  assert(await evalv("RVTest.state.objects.every((o,i)=>o.result===window.__showAllRefs[i])"),'Show All must not discard/rebuild in-memory geometry merely because objects were hidden or isolated');

  const svgA='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="#000" d="M10 10H90V90H10Z"/></svg>';
  const svgB='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path fill="#000" d="M50 8L92 88H8Z"/></svg>';
  await evalv(`RVTest.importFiles([new File([${JSON.stringify(svgA)}],'arte-a.svg',{type:'image/svg+xml'}),new File([${JSON.stringify(svgB)}],'arte-b.svg',{type:'image/svg+xml'})]);true`);
  await waitFor(()=>evalv("document.querySelector('#importDialog').open && document.querySelectorAll('#importCandidates .candidate').length===2"));
  assert.equal(await evalv("document.querySelectorAll('#importCandidates input:checked').length"),2,'All objects from multiple selected files must be preselected');
  await evalv("document.querySelector('#appendObjects').checked=false;document.querySelector('#confirmImport').click();true");
  await waitFor(()=>evalv("RVTest.state.objects.length===2 && RVTest.state.stage==='2d'"));
  assert(await evalv("RVTest.state.objects.some(o=>/Arte A/i.test(o.name))&&RVTest.state.objects.some(o=>/Arte B/i.test(o.name))"),'Multiple image import must preserve per-file object naming');
  assert.equal(await evalv("document.querySelectorAll('#viewport').length"),1,'Viewport ID must be unique');

  const exceptions=dev.events.filter(e=>e.method==='Runtime.exceptionThrown');
  const severe=dev.events.filter(e=>e.method==='Log.entryAdded'&&['error'].includes(e.params?.entry?.level));
  assert.deepEqual(exceptions.map(e=>e.params?.exceptionDetails?.text),[]);
  assert.deepEqual(severe.map(e=>e.params?.entry?.text),[]);
  dev.close();
  console.log('CDP browser smoke: v4 persistent workspaces + grouped Sketch menus + verified 3D rendering PASS');
 }finally{
  proc.kill('SIGKILL');server.close();fs.rmSync(userData,{recursive:true,force:true});
  if(proc.exitCode&&!proc.killed)console.error(stderr.slice(-4000));
 }
})().catch(e=>{console.error(e);process.exit(1);});

