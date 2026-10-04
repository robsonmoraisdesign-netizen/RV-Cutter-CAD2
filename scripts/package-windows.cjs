const fs=require('node:fs'),path=require('node:path');
// Cross-packaging copies the verified Windows runtime; it does not claim native validation.
const cross=process.argv.includes('--cross');
if(!cross&&(process.platform!=='win32'||process.arch!=='x64'))throw Error('Execute em Windows x64 ou use --cross com runtime Windows instalado.');
const version=require('../package.json').version;
const out=path.resolve('dist','RV_Cutter_CAD_'+version+'_Windows_x64');
const runtime=path.resolve('node_modules/electron/dist');
const exe=fs.readFileSync(path.join(runtime,'electron.exe'));
const pe=exe.readUInt32LE(0x3c);
if(exe.toString('ascii',0,2)!=='MZ'||exe.readUInt32LE(pe)!==0x4550||exe.readUInt16LE(pe+4)!==0x8664)throw Error('Runtime não é um executável PE Windows x64 válido.');
for(const f of ['ui.js','worker.js','manifold.wasm'])if(!fs.statSync(path.join('app',f)).size)throw Error('Build incompleto: '+f);
fs.rmSync(out,{recursive:true,force:true});fs.cpSync(runtime,out,{recursive:true});
fs.renameSync(path.join(out,'electron.exe'),path.join(out,'RV Cutter CAD.exe'));
fs.rmSync(path.join(out,'resources/default_app.asar'),{force:true});
fs.cpSync('app',path.join(out,'resources/app'),{recursive:true});
fs.writeFileSync(path.join(out,'SOURCE_COMMIT.txt'),(process.env.RV_SOURCE_COMMIT||process.env.GITHUB_SHA||'local')+'\n');
fs.writeFileSync(path.join(out,'LEIA-ME.txt'),'RV Cutter CAD '+version+' — Windows x64\r\nExtraia TODA a pasta antes de executar RV Cutter CAD.exe. Não mova somente o executável.\r\nEsta versão inclui o workspace Sketch → Função → Corpo e correções do runtime desktop para geração 3D, Worker/WASM e exportação nativa.\r\n');
if(cross)fs.writeFileSync(path.join(out,'VALIDACAO.txt'),'Pacote montado em Linux com runtime oficial Windows x64. PE x64 verificado; testes de geometria e navegador executados. Abertura nativa do EXE Windows ainda não validada nesta entrega.\r\n');
console.log(out);
