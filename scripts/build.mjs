import fs from 'node:fs';
import {build} from 'esbuild';
const pkg=JSON.parse(fs.readFileSync('package.json','utf8'));
const app=JSON.parse(fs.readFileSync('app/package.json','utf8'));app.version=pkg.version;fs.writeFileSync('app/package.json',JSON.stringify(app,null,2)+'\n');
for(const [entry,out,format] of [['src/ui.mjs','app/ui.js','iife'],['src/worker.mjs','app/worker.js','esm']])await build({entryPoints:[entry],outfile:out,bundle:true,minify:true,format,platform:'browser',external:['node:*'],define:{__APP_VERSION__:JSON.stringify(pkg.version)}});
fs.copyFileSync('node_modules/manifold-3d/manifold.wasm','app/manifold.wasm');
console.log('Build '+pkg.version+' · UI, worker e WASM gerados do fonte.');
