import assert from 'node:assert/strict';
import {createSketch,sketchPoint,line,circle,bezier,addEntity,addConstraint} from './src/sketch/model.mjs';
import {solveSketch} from './src/sketch/solver.mjs';
import {entityStates,sketchStatus} from './src/sketch/diagnostics.mjs';
import {trimEntity,extendLine} from './src/sketch/operations.mjs';
import {resolveProfiles} from './src/sketch/profile.mjs';
import {scaleSketch} from './src/sketch/document.mjs';

const d=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);

// Point remains semantic and can be constrained to another entity's midpoint.
{
 const s=createSketch(),base=line([0,0],[20,0],{id:'base-point'}),p=sketchPoint([4,6],{id:'point'});
 addEntity(s,base);addEntity(s,p);addConstraint(s,'midpoint',{point:{entity:'point',point:'point'},line:'base-point'});
 const solved=solveSketch(s);
 assert.equal(solved.sketch.entities.find(e=>e.id==='point').type,'point');
 const l=solved.sketch.entities.find(e=>e.id==='base-point');assert.ok(d(solved.sketch.entities.find(e=>e.id==='point').position,l.start.map((v,i)=>(v+l.end[i])/2))<1e-6);
}

// Midpoint is a persistent geometric relation.
{
 const s=createSketch(),base=line([0,0],[40,0],{id:'base'}),probe=line([20,20],[20,30],{id:'probe'});
 addEntity(s,base);addEntity(s,probe);
 addConstraint(s,'midpoint',{point:{entity:'probe',point:'start'},line:'base'});
 const solved=solveSketch(s);
 assert.equal(solved.converged,true);
 const l=solved.sketch.entities.find(e=>e.id==='base');assert.ok(d(solved.sketch.entities.find(e=>e.id==='probe').start,l.start.map((v,i)=>(v+l.end[i])/2))<1e-6);
}

// Entity state reporting distinguishes fully constrained components.
{
 const s=createSketch(),e=line([0,0],[20,0],{id:'fixed-line'});addEntity(s,e);addConstraint(s,'fixed',{entity:e.id});
 const solved=solveSketch(s),states=entityStates(solved.sketch,solved);
 assert.equal(states.get(e.id),'defined');
 assert.equal(sketchStatus(solved.sketch,solved).state,'defined');
}

// Semantic trim: crossing lines split/remove only the clicked segment.
{
 const s=createSketch();
 addEntity(s,line([-20,0],[20,0],{id:'target'}));
 addEntity(s,line([-5,-20],[-5,20],{id:'cut-a',construction:false}));
 addEntity(s,line([5,-20],[5,20],{id:'cut-b',construction:false}));
 const result=trimEntity(s,'target',[0,0]);
 assert.equal(result.removed,false);
 assert.equal(result.split,true);
 const horizontals=s.entities.filter(e=>e.type==='line'&&Math.abs(e.start[1]-e.end[1])<1e-8);
 assert.equal(horizontals.length,2);
 assert.ok(horizontals.every(e=>!(Math.min(e.start[0],e.end[0])<0&&Math.max(e.start[0],e.end[0])>0)));
}

// Semantic extend: the clicked endpoint reaches the nearest boundary.
{
 const s=createSketch();
 addEntity(s,line([0,0],[10,0],{id:'target'}));
 addEntity(s,line([25,-10],[25,10],{id:'limit'}));
 const result=extendLine(s,'target',[10,0]);
 assert.equal(result.endpoint,'end');
 assert.ok(d(s.entities.find(e=>e.id==='target').end,[25,0])<1e-6);
}

// Bezier remains semantic and can participate in a closed manufacturing profile.
{
 const s=createSketch();
 const curve=bezier([[0,0],[20,30],[40,0]],{id:'curve'});
 addEntity(s,curve);
 addEntity(s,line([40,0],[0,0],{id:'close'}));
 const profiles=resolveProfiles(s,{curveSegments:72});
 assert.equal(s.entities.find(e=>e.id==='curve').type,'bezier');
 assert.deepEqual(s.entities.find(e=>e.id==='curve').points,[[0,0],[20,30],[40,0]]);
 assert.equal(profiles.length,1);
 assert.ok(profiles[0].length>20);
}

// Bezier control points scale with the parametric object size.
{
 const s=createSketch();addEntity(s,bezier([[0,0],[10,20],[30,0]],{id:'scaled'}));s.profileSize=30;s.profileCenter=[0,0];s.legacyLoops=[];
 scaleSketch(s,2);
 assert.deepEqual(s.entities[0].points,[[0,0],[20,40],[60,0]]);
 assert.equal(s.profileSize,60);
}

console.log('Sketch Phase 2 — midpoint, states, trim, extend and Bezier: PASS');

