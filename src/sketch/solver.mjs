import {cloneSketch,getEntity,validateSketch,entityEndpoint} from './model.mjs';

const EPS=1e-7;
const dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
const lineVector=e=>[e.end[0]-e.start[0],e.end[1]-e.start[1]];
const lineLength=e=>Math.hypot(...lineVector(e));
const lineAngle=e=>Math.atan2(e.end[1]-e.start[1],e.end[0]-e.start[0]);
const midpoint=e=>[(e.start[0]+e.end[0])/2,(e.start[1]+e.end[1])/2];
const radial=e=>['circle','arc'].includes(e.type);

function setPoint(entity,which,p){
  if(entity.type==='point'&&which==='point'){entity.position=[p[0],p[1]];return;}
  if(entity.type==='line'&&(which==='start'||which==='end')){entity[which]=[p[0],p[1]];return;}
  if(radial(entity)&&which==='center'){entity.center=[p[0],p[1]];return;}
  if(entity.type==='arc'&&(which==='start'||which==='end')){
    const dx=p[0]-entity.center[0],dy=p[1]-entity.center[1],r=Math.hypot(dx,dy);
    if(r>EPS)entity.radius=r;
    entity[which==='start'?'startAngle':'endAngle']=Math.atan2(dy,dx);
    return;
  }
  if(entity.type==='bezier'){
    let i=which==='start'?0:which==='end'?entity.points.length-1:typeof which==='string'&&which.startsWith('control:')?Number(which.slice(8)):-1;
    if(Number.isInteger(i)&&entity.points[i]){entity.points[i]=[p[0],p[1]];return;}
  }
  throw Error(`Não é possível escrever em ${entity.type}.${which}`);
}
function setLineAngle(e,angle,length=lineLength(e),center=midpoint(e)){
  const h=Math.max(EPS,length)/2,dx=Math.cos(angle)*h,dy=Math.sin(angle)*h;
  e.start=[center[0]-dx,center[1]-dy];e.end=[center[0]+dx,center[1]+dy];
}
function closestEquivalentAngle(target,current){
  const candidates=[target,target+Math.PI,target-Math.PI];
  return candidates.sort((a,b)=>Math.abs(Math.atan2(Math.sin(a-current),Math.cos(a-current)))-Math.abs(Math.atan2(Math.sin(b-current),Math.cos(b-current))))[0];
}
function projectPointOnLine(p,e){
  const [dx,dy]=lineVector(e),q=dx*dx+dy*dy||1;
  const t=((p[0]-e.start[0])*dx+(p[1]-e.start[1])*dy)/q;
  return [e.start[0]+t*dx,e.start[1]+t*dy];
}
function pointLineDistance(p,e){
  const q=projectPointOnLine(p,e);return dist(p,q);
}

function snapshotEntity(e){return structuredClone(e);}
function restoreEntity(target,saved){for(const k of Object.keys(target))delete target[k];Object.assign(target,structuredClone(saved));}
function applyFixed(sketch,fixedSnapshots){for(const [entityId,saved] of fixedSnapshots)restoreEntity(getEntity(sketch,entityId),saved);}

function pair(sketch,c){return [getEntity(sketch,c.first),getEntity(sketch,c.second)];}

function applyConstraint(sketch,c){
  if(c.type==='horizontal'){
    const e=getEntity(sketch,c.entity),y=(e.start[1]+e.end[1])/2;e.start[1]=y;e.end[1]=y;return;
  }
  if(c.type==='vertical'){
    const e=getEntity(sketch,c.entity),x=(e.start[0]+e.end[0])/2;e.start[0]=x;e.end[0]=x;return;
  }
  if(c.type==='coincident'){
    const a=getEntity(sketch,c.a.entity),b=getEntity(sketch,c.b.entity),pa=entityEndpoint(a,c.a.point),pb=entityEndpoint(b,c.b.point);
    const mid=[(pa[0]+pb[0])/2,(pa[1]+pb[1])/2];setPoint(a,c.a.point,mid);setPoint(b,c.b.point,mid);return;
  }
  if(c.type==='midpoint'){
    const e=getEntity(sketch,c.point.entity),ln=getEntity(sketch,c.line);
    setPoint(e,c.point.point,midpoint(ln));return;
  }
  if(c.type==='coincidentOrigin'){
    const e=getEntity(sketch,c.point.entity);setPoint(e,c.point.point,[0,0]);return;
  }
  if(c.type==='pointOnAxis'){
    const e=getEntity(sketch,c.point.entity),p=entityEndpoint(e,c.point.point);
    setPoint(e,c.point.point,c.axis==='x'?[p[0],0]:[0,p[1]]);return;
  }
  if(c.type==='parallel'||c.type==='perpendicular'){
    const [a,b]=pair(sketch,c),base=lineAngle(a)+(c.type==='perpendicular'?Math.PI/2:0);
    setLineAngle(b,closestEquivalentAngle(base,lineAngle(b)));return;
  }
  if(c.type==='equal'){
    const [a,b]=pair(sketch,c);
    if(a.type==='line'){const len=lineLength(a),angle=lineAngle(b);b.end=[b.start[0]+Math.cos(angle)*len,b.start[1]+Math.sin(angle)*len];}
    else b.radius=a.radius;
    return;
  }
  if(c.type==='concentric'){
    const [a,b]=pair(sketch,c);b.center=[...a.center];return;
  }
  if(c.type==='collinear'){
    const [a,b]=pair(sketch,c),angle=closestEquivalentAngle(lineAngle(a),lineAngle(b)),center=midpoint(b),projected=projectPointOnLine(center,a);
    setLineAngle(b,angle,lineLength(b),projected);return;
  }
  if(c.type==='tangent'){
    const [a,b]=pair(sketch,c),ln=a.type==='line'?a:b,curve=radial(a)?a:b;
    const q=projectPointOnLine(curve.center,ln),[dx,dy]=lineVector(ln),len=Math.hypot(dx,dy)||1,n=[-dy/len,dx/len];
    const side=((curve.center[0]-q[0])*n[0]+(curve.center[1]-q[1])*n[1])>=0?1:-1;
    curve.center=[q[0]+n[0]*curve.radius*side,q[1]+n[1]*curve.radius*side];return;
  }
  if(c.type==='fixed')return;
  throw Error(`Restrição não suportada: ${c.type}`);
}

function applyDimension(sketch,d){
  if(d.driving===false)return;
  const e=getEntity(sketch,d.entity);
  if(d.type==='lineLength'){
    const dx=e.end[0]-e.start[0],dy=e.end[1]-e.start[1],len=Math.hypot(dx,dy),ux=len>EPS?dx/len:1,uy=len>EPS?dy/len:0;
    e.end=[e.start[0]+ux*d.value,e.start[1]+uy*d.value];return;
  }
  if(d.type==='circleRadius'||d.type==='arcRadius'){e.radius=d.value;return;}
  throw Error(`Cota não suportada: ${d.type}`);
}

function normalizedCross(a,b){
  const la=Math.hypot(...a)||1,lb=Math.hypot(...b)||1;return (a[0]*b[1]-a[1]*b[0])/(la*lb);
}
function normalizedDot(a,b){
  const la=Math.hypot(...a)||1,lb=Math.hypot(...b)||1;return (a[0]*b[0]+a[1]*b[1])/(la*lb);
}
function constraintResidual(sketch,c){
  if(c.type==='horizontal'){const e=getEntity(sketch,c.entity);return Math.abs(e.start[1]-e.end[1]);}
  if(c.type==='vertical'){const e=getEntity(sketch,c.entity);return Math.abs(e.start[0]-e.end[0]);}
  if(c.type==='coincident'){const a=getEntity(sketch,c.a.entity),b=getEntity(sketch,c.b.entity);return dist(entityEndpoint(a,c.a.point),entityEndpoint(b,c.b.point));}
  if(c.type==='midpoint'){const e=getEntity(sketch,c.point.entity),ln=getEntity(sketch,c.line);return dist(entityEndpoint(e,c.point.point),midpoint(ln));}
  if(c.type==='coincidentOrigin'){const e=getEntity(sketch,c.point.entity);return dist(entityEndpoint(e,c.point.point),[0,0]);}
  if(c.type==='pointOnAxis'){const e=getEntity(sketch,c.point.entity),p=entityEndpoint(e,c.point.point);return Math.abs(c.axis==='x'?p[1]:p[0]);}
  if(c.type==='parallel'){const [a,b]=pair(sketch,c);return Math.abs(normalizedCross(lineVector(a),lineVector(b)));}
  if(c.type==='perpendicular'){const [a,b]=pair(sketch,c);return Math.abs(normalizedDot(lineVector(a),lineVector(b)));}
  if(c.type==='equal'){const [a,b]=pair(sketch,c);return Math.abs(a.type==='line'?lineLength(a)-lineLength(b):a.radius-b.radius);}
  if(c.type==='concentric'){const [a,b]=pair(sketch,c);return dist(a.center,b.center);}
  if(c.type==='collinear'){const [a,b]=pair(sketch,c);return Math.max(Math.abs(normalizedCross(lineVector(a),lineVector(b))),pointLineDistance(midpoint(b),a));}
  if(c.type==='tangent'){const [a,b]=pair(sketch,c),ln=a.type==='line'?a:b,curve=radial(a)?a:b;return Math.abs(pointLineDistance(curve.center,ln)-curve.radius);}
  return 0;
}
function residual(sketch){
  let r=0;
  for(const c of sketch.constraints)r=Math.max(r,constraintResidual(sketch,c));
  for(const d of sketch.dimensions){
    if(d.driving===false)continue;
    const e=getEntity(sketch,d.entity);
    if(d.type==='lineLength')r=Math.max(r,Math.abs(dist(e.start,e.end)-d.value));
    else r=Math.max(r,Math.abs(e.radius-d.value));
  }
  return r;
}
function constraintEntityIds(c){
  if(c.type==='coincident')return [c.a.entity,c.b.entity];
  if(c.type==='midpoint')return [c.point.entity,c.line];
  if(c.type==='coincidentOrigin'||c.type==='pointOnAxis')return [c.point.entity];
  if(c.first||c.second)return [c.first,c.second].filter(Boolean);
  return c.entity?[c.entity]:[];
}

export function solveSketch(input,{maxIterations=240,tolerance=1e-6,changedIds=null}={}){
  validateSketch(input);
  if (!Number.isInteger(maxIterations)||maxIterations<1||maxIterations>1000||!Number.isFinite(tolerance)||tolerance<=0)throw Error('Opções do solver inválidas.');
  const sketch=cloneSketch(input),affected=new Set(changedIds||sketch.entities.map(e=>e.id));
  let grew=true;while(grew){grew=false;for(const c of sketch.constraints){const ids=constraintEntityIds(c);if(ids.some(id=>affected.has(id)))for(const id of ids)if(!affected.has(id)){affected.add(id);grew=true;}}}
  const touches=c=>constraintEntityIds(c).some(id=>affected.has(id));
  const fixed=new Map();for(const c of sketch.constraints)if(c.type==='fixed')fixed.set(c.entity,c.geometry||snapshotEntity(getEntity(sketch,c.entity)));

  let iterations=0,last=Infinity;
  for(;iterations<maxIterations;iterations++){
    for(const d of sketch.dimensions)if(affected.has(d.entity))applyDimension(sketch,d);
    for(const c of sketch.constraints)if(c.type!=='fixed'&&touches(c))applyConstraint(sketch,c);
    applyFixed(sketch,fixed);
    const r=residual(sketch);
    if(r<=tolerance)return {sketch,iterations:iterations+1,residual:r,converged:true,affectedIds:[...affected]};
    if(Math.abs(last-r)<tolerance*1e-4&&iterations>6){last=r;break;}
    last=r;
  }
  const r=residual(sketch);
  return {sketch,iterations,residual:r,converged:r<=tolerance,affectedIds:[...affected]};
}
