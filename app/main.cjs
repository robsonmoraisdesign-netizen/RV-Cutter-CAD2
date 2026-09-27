const {app,BrowserWindow,ipcMain,dialog,protocol,net,Menu}=require('electron');
const {createCatalog}=require('./catalog.cjs');
const path=require('path'),fs=require('fs'),{pathToFileURL}=require('url');
protocol.registerSchemesAsPrivileged([{scheme:'rvapp',privileges:{standard:true,secure:true,supportFetchAPI:true,corsEnabled:true,stream:true}}]);
app.setName('RV Cutter CAD');
if(!app.requestSingleInstanceLock())app.quit();
function writeAll(file,data){const b=Buffer.isBuffer(data)?data:Buffer.from(data,'utf8');const fd=fs.openSync(file,'w');try{let off=0;while(off<b.length){const n=fs.writeSync(fd,b,off,Math.min(1048576,b.length-off));if(n<=0)throw Error('Falha ao gravar arquivo');off+=n;}fs.fsyncSync(fd);}finally{fs.closeSync(fd);}}
let win;
app.on('second-instance',()=>{if(win){win.show();win.focus()}});
function trusted(e){return e.sender===win?.webContents&&e.senderFrame?.url.startsWith('rvapp://local/');}
app.whenReady().then(()=>{
 protocol.handle('rvapp',request=>{const url=new URL(request.url);if(url.hostname!=='local')return new Response('Forbidden',{status:403});let rel=decodeURIComponent(url.pathname);if(rel==='/')rel='/index.html';const p=path.resolve(__dirname,'.'+rel);if(!p.startsWith(__dirname+path.sep))return new Response('Forbidden',{status:403});return net.fetch(pathToFileURL(p).toString())});
 Menu.setApplicationMenu(Menu.buildFromTemplate([{label:'Arquivo',submenu:[{role:'quit',label:'Sair'}]},{label:'Editar',submenu:[{role:'undo',label:'Desfazer texto'},{role:'redo',label:'Refazer texto'},{type:'separator'},{role:'cut',label:'Recortar'},{role:'copy',label:'Copiar'},{role:'paste',label:'Colar'}]},{label:'Exibir',submenu:[{role:'resetZoom',label:'Tamanho normal'},{role:'zoomIn',label:'Aumentar interface'},{role:'zoomOut',label:'Diminuir interface'},{role:'togglefullscreen',label:'Tela cheia'}]}]));
 win=new BrowserWindow({width:1500,height:960,minWidth:680,minHeight:550,title:'RV Cutter CAD '+require('./package.json').version,backgroundColor:'#0b1016',webPreferences:{preload:path.join(__dirname,'preload.cjs'),contextIsolation:true,nodeIntegration:false,sandbox:true}});
 win.webContents.setWindowOpenHandler(()=>({action:'deny'}));win.webContents.on('will-navigate',(e,url)=>{if(!url.startsWith('rvapp://local/'))e.preventDefault()});
 ipcMain.handle('save-file',async(e,name,data,kind)=>{if(!trusted(e))throw Error('Acesso negado');if(typeof name!=='string'||name.length>300||!['project','stl','svg','zip','png'].includes(kind))throw Error('Arquivo inválido');const ext={project:'rvcad',stl:'stl',svg:'svg',zip:'zip',png:'png'}[kind];const result=await dialog.showSaveDialog(win,{defaultPath:name.replace(/[<>:"/\\|?*]/g,'_'),filters:[{name:ext.toUpperCase(),extensions:[ext]}]});if(result.canceled)return null;const buffer=typeof data==='string'?Buffer.from(data,'utf8'):Buffer.from(data);if(buffer.length>150*1024*1024)throw Error('Arquivo excede limite');const tmp=result.filePath+'.rvtmp';writeAll(tmp,buffer);fs.renameSync(tmp,result.filePath);return result.filePath});
 ipcMain.handle('autosave',async(e,data)=>{if(!trusted(e)||typeof data!=='string'||data.length>50*1024*1024)return false;const dir=app.getPath('userData');fs.mkdirSync(dir,{recursive:true});const file=path.join(dir,'recovery.rvcad');if(fs.existsSync(file))fs.copyFileSync(file,file+'.bak');writeAll(file+'.tmp',data);fs.renameSync(file+'.tmp',file);return true});
 ipcMain.handle('recovery',async(e)=>{if(!trusted(e))return null;try{return fs.readFileSync(path.join(app.getPath('userData'),'recovery.rvcad'),'utf8')}catch{return null}});
 ipcMain.handle('recovery-clear',async(e)=>{if(!trusted(e))throw Error('Acesso negado');const dir=app.getPath('userData');for(const name of ['recovery.rvcad','recovery.rvcad.bak']){try{fs.rmSync(path.join(dir,name),{force:true})}catch{}}return true;});
 const catalog=createCatalog(app.getPath('userData'));
 ipcMain.handle('catalog-save',async(e,data)=>{if(!trusted(e))throw Error('Acesso negado');return catalog.save(data)});
 ipcMain.handle('catalog-list',async e=>{if(!trusted(e))throw Error('Acesso negado');return catalog.list()});
 ipcMain.handle('catalog-open',async(e,id)=>{if(!trusted(e))throw Error('Acesso negado');return catalog.open(id)});
 for(const [channel,method] of [['catalog-rename','rename'],['catalog-delete','delete'],['presets-list','presetsList'],['presets-save','presetsSave']])ipcMain.handle(channel,async(e,...args)=>{if(!trusted(e))throw Error('Acesso negado');return catalog[method](...args);});
 let closing=false;win.on('close',e=>{if(closing)return;e.preventDefault();win.webContents.executeJavaScript('window.RVDesktopFlush ? window.RVDesktopFlush() : true').then(ok=>{if(ok){closing=true;win.close()}else{dialog.showMessageBox(win,{type:'warning',message:'Não foi possível salvar o histórico. Salve o projeto em um arquivo antes de sair.',buttons:['Voltar']});}}).catch(()=>{closing=true;win.close()});});
 win.loadURL('rvapp://local/index.html');
});
app.on('window-all-closed',()=>app.quit());
