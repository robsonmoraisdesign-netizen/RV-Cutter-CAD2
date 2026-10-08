import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import Module from 'manifold-3d';
const kernel=await Module();kernel.setup();
const src=fs.readFileSync('src/worker-readable.mjs','utf8');
const ctx=vm.createContext({});vm.runInContext(src.slice(src.indexOf('function rvContains('),src.indexOf('function qr(')),ctx);
const cases=[Array.from({length:96},(_,i)=>{const a=i/96*Math.PI*2;return [30*Math.cos(a),24*Math.sin(a)];}),Array.from({length:160},(_,i)=>{const a=i/160*Math.PI*2,r=25+4*Math.cos(a*5);return [r*Math.cos(a),r*Math.sin(a)];})];
const inside=ctx.rvContains;let checks=0,views=[];
for(const poly of cases)for(const angle of [0,45,90,-45])for(const position of [0,17,40,71]){
const p={logoEnabled:true,mode:'cutter',size:75,logoSize:5,logoPosition:position,logoOrientationMode:'manual',logoRotationAbsolute:angle,logoBaseRotation:0,logoTextRotation:0,logoCentralAxis:true,logoBaseWidth:26,logoBaseDepth:10,logoBaseWidthExtra:0,logoBaseGap:6};
const r=ctx.rvLogoPlace(poly,p,{width:14,height:5,loops:[[[-7,-2.5],[7,-2.5],[7,2.5],[-7,2.5]]]});
const parts=[poly,r.plaque,r.connector].map(q=>new kernel.CrossSection(JSON.parse(JSON.stringify([q])),'EvenOdd'));const merged=kernel.CrossSection.union(parts);const solid=merged.extrude(2.5);assert.equal(solid.status(),'NoError');assert.equal(solid.decompose().length,1,'Support must be connected');if(position===0&&angle===0)fs.writeFileSync('logo-union.json',JSON.stringify(merged.toPolygons()));solid.delete();merged.delete();parts.forEach(p=>p.delete());
const d=r.connectorDirection,t=[-d[1],d[0]],h=r.connectorWidth/2,half=r.connectorAxis==='depth'?r.baseDepth/2:r.baseWidth/2;
const toWorld=(x,y)=>[r.plaqueCenter[0]+t[0]*x+d[0]*y,r.plaqueCenter[1]+t[1]*x+d[1]*y];
const boundary=(x)=>{let max=-Infinity;const pts=poly.map(q=>{const dx=q[0]-r.plaqueCenter[0],dy=q[1]-r.plaqueCenter[1];return [dx*t[0]+dy*t[1],dx*d[0]+dy*d[1]]});for(let i=0;i<pts.length;i++){const a=pts[i],b=pts[(i+1)%pts.length];if(Math.abs(a[0]-b[0])<1e-9||x<Math.min(a[0],b[0])||x>Math.max(a[0],b[0]))continue;max=Math.max(max,a[1]+(x-a[0])*(b[1]-a[1])/(b[0]-a[0]));}return max;};
for(let i=0;i<=40;i++){const x=-h+.015+(2*h-.03)*i/40,far=boundary(x);if(!Number.isFinite(far)||far>=0)continue;
for(let j=0;j<=40;j++){const y=far+(0-far)*(j+.5)/41,q=toWorld(x,y);assert(inside(poly,q)||inside(r.plaque,q)||inside(r.connector,q),`Gap: angle ${angle} pos ${position} x ${x} y ${y}`);checks++;}}
if(position===0&&angle===0)views.push({poly,r});
}
fs.writeFileSync('logo-fill-geometry.json',JSON.stringify(views));console.log(`Logo fill PASS: ${checks} points across 32 curved/concave configurations, full-span support without side notches.`);
