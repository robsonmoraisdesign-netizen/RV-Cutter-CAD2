import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
const workerPath=path.resolve('app/worker.js');
let reply;
globalThis.self={location:{href:pathToFileURL(workerPath).href},postMessage:m=>reply?.(m)};
await import(pathToFileURL(workerPath).href+'?qa1422='+Date.now());
const loops=[
 [[-.5,-.5],[.5,-.5],[.5,.5],[-.5,.5]],
 [[-.20,-.30],[-.20,.30],[.20,.30],[.20,-.30]]
];
const base={size:40,wall:.8,height:14,rim:4,base:2.5,relief:3,reliefInverted:true,reliefOut:4.5,reliefIn:3,clearance:.9,detailOffset:0,outlineOffset:0,mode:'stamp',mirror:false,threshold:160,tolerance:.04,stampBase:2.5,stampInset:0,stampExpansion:0,removeOutline:false,outlineBand:.8,chamfer:false,tip:.4,chamferHeight:2,wallEdits:[],cornerRadius:2};
let seq=0;
const build=params=>new Promise((resolve,reject)=>{reply=m=>m.error?reject(Error(m.error)):resolve(m.result);self.onmessage({data:{id:++seq,loops,params}})});
const zBounds=p=>[p.bounds.min[2],p.bounds.max[2]];
function zRange(render){const z=[];for(let i=2;i<render.positions.length;i+=3)z.push(render.positions[i]);return [Math.min(...z),Math.max(...z)];}
const r3=await build({...base,relief:3,reliefIn:3});
const p3=r3.parts[0];
assert.equal(p3.stats.open,0);assert.equal(p3.stats.nonmanifold,0);assert.equal(p3.bodies,1);
let [z0,z1]=zBounds(p3);assert.ok(Math.abs(z0-0)<.01,`minZ ${z0}`);assert.ok(Math.abs(z1-5.5)<.03,`maxZ ${z1}`);
assert.ok(p3.renderData.relief,'cavity must keep relief visual role');
const [rz0,rz1]=zRange(p3.renderData.relief);assert.ok(rz0>=2.49,`relief floor must start at stamp base, got ${rz0}`);assert.ok(rz1<=5.53,`relief must stay in engraving volume, got ${rz1}`);
const r1=await build({...base,relief:1,reliefIn:1});
const r6=await build({...base,relief:6,reliefIn:6});
assert.ok(Math.abs(r1.parts[0].bounds.max[2]-3.5)<.03);
assert.ok(Math.abs(r6.parts[0].bounds.max[2]-8.5)<.03);
assert.ok(r6.parts[0].volume>r1.parts[0].volume,'deeper inverted relief adds engraving volume above base instead of removing base');
for(const r of [r1,r6]){assert.equal(r.parts[0].stats.open,0);assert.equal(r.parts[0].stats.nonmanifold,0);assert.equal(r.parts[0].bodies,1);}
const integrated=await build({...base,mode:'integrated',base:2.5,height:14,relief:3,reliefIn:3});
assert.equal(integrated.parts[0].stats.open,0);assert.equal(integrated.parts[0].stats.nonmanifold,0);assert.equal(integrated.parts[0].bodies,1);
assert.ok(integrated.parts[0].renderData.relief);
assert.ok(integrated.parts[0].renderData.stampBase);
let rejected=false;try{await build({...base,mode:'integrated',base:2.5,height:5,relief:3,reliefIn:3});}catch(e){rejected=/Base \+ relevo/.test(e.message)}assert.equal(rejected,true,'integrated inverted relief must obey the same cutter-height rule as positive relief');
console.log('PASS 14.22: inverted relief depth is an independent engraving volume above the stamp base; base remains intact');
