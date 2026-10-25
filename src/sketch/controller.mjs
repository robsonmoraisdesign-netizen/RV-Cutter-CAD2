import {cloneSketch,sketchPoint,line,circle,arc,bezier,rectangle,addEntity,addConstraint,addDimension,getEntity,removeEntity,entityEndpoint,dimensionEntityIds} from './model.mjs';
import {sketchFromObject,resolveDocument} from './document.mjs';
import {sketchStatus,entityStates} from './diagnostics.mjs';
import {trimEntity,extendLine,entityBounds} from './operations.mjs';

const radial=e=>['circle','arc'].includes(e.type);
const lineLength=e=>Math.hypot(e.end[0]-e.start[0],e.end[1]-e.start[1]);
const measuredValue=e=>e.type==='line'?lineLength(e):['circle','arc'].includes(e.type)?e.radius:null;
const lineAngle=e=>Math.atan2(e.end[1]-e.start[1],e.end[0]-e.start[0]);
const angleBetween=(a,b)=>Math.abs(Math.atan2(Math.sin(lineAngle(b)-lineAngle(a)),Math.cos(lineAngle(b)-lineAngle(a))))*180/Math.PI;
const refPoint=(s,ref)=>entityEndpoint(getEntity(s,ref.entity),ref.point);
function dimensionMeasure(s,spec){
 if(spec.type==='lineLength')return lineLength(getEntity(s,spec.entity));
 if(spec.type==='circleRadius'||spec.type==='arcRadius')return getEntity(s,spec.entity).radius;
 if(spec.type==='circleDiameter'||spec.type==='arcDiameter')return getEntity(s,spec.entity).radius*2;
 if(['pointDistance','horizontalDistance','verticalDistance'].includes(spec.type)){
  const a=refPoint(s,spec.a),b=refPoint(s,spec.b),dx=b[0]-a[0],dy=b[1]-a[1];
  return spec.type==='pointDistance'?Math.hypot(dx,dy):spec.type==='horizontalDistance'?Math.abs(dx):Math.abs(dy);
 }
 if(spec.type==='angleBetweenLines')return angleBetween(getEntity(s,spec.first),getEntity(s,spec.second));
 return null;
}
function sameRef(a,b){return a?.entity===b?.entity&&a?.point===b?.point;}
function sameDimension(d,spec){
 if(d.type!==spec.type)return false;
 if(spec.entity)return d.entity===spec.entity;
 if(['pointDistance','horizontalDistance','verticalDistance'].includes(spec.type))return (sameRef(d.a,spec.a)&&sameRef(d.b,spec.b))||(sameRef(d.a,spec.b)&&sameRef(d.b,spec.a));
 if(spec.type==='angleBetweenLines')return (d.first===spec.first&&d.second===spec.second)||(d.first===spec.second&&d.second===spec.first);
 return false;
}

// Domain/controller shared by the existing SVG editor; no second editor or overlay app.
export function createSketchController(api){
 let selected=[],points=[],lastSolution=null,cache=null,statusCache=null,statesCache=null;
 function native(){const o=api.object();if(!o)return null;const key=[o,o.sketch,o.loops,o.params.size,o.contourVersion];if(cache&&key.every((v,i)=>v===cache.key[i]))return cache.value;cache={key,value:sketchFromObject(o)};return cache.value;}
 function invalidate(){cache=null;statusCache=null;statesCache=null;}
 function transact(edit,changedIds=null){const o=api.object();if(!o)return false;try{
  const s=cloneSketch(native()),existing=new Set(s.entities.map(e=>e.id));edit(s);
  const affected=changedIds===null?null:[...new Set([...changedIds,...s.entities.filter(e=>!existing.has(e.id)).map(e=>e.id)])];
  const r=resolveDocument(s,affected);
  const sameLoops=o.loops.length===r.loops.length&&o.loops.every((loop,i)=>loop.length===r.loops[i].length&&loop.every((p,j)=>p.every((v,k)=>Math.abs(v-r.loops[i][j][k])<1e-10)));
  const geometryChanged=Math.abs(o.params.size-r.size)>1e-9||!sameLoops;if(!geometryChanged){r.loops=o.loops;r.size=o.params.size;}api.history();o.sketch=r.sketch;o.loops=r.loops;o.params.size=r.size;
  lastSolution=r.solution;selected=selected.filter(id=>s.entities.some(e=>e.id===id));points=points.filter(p=>selected.includes(p.entity));invalidate();
  api.changed({geometryChanged});return true;
 }catch(e){api.status(e.message);return false;}}
 function create(type,a,b,c,options={}){return transact(s=>{
  if(type==='rectangle'){
   selected=rectangle(s,a,b);
   const applyRectangleRelation=(entity,point,rel)=>{
    if(!rel)return;
    if(rel.type==='coincident')addConstraint(s,'coincident',{a:{entity,point},b:rel.ref});
    if(rel.type==='origin')addConstraint(s,'coincidentOrigin',{point:{entity,point}});
    if(rel.type==='axis')addConstraint(s,'pointOnAxis',{point:{entity,point},axis:rel.axis});
   };
   applyRectangleRelation(selected[0],'start',options.startRelation||(options.startRef?{type:'coincident',ref:options.startRef}:null));
   applyRectangleRelation(selected[1],'end',options.endRelation||(options.endRef?{type:'coincident',ref:options.endRef}:null));
  }else{let e;
   if(type==='point')e=sketchPoint(a);
   if(type==='line')e=line(a,b);
   if(type==='circle')e=circle(a,Math.hypot(b[0]-a[0],b[1]-a[1]));
   if(type==='bezier')e=bezier(a);
   if(type==='arc'){
    const d=2*(a[0]*(b[1]-c[1])+b[0]*(c[1]-a[1])+c[0]*(a[1]-b[1]));
    if(Math.abs(d)<1e-8)throw Error('Os três pontos do arco não podem estar alinhados.');
    const aa=a[0]**2+a[1]**2,bb=b[0]**2+b[1]**2,cc=c[0]**2+c[1]**2;
    const center=[(aa*(b[1]-c[1])+bb*(c[1]-a[1])+cc*(a[1]-b[1]))/d,(aa*(c[0]-b[0])+bb*(a[0]-c[0])+cc*(b[0]-a[0]))/d];
    e=arc(center,Math.hypot(a[0]-center[0],a[1]-center[1]),Math.atan2(a[1]-center[1],a[0]-center[0]),Math.atan2(c[1]-center[1],c[0]-center[0]),{ccw:d>0});
   }
   if(!e)throw Error('Ferramenta desconhecida.');
   addEntity(s,e);selected=[e.id];
   if(e.type==='line'){
    if(['horizontal','vertical'].includes(options.autoConstraint))addConstraint(s,options.autoConstraint,{entity:e.id});
    if(options.parallelRef)addConstraint(s,'parallel',{first:options.parallelRef,second:e.id});
    const applyInference=(which,rel)=>{
      if(!rel)return;
      if(rel.type==='coincident')addConstraint(s,'coincident',{a:{entity:e.id,point:which},b:rel.ref});
      if(rel.type==='midpoint')addConstraint(s,'midpoint',{point:{entity:e.id,point:which},line:rel.line});
      if(rel.type==='origin')addConstraint(s,'coincidentOrigin',{point:{entity:e.id,point:which}});
      if(rel.type==='axis')addConstraint(s,'pointOnAxis',{point:{entity:e.id,point:which},axis:rel.axis});
    };
    applyInference('start',options.startRelation|| (options.startRef?{type:'coincident',ref:options.startRef}:null));
    applyInference('end',options.endRelation|| (options.endRef?{type:'coincident',ref:options.endRef}:null));
   }else if(e.type==='point'){
    const rel=options.pointRelation||null;
    if(rel?.type==='coincident')addConstraint(s,'coincident',{a:{entity:e.id,point:'point'},b:rel.ref});
    if(rel?.type==='midpoint')addConstraint(s,'midpoint',{point:{entity:e.id,point:'point'},line:rel.line});
    if(rel?.type==='origin')addConstraint(s,'coincidentOrigin',{point:{entity:e.id,point:'point'}});
    if(rel?.type==='axis')addConstraint(s,'pointOnAxis',{point:{entity:e.id,point:'point'},axis:rel.axis});
   }else if(e.type==='circle'){
    const rel=options.centerRelation||(options.centerRef?{type:'coincident',ref:options.centerRef}:null);
    if(rel?.type==='coincident')addConstraint(s,'coincident',{a:{entity:e.id,point:'center'},b:rel.ref});
    if(rel?.type==='midpoint')addConstraint(s,'midpoint',{point:{entity:e.id,point:'center'},line:rel.line});
    if(rel?.type==='origin')addConstraint(s,'coincidentOrigin',{point:{entity:e.id,point:'center'}});
    if(rel?.type==='axis')addConstraint(s,'pointOnAxis',{point:{entity:e.id,point:'center'},axis:rel.axis});
   }else if(e.type==='arc'){
    for(const [which,rel] of [['start',options.startRelation],['end',options.endRelation]]){
     if(!rel)continue;
     const point={entity:e.id,point:which};
     if(rel.type==='coincident')addConstraint(s,'coincident',{a:point,b:rel.ref});
     if(rel.type==='origin')addConstraint(s,'coincidentOrigin',{point});
     if(rel.type==='axis')addConstraint(s,'pointOnAxis',{point,axis:rel.axis});
    }
   }else if(e.type==='bezier'){
    for(const [i,rel] of (options.controlRelations||[]).entries()){
      if(!rel)continue;
      const point={entity:e.id,point:`control:${i}`};
      if(rel.type==='coincident')addConstraint(s,'coincident',{a:point,b:rel.ref});
      if(rel.type==='midpoint')addConstraint(s,'midpoint',{point,line:rel.line});
      if(rel.type==='origin')addConstraint(s,'coincidentOrigin',{point});
      if(rel.type==='axis')addConstraint(s,'pointOnAxis',{point,axis:rel.axis});
    }
   }
  }points=[];
 },selected);}
 function constrain(type){return transact(s=>{
  if(type==='coincident'){
   if(points.length!==2)throw Error('Selecione dois pontos com Shift para aplicar Coincidente.');
   addConstraint(s,type,{a:points[0],b:points[1]});
  }else if(type==='midpoint'){
   if(points.length!==1)throw Error('Selecione um ponto e uma linha para aplicar Ponto médio.');
   const lineId=selected.find(id=>id!==points[0].entity&&getEntity(s,id).type==='line');
   if(!lineId)throw Error('Selecione também a linha de referência com Shift.');
   addConstraint(s,'midpoint',{point:points[0],line:lineId});
  }else if(['parallel','perpendicular','equal','concentric','collinear','tangent'].includes(type)){
   if(selected.length!==2)throw Error('Selecione exatamente duas entidades para esta restrição.');
   const [a,b]=selected.map(id=>getEntity(s,id));
   if(['parallel','perpendicular','collinear'].includes(type)&&!(a.type==='line'&&b.type==='line'))throw Error('Selecione duas linhas.');
   if(type==='concentric'&&!(radial(a)&&radial(b)))throw Error('Selecione dois círculos/arcos.');
   if(type==='equal'&&!((a.type==='line'&&b.type==='line')||(radial(a)&&radial(b))))throw Error('Igual requer duas linhas ou dois círculos/arcos.');
   if(type==='tangent'&&!((a.type==='line'&&radial(b))||(b.type==='line'&&radial(a))))throw Error('Tangente requer uma linha e um círculo/arco.');
   addConstraint(s,type,{first:a.id,second:b.id});
  }else{
   if(!selected.length)throw Error('Selecione uma entidade do Sketch.');
   selected.forEach(entity=>addConstraint(s,type,{entity}));
  }
 },selected);}
 function dimensionSpec(options={}){
  const s=native();if(!s)return null;
  const explicit=options.type||null,entityIds=options.entities?.length?options.entities:[...selected],pointRefs=options.points?.length?options.points:[...points];
  if(!explicit&&!options.entities&&!options.points){
   const selectedSet=new Set(selected),existing=s.dimensions.find(d=>{const ids=dimensionEntityIds(d);return ids.length&&ids.every(id=>selectedSet.has(id))&&ids.every(id=>selectedSet.has(id));});
   if(existing){
    const base={type:existing.type,...(existing.position?{position:[...existing.position]}:{})};
    if(['pointDistance','horizontalDistance','verticalDistance'].includes(existing.type))return {...base,a:structuredClone(existing.a),b:structuredClone(existing.b)};
    if(existing.type==='angleBetweenLines')return {...base,first:existing.first,second:existing.second};
    return {...base,entity:existing.entity};
   }
  }
  if(['pointDistance','horizontalDistance','verticalDistance'].includes(explicit)){
   if(pointRefs.length!==2)throw Error('Selecione dois pontos para esta cota.');
   return {type:explicit,a:structuredClone(pointRefs[0]),b:structuredClone(pointRefs[1]),...(options.position?{position:[...options.position]}:{})};
  }
  if(explicit==='angleBetweenLines'){
   if(entityIds.length!==2)throw Error('Selecione duas linhas para a cota angular.');
   const [a,b]=entityIds.map(id=>getEntity(s,id));if(a.type!=='line'||b.type!=='line')throw Error('Cota angular requer duas linhas.');
   return {type:'angleBetweenLines',first:a.id,second:b.id,...(options.position?{position:[...options.position]}:{})};
  }
  if(entityIds.length!==1)throw Error('Selecione uma entidade ou duas referências compatíveis para cotar.');
  const e=getEntity(s,entityIds[0]);let type=explicit;
  if(explicit==='diameter')type=e.type==='circle'?'circleDiameter':e.type==='arc'?'arcDiameter':null;
  if(!type)type={line:'lineLength',circle:'circleRadius',arc:'arcRadius'}[e.type];
  if(!['lineLength','circleRadius','arcRadius','circleDiameter','arcDiameter'].includes(type))throw Error('Esta seleção não aceita o tipo de cota escolhido.');
  return {type,entity:e.id,...(options.position?{position:[...options.position]}:{})};
 }
 function dimensionPreview(options={}){
  const s=native(),spec=dimensionSpec(options);if(!s||!spec)return null;return {...structuredClone(spec),value:dimensionMeasure(s,spec),unit:spec.type==='angleBetweenLines'?'°':'mm'};
 }
 function dimension(value,driving=true,options={}){const preview=dimensionPreview(options);return transact(s=>{
  const spec=dimensionSpec(options),measured=dimensionMeasure(s,spec),v=driving?Number(value):measured;
  if(!(v>0&&Number.isFinite(v)))throw Error('Informe uma cota maior que zero.');
  const old=s.dimensions.find(d=>sameDimension(d,spec));
  if(old){old.value=v;old.driving=driving;if(spec.position)old.position=[...spec.position];}
  else addDimension(s,spec.type,{...spec,value:v,driving});
 },dimensionEntityIds(preview));}
 function movePoint(entity,which,p,relation=null){return transact(s=>{
  const e=getEntity(s,entity);
  if(s.constraints.some(c=>c.type==='fixed'&&c.entity===entity))throw Error('Entidade fixada: remova Fixar antes de mover.');
  if(e.type==='point')e.position=[...p];
  else if(e.type==='line'){
   const old=e[which];if(!['start','end'].includes(which))throw Error('Extremidade inválida.');
   if(e.imported){for(const other of s.entities){if(other.id===e.id||!other.imported||other.sourceLoop!==e.sourceLoop||other.type!=='line')continue;for(const end of ['start','end'])if(Math.hypot(other[end][0]-old[0],other[end][1]-old[1])<1e-7){if(s.constraints.some(c=>c.type==='fixed'&&c.entity===other.id))throw Error('Vértice conectado a uma entidade fixada.');other[end]=[...p];}}}
   e[which]=[...p];
  }
  else if(e.type==='bezier'){
   const i=which==='start'?0:which==='end'?e.points.length-1:typeof which==='string'&&which.startsWith('control:')?Number(which.slice(8)):-1;
   if(!Number.isInteger(i)||!e.points[i])throw Error('Ponto de controle Bézier inválido.');e.points[i]=[...p];
  }else if(which==='center')e.center=[...p];
  else if(which==='radius')e.radius=Math.hypot(p[0]-e.center[0],p[1]-e.center[1]);
  else if(e.type==='arc'){e[which==='start'?'startAngle':'endAngle']=Math.atan2(p[1]-e.center[1],p[0]-e.center[0]);}
  if(relation&&which!=='radius'){
   const point={entity,point:e.type==='point'?'point':which};
   const duplicate=s.constraints.some(c=>(c.type==='coincidentOrigin'||c.type==='pointOnAxis')&&c.point?.entity===point.entity&&c.point?.point===point.point);
   if(!duplicate){
    if(relation.type==='origin')addConstraint(s,'coincidentOrigin',{point});
    if(relation.type==='axis')addConstraint(s,'pointOnAxis',{point,axis:relation.axis});
    if(relation.type==='coincident')addConstraint(s,'coincident',{a:point,b:relation.ref});
   }
  }
 },[entity]);}
 function select(entity,point,extend=false){
  if(!extend){selected=[];points=[];}
  if(!selected.includes(entity))selected.push(entity);
  if(point&&!points.some(p=>p.entity===entity&&p.point===point)){points.push({entity,point});if(points.length>2)points.shift();}
  statusCache=null;
 }
 function setSelection(ids,extend=false){
  const valid=[...new Set(ids)].filter(id=>native()?.entities.some(e=>e.id===id));
  if(!extend){selected=[];points=[];}
  for(const id of valid)if(!selected.includes(id))selected.push(id);
  statusCache=null;
 }
 function clearSelection(){selected=[];points=[];statusCache=null;}
 function remove(){return transact(s=>{if(!selected.length)throw Error('Selecione uma entidade.');selected.forEach(id=>removeEntity(s,id));selected=[];points=[];});}
 function rules(){const s=native();if(!s)return [];return [...s.constraints.filter(c=>selected.includes(c.entity)||selected.includes(c.a?.entity)||selected.includes(c.b?.entity)||selected.includes(c.first)||selected.includes(c.second)),...s.dimensions.filter(d=>dimensionEntityIds(d).some(id=>selected.includes(id)))];}
 function removeRule(id){return transact(s=>{s.constraints=s.constraints.filter(c=>c.id!==id);s.dimensions=s.dimensions.filter(c=>c.id!==id);});}
 function toggleConstruction(){return transact(s=>{if(!selected.length)throw Error('Selecione uma entidade.');for(const id of selected){const e=getEntity(s,id);e.construction=!e.construction;}},selected);}
 function trim(entityId,clickPoint){
  let report=null;const ok=transact(s=>{report=trimEntity(s,entityId,clickPoint);selected=selected.filter(id=>s.entities.some(e=>e.id===id));points=[];},[entityId]);
  if(ok&&report)api.status(report.removed?'Entidade removida pelo Trim.':`Trim aplicado${report.split?' · entidade dividida':''}${report.relationsRemoved?' · relações incompatíveis removidas: '+report.relationsRemoved:''}.`);
  return ok;
 }
 function extend(entityId,clickPoint){
  let report=null;const ok=transact(s=>{report=extendLine(s,entityId,clickPoint);selected=[entityId];points=[];},[entityId]);
  if(ok&&report)api.status(`Linha estendida até o próximo limite${report.relationsRemoved?' · relações incompatíveis removidas: '+report.relationsRemoved:''}.`);
  return ok;
 }
 function selectBox(bounds,{crossing=false,extend=false}={}){
  const s=native();if(!s)return [];
  const ids=s.entities.filter(e=>{
   const b=entityBounds(e);if(!b)return false;
   return crossing?!(b.maxX<bounds.minX||b.minX>bounds.maxX||b.maxY<bounds.minY||b.minY>bounds.maxY):(b.minX>=bounds.minX&&b.maxX<=bounds.maxX&&b.minY>=bounds.minY&&b.maxY<=bounds.maxY);
  }).map(e=>e.id);
  setSelection(ids,extend);return ids;
 }
 function convert(){const o=api.object();if(!o?.sketch)return;api.history();delete o.sketch;selected=[];points=[];invalidate();api.changed();api.status('Sketch convertido em contornos. Desfazer restaura as entidades e restrições.');}
 function describe(){const s=native();if(!s)return {label:'Sketch vazio',state:'free',dof:0};if(statusCache?.source===s)return statusCache.value;statusCache={source:s,value:sketchStatus(s,lastSolution)};return statusCache.value;}
 function states(){const s=native();if(!s)return new Map();if(statesCache?.document===s&&statesCache.solution===lastSolution)return statesCache.value;statesCache={document:s,solution:lastSolution,value:entityStates(s,lastSolution)};return statesCache.value;}
 function selectionInfo(){
  const s=native();if(!s||!selected.length)return {count:0,entities:[],primary:null,rules:[],points:structuredClone(points)};
  const entities=selected.map(id=>getEntity(s,id)),primary=entities.length===1?entities[0]:null,selectedSet=new Set(selected);
  const dim=s.dimensions.find(d=>{const ids=dimensionEntityIds(d);return ids.length&&ids.every(id=>selectedSet.has(id));})||null;
  const value=dim?dimensionMeasure(s,dim):primary?measuredValue(primary):null;
  return {count:entities.length,entities:structuredClone(entities),primary:primary?structuredClone(primary):null,value,dimension:dim?structuredClone(dim):null,points:structuredClone(points),rules:structuredClone(rules())};
 }
 return {native,create,constrain,dimension,dimensionSpec,dimensionPreview,movePoint,select,setSelection,selectBox,clearSelection,remove,rules,removeRule,toggleConstruction,trim,extend,convert,describe,states,selectionInfo,reset:()=>{selected=[];points=[];lastSolution=null;invalidate();},selected:()=>selected,points:()=>points};
}


