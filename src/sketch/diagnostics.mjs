import {entityEndpoint} from './model.mjs';

const fields=e=>e.type==='point'?['position.0','position.1']:e.type==='line'?['start.0','start.1','end.0','end.1']:e.type==='circle'?['center.0','center.1','radius']:e.type==='arc'?['center.0','center.1','radius','startAngle','endAngle']:e.type==='bezier'?e.points.flatMap((_,i)=>[`points.${i}.0`,`points.${i}.1`]):[];
const read=(o,key)=>key.split('.').reduce((v,k)=>v[k],o);
function write(o,key,value){const ks=key.split('.');let target=o;for(let i=0;i<ks.length-1;i++)target=target[ks[i]];target[ks.at(-1)]=value;}
const lineVec=e=>[e.end[0]-e.start[0],e.end[1]-e.start[1]];
const lineLen=e=>Math.hypot(...lineVec(e));
const mid=e=>[(e.start[0]+e.end[0])/2,(e.start[1]+e.end[1])/2];
const radial=e=>['circle','arc'].includes(e.type);
function crossNorm(a,b){const la=Math.hypot(...a)||1,lb=Math.hypot(...b)||1;return (a[0]*b[1]-a[1]*b[0])/(la*lb);}
function dotNorm(a,b){const la=Math.hypot(...a)||1,lb=Math.hypot(...b)||1;return (a[0]*b[0]+a[1]*b[1])/(la*lb);}
function pointLineSigned(p,e){const [dx,dy]=lineVec(e),len=Math.hypot(dx,dy)||1;return ((p[0]-e.start[0])*(-dy)+(p[1]-e.start[1])*dx)/len;}
function pair(byId,c){return [byId.get(c.first),byId.get(c.second)];}

function equations(s){
 const byId=new Map(s.entities.map(e=>[e.id,e])),v=[];
 for(const c of s.constraints){
  const e=byId.get(c.entity);
  if(c.type==='fixed'){for(const key of fields(e))v.push(read(e,key)-read(c.geometry||e,key));}
  else if(c.type==='horizontal')v.push(e.end[1]-e.start[1]);
  else if(c.type==='vertical')v.push(e.end[0]-e.start[0]);
  else if(c.type==='coincident'){
   const a=entityEndpoint(byId.get(c.a.entity),c.a.point),b=entityEndpoint(byId.get(c.b.entity),c.b.point);v.push(a[0]-b[0],a[1]-b[1]);
  }else if(c.type==='midpoint'){
   const p=entityEndpoint(byId.get(c.point.entity),c.point.point),m=mid(byId.get(c.line));v.push(p[0]-m[0],p[1]-m[1]);
  }else if(c.type==='parallel'){const [a,b]=pair(byId,c);v.push(crossNorm(lineVec(a),lineVec(b)));}
  else if(c.type==='perpendicular'){const [a,b]=pair(byId,c);v.push(dotNorm(lineVec(a),lineVec(b)));}
  else if(c.type==='equal'){const [a,b]=pair(byId,c);v.push(a.type==='line'?lineLen(a)-lineLen(b):a.radius-b.radius);}
  else if(c.type==='concentric'){const [a,b]=pair(byId,c);v.push(a.center[0]-b.center[0],a.center[1]-b.center[1]);}
  else if(c.type==='collinear'){const [a,b]=pair(byId,c);v.push(crossNorm(lineVec(a),lineVec(b)),pointLineSigned(mid(b),a));}
  else if(c.type==='tangent'){const [a,b]=pair(byId,c),ln=a.type==='line'?a:b,curve=radial(a)?a:b;v.push(Math.abs(pointLineSigned(curve.center,ln))-curve.radius);}
 }
 for(const d of s.dimensions)if(d.driving!==false){
  const e=byId.get(d.entity);v.push(d.type==='lineLength'?Math.hypot(e.end[0]-e.start[0],e.end[1]-e.start[1])-d.value:e.radius-d.value);
 }
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
function links(c){
 if(c.type==='coincident')return [c.a.entity,c.b.entity];
 if(c.type==='midpoint')return [c.point.entity,c.line];
 if(c.first||c.second)return [c.first,c.second].filter(Boolean);
 return c.entity?[c.entity]:[];
}
function components(sketch){
 const remaining=new Map(sketch.entities.map(e=>[e.id,e])),out=[];
 while(remaining.size){
  const ids=new Set([remaining.keys().next().value]);let grow=true;
  while(grow){
   grow=false;
   for(const c of sketch.constraints){
    const connected=links(c);
    if(connected.some(id=>ids.has(id)))for(const id of connected)if(remaining.has(id)&&!ids.has(id)){ids.add(id);grow=true;}
   }
  }
  ids.forEach(id=>remaining.delete(id));out.push(ids);
 }
 return out;
}
function componentReport(sketch,ids){
 const entities=[...ids].map(id=>sketch.entities.find(e=>e.id===id)).filter(Boolean);
 const s={entities:structuredClone(entities),constraints:sketch.constraints.filter(c=>links(c).some(id=>ids.has(id))),dimensions:sketch.dimensions.filter(d=>ids.has(d.entity))};
 const vars=s.entities.flatMap(e=>fields(e).map(key=>({e,key}))),base=equations(s);
 if(vars.length>256||base.length>512)return {dof:null,exact:false};
 const rows=base.map(()=>[]);
 for(const {e,key} of vars){
  const x=read(e,key),h=1e-5*Math.max(1,Math.abs(x));write(e,key,x+h);const vals=equations(s);write(e,key,x);
  for(let j=0;j<vals.length;j++)rows[j].push((vals[j]-base[j])/h);
 }
 return {dof:Math.max(0,vars.length-rank(rows)),exact:true};
}
export function sketchStatus(sketch,solution){
 if(solution&&!solution.converged)return {state:'conflict',label:'Conflito de restrições',dof:null};
 if(!sketch.entities.length)return {state:'free',label:'Sketch vazio',dof:0};
 let dof=0,exact=true;
 for(const ids of components(sketch)){
  const report=componentReport(sketch,ids);
  if(!report.exact)exact=false;else dof+=report.dof;
 }
 if(!exact)return {state:'partial',label:'Parcialmente definido',dof:null};
 return dof===0?{state:'defined',label:'Totalmente definido',dof:0}:{state:sketch.constraints.length||sketch.dimensions.length?'partial':'free',label:sketch.constraints.length||sketch.dimensions.length?'Parcialmente definido':'Livre',dof};
}
export function entityStates(sketch,solution){
 const result=new Map();
 if(solution&&!solution.converged){for(const e of sketch.entities)result.set(e.id,'conflict');return result;}
 for(const ids of components(sketch)){
  const report=componentReport(sketch,ids),state=report.exact&&report.dof===0?'defined':'under';
  for(const id of ids)result.set(id,state);
 }
 return result;
}
