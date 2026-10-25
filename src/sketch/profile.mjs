import {validateSketch} from './model.mjs';
import {sketchCommand} from './rust-kernel.mjs';
export function resolveProfiles(sketch,{curveSegments=96,tolerance=1e-4}={}){
validateSketch(sketch);if(!Number.isInteger(curveSegments)||curveSegments<8||curveSegments>2048||!Number.isFinite(tolerance)||tolerance<=0)throw Error('Resolução inválida.');return sketchCommand('profiles',sketch);
}
export function normalizeProfiles(profiles){
  const points=profiles.flat();
  if(!points.length)return {loops:[],size:0,bounds:null};
  let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
  for(const [x,y] of points){minX=Math.min(minX,x);minY=Math.min(minY,y);maxX=Math.max(maxX,x);maxY=Math.max(maxY,y);}
  const width=maxX-minX,height=maxY-minY,size=Math.max(width,height);
  if(!(size>0))throw Error('Sketch sem dimensão útil.');
  const cx=(minX+maxX)/2,cy=(minY+maxY)/2;
  return {loops:profiles.map(loop=>loop.map(([x,y])=>[(x-cx)/size,(y-cy)/size])),size,bounds:{minX,minY,maxX,maxY,width,height}};
}

