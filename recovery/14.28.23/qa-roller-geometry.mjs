import assert from 'node:assert/strict';
import {generateRoller,binarySTL,parameters} from './src/roller-geometry.mjs';
const bitmap={width:32,height:32,data:Uint8Array.from({length:1024},(_,i)=>Math.round(127+127*Math.sin(i/32)*Math.cos(i%32)))};
let cases=0;
for(const relief of ['raised','recessed'])for(const axle of [0,8])for(const margin of [0,2]){
 const m=generateRoller({relief,axle,margin,quality:'draft',length:30},bitmap),p=m.positions,ix=m.indices,edges=new Map();let volume=0;
 for(let i=0;i<ix.length;i+=3){const a=ix[i],b=ix[i+1],c=ix[i+2];assert(a!==b&&b!==c&&a!==c);for(const [u,v] of [[a,b],[b,c],[c,a]]){const key=Math.min(u,v)+':'+Math.max(u,v),e=edges.get(key)||[0,0];e[0]++;e[1]+=u<v?1:-1;edges.set(key,e);}const ax=p[a*3],ay=p[a*3+1],az=p[a*3+2],bx=p[b*3],by=p[b*3+1],bz=p[b*3+2],cx=p[c*3],cy=p[c*3+1],cz=p[c*3+2];volume+=(ax*(by*cz-bz*cy)+ay*(bz*cx-bx*cz)+az*(bx*cy-by*cx))/6;
 const area=Math.hypot((by-ay)*(cz-az)-(bz-az)*(cy-ay),(bz-az)*(cx-ax)-(bx-ax)*(cz-az),(bx-ax)*(cy-ay)-(by-ay)*(cx-ax));assert(area>1e-9);
 }
 for(const [count,balance] of edges.values()){assert.equal(count,2);assert.equal(balance,0);}assert(volume>0);assert(p.every(Number.isFinite));const stl=binarySTL(m);assert.equal(stl.byteLength,84+50*m.stats.triangles);assert.equal(new DataView(stl).getUint32(80,true),m.stats.triangles);cases++;
}
assert.throws(()=>parameters({diameter:10,axle:9}));assert.throws(()=>parameters({margin:45}));assert.throws(()=>parameters({length:NaN}));
const big=generateRoller({diameter:150,length:300,quality:'fine'},bitmap);assert(big.stats.around*(big.stats.along+1)<353000);
console.log(JSON.stringify({cases,closedOrientedManifold:true,nondegenerate:true,stl:true,budget:big.stats}));
