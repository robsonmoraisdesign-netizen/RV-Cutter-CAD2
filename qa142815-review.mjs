import assert from 'node:assert/strict';
import {kernel,build,defaults,migrateParams} from './src/geometry.mjs';
import {BoundedCache,SolidCache,graphContext} from './src/dependencies.mjs';
import {prepareDisplay} from './src/render-data.mjs';
import {createSketchController} from './src/sketch/controller.mjs';
import {createSketch} from './src/sketch/model.mjs';
assert.equal(defaults.mirror,true);
assert.equal(migrateParams({mirror:false}).mirror,false,'Respect an explicitly saved choice');
const m=await kernel(),cache=new BoundedCache(),solids=new SolidCache();
const loops=[[[-.5,-.4],[.35,-.4],[.5,.1],[.1,.4],[-.5,.3]],[[-.2,-.1],[-.2,.1],[.1,.1],[.1,-.1]]];
const p={...defaults,mode:'separate',size:40,bladeReinforcement:true,chamfer:true,reinforcementWidth:.6,reinforcementHeight:1.5,reliefInverted:true};
const hot=params=>build(m,loops,params,graphContext(cache,'asymmetric',params,solids));
const first=hot(p),second=hot({...p,relief:3}),third=hot({...p,height:14});
for(const result of [first,second,third]){
 assert(result.reinforcementRootOutline.length>0);
 assert(result.reinforcementTransitionOutline.length>0);
 assert(result.reliefOutline.length>0);
 assert(result.parts.every(x=>!x.stats.open&&!x.stats.nonmanifold&&x.stats.finite&&x.volume>0));
 const display=prepareDisplay(structuredClone(result));
 assert(display.parts[0].renderData.reinforcement?.indices.length>0,'Color must exist on real reinforcement triangles');
 assert(display.parts[1].renderData.relief?.indices.length>0,'Cached engraving must keep its role');
 for(const part of display.parts){
  const area=mesh=>{let sum=0;const stride=mesh.stride||3;for(let i=0;i<mesh.indices.length;i+=3){const a=mesh.indices[i]*stride,b=mesh.indices[i+1]*stride,c=mesh.indices[i+2]*stride,v=mesh.positions;const u=[v[b]-v[a],v[b+1]-v[a+1],v[b+2]-v[a+2]],w=[v[c]-v[a],v[c+1]-v[a+1],v[c+2]-v[a+2]];sum+=Math.hypot(u[1]*w[2]-u[2]*w[1],u[2]*w[0]-u[0]*w[2],u[0]*w[1]-u[1]*w[0])/2;}return sum;};
  const surface=area(part),displaySurface=Object.values(part.renderData).reduce((n,r)=>n+area(r),0);
  assert(Math.abs(surface-displaySurface)<surface*1e-6,'Role meshes preserve the manufacturing surface without duplicate overlays');
 }
}
for(const params of [{...p,relief:3},{...p,height:14}]){
 const warm=hot(params),cold=build(m,loops,params);
 assert.deepEqual(warm.reinforcementTransitionOutline,cold.reinforcementTransitionOutline);
 assert.deepEqual(warm.reliefOutline,cold.reliefOutline);
 for(let i=0;i<cold.parts.length;i++)assert(Math.abs(warm.parts[i].volume-cold.parts[i].volume)<.001);
}
const normal=build(m,loops,{...p,mirror:false}),mirrored=build(m,loops,{...p,mirror:true});
assert(Math.abs(normal.parts[0].bounds.max[0]+mirrored.parts[0].bounds.min[0])<.002);
// Offset tessellation can pick different diagonals after reflection; volume tolerance 0.005%.
assert(Math.abs(normal.parts[0].volume-mirrored.parts[0].volume)<normal.parts[0].volume*5e-5);
for(const chamfer of [false,true]){
 const r=build(m,loops,{...defaults,mode:'cutter',base:.01,chamfer,size:25});
 assert(r.parts[0].bounds.min[2]>=-1e-6,'Thin bases must not extend below the print bed');
}
// Stamp-only mode must not depend on unused cutter height/base validation.
assert.doesNotThrow(()=>build(m,loops,{...defaults,mode:'stamp',base:20,height:4,size:25}));
solids.clear();cache.clear();
let o={loops:[],params:{size:75},sketch:createSketch()};
const c=createSketchController({object:()=>o,history:()=>{},changed:()=>{},status:()=>{}});
assert(c.create('line',[0,0],[20,0],null,{startRelation:{type:'origin'},endRelation:{type:'axis',axis:'x'}}));
const id=o.sketch.entities[0].id;
assert(c.movePoint(id,'start',[2,3]));
assert.deepEqual(o.sketch.entities[0].start,[0,0],'Origin constraint persists on edit');
assert(c.movePoint(id,'end',[25,4]));
assert.equal(o.sketch.entities[0].end[1],0,'Axis constraint persists on edit');
console.log('PASS review: real role geometry, warm/cold caches, mirror, thin bases, stamp isolation and persistent datums');
