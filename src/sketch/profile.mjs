import {entityEndpoint,validateSketch} from './model.mjs';

const near=(a,b,t)=>Math.hypot(a[0]-b[0],a[1]-b[1])<=t;
const clone=p=>[p[0],p[1]];

function arcPoints(e,segments){
  let a0=e.startAngle,a1=e.endAngle;
  let sweep=a1-a0;
  if(e.ccw!==false){while(sweep<=0)sweep+=Math.PI*2;}
  else{while(sweep>=0)sweep-=Math.PI*2;}
  const n=Math.max(3,Math.ceil(Math.abs(sweep)/(Math.PI*2)*segments));
  return Array.from({length:n+1},(_,i)=>{
    const a=a0+sweep*i/n;
    return [e.center[0]+Math.cos(a)*e.radius,e.center[1]+Math.sin(a)*e.radius];
  });
}

function segmentFromEntity(e,curveSegments){
  if(e.construction)return null;
  if(e.type==='line')return {id:e.id,points:[clone(e.start),clone(e.end)]};
  if(e.type==='arc')return {id:e.id,points:arcPoints(e,curveSegments)};
  return null;
}

export function resolveProfiles(sketch,{curveSegments=96,tolerance=1e-4}={}){
  validateSketch(sketch);
  const profiles=[];
  for(const e of sketch.entities){
    if(e.construction)continue;
    if(e.type==='circle'){
      const n=Math.max(24,curveSegments);
      profiles.push(Array.from({length:n},(_,i)=>{
        const a=Math.PI*2*i/n;
        return [e.center[0]+Math.cos(a)*e.radius,e.center[1]+Math.sin(a)*e.radius];
      }));
    }
  }

  const pool=sketch.entities.map(e=>segmentFromEntity(e,curveSegments)).filter(Boolean);
  while(pool.length){
    const first=pool.shift();
    const chain=first.points.map(clone);
    let progress=true;
    while(progress&&pool.length&&!near(chain[0],chain.at(-1),tolerance)){
      progress=false;
      for(let i=0;i<pool.length;i++){
        const s=pool[i],a=s.points[0],b=s.points.at(-1),tail=chain.at(-1);
        if(near(tail,a,tolerance)){
          chain.push(...s.points.slice(1).map(clone));pool.splice(i,1);progress=true;break;
        }
        if(near(tail,b,tolerance)){
          chain.push(...s.points.slice(0,-1).reverse().map(clone));pool.splice(i,1);progress=true;break;
        }
      }
    }
    if(near(chain[0],chain.at(-1),tolerance)){
      chain.pop();
      if(chain.length>=3)profiles.push(chain);
    }
  }
  return profiles;
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
