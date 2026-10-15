import assert from 'node:assert/strict';
import {proceduralBorder,borderDefaults,borderKeys} from './src/procedural-border.mjs';
import {kernel,build,defaults,migrateParams,stl} from './src/geometry.mjs';
import {BoundedCache,graphContext,dependencyKeys} from './src/dependencies.mjs';
const m=await kernel(),loops=[[[-.5,-.5],[.5,-.5],[.5,.5],[-.5,.5]]];
const source=loops[0].map(p=>p.map(v=>v*40));
const base={...defaults,size:40,borderEnabled:true,mode:'separate'};
assert.equal(migrateParams({}).borderEnabled,false);
for(const n of [4,12,24,120])for(const direction of ['outward','inward','alternating'])for(const profile of ['circular','elliptical','wave']){
 const p={...base,borderCount:n,borderDirection:direction,borderProfile:profile};
 const b=proceduralBorder(source,p),c=new m.CrossSection([b.points],'EvenOdd');
 assert.equal(c.toPolygons().length,1,'one closed contour');assert.ok(c.area()>0);
 // A simple star-shaped profile has strictly increasing polar angle: no crossing lobes.
 let prev=Math.atan2(b.points[0][1],b.points[0][0]);
 for(const point of b.points.slice(1)){let a=Math.atan2(point[1],point[0]);while(a<prev-1e-8)a+=2*Math.PI;assert.ok(a-prev<.2,'no backwards angular travel');prev=a;}
 c.delete();
}
for(const direction of ['outward','inward','alternating'])for(const profile of ['circular','elliptical','wave'])for(const mode of ['cutter','stamp','integrated','separate']){
 const result=build(m,loops,{...base,borderDirection:direction,borderProfile:profile,mode});
 for(const part of result.parts){assert.equal(part.stats.open,0);assert.equal(part.stats.nonmanifold,0);assert.equal(part.stats.finite,true);assert.equal(part.bodies,1);assert.equal(stl(part).byteLength,84+part.indices.length/3*50);}
}
const exact=proceduralBorder(source,{borderCount:24,borderDiameter:100,borderRadius:8});
const h=50*Math.sin(Math.PI/24),cx=50*Math.cos(Math.PI/24)-Math.sqrt(64-h*h);
for(const [x,y] of exact.points.slice(0,exact.points.length/24))assert.ok(Math.abs(Math.hypot(x-cx,y)-8)<1e-10,'true circular radius');
for(const params of [{borderCount:3},{borderCount:5,borderDirection:'alternating'},{borderRadius:.1},{borderCount:Infinity},{borderDepth:0}])assert.throws(()=>proceduralBorder(source,params));
assert.throws(()=>build(m,loops,{...base,borderDiameter:10}),/corta a arte/);
const cache=new BoundedCache(),cached=p=>build(m,loops,p,graphContext(cache,'square',p));
cached(base);const changed={...base,borderCount:16,borderRadius:10,chamfer:true};
const a=cached(changed),b=build(m,loops,changed);assert.deepEqual(a.parts.map(x=>x.bounds),b.parts.map(x=>x.bounds));
assert.deepEqual(a.parts.map(x=>x.positions),b.parts.map(x=>x.positions));
for(const key of borderKeys){const keys=dependencyKeys('square',base);assert.ok(keys.cutter.fields.includes(key));assert.ok(keys.stamp.fields.includes(key));}
const off=build(m,loops,{...base,borderEnabled:false}),legacy=build(m,loops,{...defaults,size:40,mode:'separate'});assert.deepEqual(off.parts.map(x=>x.positions),legacy.parts.map(x=>x.positions));
console.log('PASS procedural border: 36 profiles, 36 mode combinations, mesh/STL, cache, invalid inputs and legacy parity');
