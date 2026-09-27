import assert from 'node:assert/strict';
import {createSketch,line,circle,arc,addEntity,addConstraint,addDimension,validateSketch} from './src/sketch/model.mjs';
import {solveSketch} from './src/sketch/solver.mjs';
import {resolveProfiles,normalizeProfiles} from './src/sketch/profile.mjs';

const s=createSketch();
const a=line([0,0],[40,7],{id:'a'});
const b=line([40,7],[40,40],{id:'b'});
const c=line([40,40],[0,40],{id:'c'});
const d=line([0,40],[0,0],{id:'d'});
[a,b,c,d].forEach(e=>addEntity(s,e));
addConstraint(s,'horizontal',{entity:'a'});
addConstraint(s,'coincident',{a:{entity:'a',point:'end'},b:{entity:'b',point:'start'}});
addDimension(s,'lineLength',{entity:'a',value:60});
validateSketch(s);

const solved=solveSketch(s);
assert.equal(solved.converged,true);
const sa=solved.sketch.entities.find(e=>e.id==='a');
assert.ok(Math.abs(sa.start[1]-sa.end[1])<1e-6);
assert.ok(Math.abs(Math.hypot(sa.end[0]-sa.start[0],sa.end[1]-sa.start[1])-60)<1e-5);

const circles=createSketch();
addEntity(circles,circle([10,5],20,{id:'circle'}));
addDimension(circles,'circleRadius',{entity:'circle',value:25});
const cs=solveSketch(circles).sketch;
assert.equal(cs.entities[0].radius,25);
const cp=resolveProfiles(cs,{curveSegments:48});
assert.equal(cp.length,1);
assert.ok(cp[0].length>=48);

const square=createSketch();
[
 line([0,0],[60,0],{id:'l1'}),line([60,0],[60,40],{id:'l2'}),
 line([60,40],[0,40],{id:'l3'}),line([0,40],[0,0],{id:'l4'})
].forEach(e=>addEntity(square,e));
const profiles=resolveProfiles(square);
assert.equal(profiles.length,1);
const normalized=normalizeProfiles(profiles);
assert.equal(normalized.size,60);
assert.ok(Math.abs(normalized.bounds.width-60)<1e-9);
assert.ok(Math.abs(normalized.bounds.height-40)<1e-9);

const arcs=createSketch();
addEntity(arcs,arc([0,0],10,0,Math.PI,{id:'arc1'}));
assert.doesNotThrow(()=>validateSketch(arcs));

console.log('Sketch Phase 1 core: PASS');
