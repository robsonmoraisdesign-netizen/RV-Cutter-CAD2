const fs=require('fs'),assert=require('assert');
const src=fs.readFileSync('src/measure-tool.js','utf8');
const html=fs.readFileSync('app/index.html','utf8');
assert(src.includes('function pickSurface'));
assert(src.includes('triHit'));
assert(src.includes('Plano XY'));
assert(src.includes('Ângulo faces'));
assert(src.includes("e.key.toLowerCase()==='m'"));
assert(!src.includes("action:'build'"));
assert(!src.includes('worker.postMessage'));
assert(html.includes('measure-tool.js'));
function triHit(ray,a,b,c){const sub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]],dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2],cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],e1=sub(b,a),e2=sub(c,a),h=cross(ray.dir,e2),det=dot(e1,h);if(Math.abs(det)<1e-10)return null;const inv=1/det,s=sub(ray.origin,a),u=inv*dot(s,h);if(u<0||u>1)return null;const q=cross(s,e1),v=inv*dot(ray.dir,q);if(v<0||u+v>1)return null;const t=inv*dot(e2,q);return t>1e-6?t:null;}
const t=triHit({origin:[0.25,0.25,1],dir:[0,0,-1]},[0,0,0],[1,0,0],[0,1,0]);
assert(Math.abs(t-1)<1e-9);
console.log('qa1419-measure OK');
