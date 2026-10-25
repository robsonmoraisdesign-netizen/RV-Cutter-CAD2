import assert from 'node:assert/strict';
import {createSketch,line,circle,addEntity,addConstraint,addDimension,rectangle} from './src/sketch/model.mjs';
import {solveSketch} from './src/sketch/solver.mjs';
import {resolveProfiles} from './src/sketch/profile.mjs';

const len=e=>Math.hypot(e.end[0]-e.start[0],e.end[1]-e.start[1]);
const cross=(a,b)=>(a.end[0]-a.start[0])*(b.end[1]-b.start[1])-(a.end[1]-a.start[1])*(b.end[0]-b.start[0]);
const dot=(a,b)=>(a.end[0]-a.start[0])*(b.end[0]-b.start[0])+(a.end[1]-a.start[1])*(b.end[1]-b.start[1]);

{
 const s=createSketch(),a=line([0,0],[20,0],{id:'a'}),b=line([0,10],[12,18],{id:'b'});addEntity(s,a);addEntity(s,b);addConstraint(s,'parallel',{first:'a',second:'b'});
 const r=solveSketch(s);assert(r.converged);assert.ok(Math.abs(cross(...r.sketch.entities))<1e-5);
}
{
 const s=createSketch(),a=line([0,0],[20,0],{id:'a'}),b=line([5,5],[18,9],{id:'b'});addEntity(s,a);addEntity(s,b);addConstraint(s,'perpendicular',{first:'a',second:'b'});
 const r=solveSketch(s);assert(r.converged);assert.ok(Math.abs(dot(...r.sketch.entities))<1e-5);
}
{
 const s=createSketch(),a=line([0,0],[30,0],{id:'a'}),b=line([0,5],[7,5],{id:'b'});addEntity(s,a);addEntity(s,b);addConstraint(s,'equal',{first:'a',second:'b'});
 const r=solveSketch(s);assert(r.converged);assert.ok(Math.abs(len(r.sketch.entities[0])-len(r.sketch.entities[1]))<1e-5);
}
{
 const s=createSketch();addEntity(s,circle([0,0],10,{id:'a'}));addEntity(s,circle([30,20],4,{id:'b'}));addConstraint(s,'concentric',{first:'a',second:'b'});
 const r=solveSketch(s);assert(r.converged);assert.ok(Math.hypot(...r.sketch.entities[1].center.map((v,i)=>v-r.sketch.entities[0].center[i]))<1e-6);
}
{
 const s=createSketch(),a=line([0,0],[20,0],{id:'a'}),b=line([5,12],[15,17],{id:'b'});addEntity(s,a);addEntity(s,b);addConstraint(s,'collinear',{first:'a',second:'b'});
 const r=solveSketch(s);assert(r.converged);const [aa,bb]=r.sketch.entities;assert.ok(Math.abs(cross(aa,bb))<1e-5);assert.ok(Math.abs(cross(aa,{start:aa.start,end:bb.start}))<1e-5);
}
{
 const s=createSketch();addEntity(s,line([-20,0],[20,0],{id:'line'}));addEntity(s,circle([3,15],5,{id:'circle'}));addConstraint(s,'tangent',{first:'line',second:'circle'});
 const r=solveSketch(s);assert(r.converged);const [l,c]=r.sketch.entities;const distance=Math.abs((l.end[0]-l.start[0])*(c.center[1]-l.start[1])-(l.end[1]-l.start[1])*(c.center[0]-l.start[0]))/len(l);assert.ok(Math.abs(distance-c.radius)<1e-5);
}
{
 const s=createSketch();rectangle(s,[0,0],[20,10]);addEntity(s,circle([50,50],8,{id:'construction',construction:true}));
 assert.equal(resolveProfiles(s).length,1);
}
{
 const s=createSketch();addEntity(s,line([0,0],[10,0],{id:'a'}));addDimension(s,'lineLength',{entity:'a',value:25,driving:false});
 const r=solveSketch(s);assert(r.converged);assert.ok(Math.abs(len(r.sketch.entities[0])-10)<1e-9);
}
console.log('Sketch advanced constraints and construction geometry: PASS');

