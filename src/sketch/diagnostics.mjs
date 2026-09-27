import {entityEndpoint} from './model.mjs';
const fields=e=>e.type==='line'?['start.0','start.1','end.0','end.1']:e.type==='circle'?['center.0','center.1','radius']:['center.0','center.1','radius','startAngle','endAngle'];
const read=(o,key)=>key.split('.').reduce((v,k)=>v[k],o);
function write(o,key,value){const ks=key.split('.');if(ks.length===1)o[key]=value;else o[ks[0]][ks[1]]=value;}
function equations(s){
 const byId=new Map(s.entities.map(e=>[e.id,e])),v=[];
 for(const c of s.constraints){const e=byId.get(c.entity);
  if(c.type==='fixed'){for(const key of fields(e))v.push(read(e,key)-read(c.geometry||e,key));}
  else if(c.type==='horizontal')v.push(e.end[1]-e.start[1]);
  else if(c.type==='vertical')v.push(e.end[0]-e.start[0]);
  else if(c.type==='coincident'){const a=entityEndpoint(byId.get(c.a.entity),c.a.point),b=entityEndpoint(byId.get(c.b.entity),c.b.point);v.push(a[0]-b[0],a[1]-b[1]);}
 }
 for(const d of s.dimensions)if(d.driving!==false){const e=byId.get(d.entity);v.push(d.type==='lineLength'?Math.hypot(e.end[0]-e.start[0],e.end[1]-e.start[1])-d.value:e.radius-d.value);}
 return v;
}
function rank(rows){
 if(!rows.length)return 0;let k=0;
 for(let col=0;col<rows[0].length&&k<rows.length;col++){
  let pivot=k;for(let j=k+1;j<rows.length;j++)if(Math.abs(rows[j][col])>Math.abs(rows[pivot][col]))pivot=j;
  if(Math.abs(rows[pivot][col])<1e-5)continue;
  [rows[k],rows[pivot]]=[rows[pivot],rows[k]];const d=rows[k][col];for(let c=col;c<rows[k].length;c++)rows[k][c]/=d;
  for(let j=k+1;j<rows.length;j++){const f=rows[j][col];for(let c=col;c<rows[j].length;c++)rows[j][c]-=f*rows[k][c];}k++;
 }return k;
}
export function sketchStatus(sketch,solution){
 if(solution&&!solution.converged)return {state:'conflict',label:'Conflito de restrições',dof:null};
 const remaining=new Map(sketch.entities.map(e=>[e.id,e]));let dof=0,exact=true;
 while(remaining.size){
  const ids=new Set([remaining.keys().next().value]);let grow=true;
  while(grow){grow=false;for(const c of sketch.constraints)if(c.type==='coincident'&&(ids.has(c.a.entity)||ids.has(c.b.entity)))for(const r of [c.a,c.b])if(!ids.has(r.entity)){ids.add(r.entity);grow=true;}}
  const entities=[...ids].map(id=>remaining.get(id));ids.forEach(id=>remaining.delete(id));
  const s={entities:structuredClone(entities),constraints:sketch.constraints.filter(c=>ids.has(c.entity)||ids.has(c.a?.entity)),dimensions:sketch.dimensions.filter(d=>ids.has(d.entity))};
  const vars=s.entities.flatMap(e=>fields(e).map(key=>({e,key}))),base=equations(s);
  if(vars.length>256||base.length>512){exact=false;continue;}
  const rows=base.map(()=>[]);
  for(const {e,key} of vars){const x=read(e,key),h=1e-5*Math.max(1,Math.abs(x));write(e,key,x+h);const v=equations(s);write(e,key,x);for(let j=0;j<v.length;j++)rows[j].push((v[j]-base[j])/h);}
  dof+=vars.length-rank(rows);
 }
 const restricted=sketch.constraints.length||sketch.dimensions.some(d=>d.driving!==false);
 const state=!restricted?'free':exact&&dof===0?'defined':'partial';
 return {state,label:{free:'Livre',partial:'Parcialmente definido',defined:'Totalmente definido'}[state],dof:exact?dof:null};
}
