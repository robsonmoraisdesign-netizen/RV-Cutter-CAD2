import assert from 'node:assert/strict';import fs from 'node:fs';import {kernel,build,defaults} from './src/geometry.mjs';import {BoundedCache,graphContext} from './src/dependencies.mjs';
const m=await kernel(),loops=JSON.parse(fs.readFileSync('test-rose-loops.json')),cache=new BoundedCache(8*1024*1024);let p={...defaults,mode:'separate',chamfer:true,chamferHeight:2,wall:.8,tip:.4};
function run(params){const c=graphContext(cache,'rose',params),r=build(m,loops,params,c);return {r,c};}
let start=performance.now(),a=run(p);const cold=performance.now()-start;
p={...p,relief:5};start=performance.now();const b=run(p),warm=performance.now()-start;assert(b.c.reused.includes('cutter'));assert(!b.c.computed.includes('blade'));assert.equal(a.r.parts[0],b.r.parts[0]);
p={...p,height:14};const c=run(p);assert(c.c.reused.includes('stamp'));assert(c.c.reused.includes('blade'));assert(!c.c.computed.includes('inner'));
const changes={size:80,mirror:true,tolerance:.03,wall:1,tip:.3,chamferHeight:3,cornerRadius:1,rim:5,base:3,stampBase:3,stampInset:.3,stampExpansion:1,detailOffset:.1,removeOutline:true,outlineBand:.6,outlineOffset:.8,clearance:1.2};
const rows=[];for(const [name,value] of Object.entries(changes)){p={...p,[name]:value};const {r,c}=run(p),fresh=build(m,loops,p);for(let i=0;i<r.parts.length;i++){assert(Math.abs(r.parts[i].volume-fresh.parts[i].volume)<.005,name+' volume');assert.deepEqual(r.parts[i].bounds,fresh.parts[i].bounds,name+' bounds');assert.equal(r.parts[i].stats.open,0);assert.equal(r.parts[i].stats.nonmanifold,0);}assert(cache.bytes<=cache.limit);rows.push({parameter:name,computed:c.computed,reused:c.reused});}
for(let i=0;i<12;i++){run({...p,relief:1+i*.1});assert(cache.bytes<=cache.limit);}
const out={coldMs:cold,reliefChangeMs:warm,cache:cache.stats(),checks:rows};fs.writeFileSync('qa1417-engine-results.json',JSON.stringify(out,null,2));console.log(JSON.stringify(out));
