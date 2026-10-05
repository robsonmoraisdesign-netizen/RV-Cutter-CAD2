import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createSketch,line,circle,sketchPoint,addEntity,addDimension,removeEntity,validateSketch,dimensionEntityIds} from './src/sketch/model.mjs';
import {solveSketch} from './src/sketch/solver.mjs';
import {scaleSketch} from './src/sketch/document.mjs';
import {sketchStatus} from './src/sketch/diagnostics.mjs';

const near=(a,b,eps=1e-6)=>Math.abs(a-b)<=eps;

{
 const s=createSketch(),a=sketchPoint([0,0]),b=sketchPoint([3,4]);addEntity(s,a);addEntity(s,b);
 addDimension(s,'pointDistance',{a:{entity:a.id,point:'point'},b:{entity:b.id,point:'point'},value:10,position:[5,6]});
 const r=solveSketch(s);const q=r.sketch.entities.find(e=>e.id===b.id);
 assert.ok(r.converged&&near(Math.hypot(q.position[0],q.position[1]),10),'point distance must drive geometry');
 assert.deepEqual(dimensionEntityIds(r.sketch.dimensions[0]),[a.id,b.id]);
 validateSketch(r.sketch);
}
{
 const s=createSketch(),a=sketchPoint([1,2]),b=sketchPoint([4,8]);addEntity(s,a);addEntity(s,b);
 addDimension(s,'horizontalDistance',{a:{entity:a.id,point:'point'},b:{entity:b.id,point:'point'},value:12});
 let r=solveSketch(s);let q=r.sketch.entities.find(e=>e.id===b.id);assert.ok(near(Math.abs(q.position[0]-1),12)&&near(q.position[1],8));
 r.sketch.dimensions[0].type='verticalDistance';r.sketch.dimensions[0].value=9;r=solveSketch(r.sketch);q=r.sketch.entities.find(e=>e.id===b.id);assert.ok(near(Math.abs(q.position[1]-2),9));
}
{
 const s=createSketch(),c=circle([0,0],4);addEntity(s,c);addDimension(s,'circleDiameter',{entity:c.id,value:20,position:[12,4]});
 const r=solveSketch(s),cc=r.sketch.entities.find(e=>e.id===c.id);assert.ok(near(cc.radius,10),'diameter must drive radius to half value');
}
{
 const s=createSketch(),a=line([0,0],[10,0]),b=line([0,0],[5,5]);addEntity(s,a);addEntity(s,b);addDimension(s,'angleBetweenLines',{first:a.id,second:b.id,value:30,position:[4,4]});
 const r=solveSketch(s),bb=r.sketch.entities.find(e=>e.id===b.id),deg=Math.abs(Math.atan2(bb.end[1]-bb.start[1],bb.end[0]-bb.start[0])*180/Math.PI);
 assert.ok(r.converged&&near(deg,30,1e-4),'angular dimension must rotate second line to requested angle');
 const scaled=scaleSketch(structuredClone(r.sketch),2);assert.ok(near(scaled.dimensions[0].value,30),'angular value must not scale');assert.deepEqual(scaled.dimensions[0].position,[8,8]);
}
{
 const s=createSketch(),a=sketchPoint([0,0]),b=sketchPoint([5,0]);addEntity(s,a);addEntity(s,b);addDimension(s,'pointDistance',{a:{entity:a.id,point:'point'},b:{entity:b.id,point:'point'},value:5});
 assert.doesNotThrow(()=>sketchStatus(s,null));removeEntity(s,a.id);assert.equal(s.dimensions.length,0,'removing a referenced entity must remove its dimension');
}
{
 const model=fs.readFileSync('src/sketch/model.mjs','utf8'),solver=fs.readFileSync('src/sketch/solver.mjs','utf8'),controller=fs.readFileSync('src/sketch/controller.mjs','utf8'),editor=fs.readFileSync('src/editor.mjs','utf8'),html=fs.readFileSync('app/index.html','utf8');
 for(const token of ['horizontalDistance','verticalDistance','pointDistance','circleDiameter','angleBetweenLines'])assert(model.includes(token)&&solver.includes(token),token+' must be implemented in model and solver');
 assert(controller.includes('dimensionPreview')&&controller.includes('dimensionSpec'),'controller must expose persistent multi-reference dimension workflow');
 assert(editor.includes('resolveDimensionDraft')&&editor.includes('data-dimension-id')&&editor.includes('pickDimensionPoint'),'editor must support select → place → edit workflow');
 assert(editor.includes('dimensionDraft.hoverPosition')&&!editor.includes("openInlineDimension(entity,e.clientX,e.clientY);return;}\n  if(tool==='point'"),'dimension placement must not use the old immediate entity-only path');
 assert(html.includes('sketchInlineDimensionUnit')&&html.includes('clique no vazio para posicionar'),'dimension UI must expose dynamic units and placement guidance');
}

console.log('PASS 14.28.19: horizontal, vertical, point, diameter and angular Sketch dimensions are persistent and editable.');
