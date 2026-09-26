import fs from 'fs';import assert from 'node:assert/strict';import {kernel,build,defaults,stl} from './src/geometry.mjs';
const m=await kernel();
const distance=(p,loop)=>{let best=Infinity;for(let i=0;i<loop.length;i++){const a=loop[i],b=loop[(i+1)%loop.length],dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((p[0]-a[0])*dx+(p[1]-a[1])*dy)/(dx*dx+dy*dy||1)));best=Math.min(best,Math.hypot(p[0]-a[0]-t*dx,p[1]-a[1]-t*dy));}return best;};
for(const name of ['rose','pig','cow']){const loops=JSON.parse(fs.readFileSync('test-'+name+'-loops.json'));
for(const height of [2,4,8.5]){const p={...defaults,mode:'separate',height:11,rim:2.5,chamfer:true,chamferHeight:height},r=build(m,loops,p),part=r.parts[0];const solid=new m.Manifold(new m.Mesh({numProp:3,vertProperties:part.positions,triVerts:part.indices}));let maxError=0;
for(const frac of [.05,.25,.5,.75,.95]){const z=p.height-height+height*frac,sec=solid.slice(z),polys=sec.toPolygons();const outer=polys[0];for(const q of outer){const d=distance(q,r.cuttingOutline[0]),expected=p.wall+(p.tip-p.wall)*frac;maxError=Math.max(maxError,Math.abs(d-expected));}sec.delete();}
console.log(name,height,'bevel maximum width error mm',maxError,'closed',part.stats.open===0,'bodies',part.bodies);assert.ok(maxError<.025,'inconsistent bevel '+maxError);assert.equal(part.bodies,1);solid.delete();
if(name==='rose'&&height===4){fs.writeFileSync('rose-fixed-cutter.stl',new Uint8Array(stl(part)));fs.writeFileSync('rose-fixed-stamp.stl',new Uint8Array(stl(r.parts[1])));}
}}
