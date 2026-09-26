export const SKETCH_SCHEMA_VERSION=1;

let seq=0;
const id=(prefix='sk')=>`${prefix}-${(++seq).toString(36)}`;

const point=p=>{
  if(!Array.isArray(p)||p.length!==2||!p.every(Number.isFinite))throw Error('Ponto inválido.');
  return [Number(p[0]),Number(p[1])];
};

export function createSketch({units='mm'}={}){
  return {schemaVersion:SKETCH_SCHEMA_VERSION,units,entities:[],constraints:[],dimensions:[]};
}

export function line(start,end,options={}){
  return {id:options.id||id('line'),type:'line',start:point(start),end:point(end),construction:!!options.construction};
}

export function circle(center,radius,options={}){
  if(!Number.isFinite(radius)||radius<=0)throw Error('Raio inválido.');
  return {id:options.id||id('circle'),type:'circle',center:point(center),radius:Number(radius),construction:!!options.construction};
}

export function arc(center,radius,startAngle,endAngle,options={}){
  if(!Number.isFinite(radius)||radius<=0)throw Error('Raio inválido.');
  for(const v of [startAngle,endAngle])if(!Number.isFinite(v))throw Error('Ângulo inválido.');
  return {id:options.id||id('arc'),type:'arc',center:point(center),radius:Number(radius),startAngle:Number(startAngle),endAngle:Number(endAngle),ccw:options.ccw!==false,construction:!!options.construction};
}

export function addEntity(sketch,entity){
  if(sketch.entities.some(e=>e.id===entity.id))throw Error('ID de entidade duplicado.');
  sketch.entities.push(structuredClone(entity));
  return entity.id;
}

export function addConstraint(sketch,type,data={}){
  const c={id:data.id||id('c'),type,...structuredClone(data)};
  delete c.entityData;
  sketch.constraints.push(c);
  return c.id;
}

export function addDimension(sketch,type,data={}){
  if(!Number.isFinite(data.value)||data.value<=0)throw Error('Valor de cota inválido.');
  const d={id:data.id||id('d'),type,...structuredClone(data),value:Number(data.value),driving:data.driving!==false};
  sketch.dimensions.push(d);
  return d.id;
}

export function getEntity(sketch,entityId){
  const e=sketch.entities.find(x=>x.id===entityId);
  if(!e)throw Error(`Entidade não encontrada: ${entityId}`);
  return e;
}

export function cloneSketch(sketch){return structuredClone(sketch);}

export function validateSketch(sketch){
  if(!sketch||sketch.schemaVersion!==SKETCH_SCHEMA_VERSION)throw Error('Versão de Sketch inválida.');
  if(sketch.units!=='mm')throw Error('A Fase 1 usa milímetros como unidade nativa.');
  const ids=new Set();
  for(const e of sketch.entities){
    if(!e?.id||ids.has(e.id))throw Error('Entidade com ID inválido ou duplicado.');
    ids.add(e.id);
    if(e.type==='line'){point(e.start);point(e.end);}
    else if(e.type==='circle'){point(e.center);if(!(e.radius>0&&Number.isFinite(e.radius)))throw Error('Círculo inválido.');}
    else if(e.type==='arc'){point(e.center);if(!(e.radius>0&&Number.isFinite(e.radius))||![e.startAngle,e.endAngle].every(Number.isFinite))throw Error('Arco inválido.');}
    else throw Error(`Entidade não suportada na Fase 1: ${e.type}`);
  }
  for(const c of sketch.constraints){
    if(!c?.id||ids.has(c.id))throw Error('Restrição com ID inválido ou duplicado.');
    ids.add(c.id);
  }
  for(const d of sketch.dimensions){
    if(!d?.id||ids.has(d.id))throw Error('Cota com ID inválido ou duplicado.');
    ids.add(d.id);
    if(!(d.value>0&&Number.isFinite(d.value)))throw Error('Cota inválida.');
  }
  return true;
}

export function entityEndpoint(entity,which){
  if(entity.type==='line'){
    if(which==='start')return [...entity.start];
    if(which==='end')return [...entity.end];
  }
  if(entity.type==='arc'){
    const a=which==='start'?entity.startAngle:entity.endAngle;
    if(which==='start'||which==='end')return [entity.center[0]+Math.cos(a)*entity.radius,entity.center[1]+Math.sin(a)*entity.radius];
  }
  if(entity.type==='circle'&&which==='center')return [...entity.center];
  throw Error(`Referência de ponto inválida: ${entity.type}.${which}`);
}
