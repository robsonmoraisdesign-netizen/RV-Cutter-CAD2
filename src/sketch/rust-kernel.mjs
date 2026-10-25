// The only application boundary to Rust. No JavaScript geometry fallback.
import init, {run} from '../../generated/rv-sketch/rv_sketch_core.js';
let ready=false, pending;
export function initSketchKernel(bytes){
 if(ready)return Promise.resolve();
 if(!pending)pending=init({module_or_path:bytes||new URL('rv_sketch_core_bg.wasm',globalThis.location?.href||import.meta.url)}).then(()=>{ready=true;}).catch(e=>{pending=null;throw e;});
 return pending;
}
export function sketchCommand(command,sketch,options={}){
 if(!ready)throw Error('O núcleo Rust do Sketch ainda não está disponível.');
 const result=JSON.parse(run(JSON.stringify({command,sketch,...options})));
 if(!result.ok)throw Error(result.error);
 return result.value;
}
export const sketchEngine=()=>({ready,engine:'Rust / SolidCraft 0.15.0'});
