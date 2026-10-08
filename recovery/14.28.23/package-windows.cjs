const fs=require('node:fs'),path=require('node:path');
if(process.platform!=='win32'||process.arch!=='x64')throw Error('Empacotamento nativo requer Windows x64.');
const version=require('./package.json').version;
const out=path.resolve('dist','RV_Cutter_CAD_'+version+'_Windows_x64');
const runtime=path.resolve('node_modules/electron/dist');
const exePath=path.join(runtime,'electron.exe');
const exe=fs.readFileSync(exePath);
const pe=exe.readUInt32LE(0x3c);
if(exe.toString('ascii',0,2)!=='MZ'||exe.readUInt32LE(pe)!==0x4550||exe.readUInt16LE(pe+4)!==0x8664)throw Error('Runtime Electron não é PE Windows x64.');
for(const file of ['ui.js','worker.js','manifold.wasm'])if(!fs.existsSync(path.join('app',file))||!fs.statSync(path.join('app',file)).size)throw Error('Build incompleto: '+file);
fs.rmSync(out,{recursive:true,force:true});
fs.cpSync(runtime,out,{recursive:true});
fs.renameSync(path.join(out,'electron.exe'),path.join(out,'RV Cutter CAD.exe'));
fs.rmSync(path.join(out,'resources/default_app.asar'),{force:true});
fs.cpSync('app',path.join(out,'resources/app'),{recursive:true});
fs.writeFileSync(path.join(out,'SOURCE_COMMIT.txt'),(process.env.RV_SOURCE_COMMIT||process.env.GITHUB_SHA||'local')+'\n');
fs.writeFileSync(path.join(out,'LEIA-ME.txt'),'RV Cutter CAD '+version+' — Windows x64\r\nExtraia TODA a pasta antes de executar RV Cutter CAD.exe.\r\n14.28.27: novo produto de rolos de textura com parâmetros editáveis e exportação STL.\r\n');
console.log(out);


