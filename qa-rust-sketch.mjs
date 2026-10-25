import assert from 'node:assert/strict';
import {createSketch,line,circle,bezier,addEntity,addConstraint,addDimension} from './src/sketch/model.mjs';
import {sketchCommand,sketchEngine} from './src/sketch/rust-kernel.mjs';
import {sketchFromObject,resolveDocument} from './src/sketch/document.mjs';
import {createSketchController} from './src/sketch/controller.mjs';
import {trimEntity,extendLine} from './src/sketch/operations.mjs';
import {resolveProfiles} from './src/sketch/profile.mjs';
import {solveSketch} from './src/sketch/solver.mjs';
import {sketchStatus} from './src/sketch/diagnostics.mjs';
const near=(a,b)=>Math.abs(a-b)<1e-6;
// Imported raster/SVG outlines are the same native entities used by all tools.
let o={loops:[[[0,0],[1,0],[1,1],[0,1]]],params:{size:40}};
const before=JSON.stringify(o),history=[],changes=[];
const api=createSketchController({object:()=>o,history:()=>history.push(structuredClone(o)),changed:x=>changes.push(x),status:()=>{}});
assert.equal(api.native().entities.length,4);assert.equal(api.native().legacyLoops.length,0);assert.equal(JSON.stringify(o),before);
assert(api.movePoint('import-0-0','start',[-10,0]));
assert.deepEqual(o.sketch.entities[3].end,[-10,0]);assert.equal(resolveProfiles(o.sketch).length,1);
o=history.pop();api.reset();assert.equal(JSON.stringify(o),before);
assert(api.create('line',[20,-5],[20,45]));
assert(api.trim('import-0-0',[30,0]));
assert.equal(o.sketch.entities.find(e=>e.id==='import-0-0').end[0],20);
assert.equal(o.sketch.legacyLoops.length,0);assert(changes.at(-1).geometryChanged);
const persisted=JSON.parse(JSON.stringify(o));assert.deepEqual(sketchFromObject(persisted).entities,o.sketch.entities);
// A conflict must not commit geometry or add an undo record.
let fixed=createSketch();addEntity(fixed,circle([0,0],10,{id:'c'}));addConstraint(fixed,'fixed',{entity:'c'});addDimension(fixed,'circleRadius',{entity:'c',value:20});assert.equal(solveSketch(fixed).converged,false);
// Bounded intersections: an infinite continuation of a boundary is NOT a valid limit.
let s=createSketch();addEntity(s,line([0,0],[10,0],{id:'a'}));addEntity(s,line([20,5],[20,10],{id:'b'}));assert.throws(()=>extendLine(s,'a',[10,0]));
addEntity(s,line([30,-5],[30,5],{id:'c'}));extendLine(s,'a',[10,0]);assert.deepEqual(s.entities[0].end,[30,0]);
// Circle trim retains an exact arc, removing just the clicked half.
s=createSketch();addEntity(s,circle([0,0],10,{id:'c'}));addEntity(s,line([-15,0],[15,0],{id:'l'}));trimEntity(s,'c',[0,10]);assert.equal(s.entities[0].type,'arc');assert(near(s.entities[0].radius,10));assert(near(s.entities[0].startAngle,Math.PI));
// Bézier split stays semantic and preserves the two untrimmed pieces.
s=createSketch();addEntity(s,bezier([[0,0],[10,20],[20,0]],{id:'b'}));addEntity(s,line([5,-5],[5,20],{id:'l'}));addEntity(s,line([15,-5],[15,20],{id:'r'}));const report=trimEntity(s,'b',[10,10]);assert(report.split);const curves=s.entities.filter(e=>e.type==='bezier');assert.equal(curves.length,2);assert(near(curves[0].points.at(-1)[0],5));assert(near(curves[1].points[0][0],15));
// Nested boundaries retain both contours for even/odd manufacturing fill.
s=createSketch();addEntity(s,circle([0,0],20,{id:'outer'}));addEntity(s,circle([0,0],10,{id:'hole'}));assert.equal(resolveProfiles(s).length,2);
// Diagnostics reflect in-place model changes.
s=createSketch();addEntity(s,line([0,0],[10,0],{id:'l'}));assert.equal(sketchStatus(s).state,'free');addConstraint(s,'fixed',{entity:'l'});assert.equal(sketchStatus(s).state,'defined');
// Rust boundary rejects invalid and duplicate geometry without trapping WASM.
const invalid=structuredClone(s);invalid.entities.push(structuredClone(invalid.entities[0]));assert.throws(()=>sketchCommand('solve',invalid));assert.equal(solveSketch(s).converged,true);
console.log('PASS Rust/SolidCraft: import, connected drag, trim line/circle/Bézier, bounded extend, constraints, undo snapshot, persistence, holes and validation.',sketchEngine());
