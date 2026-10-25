import {initSketchKernel} from './sketch/rust-kernel.mjs';
initSketchKernel().then(()=>import('./ui.mjs')).catch(error=>{
 const box=document.createElement('div');box.setAttribute('role','alert');box.style.cssText='position:fixed;inset:20%;padding:30px;background:#18222d;color:#fff;z-index:10000';
 box.textContent='Não foi possível carregar o núcleo Rust do Sketch. Mantenha todos os arquivos do programa juntos. Detalhe: '+error.message;document.body.appendChild(box);
});
