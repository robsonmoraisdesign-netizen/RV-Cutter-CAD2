import {cloneSketch,line,circle,arc,rectangle,addEntity,addConstraint,addDimension,getEntity,removeEntity,entityEndpoint} from './model.mjs';
import {sketchFromObject,resolveDocument} from './document.mjs';
import {sketchStatus} from './diagnostics.mjs';
// Domain/controller shared by the existing SVG editor; no second editor or overlay app.
export function createSketchController(api){
 let selected=[],points=[],lastSolution=null,cache=null,statusCache=null;
 function native(){const o=api.object();if(!o)return null;const key=[o,o.sketch,o.loops,o.params.size,o.contourVersion];if(cache&&key.every((v,i)=>v===cache.key[i]))return cache.value;cache={key,value:sketchFromObject(o)};return cache.value;}
 function transact(edit,changedIds=null){const o=api.object();if(!o)return false;try{
  const s=cloneSketch(native());edit(s);const r=resolveDocument(s,changedIds);
  const geometryChanged=o.params.size!==r.size||JSON.stringify(o.loops)!==JSON.stringify(r.loops);api.history();o.sketch=r.sketch;o.loops=r.loops;o.params.size=r.size;
  lastSolution=r.solution;selected=selected.filter(id=>s.entities.some(e=>e.id===id));points=points.filter(p=>selected.includes(p.entity));
  api.changed({geometryChanged});return true;
 }catch(e){api.status(e.message);return false;}}
 function create(type,a,b,c){return transact(s=>{
  if(type==='rectangle')selected=rectangle(s,a,b);
  else{let e;
   if(type==='line')e=line(a,b);
   if(type==='circle')e=circle(a,Math.hypot(b[0]-a[0],b[1]-a[1]));
   if(type==='arc'){
    const d=2*(a[0]*(b[1]-c[1])+b[0]*(c[1]-a[1])+c[0]*(a[1]-b[1]));
    if(Math.abs(d)<1e-8)throw Error('Os três pontos do arco não podem estar alinhados.');
    const aa=a[0]**2+a[1]**2,bb=b[0]**2+b[1]**2,cc=c[0]**2+c[1]**2;
    const center=[(aa*(b[1]-c[1])+bb*(c[1]-a[1])+cc*(a[1]-b[1]))/d,(aa*(c[0]-b[0])+bb*(a[0]-c[0])+cc*(b[0]-a[0]))/d];
    e=arc(center,Math.hypot(a[0]-center[0],a[1]-center[1]),Math.atan2(a[1]-center[1],a[0]-center[0]),Math.atan2(c[1]-center[1],c[0]-center[0]),{ccw:d>0});
   }
   if(!e)throw Error('Ferramenta desconhecida.');
   if(e.type==='line'&&Math.hypot(a[0]-b[0],a[1]-b[1])<1e-5)throw Error('Linha sem comprimento.');
   addEntity(s,e);selected=[e.id];
  }points=[];
 });}
 function constrain(type){return transact(s=>{
  if(type==='coincident'){
   if(points.length!==2)throw Error('Selecione dois pontos com Shift para aplicar Coincidente.');
   addConstraint(s,type,{a:points[0],b:points[1]});
  }else{if(!selected.length)throw Error('Selecione uma entidade do Sketch.');selected.forEach(entity=>addConstraint(s,type,{entity}));}
 },selected);}
 function dimension(value){return transact(s=>{
  if(selected.length!==1)throw Error('Selecione uma linha, círculo ou arco para cotar.');
  const e=getEntity(s,selected[0]),type={line:'lineLength',circle:'circleRadius',arc:'arcRadius'}[e.type];
  const old=s.dimensions.find(d=>d.entity===e.id&&d.type===type&&d.driving!==false);
  if(old)old.value=value;else addDimension(s,type,{entity:e.id,value});
 },selected);}
 function movePoint(entity,which,p){return transact(s=>{
  const e=getEntity(s,entity);
  if(s.constraints.some(c=>c.type==='fixed'&&c.entity===entity))throw Error('Entidade fixada: remova Fixar antes de mover.');
  if(e.type==='line')e[which]=[...p];
  else if(which==='center')e.center=[...p];
  else if(which==='radius')e.radius=Math.hypot(p[0]-e.center[0],p[1]-e.center[1]);
  else if(e.type==='arc'){e[which==='start'?'startAngle':'endAngle']=Math.atan2(p[1]-e.center[1],p[0]-e.center[0]);}
 },[entity]);}
 function select(entity,point,extend=false){
  if(!extend){selected=[];points=[];}
  if(!selected.includes(entity))selected.push(entity);
  if(point&&!points.some(p=>p.entity===entity&&p.point===point)){points.push({entity,point});if(points.length>2)points.shift();}
 }
 function remove(){return transact(s=>{if(!selected.length)throw Error('Selecione uma entidade.');selected.forEach(id=>removeEntity(s,id));});}
 function rules(){const s=native();if(!s)return [];return [...s.constraints,...s.dimensions].filter(c=>selected.includes(c.entity)||selected.includes(c.a?.entity)||selected.includes(c.b?.entity));}
 function removeRule(id){return transact(s=>{s.constraints=s.constraints.filter(c=>c.id!==id);s.dimensions=s.dimensions.filter(c=>c.id!==id);});}
 function convert(){const o=api.object();if(!o?.sketch)return;api.history();delete o.sketch;selected=[];points=[];api.changed();api.status('Sketch convertido em contornos. Desfazer restaura as entidades e restrições.');}
 function describe(){const s=native();if(!s)return {label:'Sketch vazio',state:'free',dof:0};if(statusCache?.source===s)return statusCache.value;statusCache={source:s,value:sketchStatus(s,lastSolution)};return statusCache.value;}
 return {native,create,constrain,dimension,movePoint,select,remove,rules,removeRule,convert,describe,reset:()=>{selected=[];points=[];lastSolution=null;},selected:()=>selected,points:()=>points};
}
