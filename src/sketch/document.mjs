import {sketchCommand} from './rust-kernel.mjs';
import {createSketch,cloneSketch,validateSketch} from './model.mjs';
import {solveSketch} from './solver.mjs';
import {resolveProfiles,normalizeProfiles} from './profile.mjs';
export function sketchFromObject(o){
 const s=o.sketch?cloneSketch(o.sketch):createSketch();
 if(!o.sketch)s.legacyLoops=o.loops.map(p=>p.map(([x,y])=>[x*o.params.size,y*o.params.size]));
 s.legacyLoops??=[];s.profileSize??=o.params.size; s.profileCenter??=[0,0];
 const scaled=scaleSketch(s,o.params.size/s.profileSize);
 return scaled.legacyLoops.length?sketchCommand('import',scaled).sketch:scaled;
}
export function scaleSketch(s,k){
 if(!(k>0&&Number.isFinite(k)))throw Error('Escala do Sketch inválida.');
 function scale(e){if(e.position)e.position=e.position.map(v=>v*k);if(e.start)e.start=e.start.map(v=>v*k);if(e.end)e.end=e.end.map(v=>v*k);if(e.center)e.center=e.center.map(v=>v*k);if(e.points)e.points=e.points.map(p=>p.map(v=>v*k));if(e.radius)e.radius*=k;}
 s.entities.forEach(scale);s.constraints.forEach(c=>{if(c.geometry)scale(c.geometry)});s.dimensions.forEach(d=>{if(d.type!=='angleBetweenLines')d.value*=k;if(d.position)d.position=d.position.map(v=>v*k);});
 s.legacyLoops=(s.legacyLoops||[]).map(p=>p.map(v=>v.map(x=>x*k)));s.profileCenter=(s.profileCenter||[0,0]).map(v=>v*k);s.profileSize=(s.profileSize||1)*k;return s;
}
export function resolveDocument(input,changedIds=null){
 validateSketch(input);const solution=solveSketch(input,{changedIds});
 if(!solution.converged)throw Error('Conflito de restrições: a alteração não foi aplicada. Remova ou ajuste uma restrição.');
 const s=solution.sketch,profiles=resolveProfiles(s),legacy=s.legacyLoops||[];
 const all=[...legacy,...profiles];const n=normalizeProfiles(all);
 s.profileCenter=n.bounds?[(n.bounds.minX+n.bounds.maxX)/2,(n.bounds.minY+n.bounds.maxY)/2]:(s.profileCenter||[0,0]);
 s.profileSize=n.size||s.profileSize||75;
 return {sketch:s,loops:n.loops,size:s.profileSize,solution};
}

