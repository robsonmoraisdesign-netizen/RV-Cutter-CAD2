export const SKETCH_SCHEMA_VERSION = 1;
const id = (prefix='sk') => `${prefix}-${globalThis.crypto.randomUUID()}`;
const TYPES = new Set(['point','line','circle','arc','bezier']);
const PAIR_LINE = new Set(['parallel','perpendicular','collinear']);
const PAIR_RADIAL = new Set(['concentric']);
const ENTITY_DIMENSIONS = Object.freeze({lineLength:'line',circleRadius:'circle',arcRadius:'arc',circleDiameter:'circle',arcDiameter:'arc'});
const POINT_DIMENSIONS = new Set(['pointDistance','horizontalDistance','verticalDistance']);
const finite = n => Number.isFinite(n) && Math.abs(n) <= 1e6;
const point = p => {
  if (!Array.isArray(p) || p.length !== 2 || !p.every(finite)) throw Error('Ponto inválido.');
  return [...p];
};
export function createSketch({units='mm'}={}) { return {schemaVersion:1,units,entities:[],constraints:[],dimensions:[]}; }
export function sketchPoint(position,options={}) { return {id:options.id||id('point'),type:'point',position:point(position),construction:!!options.construction}; }
export function line(start,end,options={}) { return {id:options.id||id('line'),type:'line',start:point(start),end:point(end),construction:!!options.construction}; }
export function circle(center,radius,options={}) {
  if (!finite(radius) || radius <= 0) throw Error('Raio inválido.');
  return {id:options.id||id('circle'),type:'circle',center:point(center),radius,construction:!!options.construction};
}
export function arc(center,radius,startAngle,endAngle,options={}) {
  const c=circle(center,radius,options);
  if (![startAngle,endAngle].every(finite)) throw Error('Ângulo inválido.');
  return {...c,id:options.id||id('arc'),type:'arc',startAngle,endAngle,ccw:options.ccw!==false};
}
export function bezier(points,options={}) {
  if(!Array.isArray(points)||points.length<2||points.length>16)throw Error('Bézier requer entre 2 e 16 pontos de controle.');
  return {id:options.id||id('bezier'),type:'bezier',points:points.map(point),construction:!!options.construction};
}
export function getEntity(sketch,entityId) {
  const e=sketch.entities.find(x=>x.id===entityId);
  if (!e) throw Error(`Entidade não encontrada: ${entityId}`);
  return e;
}
export function cloneSketch(sketch) { return structuredClone(sketch); }
function append(sketch,collection,value) {
  const copy=cloneSketch(sketch); copy[collection].push(structuredClone(value)); validateSketch(copy);
  sketch[collection].push(structuredClone(value)); return value.id;
}
export function addEntity(sketch,entity) { return append(sketch,'entities',entity); }
export function addConstraint(sketch,type,data={}) {
  const c={...structuredClone(data),id:data.id||id('constraint'),type};
  if (type==='fixed') c.geometry=structuredClone(getEntity(sketch,c.entity));
  return append(sketch,'constraints',c);
}
export function addDimension(sketch,type,data={}) {
  return append(sketch,'dimensions',{...structuredClone(data),id:data.id||id('dimension'),type,driving:data.driving!==false});
}
export function rectangle(sketch,a,b,options={}) {
  point(a); point(b);
  if (Math.abs(a[0]-b[0])<1e-6 || Math.abs(a[1]-b[1])<1e-6) throw Error('Retângulo sem área.');
  const s=cloneSketch(sketch),ps=[a,[b[0],a[1]],b,[a[0],b[1]]];
  const lines=ps.map((p,i)=>line(p,ps[(i+1)%4],options));
  lines.forEach(e=>addEntity(s,e));
  lines.forEach((e,i)=>{
    addConstraint(s,i%2?'vertical':'horizontal',{entity:e.id});
    addConstraint(s,'coincident',{a:{entity:e.id,point:'end'},b:{entity:lines[(i+1)%4].id,point:'start'}});
  });
  Object.assign(sketch,s);return lines.map(e=>e.id);
}
export function dimensionEntityIds(d) {
  if (!d) return [];
  if (POINT_DIMENSIONS.has(d.type)) return [d.a?.entity,d.b?.entity].filter(Boolean);
  if (d.type==='angleBetweenLines') return [d.first,d.second].filter(Boolean);
  return d.entity?[d.entity]:[];
}
export function removeEntity(sketch,entityId) {
  getEntity(sketch,entityId);
  sketch.entities=sketch.entities.filter(e=>e.id!==entityId);
  sketch.constraints=sketch.constraints.filter(c=>![c.entity,c.a?.entity,c.b?.entity,c.point?.entity,c.line,c.first,c.second].includes(entityId));
  sketch.dimensions=sketch.dimensions.filter(d=>!dimensionEntityIds(d).includes(entityId));
}
export function entityEndpoint(entity,which) {
  if(entity.type==='point'&&which==='point')return [...entity.position];
  if (entity.type==='line' && ['start','end'].includes(which)) return [...entity[which]];
  if (['circle','arc'].includes(entity.type) && which==='center') return [...entity.center];
  if (entity.type==='arc' && ['start','end'].includes(which)) {
    const a=entity[which==='start'?'startAngle':'endAngle'];
    return [entity.center[0]+Math.cos(a)*entity.radius,entity.center[1]+Math.sin(a)*entity.radius];
  }
  if(entity.type==='bezier'){
    if(which==='start')return [...entity.points[0]];
    if(which==='end')return [...entity.points.at(-1)];
    if(typeof which==='string'&&which.startsWith('control:')){
      const i=Number(which.slice(8));if(Number.isInteger(i)&&entity.points[i])return [...entity.points[i]];
    }
  }
  throw Error(`Referência de ponto inválida: ${entity.type}.${which}`);
}
function validatePairRef(s,c,kind){
  if(typeof c.first!=='string'||typeof c.second!=='string'||c.first===c.second)throw Error('Selecione duas entidades diferentes.');
  const a=getEntity(s,c.first),b=getEntity(s,c.second);
  if(kind==='line'&&(a.type!=='line'||b.type!=='line'))throw Error('Esta restrição requer duas linhas.');
  if(kind==='radial'&&(!['circle','arc'].includes(a.type)||!['circle','arc'].includes(b.type)))throw Error('Esta restrição requer dois círculos/arcos.');
  return [a,b];
}
export function validateSketch(s) {
  if (!s || s.schemaVersion!==1 || s.units!=='mm') throw Error('Versão ou unidade do Sketch inválida.');
  for (const key of ['entities','constraints','dimensions']) {
    if (!Array.isArray(s[key]) || s[key].length>8000) throw Error('Lista de Sketch inválida ou muito grande.');
  }
  if(s.entities.length>2000)throw Error('Limite de 2000 entidades por Sketch. Divida em objetos.');
  if(s.profileCenter!==undefined)point(s.profileCenter);
  if(s.profileSize!==undefined&&(!finite(s.profileSize)||s.profileSize<=0))throw Error('Tamanho do Sketch inválido.');
  if(s.legacyLoops!==undefined){
    if(!Array.isArray(s.legacyLoops)||s.legacyLoops.length>10000)throw Error('Contornos legados inválidos.');
    let count=0;for(const loop of s.legacyLoops){if(!Array.isArray(loop)||loop.length<3)throw Error('Contorno legado inválido.');count+=loop.length;if(count>500000)throw Error('Contornos legados muito grandes.');loop.forEach(point);}
  }
  const ids=new Set();
  for (const v of [...s.entities,...s.constraints,...s.dimensions]) {
    if (typeof v?.id!=='string' || !v.id.length || v.id.length>120 || ids.has(v.id)) throw Error('ID inválido ou duplicado no Sketch.');
    ids.add(v.id);
  }
  function checkEntity(e) {
    if (!TYPES.has(e.type)) throw Error('Tipo de entidade não suportado.');
    if(e.type==='point')point(e.position);
    else if (e.type==='line') { point(e.start);point(e.end);if(Math.hypot(e.end[0]-e.start[0],e.end[1]-e.start[1])<1e-8)throw Error('Linha sem comprimento.');}
    else if(e.type==='bezier'){if(!Array.isArray(e.points)||e.points.length<2||e.points.length>16)throw Error('Bézier inválida.');e.points.forEach(point);}
    else {point(e.center);if(!finite(e.radius)||e.radius<=0)throw Error('Raio inválido.');}
    if(e.type==='arc' && ![e.startAngle,e.endAngle].every(finite))throw Error('Ângulo inválido.');
  }
  s.entities.forEach(checkEntity);
  for (const c of s.constraints) {
    if (['horizontal','vertical','fixed'].includes(c.type)) {
      const e=getEntity(s,c.entity);
      if(c.type!=='fixed'&&e.type!=='line')throw Error('Horizontal/Vertical requer linha.');
      if(c.type==='fixed'&&c.geometry){checkEntity(c.geometry);if(c.geometry.id!==e.id||c.geometry.type!==e.type)throw Error('Referência fixa inválida.');}
    } else if(c.type==='coincident') {
      for(const ref of [c.a,c.b])entityEndpoint(getEntity(s,ref?.entity),ref?.point);
      if(c.a.entity===c.b.entity&&c.a.point===c.b.point)throw Error('Selecione dois pontos diferentes.');
    } else if(c.type==='midpoint') {
      const p=getEntity(s,c.point?.entity),ln=getEntity(s,c.line);
      entityEndpoint(p,c.point?.point);
      if(ln.type!=='line')throw Error('Ponto médio requer uma linha de referência.');
      if(c.point.entity===c.line)throw Error('Ponto médio requer entidades diferentes.');
    } else if(c.type==='coincidentOrigin') {
      const e=getEntity(s,c.point?.entity);
      entityEndpoint(e,c.point?.point);
    } else if(c.type==='pointOnAxis') {
      const e=getEntity(s,c.point?.entity);
      entityEndpoint(e,c.point?.point);
      if(!['x','y'].includes(c.axis))throw Error('Eixo de referência inválido.');
    } else if(PAIR_LINE.has(c.type)) validatePairRef(s,c,'line');
    else if(PAIR_RADIAL.has(c.type)) validatePairRef(s,c,'radial');
    else if(c.type==='equal'){
      const [a,b]=validatePairRef(s,c);
      const linePair=a.type==='line'&&b.type==='line';
      const radialPair=['circle','arc'].includes(a.type)&&['circle','arc'].includes(b.type);
      if(!linePair&&!radialPair)throw Error('Igual requer duas linhas ou dois círculos/arcos.');
    } else if(c.type==='tangent'){
      const [a,b]=validatePairRef(s,c);
      const ok=(a.type==='line'&&['circle','arc'].includes(b.type))||(b.type==='line'&&['circle','arc'].includes(a.type));
      if(!ok)throw Error('Tangente, nesta fase, requer uma linha e um círculo/arco.');
    } else throw Error('Restrição não suportada: '+c.type);
  }
  for (const d of s.dimensions) {
    if (!finite(d.value)||d.value<=0) throw Error('Valor de cota inválido.');
    if (d.position!==undefined) point(d.position);
    if (ENTITY_DIMENSIONS[d.type]) {
      const e=getEntity(s,d.entity);
      if (ENTITY_DIMENSIONS[d.type]!==e.type) throw Error('Cota incompatível com a entidade.');
    } else if (POINT_DIMENSIONS.has(d.type)) {
      if(!d.a||!d.b)throw Error('Cota entre pontos requer duas referências.');
      const pa=entityEndpoint(getEntity(s,d.a.entity),d.a.point),pb=entityEndpoint(getEntity(s,d.b.entity),d.b.point);
      if(d.a.entity===d.b.entity&&d.a.point===d.b.point)throw Error('Selecione dois pontos diferentes.');
      if(!pa.every(finite)||!pb.every(finite))throw Error('Referência de ponto inválida.');
    } else if(d.type==='angleBetweenLines') {
      if(typeof d.first!=='string'||typeof d.second!=='string'||d.first===d.second)throw Error('Cota angular requer duas linhas diferentes.');
      const a=getEntity(s,d.first),b=getEntity(s,d.second);
      if(a.type!=='line'||b.type!=='line')throw Error('Cota angular requer duas linhas.');
      if(d.value>180)throw Error('A cota angular deve ficar entre 0° e 180°.');
    } else throw Error('Tipo de cota não suportado: '+d.type);
  }
  return true;
}
