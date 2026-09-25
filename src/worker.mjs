import {prepareDisplay,buffers} from './render-data.mjs';
import {zipSync} from 'fflate';
import {kernel,build,trace,editContours,migrateParams,stl} from './geometry.mjs';
import {BoundedCache,SolidCache,graphContext,ENGINE_VERSION} from './dependencies.mjs';
let ready,completed=0;const cache=new BoundedCache(48*1024*1024),solids=new SolidCache();
self.onmessage=async({data:d})=>{try{
 if(d.action==='stl'){const bytes=new Uint8Array(stl(d.mesh));self.postMessage({id:d.id,result:bytes},[bytes.buffer]);return;}
 if(d.action==='zip'){const bytes=zipSync(d.files,{level:3});self.postMessage({id:d.id,result:bytes},[bytes.buffer]);return;}
 if(d.action==='trace'){self.postMessage({id:d.id,loops:trace(d.pixels,d.w,d.h,d.threshold)});return;}
 if(d.action==='stats'){self.postMessage({id:d.id,result:{...cache.stats(),completed}});return;}
 const m=await (ready??=kernel({locateFile:()=>new URL('manifold.wasm',self.location.href).href}));
 if(d.action==='edit'){self.postMessage({id:d.id,loops:editContours(m,d.loops,d.op)});return;}
 if(d.action==='svg'){const sections=d.shapes.map(s=>new m.CrossSection(s,'EvenOdd'));let joined;try{joined=m.CrossSection.union(sections);self.postMessage({id:d.id,loops:joined.toPolygons()});}finally{joined?.delete();sections.forEach(s=>s.delete());}return;}
 const p=migrateParams(d.params),source=d.sourceHash||JSON.stringify(d.loops),ctx=graphContext(cache,source,p,solids);
 const result=build(m,d.loops,p,ctx);completed++;
 // Transfer a copy: cached mesh buffers must never be detached.
 const output=prepareDisplay(structuredClone(result));output.calculation={version:ENGINE_VERSION,computed:ctx.computed,reused:ctx.reused,cache:cache.stats(),completed};
 self.postMessage({id:d.id,result:output},buffers(output));
}catch(e){self.postMessage({id:d.id,error:e.message});}};
