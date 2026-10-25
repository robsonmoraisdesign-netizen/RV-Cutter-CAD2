import {sketchCommand} from './rust-kernel.mjs';
const cache=new WeakMap();
function report(s,solution){if(solution?.engine)return solution;const key=JSON.stringify(s);let entry=cache.get(s);if(!entry||entry.key!==key){entry={key,value:sketchCommand('solve',s)};cache.set(s,entry);}return entry.value;}
export function sketchStatus(s,solution){if(!s.entities.length)return {state:'free',label:'Sketch vazio',dof:0};const r=report(s,solution);if(!r.converged)return {state:'conflict',label:'Conflito de restrições',dof:null};return {state:r.dof===0?'defined':s.constraints.length||s.dimensions.length?'partial':'free',label:r.dof===0?'Totalmente definido':s.constraints.length||s.dimensions.length?'Parcialmente definido':'Livre',dof:r.dof};}
export function entityStates(s,solution){const r=report(s,solution);return new Map(s.entities.map(e=>[e.id,!r.converged?'conflict':r.determined?.[e.id]?'defined':'under']));}
