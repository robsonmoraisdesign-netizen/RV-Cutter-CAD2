const {app,BrowserWindow,ipcMain,dialog,protocol,Menu}=require('electron');
const {createCatalog}=require('./catalog.cjs');
const path=require('path'),fs=require('fs');
protocol.registerSchemesAsPrivileged([{scheme:'rvapp',privileges:{standard:true,secure:true,supportFetchAPI:true,corsEnabled:true,stream:true,codeCache:true}}]);
app.setName('RV Cutter CAD');
if(!app.requestSingleInstanceLock())app.quit();

function writeAll(file,data){
 const b=Buffer.isBuffer(data)?data:Buffer.from(data);
 const fd=fs.openSync(file,'w');
 try{let off=0;while(off<b.length){const n=fs.writeSync(fd,b,off,Math.min(1048576,b.length-off));if(n<=0)throw Error('Falha ao gravar arquivo');off+=n;}fs.fsyncSync(fd);}
 finally{fs.closeSync(fd);}
}
function toBuffer(data){
 if(typeof data==='string')return Buffer.from(data,'utf8');
 if(Buffer.isBuffer(data))return data;
 if(data instanceof ArrayBuffer)return Buffer.from(data);
 if(ArrayBuffer.isView(data))return Buffer.from(data.buffer,data.byteOffset,data.byteLength);
 if(Array.isArray(data))return Buffer.from(data);
 throw Error('Formato de dados não suportado para gravação.');
}
const mime={
 '.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.cjs':'text/javascript; charset=utf-8',
 '.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.wasm':'application/wasm',
 '.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml'
};
function localFileFromUrl(raw){
 const url=new URL(raw);
 if(url.hostname!=='local')throw Object.assign(Error('Forbidden'),{status:403});
 let rel=decodeURIComponent(url.pathname);
 if(rel==='/')rel='/index.html';
 const root=path.resolve(__dirname),file=path.resolve(root,'.'+rel);
 if(file!==root&&!file.startsWith(root+path.sep))throw Object.assign(Error('Forbidden'),{status:403});
 return file;
}
async function serveLocal(request){
 try{
  const file=localFileFromUrl(request.url),data=await fs.promises.readFile(file);
  return new Response(data,{status:200,headers:{
   'Content-Type':mime[path.extname(file).toLowerCase()]||'application/octet-stream',
   'Cache-Control':'no-store',
   'Cross-Origin-Resource-Policy':'same-origin'
  }});
 }catch(e){
  return new Response(e?.status===403?'Forbidden':'Not Found',{status:e?.status||404,headers:{'Content-Type':'text/plain; charset=utf-8'}});
 }
}

const smokeArg=process.argv.find(x=>x.startsWith('--rv-desktop-smoke='));
const smokeDir=smokeArg?path.resolve(smokeArg.slice('--rv-desktop-smoke='.length)):null;
let win,closing=false,smokeFinished=false;
app.on('second-instance',()=>{if(win){win.show();win.focus()}});

function trusted(e){
 const frame=e.senderFrame;
 return !!frame&&e.sender===win?.webContents&&frame===win.webContents.mainFrame&&frame.origin==='rvapp://local';
}
function requireTrusted(e){if(!trusted(e))throw Error('Acesso negado');}
function smokePath(name){
 if(!smokeDir)return null;
 fs.mkdirSync(smokeDir,{recursive:true});
 return path.join(smokeDir,path.basename(name));
}
async function saveFile(e,name,data,kind){
 requireTrusted(e);
 if(typeof name!=='string'||name.length>300||!['project','stl','svg','zip','png'].includes(kind))throw Error('Arquivo inválido');
 const ext={project:'rvcad',stl:'stl',svg:'svg',zip:'zip',png:'png'}[kind];
 const safe=name.replace(/[<>:"/\\|?*]/g,'_');
 let file=smokePath(safe);
 if(!file){
  const result=await dialog.showSaveDialog(win,{defaultPath:safe,filters:[{name:ext.toUpperCase(),extensions:[ext]}]});
  if(result.canceled)return null;
  file=result.filePath;
 }
 const buffer=toBuffer(data);
 if(buffer.length>150*1024*1024)throw Error('Arquivo excede limite');
 const tmp=file+'.rvtmp';writeAll(tmp,buffer);fs.renameSync(tmp,file);
 return file;
}
function attachDiagnostics(contents){
 contents.on('render-process-gone',(_e,details)=>{try{fs.appendFileSync(path.join(app.getPath('userData'),'desktop-errors.log'),new Date().toISOString()+' render-process-gone '+JSON.stringify(details)+'\n');}catch{}});
 contents.on('console-message',(_e,level,message,line,sourceId)=>{
  if(level>=2)try{fs.appendFileSync(path.join(app.getPath('userData'),'desktop-errors.log'),new Date().toISOString()+` console[${level}] ${message} @ ${sourceId}:${line}\n`);}catch{}
 });
}
async function runDesktopSmoke(){
 const resultFile=path.join(smokeDir,'desktop-smoke.json');
 try{
  const result=await win.webContents.executeJavaScript(`(async()=>{
    const out={url:location.href,desktop:!!window.desktop};
    out.health=await window.desktop.health();
    await RVTest.newProject();
    const o=RVTest.active();
    if(o.params.mirror!==true)throw Error("Mirror must default to true");
    Object.assign(o.params,{bladeReinforcement:true,reinforcementWidth:.6,reinforcementHeight:1.5,chamfer:true});
    o.loops=[[[-.4,-.4],[.4,-.4],[.4,.4],[-.4,.4]]];
    o.contourVersion=(o.contourVersion||0)+1;
    RVTest.convertToCutter(o.id);
    RVTest.finishSketch(true);
    await RVTest.wait();
    RVTest.setStage('3d');
    await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
    out.render=RVTest.viewer.diagnostics();
    if(!(out.render.groups>=1&&out.render.visibleMeshes>=1&&out.render.renderCalls>0))throw Error('Desktop 3D não renderizou geometria.');
    const files=await RVTest.exportData('part',true),names=Object.keys(files);
    if(!names.length)throw Error('Desktop export não gerou STL.');
    out.exportNames=names;
    out.saved=await window.desktop.save('desktop-smoke.stl',files[names[0]].buffer,'stl');
    if(!out.saved)throw Error('IPC nativo de salvamento não retornou caminho.');
    return out;
  })()`,true);
  writeAll(resultFile,Buffer.from(JSON.stringify({ok:true,...result},null,2)));
  smokeFinished=true;app.exit(0);
 }catch(e){
  writeAll(resultFile,Buffer.from(JSON.stringify({ok:false,error:e?.stack||e?.message||String(e)},null,2)));
  smokeFinished=true;app.exit(1);
 }
}

app.whenReady().then(async()=>{
 protocol.handle('rvapp',serveLocal);
 Menu.setApplicationMenu(Menu.buildFromTemplate([{label:'Arquivo',submenu:[{role:'quit',label:'Sair'}]},{label:'Editar',submenu:[{role:'undo',label:'Desfazer texto'},{role:'redo',label:'Refazer texto'},{type:'separator'},{role:'cut',label:'Recortar'},{role:'copy',label:'Copiar'},{role:'paste',label:'Colar'}]},{label:'Exibir',submenu:[{role:'resetZoom',label:'Tamanho normal'},{role:'zoomIn',label:'Aumentar interface'},{role:'zoomOut',label:'Diminuir interface'},{role:'togglefullscreen',label:'Tela cheia'}]}]));
 win=new BrowserWindow({width:1500,height:960,minWidth:680,minHeight:550,show:!smokeDir,title:'RV Cutter CAD '+require('./package.json').version,backgroundColor:'#0b1016',webPreferences:{preload:path.join(__dirname,'preload.cjs'),contextIsolation:true,nodeIntegration:false,sandbox:true}});
 attachDiagnostics(win.webContents);
 win.webContents.setWindowOpenHandler(()=>({action:'deny'}));
 win.webContents.on('will-navigate',(e,url)=>{if(!url.startsWith('rvapp://local/'))e.preventDefault()});

 ipcMain.handle('desktop-health',async e=>{requireTrusted(e);return {ok:true,url:e.senderFrame.url,origin:e.senderFrame.origin,version:require('./package.json').version,gpu:app.getGPUFeatureStatus()};});
 ipcMain.handle('save-file',saveFile);
 ipcMain.handle('autosave',async(e,data)=>{requireTrusted(e);if(typeof data!=='string'||data.length>50*1024*1024)return false;const dir=app.getPath('userData');fs.mkdirSync(dir,{recursive:true});const file=path.join(dir,'recovery.rvcad');if(fs.existsSync(file))fs.copyFileSync(file,file+'.bak');writeAll(file+'.tmp',Buffer.from(data,'utf8'));fs.renameSync(file+'.tmp',file);return true});
 ipcMain.handle('recovery',async(e)=>{if(!trusted(e))return null;try{return fs.readFileSync(path.join(app.getPath('userData'),'recovery.rvcad'),'utf8')}catch{return null}});
 ipcMain.handle('recovery-clear',async(e)=>{requireTrusted(e);const dir=app.getPath('userData');for(const name of ['recovery.rvcad','recovery.rvcad.bak']){try{fs.rmSync(path.join(dir,name),{force:true})}catch{}}return true;});
 const catalog=createCatalog(app.getPath('userData'));
 ipcMain.handle('catalog-save',async(e,data)=>{requireTrusted(e);return catalog.save(data)});
 ipcMain.handle('catalog-list',async e=>{requireTrusted(e);return catalog.list()});
 ipcMain.handle('catalog-open',async(e,id)=>{requireTrusted(e);return catalog.open(id)});
 for(const [channel,method] of [['catalog-rename','rename'],['catalog-delete','delete'],['presets-list','presetsList'],['presets-save','presetsSave']])ipcMain.handle(channel,async(e,...args)=>{requireTrusted(e);return catalog[method](...args);});

 win.on('close',e=>{if(closing||smokeFinished)return;e.preventDefault();win.webContents.executeJavaScript('window.RVDesktopFlush ? window.RVDesktopFlush() : true').then(ok=>{if(ok){closing=true;win.close()}else{dialog.showMessageBox(win,{type:'warning',message:'Não foi possível salvar o histórico. Salve o projeto em um arquivo antes de sair.',buttons:['Voltar']});}}).catch(()=>{closing=true;win.close()});});
 await win.loadURL('rvapp://local/index.html');
 if(smokeDir)setTimeout(runDesktopSmoke,250);
});
app.on('window-all-closed',()=>{if(!smokeFinished)app.quit()});
