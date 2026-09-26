import fs from 'node:fs';
import assert from 'node:assert/strict';
const src=fs.readFileSync(new URL('./src/ui.mjs',import.meta.url),'utf8');
const a=src.indexOf('function exportAlignedRows(objects)');
const b=src.indexOf('async function exportData',a);
assert.ok(a>=0&&b>a,'exportAlignedRows existe no código-fonte');
let exportAlignedRows;
eval(src.slice(a,b).replace('function exportAlignedRows','exportAlignedRows = function'));
function combineParts(parts){let positions=[],indices=[],off=0;for(const {part,position=[0,0,0]} of parts){for(let i=0;i<part.positions.length;i+=part.stride)positions.push(part.positions[i]+position[0],part.positions[i+1]+position[1],part.positions[i+2]+position[2]);for(const index of part.indices)indices.push(index+off);off=positions.length/3;}return {positions:new Float32Array(positions),indices:new Uint32Array(indices),stride:3};}
function rectPart(name,minX,minY,maxX,maxY){const positions=new Float32Array([minX,minY,0,maxX,minY,0,maxX,maxY,0,minX,minY,0,maxX,maxY,0,minX,maxY,0]);return {name,positions,indices:new Uint32Array([0,1,2,3,4,5]),stride:3,bounds:{min:[minX,minY,0],max:[maxX,maxY,1]}};}
const cutter=rectPart('Cortador',-10,-20,30,20),stamp=rectPart('Carimbo',-5,-10,25,15),obj={id:'a',name:'Flor 1',visible:true,result:{parts:[cutter,stamp]}};
const [row]=exportAlignedRows([obj]);
assert.deepEqual(row.parts[0].position,row.parts[1].position,'partes do mesmo objeto compartilham a origem');
const merged=combineParts(row.parts);let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;for(let i=0;i<merged.positions.length;i+=3){minX=Math.min(minX,merged.positions[i]);maxX=Math.max(maxX,merged.positions[i]);minY=Math.min(minY,merged.positions[i+1]);maxY=Math.max(maxY,merged.positions[i+1]);}
assert.ok(Math.abs((minX+maxX)/2)<1e-9&&Math.abs((minY+maxY)/2)<1e-9,'conjunto centrado em XY');
const many=[obj,{...obj,id:'b'},{...obj,id:'c'},{...obj,id:'d'},{...obj,id:'e'}],rows=exportAlignedRows(many);for(const r of rows)assert.deepEqual(r.parts[0].position,r.parts[1].position,'lote preserva o alinhamento interno');
const ys=[...new Set(rows.map(r=>r.position[1]))];for(const y of ys){const xs=rows.filter(r=>r.position[1]===y).map(r=>r.position[0]);assert.ok(Math.abs((Math.min(...xs)+Math.max(...xs))/2)<1e-9,'cada linha do lote está centralizada');}
assert.match(src,/combineParts\(\[p\]\)/,'exportação por peça aplica a mesma origem compartilhada');
assert.ok(!src.includes('const rows=layout(objects.map(o=>({...o,visible:true})),false)'),'exportação não reutiliza layout lado a lado');
console.log('QA exportação centralizada 14.6: OK');
