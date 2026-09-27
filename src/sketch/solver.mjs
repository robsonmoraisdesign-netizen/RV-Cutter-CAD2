import {cloneSketch,getEntity,validateSketch,entityEndpoint} from './model.mjs';

const EPS=1e-7;
const dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);

function setPoint(entity,which,p){
  if(entity.type==='line'&&(which==='start'||which==='end')){entity[which]=[p[0],p[1]];return;}
  if(['circle','arc'].includes(entity.type)&&which==='center'){entity.center=[p[0],p[1]];return;}
  if(entity.type==='arc'&&(which==='start'||which==='end')){
    const dx=p[0]-entity.center[0],dy=p[1]-entity.center[1];
    const r=Math.hypot(dx,dy);
    if(r>EPS)entity.radius=r;
    entity[which==='start'?'startAngle':'endAngle']=Math.atan2(dy,dx);
    return;
  }
  throw Error(`Não é possível escrever em ${entity.type}.${which}`);
}

function snapshotEntity(e){return structuredClone(e);}
function restoreEntity(target,saved){for(const k of Object.keys(target))delete target[k];Object.assign(target,structuredClone(saved));}

function applyFixed(sketch,fixedSnapshots){
  for(const [entityId,saved] of fixedSnapshots){
    restoreEntity(getEntity(sketch,entityId),saved);
  }
}

function applyConstraint(sketch,c){
  if(c.type==='horizontal'){
    const e=getEntity(sketch,c.entity);
    if(e.type!=='line')throw Error('Horizontal requer uma linha.');
    const y=(e.start[1]+e.end[1])/2;e.start[1]=y;e.end[1]=y;return;
  }
  if(c.type==='vertical'){
    const e=getEntity(sketch,c.entity);
    if(e.type!=='line')throw Error('Vertical requer uma linha.');
    const x=(e.start[0]+e.end[0])/2;e.start[0]=x;e.end[0]=x;return;
  }
  if(c.type==='coincident'){
    const a=getEntity(sketch,c.a.entity),b=getEntity(sketch,c.b.entity);
    const pa=entityEndpoint(a,c.a.point),pb=entityEndpoint(b,c.b.point);
    const mid=[(pa[0]+pb[0])/2,(pa[1]+pb[1])/2];
    setPoint(a,c.a.point,mid);setPoint(b,c.b.point,mid);return;
  }
  if(c.type==='fixed')return;
  throw Error(`Restrição não suportada na Fase 1: ${c.type}`);
}

function applyDimension(sketch,d){
  if(d.driving===false)return;
  if(d.type==='lineLength'){
    const e=getEntity(sketch,d.entity);
    if(e.type!=='line')throw Error('Cota lineLength requer linha.');
    const dx=e.end[0]-e.start[0],dy=e.end[1]-e.start[1],len=Math.hypot(dx,dy);
    const ux=len>EPS?dx/len:1,uy=len>EPS?dy/len:0;
    e.end=[e.start[0]+ux*d.value,e.start[1]+uy*d.value];return;
  }
  if(d.type==='circleRadius'){
    const e=getEntity(sketch,d.entity);
    if(e.type!=='circle')throw Error('Cota circleRadius requer círculo.');
    e.radius=d.value;return;
  }
  if(d.type==='arcRadius'){
    const e=getEntity(sketch,d.entity);
    if(e.type!=='arc')throw Error('Cota arcRadius requer arco.');
    e.radius=d.value;return;
  }
  throw Error(`Cota não suportada na Fase 1: ${d.type}`);
}

function residual(sketch){
  let r=0;
  for(const c of sketch.constraints){
    if(c.type==='horizontal'){const e=getEntity(sketch,c.entity);r=Math.max(r,Math.abs(e.start[1]-e.end[1]));}
    else if(c.type==='vertical'){const e=getEntity(sketch,c.entity);r=Math.max(r,Math.abs(e.start[0]-e.end[0]));}
    else if(c.type==='coincident'){const a=getEntity(sketch,c.a.entity),b=getEntity(sketch,c.b.entity);r=Math.max(r,dist(entityEndpoint(a,c.a.point),entityEndpoint(b,c.b.point)));}
  }
  for(const d of sketch.dimensions){
    if(d.driving===false)continue;
    const e=getEntity(sketch,d.entity);
    if(d.type==='lineLength')r=Math.max(r,Math.abs(dist(e.start,e.end)-d.value));
    else if(d.type==='circleRadius'||d.type==='arcRadius')r=Math.max(r,Math.abs(e.radius-d.value));
  }
  return r;
}

export function solveSketch(input,{maxIterations=240,tolerance=1e-6,changedIds=null}={}){
  validateSketch(input);
  if (!Number.isInteger(maxIterations)||maxIterations<1||maxIterations>1000||!Number.isFinite(tolerance)||tolerance<=0)throw Error('Opções do solver inválidas.');
  const sketch=cloneSketch(input);
  const affected=new Set(changedIds||sketch.entities.map(e=>e.id));
  let grew=true;while(grew){grew=false;for(const c of sketch.constraints)if(c.type==='coincident'&&(affected.has(c.a.entity)||affected.has(c.b.entity))){for(const ref of [c.a,c.b])if(!affected.has(ref.entity)){affected.add(ref.entity);grew=true;}}}
  const touches=c=>affected.has(c.entity)||affected.has(c.a?.entity)||affected.has(c.b?.entity);
  const fixed=new Map();
  for(const c of sketch.constraints)if(c.type==='fixed')fixed.set(c.entity,c.geometry||snapshotEntity(getEntity(sketch,c.entity)));

  let iterations=0,last=Infinity;
  for(;iterations<maxIterations;iterations++){
    for(const d of sketch.dimensions)if(touches(d))applyDimension(sketch,d);
    for(const c of sketch.constraints)if(c.type!=='fixed'&&touches(c))applyConstraint(sketch,c);
    applyFixed(sketch,fixed);
    const r=residual(sketch);
    if(r<=tolerance)return {sketch,iterations:iterations+1,residual:r,converged:true,affectedIds:[...affected]};
    if(Math.abs(last-r)<tolerance*1e-3&&iterations>3){last=r;break;}
    last=r;
  }
  const r=residual(sketch);
  return {sketch,iterations,residual:r,converged:r<=tolerance,affectedIds:[...affected]};
}
