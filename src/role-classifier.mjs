import {contains} from './geometry.mjs';

function insidePolys(polys,p){return !!polys?.length&&polys.reduce((inside,poly)=>inside!==contains(poly,p),false);}
function triangle(part,ids){return ids.map(id=>[part.positions[id*part.stride],part.positions[id*part.stride+1],part.positions[id*part.stride+2]]);}
function normal(pts){const a=pts[0],u=pts[1].map((v,k)=>v-a[k]),v=pts[2].map((q,k)=>q-a[k]),n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]],l=Math.hypot(...n)||1;return n.map(x=>x/l);}

// Visual roles are decided from the final manifold surface, never by drawing an
// extra relief mesh. For engraved relief, sample both sides of a vertical face
// so faces exactly on the relief outline are classified consistently.
export function classifyDisplayRole(part,result,ids){
 const p=result.params,pts=triangle(part,ids),c=[0,0,0];for(const q of pts)for(let k=0;k<3;k++)c[k]+=q[k]/3;
 if(part.name==='Cortador')return c[2]<=p.base+.001?'cutterBase':'blade';
 const integrated=part.name!=='Carimbo',top=integrated?p.base:p.stampBase;
 if(p.reliefInverted){
  const floor=top,ceiling=top+p.relief,epsZ=Math.max(.001,Math.abs(ceiling)*1e-5);
  let cavity=false;
  if(c[2]>=floor-epsZ&&c[2]<=ceiling+epsZ){
   cavity=insidePolys(result.reliefOutline,c);
   if(!cavity){const n=normal(pts),l=Math.hypot(n[0],n[1]);if(l>1e-8){const e=Math.max(.003,(p.size||75)*5e-5),dx=n[0]/l*e,dy=n[1]/l*e;cavity=insidePolys(result.reliefOutline,[c[0]+dx,c[1]+dy])||insidePolys(result.reliefOutline,[c[0]-dx,c[1]-dy]);}}
  }
  if(!integrated)return cavity?'relief':'stampBase';
  if(cavity)return 'relief';
  const insideCut=result.cuttingOutline?.length?insidePolys(result.cuttingOutline,c):false;
  if(c[2]>p.base+.001&&insideCut)return 'stampBase';
 }
 if(!integrated)return c[2]<=p.stampBase+.001?'stampBase':'relief';
 const inside=result.outline?.[0]?contains(result.outline[0],c):true;
 return c[2]<=p.base+.001?(inside?'stampBase':'cutterBase'):(inside?'relief':'blade');
}
