import {execFileSync} from 'node:child_process';
execFileSync(process.execPath,['scripts/build-rust.mjs'],{stdio:'inherit'});
import fs from 'node:fs';
import {build} from 'esbuild';
const pkg=JSON.parse(fs.readFileSync('package.json','utf8'));
const app=JSON.parse(fs.readFileSync('app/package.json','utf8'));app.version=pkg.version;fs.writeFileSync('app/package.json',JSON.stringify(app,null,2)+'\n');
for(const [entry,out,format] of [['src/bootstrap.mjs','app/ui.js','iife'],['src/worker.mjs','app/worker.js','esm']])await build({entryPoints:[entry],outfile:out,bundle:true,minify:true,format,platform:'browser',external:['node:*'],define:{'import.meta.url':'globalThis.location.href',__APP_VERSION__:JSON.stringify(pkg.version)}});
fs.copyFileSync('node_modules/manifold-3d/manifold.wasm','app/manifold.wasm');
fs.copyFileSync('src/measure-tool.js','app/measure-tool.js');
console.log('Build '+pkg.version+' · UI, worker, Medir e WASM gerados do fonte.');


fs.copyFileSync('generated/rv-sketch/rv_sketch_core_bg.wasm','app/rv_sketch_core_bg.wasm');
