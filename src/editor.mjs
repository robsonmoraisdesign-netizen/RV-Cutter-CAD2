import {createSketchController} from './sketch/controller.mjs';
import {simplify} from './geometry.mjs';

export function createEditor(svg,api){
 let view=[-.65,-.65,1.3,1.3],tool='select',selected=-1,node=-1,region=null,drag=null,hoveredEntity=null,inference=null,bezierClicks=[],bezierHover=null;
 const NS='http://www.w3.org/2000/svg';
 const el=(tag,attrs)=>{const o=document.createElementNS(NS,tag);Object.entries(attrs).forEach(([k,v])=>v!==undefined&&v!==null&&o.setAttribute(k,v));return o;};
 const sketch=createSketchController(api);let arcClicks=[];
 const $=id=>document.getElementById(id);
 const point=e=>{const p=new DOMPoint(e.clientX,e.clientY).matrixTransform(svg.getScreenCTM().inverse());return[p.x,-p.y]};
 const path=points=>'M'+points.map(([x,y])=>`${x},${-y}`).join('L');
 const nativePoint=q=>{const o=api.object(),n=sketch.native();return [q[0]*o.params.size+n.profileCenter[0],q[1]*o.params.size+n.profileCenter[1]];};
 const localPoint=(p,n)=>{const size=api.object().params.size;return [(p[0]-n.profileCenter[0])/size,(p[1]-n.profileCenter[1])/size];};
 const bezierPoint=(points,t)=>{let work=points.map(p=>[...p]);for(let level=work.length-1;level>0;level--)for(let i=0;i<level;i++)work[i]=[work[i][0]*(1-t)+work[i+1][0]*t,work[i][1]*(1-t)+work[i+1][1]*t];return work[0];};
 const entityMid=e=>e.type==='line'?[(e.start[0]+e.end[0])/2,(e.start[1]+e.end[1])/2]:e.type==='bezier'?bezierPoint(e.points,.5):[...e.center];
 const entityName=e=>({line:'Linha',circle:'Círculo',arc:'Arco',bezier:'Bézier'}[e?.type]||'Entidade');
 const constraintLabel=t=>({horizontal:'H',vertical:'V',coincident:'●',midpoint:'◇',fixed:'F',parallel:'∥',perpendicular:'⊥',equal:'=',concentric:'◎',collinear:'—',tangent:'T'}[t]||'?');
 const ruleName=t=>({horizontal:'Horizontal',vertical:'Vertical',coincident:'Coincidente',midpoint:'Ponto médio',fixed:'Fixar',parallel:'Paralela',perpendicular:'Perpendicular',equal:'Igual',concentric:'Concêntrica',collinear:'Colinear',tangent:'Tangente',lineLength:'Comprimento',circleRadius:'Raio',arcRadius:'Raio do arco'}[t]||t);
 const normAngle=a=>Math.atan2(Math.sin(a),Math.cos(a));
 const lineAngle=e=>Math.atan2(e.end[1]-e.start[1],e.end[0]-e.start[0]);
 const lineMid=e=>[(e.start[0]+e.end[0])/2,(e.start[1]+e.end[1])/2];
 const pointSegmentDistance=(p,e)=>{const dx=e.end[0]-e.start[0],dy=e.end[1]-e.start[1],q=dx*dx+dy*dy||1,t=Math.max(0,Math.min(1,((p[0]-e.start[0])*dx+(p[1]-e.start[1])*dy)/q)),x=e.start[0]+dx*t,y=e.start[1]+dy*t;return Math.hypot(p[0]-x,p[1]-y);};

 function contourMode(){if(api.object()?.sketch?.entities.length){api.status('Para editar contornos derivados, use Converter em contornos. O Sketch paramétrico permanece editável.');return false;}return true;}
 function snapLine(start,end){
  const dx=end[0]-start[0],dy=end[1]-start[1],m=Math.max(Math.abs(dx),Math.abs(dy),1e-9),threshold=.075;
  if(Math.abs(dy)/m<threshold)return {end:[end[0],start[1]],inference:'horizontal',icon:'H'};
  if(Math.abs(dx)/m<threshold)return {end:[start[0],end[1]],inference:'vertical',icon:'V'};
  return {end,inference:null,icon:null};
 }
 function snapNative(p,n){
  const candidates=[];
  for(const e of n?.entities||[]){
   if(e.type==='line'){
    candidates.push(
      {point:e.start,relation:{type:'coincident',ref:{entity:e.id,point:'start'}},referenceId:e.id,icon:'●'},
      {point:e.end,relation:{type:'coincident',ref:{entity:e.id,point:'end'}},referenceId:e.id,icon:'●'},
      {point:lineMid(e),relation:{type:'midpoint',line:e.id},referenceId:e.id,icon:'◇'}
    );
   }else if(e.type==='circle')candidates.push({point:e.center,relation:{type:'coincident',ref:{entity:e.id,point:'center'}},referenceId:e.id,icon:'●'});
   else if(e.type==='bezier'){
    e.points.forEach((p,i)=>candidates.push({point:p,relation:{type:'coincident',ref:{entity:e.id,point:`control:${i}`}},referenceId:e.id,icon:'●'}));
   }else if(e.type==='arc'){
    candidates.push({point:e.center,relation:{type:'coincident',ref:{entity:e.id,point:'center'}},referenceId:e.id,icon:'●'});
    for(const key of ['start','end']){const a=e[key+'Angle'];candidates.push({point:[e.center[0]+Math.cos(a)*e.radius,e.center[1]+Math.sin(a)*e.radius],relation:{type:'coincident',ref:{entity:e.id,point:key}},referenceId:e.id,icon:'●'});}
   }
  }
  const threshold=api.object().params.size*Math.max(view[2],view[3])*.018;
  let best=null,bestD=threshold;
  for(const candidate of candidates){const d=Math.hypot(candidate.point[0]-p[0],candidate.point[1]-p[1]);if(d<bestD){bestD=d;best=candidate;}}
  return best?{point:[...best.point],relation:best.relation,referenceId:best.referenceId,icon:best.icon,distance:bestD}:{point:p,relation:null,referenceId:null,icon:null,distance:null};
 }
 function parallelInference(start,end,doc){
  const dx=end[0]-start[0],dy=end[1]-start[1],len=Math.hypot(dx,dy);if(len<1e-6)return null;
  const angle=Math.atan2(dy,dx),near=api.object().params.size*Math.max(view[2],view[3])*.12;
  let best=null;
  for(const e of doc?.entities||[]){
   if(e.type!=='line')continue;
   const rawDiff=Math.abs(normAngle(angle-lineAngle(e))),diff=Math.min(rawDiff,Math.abs(Math.PI-rawDiff));
   const proximity=Math.min(pointSegmentDistance(end,e),Math.hypot(end[0]-lineMid(e)[0],end[1]-lineMid(e)[1]));
   if(diff>.065||proximity>near)continue;
   const score=diff+proximity/Math.max(near,1e-6)*.02;
   if(!best||score<best.score)best={entity:e,score,diff};
  }
  if(!best)return null;
  let a=lineAngle(best.entity);if(Math.abs(normAngle(angle-a))>Math.PI/2)a+=Math.PI;
  return {end:[start[0]+Math.cos(a)*len,start[1]+Math.sin(a)*len],parallelRef:best.entity.id,referenceId:best.entity.id,inference:'parallel',icon:'∥'};
 }
 function inferLine(start,raw,doc,{suppress=false}={}){
  if(suppress)return {end:raw,startRelation:null,endRelation:null,autoConstraint:null,parallelRef:null,referenceId:null,icon:null};
  const snapped=snapNative(raw,doc);let end=snapped.point;
  if(snapped.relation)return {end,startRelation:null,endRelation:snapped.relation,autoConstraint:null,parallelRef:null,referenceId:snapped.referenceId,icon:snapped.icon,inference:snapped.relation.type};
  const axial=snapLine(start,end);
  if(axial.inference)return {end:axial.end,startRelation:null,endRelation:null,autoConstraint:axial.inference,parallelRef:null,referenceId:null,icon:axial.icon,inference:axial.inference};
  const parallel=parallelInference(start,end,doc);
  if(parallel)return {...parallel,startRelation:null,endRelation:null,autoConstraint:null};
  return {end,startRelation:null,endRelation:null,autoConstraint:null,parallelRef:null,referenceId:null,icon:null,inference:null};
 }
 function updatePrimitiveDraft(q,{suppress=false}={}){
  if(drag?.kind!=='primitive')return;
  const doc=sketch.native(),raw=nativePoint(q);
  if(tool==='sketch-line'){
   const inf=inferLine(drag.start,raw,doc,{suppress});drag.end=inf.end;drag.endRelation=inf.endRelation;drag.parallelRef=inf.parallelRef;drag.referenceId=inf.referenceId;drag.inference=inf.inference;drag.icon=inf.icon;
   inference=inf.inference?{...inf,point:inf.end}:null;
  }else if(tool==='circle'){
   drag.end=raw;drag.endRelation=null;inference=null;
  }else{
   const snap=suppress?{point:raw,relation:null,referenceId:null,icon:null}:snapNative(raw,doc);drag.end=snap.point;drag.endRelation=snap.relation;drag.referenceId=snap.referenceId;drag.inference=snap.relation?.type||null;drag.icon=snap.icon;inference=snap.relation?{...snap,point:snap.point,type:snap.relation.type}:null;
  }
 }
 function beginPrimitive(q,{suppress=false}={}){
  const doc=sketch.native(),raw=nativePoint(q),snap=suppress?{point:raw,relation:null,referenceId:null,icon:null}:snapNative(raw,doc),start=snap.point;
  drag={kind:'primitive',start,end:[...start],startRelation:snap.relation,endRelation:null,parallelRef:null,referenceId:snap.referenceId,inference:snap.relation?.type||null,icon:snap.icon,suppress};
  inference=snap.relation?{...snap,point:start,type:snap.relation.type}:null;
 }
 function commitPrimitive(q,{suppress=false}={}){
  if(drag?.kind!=='primitive')return false;
  updatePrimitiveDraft(q,{suppress});const d=drag;
  const ok=sketch.create(tool==='sketch-line'?'line':tool,d.start,d.end,null,{autoConstraint:d.inference==='horizontal'||d.inference==='vertical'?d.inference:null,startRelation:d.startRelation,endRelation:d.endRelation,centerRelation:d.startRelation,parallelRef:d.parallelRef});
  if(!ok){drag=null;inference=null;render();return false;}
  if(tool==='sketch-line'){
   const createdId=sketch.selected()[0],doc=sketch.native(),created=doc.entities.find(e=>e.id===createdId),start=created?.end?[...created.end]:[...d.end];
   drag={kind:'primitive',start,end:[...start],startRelation:createdId?{type:'coincident',ref:{entity:createdId,point:'end'}}:null,endRelation:null,parallelRef:null,referenceId:createdId,inference:'coincident',icon:'●',suppress:false};
   inference=null;api.status('Linha criada · clique para continuar a cadeia ou Esc para sair.');
  }else{drag=null;inference=null;}
  render();return true;
 }
 function addText(text,p,attrs={}){
  const t=el('text',{x:p[0],y:-p[1],class:'sketch-svg-text',...attrs});t.textContent=text;svg.appendChild(t);return t;
 }
 function renderAxes(){
  if(view[0]<=0&&view[0]+view[2]>=0)svg.appendChild(el('line',{x1:0,y1:view[1],x2:0,y2:view[1]+view[3],class:'sketch-axis sketch-axis-y','vector-effect':'non-scaling-stroke'}));
  if(view[1]<=0&&view[1]+view[3]>=0)svg.appendChild(el('line',{x1:view[0],y1:0,x2:view[0]+view[2],y2:0,class:'sketch-axis sketch-axis-x','vector-effect':'non-scaling-stroke'}));
  svg.appendChild(el('circle',{cx:0,cy:0,r:view[2]*.0035,class:'sketch-origin','vector-effect':'non-scaling-stroke'}));
 }
 function renderDimensions(n,o){
  for(const d of n.dimensions||[]){
   const e=n.entities.find(x=>x.id===d.entity);if(!e)continue;
   let p;
   if(e.type==='line'){
    const a=localPoint(e.start,n),b=localPoint(e.end,n),mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2,dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy)||1;
    p=[mx-dy/len*view[3]*.025,my+dx/len*view[3]*.025];
   }else{
    const cc=localPoint(e.center,n);p=[cc[0]+e.radius/o.params.size+view[2]*.018,cc[1]+view[3]*.012];
   }
   const text=(d.driving===false?'[':'')+Number(d.value).toFixed(2)+' mm'+(d.driving===false?']':'');
   addText(text,p,{class:'sketch-dimension'+(d.driving===false?' driven':''),style:`font-size:${view[2]*.020}px`,'data-dimension-entity':e.id,'data-entity':e.id});
  }
 }
 function renderConstraints(n){
  if($('showSketchConstraints')&&!$('showSketchConstraints').checked)return;
  for(const c of n.constraints||[]){
   let entities=[];
   if(c.entity)entities=[n.entities.find(e=>e.id===c.entity)].filter(Boolean);
   else if(c.type==='coincident')entities=[n.entities.find(e=>e.id===c.a.entity),n.entities.find(e=>e.id===c.b.entity)].filter(Boolean);
   else if(c.type==='midpoint')entities=[n.entities.find(e=>e.id===c.point.entity),n.entities.find(e=>e.id===c.line)].filter(Boolean);
   else entities=[n.entities.find(e=>e.id===c.first),n.entities.find(e=>e.id===c.second)].filter(Boolean);
   if(!entities.length)continue;
   const centers=entities.map(entityMid),p=[centers.reduce((s,q)=>s+q[0],0)/centers.length,centers.reduce((s,q)=>s+q[1],0)/centers.length],q=localPoint(p,n);
   addText(constraintLabel(c.type),[q[0]+view[2]*.008,q[1]+view[3]*.008],{class:'sketch-constraint-badge',style:`font-size:${view[2]*.016}px`});
  }
 }
 function renderMidpointMarker(e,n){
  const m=localPoint(lineMid(e),n),s=view[2]*.0065,pts=[[m[0],m[1]+s],[m[0]+s,m[1]],[m[0],m[1]-s],[m[0]-s,m[1]]];
  svg.appendChild(el('path',{d:path(pts)+'Z',class:'sketch-midpoint-marker','vector-effect':'non-scaling-stroke','pointer-events':'none'}));
 }
 function appendEntityShape(e,n,o,state,chosen){
  const classes=['sketch-entity-visible',state==='defined'?'entity-defined':state==='conflict'?'entity-conflict':'entity-under'];
  if(chosen)classes.push('entity-selected');if(e.construction)classes.push('entity-construction');if(inference?.referenceId===e.id)classes.push('sketch-reference-awake');
  const common={class:classes.join(' '),'vector-effect':'non-scaling-stroke'};
  if(e.type==='line'){
   const d=path([localPoint(e.start,n),localPoint(e.end,n)]);
   svg.appendChild(el('path',{d,class:'sketch-entity-hit','vector-effect':'non-scaling-stroke','data-entity':e.id}));
   svg.appendChild(el('path',{...common,d}));
   if(chosen||hoveredEntity===e.id||inference?.referenceId===e.id)renderMidpointMarker(e,n);
  }else if(e.type==='circle'){
   const cc=localPoint(e.center,n),r=e.radius/o.params.size;
   svg.appendChild(el('circle',{cx:cc[0],cy:-cc[1],r,class:'sketch-entity-hit','vector-effect':'non-scaling-stroke','data-entity':e.id}));
   svg.appendChild(el('circle',{...common,cx:cc[0],cy:-cc[1],r}));
  }else if(e.type==='bezier'){
   const pts=Array.from({length:65},(_,i)=>localPoint(bezierPoint(e.points,i/64),n)),d=path(pts);
   svg.appendChild(el('path',{d,class:'sketch-entity-hit','vector-effect':'non-scaling-stroke','data-entity':e.id}));
   svg.appendChild(el('path',{...common,d}));
   if(chosen){
    const controls=e.points.map(p=>localPoint(p,n));
    svg.appendChild(el('path',{d:path(controls),class:'sketch-bezier-polygon','vector-effect':'non-scaling-stroke','pointer-events':'none'}));
   }
  }else{
   let sweep=((e.endAngle-e.startAngle)%(2*Math.PI)+2*Math.PI)%(2*Math.PI);sweep=e.ccw?(sweep||2*Math.PI):(sweep?sweep-2*Math.PI:-2*Math.PI);
   const pts=Array.from({length:65},(_,i)=>localPoint([e.center[0]+Math.cos(e.startAngle+sweep*i/64)*e.radius,e.center[1]+Math.sin(e.startAngle+sweep*i/64)*e.radius],n)),d=path(pts);
   svg.appendChild(el('path',{d,class:'sketch-entity-hit','vector-effect':'non-scaling-stroke','data-entity':e.id}));
   svg.appendChild(el('path',{...common,d}));
  }
 }
 function renderBezierDraft(n){
  if(tool!=='bezier'||(!bezierClicks.length&&!bezierHover))return;
  const points=bezierClicks.map(x=>x.point);if(bezierHover)points.push(bezierHover.point);
  if(!points.length)return;
  const local=points.map(p=>localPoint(p,n));
  if(local.length>=2){
   svg.appendChild(el('path',{d:path(local),class:'sketch-bezier-polygon draft','vector-effect':'non-scaling-stroke','pointer-events':'none'}));
   const curve=Array.from({length:65},(_,i)=>localPoint(bezierPoint(points,i/64),n));
   svg.appendChild(el('path',{d:path(curve),class:'sketch-preview-shape bezier-preview','vector-effect':'non-scaling-stroke','pointer-events':'none'}));
  }
  for(const p of local)svg.appendChild(el('circle',{cx:p[0],cy:-p[1],r:view[2]*.006,class:'sketch-bezier-control','vector-effect':'non-scaling-stroke','pointer-events':'none'}));
 }
 function renderBox(){
  if(drag?.kind!=='box-select')return;
  const a=drag.start,b=drag.end||a,minX=Math.min(a[0],b[0]),maxX=Math.max(a[0],b[0]),minY=Math.min(a[1],b[1]),maxY=Math.max(a[1],b[1]),crossing=b[0]<a[0];
  svg.appendChild(el('rect',{x:minX,y:-maxY,width:maxX-minX,height:maxY-minY,class:'sketch-box-select'+(crossing?' crossing':''),'vector-effect':'non-scaling-stroke'}));
 }
 function renderInference(n){
  if(!inference?.icon||!inference.point)return;
  const p=localPoint(inference.point,n);
  addText(inference.icon,[p[0]+view[2]*.018,p[1]+view[3]*.018],{class:'sketch-inference-icon',style:`font-size:${view[2]*.016}px`});
 }
 function updateInspector(n){
  const info=sketch.selectionInfo(),status=sketch.describe();
  const chip=$('sketchStatusChip'),statusText=$('sketchStatus');
  if(statusText)statusText.textContent=status.label+(status.dof!==null&&status.state!=='defined'?' · '+status.dof+' GL':'');
  if(chip){chip.dataset.state=status.state;chip.title=status.dof===null?'Diagnóstico aproximado':`${status.dof} graus de liberdade restantes`;}
  const title=$('sketchSelectionTitle'),meta=$('sketchSelectionMeta'),dim=$('sketchDimension'),driving=$('sketchDriving'),apply=$('applySketchDimension');
  if(title)title.textContent=info.count===0?'Nada selecionado':info.count===1?entityName(info.primary):`${info.count} entidades`;
  if(meta){
   if(info.count===0)meta.textContent='Selecione a geometria diretamente no canvas. As linhas possuem uma área de captura ampliada.';
   else if(info.count===1){
    const e=info.primary;
    meta.textContent=e.type==='line'?`Comprimento atual: ${info.value.toFixed(2)} mm`:e.type==='circle'?`Raio atual: ${info.value.toFixed(2)} mm`:e.type==='arc'?`Raio do arco: ${info.value.toFixed(2)} mm`:`Bézier de grau ${Math.max(1,e.points.length-1)} · ${e.points.length} pontos de controle`;
   }else meta.textContent='Seleção múltipla pronta para restrições entre entidades.';
  }
  if(dim){const canDimension=info.count===1&&Number.isFinite(info.value);dim.disabled=!canDimension;if(canDimension&&!dim.matches(':focus'))dim.value=(info.dimension?.value??info.value).toFixed(2);}
  if(driving){driving.disabled=info.count!==1||!Number.isFinite(info.value);driving.checked=info.dimension?.driving!==false;}
  if(apply)apply.disabled=info.count!==1||!Number.isFinite(info.value);
  const rules=$('sketchRules');if(rules){const previous=rules.value;rules.replaceChildren();for(const c of sketch.rules()){const option=document.createElement('option');option.value=c.id;option.textContent=ruleName(c.type)+(c.value!==undefined?' · '+c.value.toFixed(2)+' mm':'');rules.appendChild(option);}if([...rules.options].some(o=>o.value===previous))rules.value=previous;}
  const construction=$('toggleConstruction');if(construction){construction.disabled=!info.count;construction.classList.toggle('active',!!info.entities.length&&info.entities.every(e=>e.construction));}
  const del=$('deleteSketchEntity');if(del)del.disabled=!info.count;
 }
 function render(){
  if(svg.hasAttribute('hidden')){svg.replaceChildren();return;}
  const o=api.object();svg.replaceChildren();svg.setAttribute('viewBox',view.join(' '));if(!o)return;
  renderAxes();
  const n=sketch.native(),nativeCount=n?.entities?.length||0,stateMap=sketch.states();
  if(o.result?.bladeProfile?.length&&!nativeCount)svg.appendChild(el('path',{class:'blade-preview',d:o.result.bladeProfile.map(p=>path(p.map(([x,y])=>[x/o.result.params.size*(o.result.params.mirror?-1:1),y/o.result.params.size]))+'Z').join(' '),fill:'#d99c32','fill-opacity':.42,'fill-rule':'evenodd','pointer-events':'none'}));
  if(o.loops.length)svg.appendChild(el('path',{d:o.loops.map(p=>path(p)+'Z').join(' '),class:nativeCount?'sketch-derived-profile':'legacy-profile',fill:'#476a90','fill-rule':'evenodd','fill-opacity':nativeCount?.045:.42,'pointer-events':'none'}));
  if(!nativeCount)o.loops.forEach((p,i)=>svg.appendChild(el('path',{d:path(p)+'Z',fill:'none',stroke:i===selected?'#e5852d':i===0?'#286bbb':'#597a97','stroke-width':i===selected?2:1.1,'vector-effect':'non-scaling-stroke','pointer-events':'stroke','data-loop':i})));
  if(selected>=0&&o.loops[selected]&&tool==='select'&&!nativeCount)o.loops[selected].forEach(([x,y],i)=>svg.appendChild(el('circle',{cx:x,cy:-y,r:view[2]*.004,fill:i===node?'#e88024':'white',stroke:'#bd6c21','stroke-width':1,'vector-effect':'non-scaling-stroke','data-node':i})));
  if(region)svg.appendChild(el('path',{d:path(region)+'Z',fill:'#7cbfff22',stroke:'#45b6a3','stroke-dasharray':'5 4','stroke-width':1.5,'vector-effect':'non-scaling-stroke','pointer-events':'none'}));
  if(drag?.points?.length)svg.appendChild(el('path',{d:path(drag.points),fill:'none',stroke:tool==='erase'?'#f18787':'#45b6a3','stroke-width':(+$('brushWidth')?.value||.8)/o.params.size,'stroke-linecap':'round','pointer-events':'none'}));

  if(nativeCount){
   for(const e of n.entities){
    const chosen=sketch.selected().includes(e.id);appendEntityShape(e,n,o,stateMap.get(e.id)||'under',chosen);
    if(chosen&&tool==='select'){
     const handles=e.type==='line'?[['start',e.start],['end',e.end]]:e.type==='bezier'?e.points.map((p,i)=>[`control:${i}`,p]):[['center',e.center],['radius',[e.center[0]+e.radius,e.center[1]]]];
     if(e.type==='arc')for(const key of ['start','end']){const a=e[key+'Angle'];handles.push([key,[e.center[0]+Math.cos(a)*e.radius,e.center[1]+Math.sin(a)*e.radius]]);}
     for(const [key,p] of handles){const cc=localPoint(p,n);svg.appendChild(el('circle',{cx:cc[0],cy:-cc[1],r:view[2]*.006,fill:sketch.points().some(p=>p.entity===e.id&&p.point===key)?'#f4b860':'#eef4f3',stroke:'#258d7d','stroke-width':1,'vector-effect':'non-scaling-stroke','data-entity':e.id,'data-handle':key}));}
    }
   }
   renderConstraints(n);renderDimensions(n,o);
  }

  if(drag?.kind==='primitive'){
   const a=localPoint(drag.start,n),b=localPoint(drag.end,n);
   if(tool==='circle')svg.appendChild(el('circle',{cx:a[0],cy:-a[1],r:Math.hypot(b[0]-a[0],b[1]-a[1]),class:'sketch-preview-shape','vector-effect':'non-scaling-stroke'}));
   else svg.appendChild(el('path',{d:tool==='rectangle'?path([a,[b[0],a[1]],b,[a[0],b[1]]])+'Z':path([a,b]),class:'sketch-preview-shape','vector-effect':'non-scaling-stroke','pointer-events':'none'}));
   const value=Math.hypot(drag.end[0]-drag.start[0],drag.end[1]-drag.start[1]);
   addText((tool==='circle'?'R ':'')+value.toFixed(2)+' mm',[(a[0]+b[0])/2+view[2]*.012,(a[1]+b[1])/2+view[3]*.018],{class:'sketch-live-dimension',style:`font-size:${view[2]*.018}px`});
   if(drag.inference==='horizontal')svg.appendChild(el('line',{x1:view[0],y1:-a[1],x2:view[0]+view[2],y2:-a[1],class:'sketch-inference-line','vector-effect':'non-scaling-stroke'}));
   if(drag.inference==='vertical')svg.appendChild(el('line',{x1:a[0],y1:view[1],x2:a[0],y2:view[1]+view[3],class:'sketch-inference-line','vector-effect':'non-scaling-stroke'}));
  }
  if(drag?.kind==='primitive'&&(drag.startRelation||drag.endRelation)){
   const target=drag.endRelation?drag.end:drag.start,cc=localPoint(target,n);
   svg.appendChild(el('circle',{cx:cc[0],cy:-cc[1],r:view[2]*.009,class:'sketch-snap-marker','vector-effect':'non-scaling-stroke'}));
  }
  renderBezierDraft(n);renderBox();renderInference(n);updateInspector(n);
  const selection=$('selection');
  if(selection)selection.textContent=drag?.kind==='box-select'?(drag.end?.[0]<drag.start[0]?'Seleção cruzada: toca a janela para selecionar.':'Seleção por janela: a entidade precisa ficar dentro.'):region?'Região selecionada para edição de contorno.':sketch.selected().length?`${sketch.selected().length} entidade(s) selecionada(s) · Shift adiciona à seleção`:selected>=0?`Contorno ${selected+1} · ${o.loops[selected]?.length||0} pontos`:tool==='trim'?'Trim: clique no trecho que deseja remover.':tool==='extend'?'Extend: clique perto da extremidade que deseja prolongar.':tool==='dimension'?'Cota: clique em uma linha, círculo ou arco.':tool==='bezier'?(bezierClicks.length?'Bézier: continue clicando · duplo clique ou Enter conclui.':'Bézier: clique para iniciar a curva.'):'Clique para selecionar · arraste no vazio para seleção por janela.';
 }
 function reset(){view=[-.65,-.65,1.3,1.3];selected=-1;node=-1;region=null;drag=null;arcClicks=[];bezierClicks=[];bezierHover=null;hoveredEntity=null;inference=null;sketch.reset();closeInlineDimension();render();}
 async function operate(op){const o=api.object();if(!o||!contourMode())return;const original=o.loops;try{api.status('Aplicando edição vetorial…');const loops=await api.request({action:'edit',loops:original,op:{...op,size:o.params.size}});if(api.object()?.id!==o.id||o.loops!==original){api.status('Edição cancelada porque o objeto mudou.');return;}api.history();delete o.sketch;o.loops=loops;selected=-1;node=-1;api.changed();render();}catch(e){api.status(e.message);}}

 function closeInlineDimension(){const box=$('sketchInlineDimension');if(box)box.hidden=true;}
 function openInlineDimension(entityId,clientX,clientY){
  sketch.select(entityId);render();const info=sketch.selectionInfo();if(info.count!==1||!Number.isFinite(info.value)){api.status('Cota direta disponível para linha, círculo e arco nesta fase.');return;}
  const box=$('sketchInlineDimension'),input=$('sketchInlineDimensionValue'),label=$('sketchInlineDimensionLabel'),vp=$('viewport').getBoundingClientRect();
  label.textContent=info.primary.type==='line'?'Comprimento':info.primary.type==='circle'?'Raio':'Raio do arco';
  input.value=(info.dimension?.value??info.value).toFixed(2);
  box.style.left=Math.max(8,Math.min(vp.width-210,clientX-vp.left+10))+'px';box.style.top=Math.max(62,Math.min(vp.height-60,clientY-vp.top-18))+'px';box.hidden=false;
  requestAnimationFrame(()=>{input.focus();input.select();});
 }
 function applyInlineDimension(){
  const value=+$('sketchInlineDimensionValue').value;if(!Number.isFinite(value)||value<=0){api.status('Informe uma cota válida.');return;}
  sketch.dimension(value,$('sketchDriving')?.checked!==false);closeInlineDimension();render();
 }
 if($('sketchInlineDimensionApply'))$('sketchInlineDimensionApply').onclick=applyInlineDimension;
 if($('sketchInlineDimensionValue'))$('sketchInlineDimensionValue').onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();applyInlineDimension();}else if(e.key==='Escape'){e.preventDefault();closeInlineDimension();}};
 if($('showSketchConstraints'))$('showSketchConstraints').onchange=render;

 svg.onpointerdown=e=>{
  const o=api.object();if(!o)return;svg.setPointerCapture(e.pointerId);const q=point(e),n=e.target.dataset.node,l=e.target.dataset.loop,entity=e.target.dataset.entity;
  if(e.button===1||e.button===2){drag={kind:'pan',x:e.clientX,y:e.clientY,view:[...view]};return;}
  if(e.target.dataset.dimensionEntity){openInlineDimension(e.target.dataset.dimensionEntity,e.clientX,e.clientY);return;}
  if(entity&&tool==='trim'){sketch.trim(entity,nativePoint(q));hoveredEntity=null;inference=null;render();return;}
  if(entity&&tool==='extend'){sketch.extend(entity,nativePoint(q));hoveredEntity=null;inference=null;render();return;}
  if(entity&&tool==='dimension'){openInlineDimension(entity,e.clientX,e.clientY);return;}
  if(['sketch-line','rectangle','circle'].includes(tool)){
   if(drag?.kind==='primitive'){commitPrimitive(q,{suppress:e.shiftKey});return;}
   beginPrimitive(q,{suppress:e.shiftKey});render();return;
  }
  if(tool==='arc'){arcClicks.push(nativePoint(q));if(arcClicks.length===3){sketch.create('arc',...arcClicks);arcClicks=[];}else api.status('Arco de 3 pontos · clique '+(arcClicks.length+1)+' de 3.');render();return;}
  if(tool==='bezier'){
   const raw=nativePoint(q),snap=e.shiftKey?{point:raw,relation:null}:snapNative(raw,sketch.native());
   if(e.detail>=2&&bezierClicks.length>=2){
    const last=bezierClicks.at(-1)?.point;if(!last||Math.hypot(last[0]-snap.point[0],last[1]-snap.point[1])>1e-5)bezierClicks.push({point:snap.point,relation:snap.relation});
    finishBezier();return;
   }
   bezierClicks.push({point:snap.point,relation:snap.relation});bezierHover=null;api.status('Bézier: clique para adicionar pontos de controle · duplo clique ou Enter para concluir.');render();return;
  }
  if(entity&&tool==='select'){
   const handle=e.target.dataset.handle;sketch.select(entity,handle==='radius'?null:handle,e.shiftKey);if(handle&&!e.shiftKey)drag={kind:'entity-point',entity,handle,start:q};render();return;
  }
  if(['draw','erase','line'].includes(tool)&&!contourMode())return;
  if(['draw','erase','line'].includes(tool)){drag={kind:'stroke',points:[q]};return;}
  if(tool==='region'){region=[q,q,q,q];drag={kind:'region',start:q};render();return;}
  if(tool==='move'&&l!==undefined){if(!contourMode())return;api.history();delete o.sketch;selected=+l;drag={kind:'move',start:q,original:o.loops[selected].map(p=>p.slice())};return;}
  if(n!==undefined){if(!contourMode())return;api.history();delete o.sketch;node=+n;drag={kind:'node'};}
  else if(l!==undefined){selected=+l;node=-1;render();}
  else if(tool==='select'){selected=-1;node=-1;if(!e.shiftKey)sketch.clearSelection();drag={kind:'box-select',start:q,end:q,extend:e.shiftKey};render();}
  else{drag={kind:'pan',x:e.clientX,y:e.clientY,view:[...view]};}
 };
 svg.onpointermove=e=>{
  const o=api.object();if(!o)return;
  hoveredEntity=e.target?.dataset?.entity||null;
  const q=point(e);
  if(!drag){if(tool==='bezier'&&bezierClicks.length){const raw=nativePoint(q),snap=e.shiftKey?{point:raw,relation:null}:snapNative(raw,sketch.native());bezierHover={point:snap.point,relation:snap.relation};inference=snap.relation?{...snap,point:snap.point,type:snap.relation.type}:null;}render();return;}
  if(drag.kind==='primitive'){updatePrimitiveDraft(q,{suppress:e.shiftKey||drag.suppress});render();return;}
  if(drag.kind==='box-select'){drag.end=q;render();return;}
  if(drag.kind==='entity-point'){drag.end=nativePoint(q);return;}
  if(drag.kind==='node'){o.loops[selected][node]=q;render();}
  else if(drag.kind==='move'){o.loops[selected]=drag.original.map(v=>[v[0]+q[0]-drag.start[0],v[1]+q[1]-drag.start[1]]);render();}
  else if(drag.kind==='region'){const a=drag.start;region=[[Math.min(a[0],q[0]),Math.min(a[1],q[1])],[Math.max(a[0],q[0]),Math.min(a[1],q[1])],[Math.max(a[0],q[0]),Math.max(a[1],q[1])],[Math.min(a[0],q[0]),Math.max(a[1],q[1])]];render();}
  else if(drag.kind==='stroke'){if(tool==='line')drag.points=[drag.points[0],q];else if(Math.hypot(q[0]-drag.points.at(-1)[0],q[1]-drag.points.at(-1)[1])>.001&&drag.points.length<1500)drag.points.push(q);render();}
  else{const r=svg.getBoundingClientRect(),scale=Math.max(view[2]/r.width,view[3]/r.height);view=[drag.view[0]-(e.clientX-drag.x)*scale,drag.view[1]-(e.clientY-drag.y)*scale,...drag.view.slice(2)];render();}
 };
 svg.onpointerup=e=>{
  if(!drag)return;
  if(drag.kind==='primitive'){render();return;}
  const d=drag;drag=null;
  if(d.kind==='box-select'){
   const a=nativePoint(d.start),b=nativePoint(d.end||d.start),bounds={minX:Math.min(a[0],b[0]),minY:Math.min(a[1],b[1]),maxX:Math.max(a[0],b[0]),maxY:Math.max(a[1],b[1])};
   sketch.selectBox(bounds,{crossing:(d.end?.[0]??d.start[0])<d.start[0],extend:d.extend});
  }
  if(d.kind==='entity-point'&&d.end)sketch.movePoint(d.entity,d.handle,d.end);
  if(['node','move'].includes(d.kind))api.changed();
  if(d.kind==='stroke'&&d.points.length)operate({type:'stroke',points:d.points,width:+$('brushWidth')?.value||.8,subtract:tool==='erase'});
  inference=null;render();
 };
 svg.onpointercancel=()=>{if(drag&&['node','move'].includes(drag.kind))api.changed();if(drag?.kind!=='primitive'){drag=null;inference=null;}render();};
 svg.onpointerleave=()=>{if(!drag){hoveredEntity=null;inference=null;render();}};
 svg.oncontextmenu=e=>e.preventDefault();
 svg.onwheel=e=>{e.preventDefault();const f=e.deltaY>0?1.12:1/1.12;if(view[2]*f<.015||view[2]*f>12)return;const [x,negY]=point(e),y=-negY;view=[x+(view[0]-x)*f,y+(view[1]-y)*f,view[2]*f,view[3]*f];render();};
 svg.ondblclick=e=>{
  if(e.target.dataset.dimensionEntity){openInlineDimension(e.target.dataset.dimensionEntity,e.clientX,e.clientY);return;}
  if(tool!=='select'||e.target.dataset.loop===undefined||!contourMode())return;
  const o=api.object();selected=+e.target.dataset.loop;const p=o.loops[selected],q=point(e);let at=0,best=Infinity;
  for(let i=0;i<p.length;i++){const a=p[i],b=p[(i+1)%p.length],dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((q[0]-a[0])*dx+(q[1]-a[1])*dy)/(dx*dx+dy*dy||1))),dd=Math.hypot(q[0]-a[0]-t*dx,q[1]-a[1]-t*dy);if(dd<best){best=dd;at=i+1;}}
  api.history();delete o.sketch;p.splice(at,0,q);node=at;api.changed();render();
 };
 function removeNode(){if(sketch.selected().length){sketch.remove();render();return;}const o=api.object();if(!contourMode())return;if(selected>=0&&node>=0&&o?.loops[selected].length>3){api.history();delete o.sketch;o.loops[selected].splice(node,1);node=-1;api.changed();render();}}
 function finishBezier(){
  if(bezierClicks.length<2){bezierClicks=[];bezierHover=null;inference=null;render();return false;}
  const points=bezierClicks.map(x=>x.point),relations=bezierClicks.map(x=>x.relation||null),ok=sketch.create('bezier',points,null,null,{controlRelations:relations});
  if(ok)api.status(`Bézier criada · grau ${Math.max(1,points.length-1)} · ${points.length} pontos de controle.`);
  bezierClicks=[];bezierHover=null;inference=null;render();return ok;
 }
 function setTool(t){tool=t;arcClicks=[];bezierClicks=[];bezierHover=null;drag=null;inference=null;closeInlineDimension();render();}
 return {
  sketch,render,reset,fit:()=>{view=[-.65,-.65,1.3,1.3];render()},
  setTool,getTool:()=>tool,openInlineDimension,finishBezier,
  removeNode,clearRegion:()=>{region=null;render()},
  offset:distance=>{if(selected<0){api.status('Selecione um contorno primeiro.');return;}operate({type:'offset',selected,distance});},
  thickness:distance=>operate({type:'thickness',distance,region}),
  removeContour:()=>{if(sketch.selected().length){sketch.remove();render();return;}const o=api.object();if(!contourMode())return;if(selected<0)return;if(selected===0){api.status('Para alterar a silhueta, mova os pontos ou use a borracha.');return;}api.history();delete o.sketch;o.loops.splice(selected,1);selected=-1;api.changed();render();},
  getSelection:()=>({selected,node,region})
 };
}
