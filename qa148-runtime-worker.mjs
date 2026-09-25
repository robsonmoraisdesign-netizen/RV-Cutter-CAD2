import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
const workerPath=path.resolve('app/worker.js');
let resolveMessage;
globalThis.self={location:{href:pathToFileURL(workerPath).href},postMessage:m=>resolveMessage?.(m)};
await import(pathToFileURL(workerPath).href+'?qa148='+Date.now());
const loops=[[[-.5,-.5],[.5,-.5],[.5,.5],[-.5,.5]]];
const defaults={size:40,wall:.8,height:12.5,rim:4,base:2.5,relief:4.5,clearance:.9,detailOffset:0,outlineOffset:0,mode:'separate',mirror:false,threshold:160,tolerance:.04,stampBase:2.5,stampInset:0,stampExpansion:0,removeOutline:false,outlineBand:.8,chamfer:false,tip:.4,chamferHeight:2,wallEdits:[],cornerRadius:2};
async function build(params){return new Promise((resolve,reject)=>{resolveMessage=m=>m.error?reject(Error(m.error)):resolve(m.result);self.onmessage({data:{id:1,loops,params}})})}
const width=p=>p.bounds.max[0]-p.bounds.min[0];
const span=poly=>Math.max(...poly.map(v=>v[0]))-Math.min(...poly.map(v=>v[0]));
for(const inset of [0,1])for(const outlineOffset of [0,1.5]){
 const p={...defaults,stampInset:inset,outlineOffset},a=await build(p),b=await build({...p,stampExpansion:2});
 const ca=a.parts.find(x=>x.name==='Cortador'),cb=b.parts.find(x=>x.name==='Cortador'),sa=a.parts.find(x=>x.name==='Carimbo'),sb=b.parts.find(x=>x.name==='Carimbo');
 assert.ok(Math.abs((width(cb)-width(ca))-4)<.02);
 assert.ok(Math.abs((width(sb)-width(sa))-4)<.02);
 assert.ok(Math.abs((span(b.cuttingOutline[0])-span(a.cuttingOutline[0]))-4)<.02);
 assert.ok(Math.abs((span(b.cuttingOutline[0])-width(sb))-(span(a.cuttingOutline[0])-width(sa)))<.02);
 for(const q of [cb,sb]){assert.equal(q.stats.open,0);assert.equal(q.stats.nonmanifold,0);assert.equal(q.stats.finite,true);assert.equal(q.bodies,1)}
}
for(const mode of ['cutter','integrated']){
 const a=await build({...defaults,mode}),b=await build({...defaults,mode,stampExpansion:2});
 assert.deepEqual(a.parts[0].bounds,b.parts[0].bounds);
}
const sa=await build({...defaults,mode:'stamp'}),sb=await build({...defaults,mode:'stamp',stampExpansion:2});
assert.ok(Math.abs((width(sb.parts[0])-width(sa.parts[0]))-4)<.02);
console.log('PASS 14.8 runtime worker: expansão da base vinculada à lâmina e folga preservada');
