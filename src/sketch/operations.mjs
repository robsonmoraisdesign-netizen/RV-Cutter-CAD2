import {line,arc,addEntity,getEntity,removeEntity} from './model.mjs';

const EPS=1e-7;
const TAU=Math.PI*2;
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const normAngle=a=>((a%TAU)+TAU)%TAU;
const dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
const samePoint=(a,b,tol=1e-6)=>dist(a,b)<=tol;
const lineVec=e=>[e.end[0]-e.start[0],e.end[1]-e.start[1]];
const linePoint=(e,t)=>[e.start[0]+(e.end[0]-e.start[0])*t,e.start[1]+(e.end[1]-e.start[1])*t];
const lineParam=(e,p)=>{const [dx,dy]=lineVec(e),q=dx*dx+dy*dy||1;return ((p[0]-e.start[0])*dx+(p[1]-e.start[1])*dy)/q;};
const radial=e=>e.type==='circle'||e.type==='arc';

function arcSweep(e){
 let sweep=e.endAngle-e.startAngle;
 if(e.ccw!==false){while(sweep<=0)sweep+=TAU;}
 else{while(sweep>=0)sweep-=TAU;}
 return sweep;
}
function angleOnArc(e,angle,tol=1e-6){
 if(e.type!=='arc')return true;
 const sweep=arcSweep(e),delta=e.ccw!==false?normAngle(angle-e.startAngle):-normAngle(e.startAngle-angle);
 return Math.abs(delta)<=Math.abs(sweep)+tol;
}
function arcParam(e,p){
 const angle=Math.atan2(p[1]-e.center[1],p[0]-e.center[0]),sweep=arcSweep(e);
 let delta=e.ccw!==false?normAngle(angle-e.startAngle):-normAngle(e.startAngle-angle);
 return sweep?delta/sweep:0;
}
function arcPoint(e,t){const a=e.startAngle+arcSweep(e)*t;return [e.center[0]+Math.cos(a)*e.radius,e.center[1]+Math.sin(a)*e.radius];}
function entityParam(e,p){if(e.type==='line')return lineParam(e,p);if(e.type==='circle')return normAngle(Math.atan2(p[1]-e.center[1],p[0]-e.center[0]))/TAU;return arcParam(e,p);}

function lineLine(a,b,infinite=false){
 const p=a.start,r=lineVec(a),q=b.start,s=lineVec(b),cross=r[0]*s[1]-r[1]*s[0];
 if(Math.abs(cross)<EPS)return [];
 const qp=[q[0]-p[0],q[1]-p[1]],t=(qp[0]*s[1]-qp[1]*s[0])/cross,u=(qp[0]*r[1]-qp[1]*r[0])/cross;
 if(!infinite&&(t<-EPS||t>1+EPS||u<-EPS||u>1+EPS))return [];
 return [{point:linePoint(a,t),ta:t,tb:u}];
}
function lineCircle(ln,circle,infiniteLine=false){
 const [dx,dy]=lineVec(ln),fx=ln.start[0]-circle.center[0],fy=ln.start[1]-circle.center[1],A=dx*dx+dy*dy;
 if(A<EPS)return [];
 const B=2*(fx*dx+fy*dy),C=fx*fx+fy*fy-circle.radius*circle.radius,disc=B*B-4*A*C;
 if(disc<-EPS)return [];
 const root=Math.sqrt(Math.max(0,disc)),ts=[(-B-root)/(2*A),(-B+root)/(2*A)];
 const out=[];
 for(const t of ts){
  if(!infiniteLine&&(t<-EPS||t>1+EPS))continue;
  const p=linePoint(ln,t),angle=Math.atan2(p[1]-circle.center[1],p[0]-circle.center[0]);
  if(!angleOnArc(circle,angle))continue;
  if(!out.some(x=>samePoint(x.point,p)))out.push({point:p,ta:t,tb:entityParam(circle,p)});
 }
 return out;
}
function circleCircle(a,b){
 const dx=b.center[0]-a.center[0],dy=b.center[1]-a.center[1],d=Math.hypot(dx,dy);
 if(d<EPS||d>a.radius+b.radius+EPS||d<Math.abs(a.radius-b.radius)-EPS)return [];
 const x=(a.radius*a.radius-b.radius*b.radius+d*d)/(2*d),h2=a.radius*a.radius-x*x;
 if(h2<-EPS)return [];
 const h=Math.sqrt(Math.max(0,h2)),ux=dx/d,uy=dy/d,base=[a.center[0]+ux*x,a.center[1]+uy*x],perp=[-uy*h,ux*h];
 const pts=[[base[0]+perp[0],base[1]+perp[1]],[base[0]-perp[0],base[1]-perp[1]]],out=[];
 for(const p of pts){
  const aa=Math.atan2(p[1]-a.center[1],p[0]-a.center[0]),ab=Math.atan2(p[1]-b.center[1],p[0]-b.center[0]);
  if(!angleOnArc(a,aa)||!angleOnArc(b,ab))continue;
  if(!out.some(x=>samePoint(x.point,p)))out.push({point:p,ta:entityParam(a,p),tb:entityParam(b,p)});
 }
 return out;
}
function intersections(a,b,{infiniteA=false}={}){
 if(a.type==='line'&&b.type==='line')return lineLine(a,b,infiniteA);
 if(a.type==='line'&&radial(b))return lineCircle(a,b,infiniteA);
 if(radial(a)&&b.type==='line')return lineCircle(b,a,false).map(x=>({point:x.point,ta:entityParam(a,x.point),tb:x.ta}));
 if(radial(a)&&radial(b))return circleCircle(a,b);
 return [];
}
function entityRelations(sketch,id){
 return {
  constraints:sketch.constraints.filter(c=>c.entity===id||c.a?.entity===id||c.b?.entity===id||c.point?.entity===id||c.line===id||c.first===id||c.second===id),
  dimensions:sketch.dimensions.filter(d=>d.entity===id)
 };
}
function detachRelations(sketch,id){
 const before=entityRelations(sketch,id),constraintIds=new Set(before.constraints.map(c=>c.id)),dimensionIds=new Set(before.dimensions.map(d=>d.id));
 sketch.constraints=sketch.constraints.filter(c=>!constraintIds.has(c.id));
 sketch.dimensions=sketch.dimensions.filter(d=>!dimensionIds.has(d.id));
 return before.constraints.length+before.dimensions.length;
}
function uniqueSorted(values,tol=1e-6){return [...values].sort((a,b)=>a-b).filter((v,i,a)=>!i||Math.abs(v-a[i-1])>tol);}
function nearestSegmentIndex(bounds,t){
 let best=0,score=Infinity;
 for(let i=0;i<bounds.length-1;i++){
  const mid=(bounds[i]+bounds[i+1])/2,s=Math.abs(mid-t);
  if(t>=bounds[i]-EPS&&t<=bounds[i+1]+EPS)return i;
  if(s<score){score=s;best=i;}
 }
 return best;
}
function mutateArc(target,center,radius,startAngle,endAngle,ccw=true,construction=false){
 const id=target.id;for(const k of Object.keys(target))delete target[k];
 Object.assign(target,{id,type:'arc',center:[...center],radius,startAngle,endAngle,ccw,construction:!!construction});
}

export function trimEntity(sketch,entityId,clickPoint){
 const target=getEntity(sketch,entityId);
 const points=[];
 for(const other of sketch.entities){
  if(other.id===entityId||other.construction)continue;
  for(const hit of intersections(target,other))if(!points.some(p=>samePoint(p,hit.point,1e-5)))points.push(hit.point);
 }
 const relationsRemoved=detachRelations(sketch,entityId);

 if(target.type==='line'){
  const cuts=uniqueSorted(points.map(p=>lineParam(target,p)).filter(t=>t>EPS&&t<1-EPS));
  if(!cuts.length){removeEntity(sketch,entityId);return {removed:true,split:false,relationsRemoved};}
  const oldStart=[...target.start],oldEnd=[...target.end],bounds=[0,...cuts,1],t=clamp(lineParam(target,clickPoint)),i=nearestSegmentIndex(bounds,t),a=bounds[i],b=bounds[i+1],kept=[];
  if(a>EPS)kept.push([oldStart,linePoint({...target,start:oldStart,end:oldEnd},a)]);
  if(b<1-EPS)kept.push([linePoint({...target,start:oldStart,end:oldEnd},b),oldEnd]);
  if(!kept.length){removeEntity(sketch,entityId);return {removed:true,split:false,relationsRemoved};}
  target.start=[...kept[0][0]];target.end=[...kept[0][1]];
  if(kept[1])addEntity(sketch,line(kept[1][0],kept[1][1],{construction:target.construction}));
  return {removed:false,split:!!kept[1],relationsRemoved};
 }

 if(target.type==='circle'){
  const angles=uniqueSorted(points.map(p=>normAngle(Math.atan2(p[1]-target.center[1],p[0]-target.center[0]))));
  if(angles.length<2){removeEntity(sketch,entityId);return {removed:true,split:false,relationsRemoved};}
  const click=normAngle(Math.atan2(clickPoint[1]-target.center[1],clickPoint[0]-target.center[0]));
  let a=angles.at(-1)-TAU,b=angles[0],found=false;
  for(let i=0;i<angles.length;i++){const x=angles[i],y=i===angles.length-1?angles[0]+TAU:angles[i+1],cc=click<x?click+TAU:click;if(cc>=x-EPS&&cc<=y+EPS){a=x;b=y;found=true;break;}}
  if(!found){a=angles.at(-1);b=angles[0]+TAU;}
  mutateArc(target,target.center,target.radius,normAngle(b),normAngle(a),true,target.construction);
  return {removed:false,split:false,relationsRemoved};
 }

 if(target.type==='arc'){
  const cuts=uniqueSorted(points.map(p=>arcParam(target,p)).filter(t=>t>EPS&&t<1-EPS));
  if(!cuts.length){removeEntity(sketch,entityId);return {removed:true,split:false,relationsRemoved};}
  const bounds=[0,...cuts,1],t=clamp(arcParam(target,clickPoint)),i=nearestSegmentIndex(bounds,t),a=bounds[i],b=bounds[i+1],old={center:[...target.center],radius:target.radius,startAngle:target.startAngle,endAngle:target.endAngle,ccw:target.ccw!==false,construction:target.construction},kept=[];
  if(a>EPS)kept.push([0,a]);
  if(b<1-EPS)kept.push([b,1]);
  if(!kept.length){removeEntity(sketch,entityId);return {removed:true,split:false,relationsRemoved};}
  const makeAngles=([u0,u1])=>[old.startAngle+arcSweep(old)*u0,old.startAngle+arcSweep(old)*u1];
  const first=makeAngles(kept[0]);target.startAngle=first[0];target.endAngle=first[1];target.ccw=old.ccw;
  if(kept[1]){const second=makeAngles(kept[1]);addEntity(sketch,arc(old.center,old.radius,second[0],second[1],{ccw:old.ccw,construction:old.construction}));}
  return {removed:false,split:!!kept[1],relationsRemoved};
 }
 throw Error('Trim ainda não suporta este tipo de entidade.');
}

export function extendLine(sketch,entityId,clickPoint){
 const target=getEntity(sketch,entityId);if(target.type!=='line')throw Error('Extend, nesta fase, atua em linhas.');
 const tClick=lineParam(target,clickPoint),extendEnd=tClick>=.5,candidates=[];
 for(const other of sketch.entities){
  if(other.id===entityId||other.construction)continue;
  for(const hit of intersections(target,other,{infiniteA:true})){
   const t=lineParam(target,hit.point);
   if(extendEnd&&t>1+EPS)candidates.push({t,point:hit.point,d:t-1});
   if(!extendEnd&&t<-EPS)candidates.push({t,point:hit.point,d:-t});
  }
 }
 if(!candidates.length)throw Error('Nenhum limite encontrado na direção escolhida.');
 candidates.sort((a,b)=>a.d-b.d);const hit=candidates[0],relationsRemoved=detachRelations(sketch,entityId);
 if(extendEnd)target.end=[...hit.point];else target.start=[...hit.point];
 return {relationsRemoved,endpoint:extendEnd?'end':'start',point:[...hit.point]};
}

function bezierPoint(points,t){
 let work=points.map(p=>[...p]);for(let level=work.length-1;level>0;level--)for(let i=0;i<level;i++)work[i]=[work[i][0]*(1-t)+work[i+1][0]*t,work[i][1]*(1-t)+work[i+1][1]*t];return work[0];
}
export function entityBounds(entity){
 if(entity.type==='point')return {minX:entity.position[0],minY:entity.position[1],maxX:entity.position[0],maxY:entity.position[1]};
 if(entity.type==='line')return {minX:Math.min(entity.start[0],entity.end[0]),minY:Math.min(entity.start[1],entity.end[1]),maxX:Math.max(entity.start[0],entity.end[0]),maxY:Math.max(entity.start[1],entity.end[1])};
 if(entity.type==='circle')return {minX:entity.center[0]-entity.radius,minY:entity.center[1]-entity.radius,maxX:entity.center[0]+entity.radius,maxY:entity.center[1]+entity.radius};
 if(entity.type==='arc'){
  const pts=[arcPoint(entity,0),arcPoint(entity,1)];for(let i=1;i<32;i++)pts.push(arcPoint(entity,i/32));
  return {minX:Math.min(...pts.map(p=>p[0])),minY:Math.min(...pts.map(p=>p[1])),maxX:Math.max(...pts.map(p=>p[0])),maxY:Math.max(...pts.map(p=>p[1]))};
 }
 if(entity.type==='bezier'){
  const pts=Array.from({length:49},(_,i)=>bezierPoint(entity.points,i/48));
  return {minX:Math.min(...pts.map(p=>p[0])),minY:Math.min(...pts.map(p=>p[1])),maxX:Math.max(...pts.map(p=>p[0])),maxY:Math.max(...pts.map(p=>p[1]))};
 }
 return null;
}
