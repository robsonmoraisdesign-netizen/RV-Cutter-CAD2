import {build} from 'esbuild';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
process.chdir(fileURLToPath(new URL('.',import.meta.url)));
await build({absWorkingDir:process.cwd(),entryPoints:['src/ui.mjs'],outfile:'app/ui.js',bundle:true,minify:true,format:'iife',platform:'browser'});
await build({absWorkingDir:process.cwd(),entryPoints:['src/worker-readable.mjs'],outfile:'app/worker.js',bundle:true,minify:true,format:'esm',platform:'browser',external:['node:*']});
fs.copyFileSync(fileURLToPath(import.meta.resolve('manifold-3d')).replace(/[^/]+$/,'manifold.wasm'),'app/manifold.wasm');
console.log('RV Cutter CAD 14.28.23 rebuilt.');
