import {createSketchController} from './sketch/controller.mjs';
import {simplify} from './geometry.mjs';

export function createEditor(svg,api){
 let view=[-.65,-.65,1.3,1.3],tool='select',selected=-1,node=-1,region=null,drag=null;
 const NS='http://www.w3.org/2000/svg';
 const el=(tag,attrs)=>{const o=document.createElementNS(NS,tag);Object.entries(attrs).forEach(([k,v])=>v!==undefined&&v!==null&&o.setAttribute(k,v));return o;};
 const sketch=createSketchController(api);let arcClicks=[];
 const $=id=>document.getElementById(id);
 const point=e=>{const p=new DOMPoint(e.clientX,e.clientY).matrixTransform(svg.getScreenCTM().inverse());return[p.x,-p.y]};
 const path=points=>'M'+points.map(([x,y])=>`${x},${-y}`).join('L');
 const nativePoint=q=>{const o=api.object(),n=sketch.native();return [q[0]*o.params.size+n.profileCenter[0],q[1]*o.params.size+n.profileCenter[1]];};
 const localPoint=(p,n)=>{const size=api.object().params.size;return [(p[0]-n.profileCenter[0])/size,(p[1]-n.profileCenter[1])/size];};
 const entityMid=e=>e.type==='line'?[(e.start[0]+e.end[0])/2,(e.start[1]+e.end[1])/2]:[...e.center];
 const entityName=e=>({line:'Linha',circle:'Círculo',arc:'Arco'}[e?.type]||'Entidade');
 const constraintLabel=t=>({horizontal:'H',vertical:'V',coincident:'●',fixed:'F',parallel:'∥',perpendicular:'⊥',equal:'=',concentric:'◎',collinear:'—',tangent:'T'}[t]||'?');
 const ruleName=t=>({horizontal:'Horizontal',vertical:'Vertical',coincident:'Coincidente',fixed:'Fixar',parallel:'Paralela',perpendicular:'Perpendicular',equal:'Igual',concentric:'Concêntrica',collinear:'Colinear',tangent:'Tangente',lineLength:'Comprimento',circleRadius:'Raio',arcRadius:'Raio do arco'}[t]||t);

 function contourMode(){if(api.object()?.sketch?.entities.length){api.status('Para editar contornos derivados, use Converter em contornos. O Sketch paramétrico permanece editável.');return false;}return true;}
 function snapLine(start,end){
  const dx=end[0]-start[0],dy=end[1]-start[1],m=Math.max(Math.abs(dx),Math.abs(dy),1e-9),threshold=.075;
  if(Math.abs(dy)/m<threshold)return {end:[end[0],start[1]],inference:'horizontal'};
  if(Math.abs(dx)/m<threshold)return {end:[start[0],end[1]],inference:'vertical'};
  return {end,inference:null};
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
    const c=localPoint(e.center,n);p=[c[0]+e.radius/o.params.size+view[2]*.018,c[1]+view[3]*.012];
   }
   const text=(d.driving===false?'[':'')+Number(d.value).toFixed(2)+' mm'+(d.driving===false?']':'');
   addText(text,p,{class:'sketch-dimension'+(d.driving===false?' driven':''),'data-dimension-entity':e.id,'data-entity':e.id});
  }
 }
 function renderConstraints(n){
  for(const c of n.constraints||[]){
   let entities=[];
   if(c.entity)entities=[n.entities.find(e=>e.id===c.entity)].filter(Boolean);
   else if(c.type==='coincident')entities=[n.entities.find(e=>e.id===c.a.entity),n.entities.find(e=>e.id===c.b.entity)].filter(Boolean);
   else entities=[n.entities.find(e=>e.id===c.first),n.entities.find(e=>e.id===c.second)].filter(Boolean);
   if(!entities.length)continue;
   const centers=entities.map(entityMid),p=[centers.reduce((s,q)=>s+q[0],0)/centers.length,centers.reduce((s,q)=>s+q[1],0)/centers.length],q=localPoint(p,n);
   addText(constraintLabel(c.type),[q[0]+view[2]*.008,q[1]+view[3]*.008],{class:'sketch-constraint-badge'});
  }
 }
 function updateInspector(n){
  const info=sketch.selectionInfo(),status=sketch.describe();
  const chip=$('sketchStatusChip'),statusText=$('sketchStatus');
  if(statusText)statusText.textContent=status.label+(status.dof!==null&&status.state!=='defined'?' · '+status.dof+' GL':'');
  if(chip){chip.dataset.state=status.state;chip.title=status.dof===null?'Diagnóstico aproximado':`${status.dof} graus de liberdade restantes`;}
  const title=$('sketchSelectionTitle'),meta=$('sketchSelectionMeta'),dim=$('sketchDimension'),driving=$('sketchDriving'),apply=$('applySketchDimension');
  if(title)title.textContent=info.count===0?'Nada selecionado':info.count===1?entityName(info.primary):`${info.count} entidades`;
  if(meta){
   if(info.count===0)meta.textContent='Clique em uma entidade para editar geometria, cotas e restrições.';
   else if(info.count===1){
    const e=info.primary;
    meta.textContent=e.type==='line'?`Comprimento atual: ${info.value.toFixed(2)} mm`:e.type==='circle'?`Raio atual: ${info.value.toFixed(2)} mm`:`Raio do arco: ${info.value.toFixed(2)} mm`;
   }else meta.textContent='Seleção múltipla pronta para restrições entre entidades.';
  }
  if(dim){dim.disabled=info.count!==1;if(info.count===1&&!dim.matches(':focus'))dim.value=(info.dimension?.value??info.value).toFixed(2);}
  if(driving){driving.disabled=info.count!==1;driving.checked=info.dimension?.driving!==false;}
  if(apply)apply.disabled=info.count!==1;
  const rules=$('sketchRules');if(rules){const previous=rules.value;rules.replaceChildren();for(const c of sketch.rules()){const option=document.createElement('option');option.value=c.id;option.textContent=ruleName(c.type)+(c.value!==undefined?' · '+c.value.toFixed(2)+' mm':'');rules.appendChild(option);}if([...rules.options].some(o=>o.value===previous))rules.value=previous;}
  const construction=$('toggleConstruction');if(construction){construction.disabled=!info.count;construction.classList.toggle('active',!!info.entities.length&&info.entities.every(e=>e.construction));}
  const del=$('deleteSketchEntity');if(del)del.disabled=!info.count;
 }
 function render(){
  if(svg.hasAttribute('hidden')){svg.replaceChildren();return;}
  const o=api.object();svg.replaceChildren();svg.setAttribute('viewBox',view.join(' '));if(!o)return;
  renderAxes();
  const n=sketch.native(),nativeCount=n?.entities?.length||0;
  if(o.result?.bladeProfile?.length&&!nativeCount)svg.appendChild(el('path',{class:'blade-preview',d:o.result.bladeProfile.map(p=>path(p.map(([x,y])=>[x/o.result.params.size*(o.result.params.mirror?-1:1),y/o.result.params.size]))+'Z').join(' '),fill:'#d99c32','fill-opacity':.42,'fill-rule':'evenodd','pointer-events':'none'}));
  if(o.loops.length)svg.appendChild(el('path',{d:o.loops.map(p=>path(p)+'Z').join(' '),class:nativeCount?'sketch-derived-profile':'legacy-profile',fill:'#476a90','fill-rule':'evenodd','fill-opacity':nativeCount?.065:.42,'pointer-events':'none'}));
  if(!nativeCount)o.loops.forEach((p,i)=>svg.appendChild(el('path',{d:path(p)+'Z',fill:'none',stroke:i===selected?'#e5852d':i===0?'#286bbb':'#597a97','stroke-width':i===selected?2:1.1,'vector-effect':'non-scaling-stroke','pointer-events':'stroke','data-loop':i})));
  if(selected>=0&&o.loops[selected]&&tool==='select'&&!nativeCount)o.loops[selected].forEach(([x,y],i)=>svg.appendChild(el('circle',{cx:x,cy:-y,r:view[2]*.004,fill:i===node?'#e88024':'white',stroke:'#bd6c21','stroke-width':1,'vector-effect':'non-scaling-stroke','data-node':i})));
  if(region)svg.appendChild(el('path',{d:path(region)+'Z',fill:'#7cbfff22',stroke:'#45b6a3','stroke-dasharray':'5 4','stroke-width':1.5,'vector-effect':'non-scaling-stroke','pointer-events':'none'}));
  if(drag?.points?.length)svg.appendChild(el('path',{d:path(drag.points),fill:'none',stroke:tool==='erase'?'#f18787':'#45b6a3','stroke-width':(+$('brushWidth')?.value||.8)/o.params.size,'stroke-linecap':'round','pointer-events':'none'}));

  if(nativeCount){
   for(const e of n.entities){
    const chosen=sketch.selected().includes(e.id),attrs={fill:'none',stroke:chosen?'#d89a46':e.construction?'#7d8b94':'#45b6a3','stroke-width':chosen?2.4:1.75,'stroke-dasharray':e.construction?'6 4':undefined,'vector-effect':'non-scaling-stroke','pointer-events':'stroke','data-entity':e.id};
    if(e.type==='line')svg.appendChild(el('path',{...attrs,d:path([localPoint(e.start,n),localPoint(e.end,n)])}));
    else if(e.type==='circle'){const c=localPoint(e.center,n);svg.appendChild(el('circle',{...attrs,cx:c[0],cy:-c[1],r:e.radius/o.params.size}));}
    else{let sweep=((e.endAngle-e.startAngle)%(2*Math.PI)+2*Math.PI)%(2*Math.PI);sweep=e.ccw?(sweep||2*Math.PI):(sweep?sweep-2*Math.PI:-2*Math.PI);const pts=Array.from({length:65},(_,i)=>localPoint([e.center[0]+Math.cos(e.startAngle+sweep*i/64)*e.radius,e.center[1]+Math.sin(e.startAngle+sweep*i/64)*e.radius],n));svg.appendChild(el('path',{...attrs,d:path(pts)}));}
    if(chosen&&tool==='select'){
     const handles=e.type==='line'?[['start',e.start],['end',e.end]]:[['center',e.center],['radius',[e.center[0]+e.radius,e.center[1]]]];
     if(e.type==='arc')for(const key of ['start','end']){const a=e[key+'Angle'];handles.push([key,[e.center[0]+Math.cos(a)*e.radius,e.center[1]+Math.sin(a)*e.radius]]);}
     for(const [key,p] of handles){const c=localPoint(p,n);svg.appendChild(el('circle',{cx:c[0],cy:-c[1],r:view[2]*.006,fill:sketch.points().some(p=>p.entity===e.id&&p.point===key)?'#f4b860':'#eef4f3',stroke:'#258d7d','stroke-width':1,'vector-effect':'non-scaling-stroke','data-entity':e.id,'data-handle':key}));}
    }
   }
   renderConstraints(n);renderDimensions(n,o);
  }

  if(drag?.kind==='primitive'){
   const a=localPoint(drag.start,n),b=localPoint(drag.end,n);
   if(tool==='circle')svg.appendChild(el('circle',{cx:a[0],cy:-a[1],r:Math.hypot(b[0]-a[0],b[1]-a[1]),class:'sketch-preview-shape','vector-effect':'non-scaling-stroke'}));
   else svg.appendChild(el('path',{d:tool==='rectangle'?path([a,[b[0],a[1]],b,[a[0],b[1]]])+'Z':path([a,b]),class:'sketch-preview-shape','vector-effect':'non-scaling-stroke','pointer-events':'none'}));
   const value=tool==='circle'?Math.hypot(drag.end[0]-drag.start[0],drag.end[1]-drag.start[1]):Math.hypot(drag.end[0]-drag.start[0],drag.end[1]-drag.start[1]);
   addText((tool==='circle'?'R ':'')+value.toFixed(2)+' mm',[(a[0]+b[0])/2+view[2]*.012,(a[1]+b[1])/2+view[3]*.018],{class:'sketch-live-dimension'});
   if(drag.inference){
    const guide=drag.inference==='horizontal'?[[view[0],a[1]],[view[0]+view[2],a[1]]]:[[a[0],-view[1]],[a[0],-(view[1]+view[3])]];
    if(drag.inference==='horizontal')svg.appendChild(el('line',{x1:guide[0][0],y1:-guide[0][1],x2:guide[1][0],y2:-guide[1][1],class:'sketch-inference-line','vector-effect':'non-scaling-stroke'}));
    else svg.appendChild(el('line',{x1:a[0],y1:view[1],x2:a[0],y2:view[1]+view[3],class:'sketch-inference-line','vector-effect':'non-scaling-stroke'}));
   }
  }
  updateInspector(n);
  const selection=$('selection');if(selection)selection.textContent=region?'Região selecionada para edição de contorno.':sketch.selected().length?`${sketch.selected().length} entidade(s) selecionada(s) · Shift adiciona à seleção`:selected>=0?`Contorno ${selected+1} · ${o.loops[selected]?.length||0} pontos`:'Selecione uma entidade ou escolha uma ferramenta.';
 }
 function reset(){view=[-.65,-.65,1.3,1.3];selected=-1;node=-1;region=null;drag=null;arcClicks=[];sketch.reset();render();}
 async function operate(op){const o=api.object();if(!o||!contourMode())return;const original=o.loops;try{api.status('Aplicando edição vetorial…');const loops=await api.request({action:'edit',loops:original,op:{...op,size:o.params.size}});if(api.object()?.id!==o.id||o.loops!==original){api.status('Edição cancelada porque o objeto mudou.');return;}api.history();delete o.sketch;o.loops=loops;selected=-1;node=-1;api.changed();render();}catch(e){api.status(e.message);}}

 svg.onpointerdown=e=>{
  const o=api.object();if(!o)return;svg.setPointerCapture(e.pointerId);const q=point(e),n=e.target.dataset.node,l=e.target.dataset.loop;
  if(e.button===1||e.button===2){drag={kind:'pan',x:e.clientX,y:e.clientY,view:[...view]};return;}
  if(e.target.dataset.dimensionEntity){sketch.select(e.target.dataset.dimensionEntity,null,e.shiftKey);render();return;}
  if(['sketch-line','rectangle','circle'].includes(tool)){drag={kind:'primitive',start:nativePoint(q),end:nativePoint(q),inference:null};return;}
  if(tool==='arc'){arcClicks.push(nativePoint(q));if(arcClicks.length===3){sketch.create('arc',...arcClicks);arcClicks=[];}else api.status('Arco de 3 pontos · clique '+(arcClicks.length+1)+' de 3.');render();return;}
  if(e.target.dataset.entity&&tool==='select'){const entity=e.target.dataset.entity,handle=e.target.dataset.handle;sketch.select(entity,handle==='radius'?null:handle,e.shiftKey);if(handle&&!e.shiftKey)drag={kind:'entity-point',entity,handle,start:q};render();return;}
  if(['draw','erase','line'].includes(tool)&&!contourMode())return;
  if(['draw','erase','line'].includes(tool)){drag={kind:'stroke',points:[q]};return;}
  if(tool==='region'){region=[q,q,q,q];drag={kind:'region',start:q};render();return;}
  if(tool==='move'&&l!==undefined){if(!contourMode())return;api.history();delete o.sketch;selected=+l;drag={kind:'move',start:q,original:o.loops[selected].map(p=>p.slice())};return;}
  if(n!==undefined){if(!contourMode())return;api.history();delete o.sketch;node=+n;drag={kind:'node'};}
  else if(l!==undefined){selected=+l;node=-1;render();}
  else{selected=-1;node=-1;sketch.clearSelection();drag={kind:'pan',x:e.clientX,y:e.clientY,view:[...view]};render();}
 };
 svg.onpointermove=e=>{
  const o=api.object();if(!drag||!o)return;const q=point(e);
  if(drag.kind==='primitive'){let end=nativePoint(q);if(tool==='sketch-line'){const snap=snapLine(drag.start,end);end=snap.end;drag.inference=snap.inference;}drag.end=end;render();return;}
  if(drag.kind==='entity-point'){drag.end=nativePoint(q);return;}
  if(drag.kind==='node'){o.loops[selected][node]=q;render();}
  else if(drag.kind==='move'){o.loops[selected]=drag.original.map(v=>[v[0]+q[0]-drag.start[0],v[1]+q[1]-drag.start[1]]);render();}
  else if(drag.kind==='region'){const a=drag.start;region=[[Math.min(a[0],q[0]),Math.min(a[1],q[1])],[Math.max(a[0],q[0]),Math.min(a[1],q[1])],[Math.max(a[0],q[0]),Math.max(a[1],q[1])],[Math.min(a[0],q[0]),Math.max(a[1],q[1])]];render();}
  else if(drag.kind==='stroke'){if(tool==='line')drag.points=[drag.points[0],q];else if(Math.hypot(q[0]-drag.points.at(-1)[0],q[1]-drag.points.at(-1)[1])>.001&&drag.points.length<1500)drag.points.push(q);render();}
  else{const r=svg.getBoundingClientRect(),scale=Math.max(view[2]/r.width,view[3]/r.height);view=[drag.view[0]-(e.clientX-drag.x)*scale,drag.view[1]-(e.clientY-drag.y)*scale,...drag.view.slice(2)];render();}
 };
 svg.onpointerup=()=>{
  if(!drag)return;const d=drag;drag=null;
  if(d.kind==='primitive')sketch.create(tool==='sketch-line'?'line':tool,d.start,d.end,null,{autoConstraint:d.inference});
  if(d.kind==='entity-point'&&d.end)sketch.movePoint(d.entity,d.handle,d.end);
  if(['node','move'].includes(d.kind))api.changed();
  if(d.kind==='stroke'&&d.points.length)operate({type:'stroke',points:d.points,width:+$('brushWidth')?.value||.8,subtract:tool==='erase'});
  render();
 };
 svg.onpointercancel=()=>{if(drag&&['node','move'].includes(drag.kind))api.changed();drag=null;render();};
 svg.oncontextmenu=e=>e.preventDefault();
 svg.onwheel=e=>{e.preventDefault();const f=e.deltaY>0?1.12:1/1.12;if(view[2]*f<.015||view[2]*f>12)return;const [x,negY]=point(e),y=-negY;view=[x+(view[0]-x)*f,y+(view[1]-y)*f,view[2]*f,view[3]*f];render();};
 svg.ondblclick=e=>{
  if(e.target.dataset.dimensionEntity){
   sketch.select(e.target.dataset.dimensionEntity);render();const input=$('sketchDimension');if(input){input.focus();input.select();}return;
  }
  if(tool!=='select'||e.target.dataset.loop===undefined||!contourMode())return;
  const o=api.object();selected=+e.target.dataset.loop;const p=o.loops[selected],q=point(e);let at=0,best=Infinity;
  for(let i=0;i<p.length;i++){const a=p[i],b=p[(i+1)%p.length],dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((q[0]-a[0])*dx+(q[1]-a[1])*dy)/(dx*dx+dy*dy||1))),d=Math.hypot(q[0]-a[0]-t*dx,q[1]-a[1]-t*dy);if(d<best){best=d;at=i+1;}}
  api.history();delete o.sketch;p.splice(at,0,q);node=at;api.changed();render();
 };
 function removeNode(){if(sketch.selected().length){sketch.remove();render();return;}const o=api.object();if(!contourMode())return;if(selected>=0&&node>=0&&o?.loops[selected].length>3){api.history();delete o.sketch;o.loops[selected].splice(node,1);node=-1;api.changed();render();}}
 return {
  sketch,render,reset,fit:()=>{view=[-.65,-.65,1.3,1.3];render()},
  setTool:t=>{tool=t;arcClicks=[];drag=null;render()},
  getTool:()=>tool,
  removeNode,clearRegion:()=>{region=null;render()},
  offset:distance=>{if(selected<0){api.status('Selecione um contorno primeiro.');return;}operate({type:'offset',selected,distance});},
  thickness:distance=>operate({type:'thickness',distance,region}),
  removeContour:()=>{if(sketch.selected().length){sketch.remove();render();return;}const o=api.object();if(!contourMode())return;if(selected<0)return;if(selected===0){api.status('Para alterar a silhueta, mova os pontos ou use a borracha.');return;}api.history();delete o.sketch;o.loops.splice(selected,1);selected=-1;api.changed();render();},
  getSelection:()=>({selected,node,region})
 };
}
