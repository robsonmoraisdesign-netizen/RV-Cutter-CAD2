import {generateRoller} from './roller-geometry.mjs';
self.onmessage=({data:{id,params,bitmap}})=>{try{const mesh=generateRoller(params,bitmap);self.postMessage({id,mesh},[mesh.positions.buffer,mesh.indices.buffer]);}catch(e){self.postMessage({id,error:e.message});}};
