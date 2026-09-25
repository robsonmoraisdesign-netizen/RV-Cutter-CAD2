import assert from 'node:assert/strict';
import {kernel,build,defaults} from './src/geometry.mjs';
const m=await kernel(), loops=[[[-.5,-.5],[.5,-.5],[.5,.5],[-.5,.5]]];
const width=part=>part.bounds.max[0]-part.bounds.min[0];
const span=poly=>Math.max(...poly.map(v=>v[0]))-Math.min(...poly.map(v=>v[0]));
for(const inset of [0,1]) for(const outlineOffset of [0,1.5]){
  const p={...defaults,size:40,mode:'separate',stampInset:inset,outlineOffset};
  const before=build(m,loops,p), after=build(m,loops,{...p,stampExpansion:2});
  const cutter0=before.parts.find(x=>x.name==='Cortador'), cutter1=after.parts.find(x=>x.name==='Cortador');
  const stamp0=before.parts.find(x=>x.name==='Carimbo'), stamp1=after.parts.find(x=>x.name==='Carimbo');
  assert.ok(Math.abs((width(cutter1)-width(cutter0))-4)<.01,'cortador deve crescer 2 mm por lado');
  assert.ok(Math.abs((width(stamp1)-width(stamp0))-4)<.01,'base do carimbo deve crescer 2 mm por lado');
  assert.ok(Math.abs((span(after.cuttingOutline[0])-span(before.cuttingOutline[0]))-4)<.01,'linha interna da lâmina deve acompanhar expansão');
  assert.equal(cutter1.stats.open,0); assert.equal(cutter1.stats.nonmanifold,0); assert.equal(cutter1.bodies,1);
  assert.equal(stamp1.stats.open,0); assert.equal(stamp1.stats.nonmanifold,0); assert.equal(stamp1.bodies,1);
  // A diferença entre a linha interna do cortador e a base do carimbo fica constante:
  // ambos recebem exatamente o mesmo delta de expansão.
  const gap0=span(before.cuttingOutline[0])-width(stamp0);
  const gap1=span(after.cuttingOutline[0])-width(stamp1);
  assert.ok(Math.abs(gap1-gap0)<.01,'folga relativa deve ser preservada');
  console.log('PASS linked expansion', {inset,outlineOffset,gap0,gap1});
}
// Carimbo isolado continua expandindo somente a própria base.
{
  const p={...defaults,size:40,mode:'stamp'}, a=build(m,loops,p), b=build(m,loops,{...p,stampExpansion:2});
  assert.ok(Math.abs((width(b.parts[0])-width(a.parts[0]))-4)<.01);
}
// Cortador isolado e integrado não usam um valor de expansão de carimbo residual.
for(const mode of ['cutter','integrated']){
  const a=build(m,loops,{...defaults,size:40,mode}), b=build(m,loops,{...defaults,size:40,mode,stampExpansion:2});
  assert.deepEqual(a.parts[0].positions,b.parts[0].positions);
  assert.deepEqual(a.parts[0].indices,b.parts[0].indices);
}
console.log('PASS stamp-only / cutter-only / integrated compatibility');
