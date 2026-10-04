import assert from 'node:assert/strict';
import {createSketch} from './src/sketch/model.mjs';
import {createSketchController} from './src/sketch/controller.mjs';

let o={loops:[],params:{size:75},sketch:createSketch()},history=0;
const api={object:()=>o,history:()=>history++,changed:()=>{},status:s=>{throw new Error(s)}};
const c=createSketchController(api);
assert.equal(c.create('line',[0,0],[20,0],null,{autoConstraint:'horizontal'}),true);
const first=o.sketch.entities[0];
assert.equal(first.type,'line');
assert(o.sketch.constraints.some(x=>x.type==='horizontal'&&x.entity===first.id));
assert.equal(c.create('line',[20,0],[20,20],null,{autoConstraint:'vertical',startRef:{entity:first.id,point:'end'}}),true);
const second=o.sketch.entities[1];
const coincident=o.sketch.constraints.find(x=>x.type==='coincident'&&x.a.entity===second.id);
assert(coincident,'endpoint snap must become a persistent coincidence constraint');
assert.deepEqual(coincident.b,{entity:first.id,point:'end'});
assert.deepEqual(second.start,first.end);
assert.equal(c.create('point',[5,6],null,null,{pointRelation:{type:'origin'}}),true);
const originPoint=o.sketch.entities.at(-1);
assert.deepEqual(originPoint.position,[0,0]);
assert(o.sketch.constraints.some(x=>x.type==='coincidentOrigin'&&x.point.entity===originPoint.id));

assert.equal(c.create('point',[12,4],null,null,{pointRelation:{type:'axis',axis:'x'}}),true);
const onX=o.sketch.entities.at(-1);
assert.equal(onX.position[1],0);
assert(o.sketch.constraints.some(x=>x.type==='pointOnAxis'&&x.axis==='x'&&x.point.entity===onX.id));

assert.equal(c.create('point',[7,9],null,null,{pointRelation:{type:'axis',axis:'y'}}),true);
const onY=o.sketch.entities.at(-1);
assert.equal(onY.position[0],0);
assert(o.sketch.constraints.some(x=>x.type==='pointOnAxis'&&x.axis==='y'&&x.point.entity===onY.id));

console.log('Sketch snap inference persists for entities, origin and X/Y axes: PASS');
