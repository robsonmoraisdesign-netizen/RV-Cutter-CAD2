import {sketchCommand} from './rust-kernel.mjs';
const TAU=Math.PI*2;
function arcSweep(e){let d=(e.endAngle-e.startAngle)%TAU;if(e.ccw!==false){if(d<=0)d+=TAU;}else if(d>=0)d-=TAU;return d;}
function arcPoint(e,t){const a=e.startAngle+arcSweep(e)*t;return [e.center[0]+Math.cos(a)*e.radius,e.center[1]+Math.sin(a)*e.radius];}
function edit(command,sketch,entity,point){const result=sketchCommand(command,sketch,{entity,point});Object.assign(sketch,result.sketch);return result.report;}
export const trimEntity=(s,id,p)=>edit('trim',s,id,p);
export const extendLine=(s,id,p)=>edit('extend',s,id,p);
function bezierPoint(points,t){
 let work=points.map(p=>[...p]);for(let level=work.length-1;level>0;level--)for(let i=0;i<level;i++)work[i]=[work[i][0]*(1-t)+work[i+1][0]*t,work[i][1]*(1-t)+work[i+1][1]*t];return work[0];
}
export function entityBounds(entity){
 if(entity.type==='point')return {minX:entity.position[0],minY:entity.position[1],maxX:entity.position[0],maxY:entity.position[1]};
 if(entity.type==='line')return {minX:Math.min(entity.start[0],entity.end[0]),minY:Math.min(entity.start[1],entity.end[1]),maxX:Math.max(entity.start[0],entity.end[0]),maxY:Math.max(entity.start[1],entity.end[1])};
 if(entity.type==='circle')return {minX:entity.center[0]-entity.radius,minY:entity.center[1]-entity.radius,maxX:entity.center[0]+entity.radius,maxY:entity.center[1]+entity.radius};
 if(entity.type==='arc'){
  const pts=[arcPoint(entity,0),arcPoint(entity,1)];for(let i=1;i<32;i++)pts.push(arcPoint(entity,i/32));
  return {minX:Math.min(...pts.map(p=>p[0])),minY:Math.min(...pts.map(p=>p[1])),maxX:Math.max(...pts.map(p=>p[0])),maxY:Math.max(...pts.map(p=>p[1]))};
 }
 if(entity.type==='bezier'){
  const pts=Array.from({length:49},(_,i)=>bezierPoint(entity.points,i/48));
  return {minX:Math.min(...pts.map(p=>p[0])),minY:Math.min(...pts.map(p=>p[1])),maxX:Math.max(...pts.map(p=>p[0])),maxY:Math.max(...pts.map(p=>p[1]))};
 }
 return null;
}

