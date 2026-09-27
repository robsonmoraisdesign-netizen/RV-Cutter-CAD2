import {cloneSketch,line,circle,arc,bezier,rectangle,addEntity,addConstraint,addDimension,getEntity,removeEntity} from './model.mjs';
import {sketchFromObject,resolveDocument} from './document.mjs';
import {sketchStatus,entityStates} from './diagnostics.mjs';
import {trimEntity,extendLine,entityBounds} from './operations.mjs';

const radial=e=>['circle','arc'].includes(e.type);
const lineLength=e=>Math.hypot(e.end[0]-e.start[0],e.end[1]-e.start[1]);
const measuredValue=e=>e.type==='line'?lineLength(e):['circle','arc'].includes(e.type)?e.radius:null;

// Domain/controller shared by the existing SVG editor; no second editor or overlay app.
export function createSketchController(api){
 let selected=[],points=[],lastSolution=null,cache=null,statusCache=null;
 function native(){const o=api.object();if(!o)return null;const key=[o,o.sketch,o.loops,o.params.size,o.contourVersion];if(cache&&key.every((v,i)=>v===cache.key[i]))return cache.value;cache={key,value:sketchFromObject(o)};return cache.value;}
 function invalidate(){cache=null;statusCache=null;}
 function transact(edit,changedIds=null){const o=api.object();if(!o)return false;try{
  const s=cloneSketch(native());edit(s);const r=resolveDocument(s,changedIds);
  const geometryChanged=o.params.size!==r.size||JSON.stringify(o.loops)!==JSON.stringify(r.loops);api.history();o.sketch=r.sketch;o.loops=r.loops;o.params.size=r.size;
  lastSolution=r.solution;selected=selected.filter(id=>s.entities.some(e=>e.id===id));points=points.filter(p=>selected.includes(p.entity));invalidate();
  api.changed({geometryChanged});return true;
 }catch(e){api.status(e.message);return false;}}
 function create(type,a,b,c,options={}){return transact(s=>{
  if(type==='rectangle'){
   selected=rectangle(s,a,b);
   if(options.startRef)addConstraint(s,'coincident',{a:{entity:selected[0],point:'start'},b:options.startRef});
   if(options.endRef)addConstraint(s,'coincident',{a:{entity:selected[1],point:'end'},b:options.endRef});
  }else{let e;
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
    };
    applyInference('start',options.startRelation|| (options.startRef?{type:'coincident',ref:options.startRef}:null));
    applyInference('end',options.endRelation|| (options.endRef?{type:'coincident',ref:options.endRef}:null));
   }else if(e.type==='circle'){
    const rel=options.centerRelation||(options.centerRef?{type:'coincident',ref:options.centerRef}:null);
    if(rel?.type==='coincident')addConstraint(s,'coincident',{a:{entity:e.id,point:'center'},b:rel.ref});
    if(rel?.type==='midpoint')addConstraint(s,'midpoint',{point:{entity:e.id,point:'center'},line:rel.line});
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
 function dimension(value,driving=true){return transact(s=>{
  if(selected.length!==1)throw Error('Selecione uma linha, círculo ou arco para cotar.');
  const e=getEntity(s,selected[0]),type={line:'lineLength',circle:'circleRadius',arc:'arcRadius'}[e.type];
  if(!type)throw Error('A cota direta desta fase suporta linha, círculo e arco.');
  const v=driving?Number(value):measuredValue(e);
  if(!(v>0&&Number.isFinite(v)))throw Error('Informe uma cota maior que zero.');
  const old=s.dimensions.find(d=>d.entity===e.id&&d.type===type);
  if(old){old.value=v;old.driving=driving;}else addDimension(s,type,{entity:e.id,value:v,driving});
 },selected);}
 function movePoint(entity,which,p){return transact(s=>{
  const e=getEntity(s,entity);
  if(s.constraints.some(c=>c.type==='fixed'&&c.entity===entity))throw Error('Entidade fixada: remova Fixar antes de mover.');
  if(e.type==='line')e[which]=[...p];
  else if(e.type==='bezier'){
   const i=which==='start'?0:which==='end'?e.points.length-1:typeof which==='string'&&which.startsWith('control:')?Number(which.slice(8)):-1;
   if(!Number.isInteger(i)||!e.points[i])throw Error('Ponto de controle Bézier inválido.');e.points[i]=[...p];
  }else if(which==='center')e.center=[...p];
  else if(which==='radius')e.radius=Math.hypot(p[0]-e.center[0],p[1]-e.center[1]);
  else if(e.type==='arc'){e[which==='start'?'startAngle':'endAngle']=Math.atan2(p[1]-e.center[1],p[0]-e.center[0]);}
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
 function rules(){const s=native();if(!s)return [];return [...s.constraints,...s.dimensions].filter(c=>selected.includes(c.entity)||selected.includes(c.a?.entity)||selected.includes(c.b?.entity)||selected.includes(c.first)||selected.includes(c.second));}
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
 function states(){const s=native();return s?entityStates(s,lastSolution):new Map();}
 function selectionInfo(){
  const s=native();if(!s||!selected.length)return {count:0,entities:[],primary:null,rules:[]};
  const entities=selected.map(id=>getEntity(s,id)),primary=entities.length===1?entities[0]:null;
  const dim=primary?s.dimensions.find(d=>d.entity===primary.id):null;
  return {count:entities.length,entities:structuredClone(entities),primary:primary?structuredClone(primary):null,value:primary?measuredValue(primary):null,dimension:dim?structuredClone(dim):null,rules:structuredClone(rules())};
 }
 return {native,create,constrain,dimension,movePoint,select,setSelection,selectBox,clearSelection,remove,rules,removeRule,toggleConstruction,trim,extend,convert,describe,states,selectionInfo,reset:()=>{selected=[];points=[];lastSolution=null;invalidate();},selected:()=>selected,points:()=>points};
}
