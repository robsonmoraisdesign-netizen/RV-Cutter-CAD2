import {validateSketch} from './sketch/model.mjs';
import Module from 'manifold-3d';
export async function kernel(options={}){const m=await Module(options);m.setup();return m;}
export const LOGO_FONT_IDS=Object.freeze(['helvetiker','helvetiker-bold','optimer','gentilis']);
const normalizeLogoText=value=>String(value??'').replace(/\s+/g,' ').trim().slice(0,32);
export const defaults={size:75,wall:0.8,height:12.5,rim:4,base:2.5,relief:4.5,reliefInverted:false,reliefSeparate:false,reliefOut:4.5,reliefIn:1,clearance:0.9,detailOffset:0,outlineOffset:0,mode:'integrated',mirror:true,threshold:160,tolerance:0.04,stampBase:2.5,stampInset:0,stampExpansion:0,removeOutline:false,outlineBand:0.8,chamfer:false,tip:0.4,chamferHeight:2,bladeReinforcement:false,reinforcementHeight:2,reinforcementWidth:1.5,logoEnabled:false,logoText:'FIORI',logoFont:'helvetiker',logoSize:8,logoHeight:1.2,logoPosition:0,logoOffset:0,wallEdits:[],cornerRadius:2};
export function area(p){return p.reduce((a,v,i)=>{const q=p[(i+1)%p.length];return a+v[0]*q[1]-q[0]*v[1]},0)/2;}
export function simplify(p,eps){if(p.length<5)return p;const seg=(p,a,b)=>{let dx=b[0]-a[0],dy=b[1]-a[1],t=Math.max(0,Math.min(1,((p[0]-a[0])*dx+(p[1]-a[1])*dy)/(dx*dx+dy*dy||1)));return Math.hypot(p[0]-a[0]-t*dx,p[1]-a[1]-t*dy)};const rdp=a=>{let d=0,k=0;for(let i=1;i<a.length-1;i++){let v=seg(a[i],a[0],a.at(-1));if(v>d){d=v;k=i}}return d>eps?[...rdp(a.slice(0,k+1)).slice(0,-1),...rdp(a.slice(k))]:[a[0],a.at(-1)];};let k=1,d=0;for(let i=1;i<p.length;i++){const v=Math.hypot(p[i][0]-p[0][0],p[i][1]-p[0][1]);if(v>d){d=v;k=i}}return [...rdp(p.slice(0,k+1)).slice(0,-1),...rdp([...p.slice(k),p[0]]).slice(0,-1)];}
export function normalize(loops){const all=loops.flat();if(!all.length)throw Error('Nenhum contorno fechado encontrado.');let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;for(const [x,y]of all){minX=Math.min(x,minX);maxX=Math.max(x,maxX);minY=Math.min(y,minY);maxY=Math.max(y,maxY)}const scale=Math.max(maxX-minX,maxY-minY);if(!(scale>0))throw Error('Arte sem dimensão.');return loops.map(p=>p.map(([x,y])=>[(x-(minX+maxX)/2)/scale,(y-(minY+maxY)/2)/scale]));}
// Marching squares with interpolated threshold crossings: no grid-aligned pixel staircases.
export function trace(data,w,h,threshold=160){
 const val=(x,y)=>{if(x<=0||y<=0||x>=w-1||y>=h-1)return 255;let i=(y*w+x)*4,a=data[i+3]/255;return (data[i]*.2126+data[i+1]*.7152+data[i+2]*.0722)*a+255*(1-a)};
 const links=new Map(),coords=new Map(); const H=(x,y)=>`h${x},${y}`,V=(x,y)=>`v${x},${y}`;
 const table={1:[[3,0]],2:[[0,1]],3:[[3,1]],4:[[1,2]],6:[[0,2]],7:[[3,2]],8:[[2,3]],9:[[2,0]],11:[[2,1]],12:[[1,3]],13:[[1,0]],14:[[0,3]]};
 function add(a,b){if(!links.has(a))links.set(a,[]);if(!links.has(b))links.set(b,[]);links.get(a).push(b);links.get(b).push(a)}
 for(let y=0;y<h-1;y++)for(let x=0;x<w-1;x++){
 const v=[val(x,y),val(x+1,y),val(x+1,y+1),val(x,y+1)];const code=v.reduce((n,a,i)=>n+(a<threshold?(1<<i):0),0);if(!code||code===15)continue;
 const keys=[H(x,y),V(x+1,y),H(x,y+1),V(x,y)];const interp=(a,b)=>(threshold-a)/(b-a||1);
 const xy=[[x+interp(v[0],v[1]),y],[x+1,y+interp(v[1],v[2])],[x+interp(v[3],v[2]),y+1],[x,y+interp(v[0],v[3])]];
 let pairs=table[code];if(code===5||code===10){let c=v.reduce((s,n)=>s+n)/4<threshold;pairs=(code===5)===c?[[0,1],[2,3]]:[[3,0],[1,2]]}
 for(const [a,b]of pairs){coords.set(keys[a],xy[a]);coords.set(keys[b],xy[b]);add(keys[a],keys[b]);}}
 const seen=new Set(),loops=[];for(const start of links.keys()){if(seen.has(start))continue;let cur=start,prev=null,p=[];while(!seen.has(cur)){seen.add(cur);p.push(coords.get(cur));let ns=links.get(cur);let next=ns.find(n=>n!==prev);prev=cur;cur=next;if(!cur)break}if(cur===start&&p.length>=8&&Math.abs(area(p))>=3)loops.push(p.map(([x,y])=>[x,-y]));}
 loops.sort((a,b)=>Math.abs(area(b))-Math.abs(area(a)));if(!loops.length)throw Error('Não encontrei linhas escuras. Ajuste o limiar ou use arte preta sobre branco.');return normalize(loops);
}
export function validateProject(d){if(d?.format==='rv-cad-13'&&Array.isArray(d.objects)&&d.objects.length<=1000){for(const o of d.objects){if(o.sketch){validateSketch(o.sketch);if(o.sketch.legacyLoops){let n=0;if(!Array.isArray(o.sketch.legacyLoops))throw Error('Sketch inválido.');for(const p of o.sketch.legacyLoops){if(!Array.isArray(p)||p.length<3)throw Error('Contorno inválido.');n+=p.length;for(const v of p)if(!Array.isArray(v)||v.length!==2||!v.every(Number.isFinite)||v.some(x=>Math.abs(x)>1e6))throw Error('Coordenada inválida.');}if(n>200000)throw Error('Sketch excede 200 mil pontos.');}if(Array.isArray(o.loops)&&o.loops.length===0)continue;}validateProject({format:'rv-cad-12',loops:o.loops});}return d;}if(d?.format!=='rv-cad-12'||!Array.isArray(d.loops)||!d.loops.length)throw Error('Este arquivo não é um projeto RV CAD 12.');let count=0;for(const p of d.loops){if(!Array.isArray(p)||p.length<3)throw Error('Contorno inválido.');for(const v of p){if(v.length!==2||!v.every(Number.isFinite)||v.some(x=>Math.abs(x)>10))throw Error('Coordenada inválida.');}count+=p.length;}if(count>200000)throw Error('Projeto excede o limite de 200 mil pontos.');return d;}
// Triangulate the projected annulus, never pair rings by accumulated perimeter.
// Each bevel triangle stays inside the band between the two offset contours.
// Locally improve annular triangulation without moving the profile boundaries.
// Short diagonals reduce long sliver faces where adjacent offset rings differ in count.
function bandTriangles(m,polys){
 const points=polys.flat(),tri=m.triangulate(polys,1e-8,false).map(t=>Array.from(t));
 const cross=(a,b,c)=>(points[b][0]-points[a][0])*(points[c][1]-points[a][1])-(points[b][1]-points[a][1])*(points[c][0]-points[a][0]);
 const dist=(a,b)=>(points[a][0]-points[b][0])**2+(points[a][1]-points[b][1])**2;
 for(let sweep=0;sweep<12;sweep++){let changed=0;const edges=new Map(),used=new Set();
 for(let i=0;i<tri.length;i++)for(let j=0;j<3;j++){const a=tri[i][j],b=tri[i][(j+1)%3],c=tri[i][(j+2)%3],key=a<b?a+','+b:b+','+a,prev=edges.get(key);if(!prev){edges.set(key,{i,a,b,c});continue;}if(used.has(i)||used.has(prev.i))continue;const d=prev.c;
 if(dist(c,d)+1e-10>=dist(a,b))continue;
 // Both replacement triangles must retain positive projected area.
 if(cross(c,d,b)<=1e-12||cross(d,c,a)<=1e-12)continue;
 tri[i]=[c,d,b];tri[prev.i]=[d,c,a];used.add(i);used.add(prev.i);changed++;}
 if(!changed)break;
 }return tri;
}
function densifyLoop(poly,maxLength=.6){
 const out=[];
 for(let i=0;i<poly.length;i++){
  const a=poly[i],b=poly[(i+1)%poly.length],length=Math.hypot(b[0]-a[0],b[1]-a[1]);
  const steps=Math.max(1,Math.ceil(length/maxLength));
  for(let j=0;j<steps;j++){const t=j/steps;out.push([a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t]);}
 }
 return out;
}

function edgeLogoPlacement(poly,p,profile){
 if(!p.logoEnabled||p.mode==='stamp')return null;
 if(!profile?.loops?.length)throw Error('Perfil vetorial da logo não foi preparado.');
 let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
 for(const [x,y] of poly){minX=Math.min(minX,x);minY=Math.min(minY,y);maxX=Math.max(maxX,x);maxY=Math.max(maxY,y);}
 const center=[(minX+maxX)/2,(minY+maxY)/2],cross=(a,b)=>a[0]*b[1]-a[1]*b[0],n=poly.length;
 // Anchor the perimeter at the visual bottom-center. This makes 0% predictable
 // and lets the position control walk the real cutter border continuously.
 const ray=[0,-1];let anchor=null,segment=0,best=-Infinity;
 for(let i=0;i<n;i++){
  const a=poly[i],b=poly[(i+1)%n],e=[b[0]-a[0],b[1]-a[1]],den=cross(ray,e);
  if(Math.abs(den)<1e-9)continue;
  const ac=[a[0]-center[0],a[1]-center[1]],t=cross(ac,e)/den,u=cross(ac,ray)/den;
  if(t>=0&&u>=-1e-7&&u<=1+1e-7&&t>best){best=t;anchor=[center[0],center[1]-t];segment=i;}
 }
 if(!anchor){
  let idx=0;for(let i=1;i<n;i++)if(poly[i][1]<poly[idx][1]||Math.abs(poly[i][1]-poly[idx][1])<1e-7&&Math.abs(poly[i][0]-center[0])<Math.abs(poly[idx][0]-center[0]))idx=i;
  anchor=poly[idx].slice();segment=(idx+n-1)%n;
 }
 const forward=[anchor];
 for(let step=1;step<=n;step++)forward.push(poly[(segment+step)%n].slice());
 forward.push(anchor);
 const firstVector=path=>{for(let i=1;i<path.length;i++){const dx=path[i][0]-path[0][0],dy=path[i][1]-path[0][1],l=Math.hypot(dx,dy);if(l>1e-8)return [dx/l,dy/l];}return [1,0];};
 // Increasing position starts by moving from the bottom toward the right side.
 let path=forward,ft=firstVector(forward);
 if(ft[0]<-1e-6)path=forward.slice().reverse();
 const lengths=[0];for(let i=1;i<path.length;i++)lengths.push(lengths.at(-1)+Math.hypot(path[i][0]-path[i-1][0],path[i][1]-path[i-1][1]));
 const perimeter=lengths.at(-1)||1,target=perimeter*(p.logoPosition/100);
 let k=1;while(k<lengths.length-1&&lengths[k]<target)k++;
 const a=path[k-1],b=path[k],segLen=Math.max(1e-9,lengths[k]-lengths[k-1]),u=(target-lengths[k-1])/segLen;
 const hit=[a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u],raw=[(b[0]-a[0])/segLen,(b[1]-a[1])/segLen];
 let tangent=raw.slice();if(tangent[0]<0)tangent=[-tangent[0],-tangent[1]];
 const left=[-tangent[1],tangent[0]],radial=[hit[0]-center[0],hit[1]-center[1]],rl=Math.hypot(...radial)||1;
 const radialNormal=[radial[0]/rl,radial[1]/rl],localLeft=[-raw[1],raw[0]],localRight=[raw[1],-raw[0]],probe=Math.max(.03,(p.size||75)*.0008);
 const leftInside=contains(poly,[hit[0]+localLeft[0]*probe,hit[1]+localLeft[1]*probe]);
 const rightInside=contains(poly,[hit[0]+localRight[0]*probe,hit[1]+localRight[1]*probe]);
 // Prefer the side that is geometrically outside the actual contour; radial direction
 // is only a tie-breaker for degenerate/very tight corners.
 let normal;
 if(leftInside!==rightInside)normal=leftInside?localRight:localLeft;
 else normal=(localLeft[0]*radialNormal[0]+localLeft[1]*radialNormal[1])>(localRight[0]*radialNormal[0]+localRight[1]*radialNormal[1])?localLeft:localRight;
 const pad=Math.max(1,Math.min(2.5,p.logoSize*.16)),plaqueW=Math.max(6,profile.width+pad*2),plaqueD=Math.max(5,profile.height+pad*2);
 const overlap=Math.min(1.6,plaqueD*.34),offset=p.logoOffset;
 const plaqueCenter=[hit[0]+normal[0]*(plaqueD/2-overlap+offset),hit[1]+normal[1]*(plaqueD/2-overlap+offset)];
 const localToWorld=(q,c=plaqueCenter)=>[c[0]+q[0]*tangent[0]+q[1]*left[0],c[1]+q[0]*tangent[1]+q[1]*left[1]];
 const roundedRect=(w,h,r=Math.min(2,h*.28),steps=5)=>{
  const pts=[],corners=[[w/2-r,h/2-r,0],[-w/2+r,h/2-r,Math.PI/2],[-w/2+r,-h/2+r,Math.PI],[w/2-r,-h/2+r,Math.PI*1.5]];
  for(const [cx,cy,startAngle] of corners)for(let i=0;i<=steps;i++){const angle=startAngle+i*Math.PI/(2*steps);pts.push([cx+Math.cos(angle)*r,cy+Math.sin(angle)*r]);}
  return pts;
 };
 const plaque=roundedRect(plaqueW,plaqueD).map(q=>localToWorld(q));
 const innerEdge=offset-overlap,connectorLength=Math.max(.8,innerEdge+.9);
 const connectorCenter=[hit[0]+normal[0]*(connectorLength/2-.45),hit[1]+normal[1]*(connectorLength/2-.45)];
 const connectorW=Math.min(plaqueW*.72,Math.max(5,profile.width*.58));
 const connector=roundedRect(connectorW,connectorLength,Math.min(1.2,connectorLength*.28),4).map(q=>localToWorld(q,connectorCenter));
 const textLoops=profile.loops.map(loop=>loop.map(q=>localToWorld(q)));
 return {textLoops,plaque,connector,anchor:hit,tangent,normal,angle:Math.atan2(tangent[1],tangent[0])*180/Math.PI,position:p.logoPosition};
}
export function loft(m,lower,upper,z0,z1,floor=z0-1,intermediate=[]){
 const ccw=p=>area(p)>0?p.map(v=>v.slice()):p.slice().reverse().map(v=>v.slice());
 const profiles=[{poly:lower,z:floor},{poly:lower,z:z0},...intermediate,{poly:upper,z:z1}].map(r=>({...r,poly:ccw(r.poly)}));
 const verts=[],faces=[],starts=[];
 for(const r of profiles){starts.push(verts.length/3);for(const v of r.poly)verts.push(v[0],v[1],r.z);}
 const a=profiles[0].poly,n=a.length;
 for(const f of m.triangulate([a],1e-8,false))faces.push(f[2],f[1],f[0]);
 for(let k=0;k<n;k++){const l=(k+1)%n;faces.push(k,l,n+l,k,n+l,n+k);}
 for(let k=1;k<profiles.length-1;k++){
  const a=profiles[k].poly,b=profiles[k+1].poly,n=a.length,q=b.length;
  const map=i=>i<n?starts[k]+i:starts[k+1]+q-1-(i-n);
  for(const f of bandTriangles(m,[a,b.slice().reverse()]))faces.push(...f.map(map));
 }
 const last=profiles.length-1;for(const f of m.triangulate([profiles[last].poly],1e-8,false))faces.push(...f.map(v=>v+starts[last]));
 return new m.Manifold(new m.Mesh({numProp:3,vertProperties:new Float32Array(verts),triVerts:new Uint32Array(faces)}));
}
export function migrateParams(params={}){const p={...defaults,...params,stampBase:params.stampBase??params.base??defaults.stampBase};
 p.reliefSeparate=!!p.reliefSeparate;
 p.logoEnabled=!!p.logoEnabled;
 p.logoText=normalizeLogoText(p.logoText)||defaults.logoText;
 p.logoFont=LOGO_FONT_IDS.includes(p.logoFont)?p.logoFont:defaults.logoFont;
 p.logoPosition=Math.max(0,Math.min(100,Number(p.logoPosition)||0));
 if(!Number.isFinite(p.reliefOut))p.reliefOut=p.reliefInverted?defaults.relief:p.relief;
 if(!Number.isFinite(p.reliefIn))p.reliefIn=p.reliefInverted?p.relief:Math.min(1,Math.max(.1,(p.mode==='integrated'?p.base:p.stampBase)*.4));
 return p;}
export function build(m,loops,params,ctx=null,options={}){const started=performance.now(),p=migrateParams(params),keep=[];const hold=x=>(keep.push(x),x);const C=m.CrossSection,M=m.Manifold;
 const finite=['size','wall','height','rim','base','stampBase','stampInset','stampExpansion','outlineBand','tip','chamferHeight','reinforcementHeight','reinforcementWidth','logoSize','logoHeight','logoPosition','logoOffset','clearance','detailOffset','outlineOffset','tolerance','cornerRadius','relief'];
 for(const k of finite)if(!Number.isFinite(p[k]))throw Error(`Valor inválido em ${k}: informe um número finito.`);
 const positive=[['size',.1],['wall',.01],['height',.05],['base',.01],['stampBase',.01],['outlineBand',.001],['tip',.001],['chamferHeight',.001],['reinforcementHeight',.001],['reinforcementWidth',.001],['logoSize',1],['logoHeight',.05],['tolerance',.0001],['relief',.001]];
 for(const [k,lo]of positive)if(p[k]<lo)throw Error(`Valor inválido em ${k}: use um valor maior ou igual a ${lo}.`);
 if(p.rim<0||p.cornerRadius<0||p.clearance<0)throw Error('Base de apoio, proteção de cantos e folga não podem ser negativas.');
 if(p.logoOffset< -3||p.logoOffset>20)throw Error('O afastamento da logo deve ficar entre -3 e 20 mm.');
 if(p.logoEnabled&&p.mode!=='stamp'&&p.base+p.logoHeight>=p.height)throw Error('A altura da logo deve terminar abaixo da borda de corte.');
 const reliefBase=p.mode==='integrated'?p.base:p.stampBase;
 if(p.mode!=='stamp'&&p.base>=p.height)throw Error('A base do cortador deve ser menor que a altura total.');
 if(p.mode==='integrated'&&p.base+p.relief>=p.height)throw Error('Base + relevo precisam ficar abaixo da borda de corte.');
 if(p.chamfer&&p.mode!=='stamp'&&(p.tip>p.wall||p.chamferHeight>p.height-p.base))throw Error('O chanfro deve caber acima da base; a ponta não pode superar a espessura da lâmina.');
 if(p.bladeReinforcement&&p.mode!=='stamp'){
  const availableWidth=Math.max(0,Math.max(p.rim,p.wall)-p.wall);
  if(p.reinforcementWidth>availableWidth+1e-6)throw Error('A largura do reforço deve caber dentro da base de apoio. Aumente a base de apoio ou reduza a largura do reforço.');
  const availableHeight=p.height-p.base-(p.chamfer?p.chamferHeight:0);
  if(p.reinforcementHeight>availableHeight+1e-6)throw Error('A altura do reforço deve terminar antes do chanfro da ponta.');
 }
 if(!['integrated','separate','cutter','stamp'].includes(p.mode))throw Error('Modo de peça inválido.');
 try{
 const memo=(node,fn)=>ctx?ctx.memo(node,fn):fn();
 const cachedCutter=p.mode==='separate'||p.mode==='cutter'?ctx?.get('cutter'):null,cachedStamp=(p.mode==='separate'||p.mode==='stamp')&&!p.reliefSeparate?ctx?.get('stamp'):null;
 const src=memo('source',()=>loops.map(l=>simplify(l,p.tolerance/p.size).map(([x,y])=>[x*p.size*(p.mirror?-1:1),y*p.size])).sort((a,b)=>Math.abs(area(b))-Math.abs(area(a))));
 const sourcePoints=src.reduce((n,loop)=>n+loop.length,0),requestedProfile=options.buildProfile||'normal',automaticSafe=requestedProfile==='normal'&&(sourcePoints>1400||src.length>48),buildProfile=requestedProfile==='recovery'?'recovery':requestedProfile==='safe'||automaticSafe?'safe':'normal';
 const roundSegments=buildProfile==='recovery'?64:buildProfile==='safe'?112:256,detailSegments=buildProfile==='recovery'?48:buildProfile==='safe'?80:128,maxChamferProfiles=buildProfile==='recovery'?12:buildProfile==='safe'?24:64;
 const silhouette=section=>{const polys=section.toPolygons().sort((a,b)=>Math.abs(area(b))-Math.abs(area(a)));if(!polys.length)throw Error('O recuo eliminou o contorno. Reduza o valor.');return hold(new C([polys[0]],'EvenOdd'));};
 const linkedCutterExpansion=p.mode==='separate'?p.stampExpansion:0;
 let original=hold(new C([src[0]],'EvenOdd')),outer=hold(new C(memo('outer',()=>silhouette(hold(hold(original.offset(p.outlineOffset+linkedCutterExpansion,'Round',2,roundSegments)).simplify(.002))).toPolygons()),'EvenOdd'));
 let bladeSolid,rimOuter,cutterBaseSection,logoTextSolid,inner,cutter,relief,stamp,stampBaseSolid,reliefPart,bladeProfile=[],reliefOutline=[],logoOutline=cachedCutter?.logoOutline||[],logoPlacement=cachedCutter?.logoPlacement||null,reinforcementRootOutline=[],reinforcementTransitionOutline=[];
 if(p.mode!=='stamp'&&!cachedCutter){
  const innerPolys=memo('inner',()=>{
  inner=silhouette(hold(outer.offset(p.clearance,'Round',2,roundSegments)));
  if(p.cornerRadius>0){
   const radius=p.cornerRadius+p.wall;
   const rounded=hold(hold(inner.offset(radius,'Round',2,roundSegments)).offset(-radius,'Round',2,roundSegments));
   inner=silhouette(hold(C.union([inner,rounded])));
  }
  return inner.toPolygons();});inner=hold(new C(innerPolys,'EvenOdd'));
  if(!Array.isArray(p.wallEdits)||p.wallEdits.length>100)throw Error('Excesso de ajustes locais na lâmina.');
  const makeBladeSection=(width,editScale=1)=>{
   let section=silhouette(hold(inner.offset(width,'Round',2,roundSegments)));
   for(const edit of p.wallEdits){
    if(!Number.isFinite(edit.delta)||Math.abs(edit.delta)>2||!Array.isArray(edit.region)||edit.region.length!==4||!edit.region.flat().every(Number.isFinite))throw Error('Ajuste local inválido.');
    const mask=hold(new C([edit.region.map(([x,y])=>[x*p.size*(p.mirror?-1:1),y*p.size])],'EvenOdd'));
    const modified=hold(section.offset(edit.delta*editScale,'Round',2,roundSegments));
    section=silhouette(hold(C.union([hold(section.subtract(mask)),hold(modified.intersect(mask))])));
   }
   if(p.wallEdits.length){
    const low=Math.max(.3,Math.min(width,Math.max(.3,p.tip+.02)));
    const high=Math.max(5,p.wall+p.reinforcementWidth+2);
    section=silhouette(hold(hold(C.union([section,hold(inner.offset(low,'Round',2,roundSegments))])).intersect(hold(inner.offset(high,'Round',2,roundSegments)))));
   }
   return section;
  };
  const makeBladeOuter=(fraction=1)=>{
   const width=p.chamfer?p.tip+(p.wall-p.tip)*fraction:p.wall;
   return makeBladeSection(width,fraction);
  };
  const makeReinforcementOuter=(fraction=1)=>makeBladeSection(p.wall+p.reinforcementWidth*fraction,1);
  const profiles=memo('blade',()=>{const bladeOuter=makeBladeOuter(),tipOuter=silhouette(hold(inner.offset(p.tip,'Round',2,roundSegments))),rings=[];
   if(p.chamfer&&(p.tip<p.wall-1e-6||p.wallEdits.length)){const count=Math.max(2,Math.min(maxChamferProfiles,Math.ceil((p.wall-p.tip+p.wallEdits.reduce((s,e)=>s+Math.abs(e.delta),0))/.025)));let previous=bladeOuter;
   for(let i=1;i<count;i++){let section=makeBladeOuter(1-i/count);if(p.wallEdits.length)section=silhouette(hold(C.union([hold(section.intersect(previous)),tipOuter])));rings.push({poly:section.toPolygons()[0],fraction:i/count});previous=section;}}
   return {outer:bladeOuter.toPolygons(),tip:tipOuter.toPolygons(),rings};});
  const bladeOuter=hold(new C(profiles.outer,'EvenOdd'));
  rimOuter=hold(new C(memo('rim',()=>silhouette(hold(C.union([hold(inner.offset(Math.max(p.rim,p.wall),'Round',2,roundSegments)),bladeOuter]))).toPolygons()),'EvenOdd'));
  cutterBaseSection=rimOuter;
  if(p.logoEnabled&&p.mode!=='stamp'){
   const logo=edgeLogoPlacement(rimOuter.toPolygons()[0],p,options.logoProfile);
   if(logo){logoPlacement={anchor:logo.anchor,tangent:logo.tangent,normal:logo.normal,angle:logo.angle};
    const plaque=hold(new C([logo.plaque],'EvenOdd')),connector=hold(new C([logo.connector],'EvenOdd'));
    cutterBaseSection=silhouette(hold(C.union([rimOuter,plaque,connector])));
    const logoSection=hold(new C(logo.textLoops,'EvenOdd'));logoOutline=logo.textLoops;
    logoTextSolid=hold(hold(logoSection.extrude(p.logoHeight+Math.min(.02,p.base))).translate([0,0,Math.max(0,p.base-.01)]));
   }
  }
  bladeProfile=hold(bladeOuter.subtract(inner)).toPolygons();
  if(p.bladeReinforcement){reinforcementRootOutline=makeReinforcementOuter(1).toPolygons()[0]||[];reinforcementTransitionOutline=bladeOuter.toPolygons()[0]||[];}
  const savedBlade=ctx?.getSolid?.('bladeSolid');if(savedBlade){bladeSolid=hold(savedBlade.translate([0,0,0]));}else{
  if(p.bladeReinforcement){
   // Reforço segue o mesmo princípio do chanfro:
   // perfis derivados diretamente do mesmo contorno interno e unidos pelo
   // mesmo loft/bandTriangles já usado na ponta da lâmina.
   const reinforcementOuter=makeReinforcementOuter(1);
   reinforcementRootOutline=reinforcementOuter.toPolygons()[0]||[];
   reinforcementTransitionOutline=bladeOuter.toPolygons()[0]||[];
   const rootZ=p.base,reinforcementEnd=p.base+p.reinforcementHeight;
   const intermediate=[];
   const reinforcementSegment=Math.max(.25,Math.min(.7,p.size/180));
   const dense=poly=>densifyLoop(poly,reinforcementSegment);
   const count=Math.max(2,Math.min(maxChamferProfiles,Math.ceil(p.reinforcementWidth/.025)));
   let previous=reinforcementOuter;
   for(let i=1;i<count;i++){
    const fraction=i/count;
    let section=makeReinforcementOuter(1-fraction);
    // Mesma proteção de monotonicidade usada no chanfro quando há edições locais.
    if(p.wallEdits.length)section=silhouette(hold(section.intersect(previous)));
    intermediate.push({poly:dense(section.toPolygons()[0]),z:rootZ+p.reinforcementHeight*fraction});
    previous=section;
   }
   intermediate.push({poly:dense(bladeOuter.toPolygons()[0]),z:reinforcementEnd});

   if(p.chamfer&&(p.tip<p.wall-1e-6||p.wallEdits.length)){
    const zBody=p.height-p.chamferHeight,tipOuter=hold(new C(profiles.tip,'EvenOdd'));
    if(reinforcementEnd<zBody-1e-6)intermediate.push({poly:dense(bladeOuter.toPolygons()[0]),z:zBody});
    for(const r of profiles.rings)intermediate.push({poly:dense(r.poly),z:zBody+p.chamferHeight*r.fraction});
    const continuousBlade=hold(loft(
      m,
      dense(reinforcementOuter.toPolygons()[0]),
      dense(tipOuter.toPolygons()[0]),
      rootZ,
      p.height,
      Math.max(0,rootZ-.02),
      intermediate
    ));
    if(continuousBlade.status()!=='NoError')throw Error('Não foi possível fechar a lâmina com reforço. Reduza a altura ou a largura do reforço.');
    bladeSolid=hold(continuousBlade.subtract(hold(inner.extrude(p.height+1))));
   }else{
    const continuousBlade=hold(loft(
      m,
      dense(reinforcementOuter.toPolygons()[0]),
      dense(bladeOuter.toPolygons()[0]),
      rootZ,
      p.height,
      Math.max(0,rootZ-.02),
      intermediate
    ));
    if(continuousBlade.status()!=='NoError')throw Error('Não foi possível fechar a lâmina com reforço. Reduza a altura ou a largura do reforço.');
    bladeSolid=hold(continuousBlade.subtract(hold(inner.extrude(p.height+1))));
   }
  }else if(p.chamfer&&(p.tip<p.wall-1e-6||p.wallEdits.length)){
   const zBody=p.height-p.chamferHeight,tipOuter=hold(new C(profiles.tip,'EvenOdd')),rings=profiles.rings.map(r=>({poly:r.poly,z:zBody+p.chamferHeight*r.fraction}));
   const taper=hold(loft(m,bladeOuter.toPolygons()[0],tipOuter.toPolygons()[0],zBody,p.height,Math.max(0,p.base-.02),rings));
   if(taper.status()!=='NoError')throw Error('Não foi possível fechar o chanfro. Reduza sua altura ou revise o contorno.');
   bladeSolid=hold(taper.subtract(hold(inner.extrude(p.height+1))));
  }else bladeSolid=hold(hold(hold(bladeOuter.subtract(inner)).extrude(p.height-p.base+Math.min(.02,p.base))).translate([0,0,Math.max(0,p.base-.02)]));
  ctx?.setSolid?.('bladeSolid',bladeSolid.translate([0,0,0]));}
  if(p.mode!=='integrated'){const baseBand=hold((cutterBaseSection||rimOuter).subtract(inner)),baseSolid=hold(baseBand.extrude(p.base));cutter=hold(M.union(logoTextSolid?[bladeSolid,baseSolid,logoTextSolid]:[bladeSolid,baseSolid]));}
 }
 if(p.mode!=='cutter'&&!cachedStamp){
  const artPolys=memo('art',()=>{let ink=hold(new C(src,'EvenOdd'));if(p.detailOffset)ink=hold(ink.offset(p.detailOffset,'Round',2,detailSegments));
  if(p.removeOutline)ink=hold(ink.intersect(hold(original.offset(-p.outlineBand,'Round',2,roundSegments))));
  const footprint=p.mode==='integrated'?outer:silhouette(hold(original.offset(-p.stampInset,'Round',2,roundSegments)));
  const art=hold(ink.intersect(footprint));if(art.isEmpty())throw Error('Nenhum detalhe restou no carimbo. Reduza a remoção de borda ou o recuo.');return art.toPolygons();});
  reliefOutline=artPolys;
  const art=hold(new C(artPolys,'EvenOdd')),zBase=p.mode==='integrated'?p.base:p.stampBase;
  const baseFootprint=hold(new C(memo('footprint',()=>{const footprint=p.mode==='integrated'?outer:silhouette(hold(original.offset(-p.stampInset,'Round',2,roundSegments)));return (p.mode!=='integrated'&&p.stampExpansion>0?silhouette(hold(original.offset(p.stampExpansion-p.stampInset,'Round',2,roundSegments))):footprint).toPolygons();}),'EvenOdd'));
  if(p.mode!=='integrated')stampBaseSolid=hold(baseFootprint.extrude(p.stampBase));
  if(p.reliefInverted){
   // Relevo invertido não cava a base estrutural. A profundidade define uma camada
   // paramétrica acima da base; o desenho é subtraído apenas dessa camada.
   // Assim, base=2,5 mm + profundidade=3 mm mantém 2,5 mm íntegros e cria
   // uma zona gravável de 3 mm acima dela.
   const faceFootprint=p.mode==='integrated'?inner:baseFootprint;
   const face=hold(hold(faceFootprint.extrude(p.relief+.02)).translate([0,0,zBase-.02]));
   relief=hold(hold(art.extrude(p.relief+.02)).translate([0,0,zBase]));
   const engravedFace=hold(face.subtract(relief));
   if(p.mode!=='integrated'){
    stamp=hold(M.union([stampBaseSolid,engravedFace]));
    if(p.reliefSeparate){
     const exactFace=hold(hold(baseFootprint.extrude(p.relief)).translate([0,0,zBase]));
     const engravingTool=hold(hold(art.extrude(p.relief+.02)).translate([0,0,zBase-.01]));
     reliefPart=hold(exactFace.subtract(engravingTool));
    }
   }else stamp=engravedFace;
  }else{
   relief=hold(hold(art.extrude(p.relief+Math.min(.02,zBase))).translate([0,0,Math.max(0,zBase-.02)]));
   if(p.mode!=='integrated'){
    stamp=hold(M.union([stampBaseSolid,relief]));
    if(p.reliefSeparate)reliefPart=hold(hold(art.extrude(p.relief)).translate([0,0,zBase]));
   }
  }
 }
 let parts=[];if(p.mode==='integrated'){const baseSolid=hold((cutterBaseSection||rimOuter).extrude(p.base)),stampSurface=p.reliefInverted?hold(M.union([baseSolid,stamp])):hold(M.union([baseSolid,relief])),integrated=hold(M.union(logoTextSolid?[bladeSolid,stampSurface,logoTextSolid]:[bladeSolid,stampSurface]));parts=[{name:'Cortador integrado',solid:integrated}];}
 else if(p.mode==='separate')parts=p.reliefSeparate?[{name:'Cortador',solid:cutter},{name:'Base do carimbo',solid:stampBaseSolid},{name:'Relevo',solid:reliefPart}]:[{name:'Cortador',solid:cutter},{name:'Carimbo',solid:stamp}];
 else if(p.mode==='stamp')parts=p.reliefSeparate?[{name:'Base do carimbo',solid:stampBaseSolid},{name:'Relevo',solid:reliefPart}]:[{name:'Carimbo',solid:stamp}];
 else parts=[{name:'Cortador',solid:cutter}];
 const result={parts:parts.map(({name,solid})=>{if(name==='Cortador'&&cachedCutter)return cachedCutter.part;if(name==='Carimbo'&&cachedStamp)return cachedStamp.part;solid=hold(solid.setTolerance(.001));if(solid.status()!=='NoError'||solid.isEmpty())throw Error(`${name}: falha na construção do sólido (${solid.status()}).`);const mesh=cleanExportMesh(solid.getMesh()),stats=checkMesh(mesh);if(stats.open||stats.nonmanifold||!stats.finite)throw Error(`${name}: malha inválida (${JSON.stringify(stats)}), exportação bloqueada.`);const components=solid.decompose();const bodies=components.length;components.forEach(s=>s.delete());return {name,positions:Float32Array.from(mesh.vertProperties),indices:Uint32Array.from(mesh.triVerts),stride:mesh.numProp,volume:solid.volume(),bounds:solid.boundingBox(),stats,bodies};}),outline:outer.toPolygons(),reliefOutline:cachedStamp?.reliefOutline||reliefOutline,cuttingOutline:cachedCutter?.cuttingOutline||inner?.toPolygons()||[],bladeProfile:cachedCutter?.bladeProfile||bladeProfile,reinforcementRootOutline:cachedCutter?.reinforcementRootOutline||reinforcementRootOutline,reinforcementTransitionOutline:cachedCutter?.reinforcementTransitionOutline||reinforcementTransitionOutline,logoOutline,logoPlacement,params:p,buildProfile,sourcePoints};for(const part of result.parts){if(part.name==='Cortador'&&!cachedCutter)ctx?.set('cutter',{part,cuttingOutline:result.cuttingOutline,bladeProfile:result.bladeProfile,reinforcementRootOutline:result.reinforcementRootOutline,reinforcementTransitionOutline:result.reinforcementTransitionOutline,logoOutline:result.logoOutline,logoPlacement:result.logoPlacement});if(part.name==='Carimbo'&&!cachedStamp)ctx?.set('stamp',{part,reliefOutline:result.reliefOutline});}result.elapsed=performance.now()-started;return result;
 }finally{keep.reverse().forEach(o=>o.delete());}}

// Boolean editing preserves filled-region topology. Brush paths are widened to real areas.
export function editContours(m,loops,op){const own=[],h=x=>(own.push(x),x),C=m.CrossSection;try{
 const all=h(new C(loops,'EvenOdd'));let result;
 if(op.type==='thickness'){const changed=h(all.offset(op.distance/op.size/2,'Round',2,128));if(op.region){const box=h(new C([op.region],'EvenOdd'));result=h(C.union([h(all.subtract(box)),h(changed.intersect(box))]));}else result=changed;}
 else if(op.type==='offset'){
  const target=h(new C([loops[op.selected]],'EvenOdd')),offset=h(target.offset(op.distance/op.size,'Round',2,128));
  const out=loops.filter((_,i)=>i!==op.selected);out.push(...offset.toPolygons());return out.sort((a,b)=>Math.abs(area(b))-Math.abs(area(a)));
 }
 else if(op.type==='shape'){
  const shape=h(new C([op.points],'EvenOdd'));result=h(op.subtract?all.subtract(shape):C.union([all,shape]));
 }else if(op.type==='stroke'){
  const r=op.width/op.size/2,parts=[];
  for(let i=0;i<op.points.length;i++){
   parts.push(h(h(C.circle(r,16)).translate(op.points[i])));
   if(i){const a=op.points[i-1],b=op.points[i],dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy);if(len>1e-9){const nx=-dy/len*r,ny=dx/len*r;parts.push(h(new C([[[a[0]+nx,a[1]+ny],[a[0]-nx,a[1]-ny],[b[0]-nx,b[1]-ny],[b[0]+nx,b[1]+ny]]],'EvenOdd')));}}
  }
  const stroke=h(C.union(parts));result=h(op.subtract?all.subtract(stroke):C.union([all,stroke]));
 }
 if(!result||result.isEmpty())throw Error('A edição apagaria toda a arte.');const out=result.toPolygons();return out.sort((a,b)=>Math.abs(area(b))-Math.abs(area(a)));
 }finally{own.reverse().forEach(o=>o.delete())}}
// STL has no vertex identity: weld exact Float32 positions and remove zero-area triangles
// introduced by precision conversion at boolean intersections. Validate the resulting STL topology.
export function cleanExportMesh(mesh){
 const map=new Map(),verts=[],ids=[];for(let i=0;i<mesh.vertProperties.length;i+=mesh.numProp){const v=Array.from(mesh.vertProperties.slice(i,i+3)),key=v.join(',');if(!map.has(key)){map.set(key,verts.length/3);verts.push(...v)}ids.push(map.get(key));}
 const faces=[];for(let i=0;i<mesh.triVerts.length;i+=3){const a=ids[mesh.triVerts[i]],b=ids[mesh.triVerts[i+1]],c=ids[mesh.triVerts[i+2]];if(a!==b&&b!==c&&c!==a)faces.push(a,b,c);}
 return {numProp:3,vertProperties:new Float32Array(verts),triVerts:new Uint32Array(faces)};
}
export function checkMesh(mesh){const edges=new Map();let finite=true;for(const v of mesh.vertProperties)if(!Number.isFinite(v))finite=false;const weld=new Map(),id=[],s=mesh.numProp;for(let i=0;i<mesh.vertProperties.length;i+=s){const key=[0,1,2].map(k=>String(mesh.vertProperties[i+k])).join(',');if(!weld.has(key))weld.set(key,weld.size);id.push(weld.get(key));}for(let i=0;i<mesh.triVerts.length;i+=3)for(let j=0;j<3;j++){const a=id[mesh.triVerts[i+j]],b=id[mesh.triVerts[i+(j+1)%3]];const k=a<b?`${a}:${b}`:`${b}:${a}`;edges.set(k,(edges.get(k)||0)+1);}let open=0,nonmanifold=0;for(const n of edges.values()){if(n===1)open++;if(n>2)nonmanifold++;}return {open,nonmanifold,finite,triangles:mesh.triVerts.length/3};}
export function stl(part){const n=part.indices.length/3,b=new ArrayBuffer(84+n*50),v=new DataView(b);v.setUint32(80,n,true);let o=84;for(let i=0;i<part.indices.length;i+=3){const pts=[0,1,2].map(k=>Array.from(part.positions.slice(part.indices[i+k]*part.stride,part.indices[i+k]*part.stride+3)));const a=pts[1].map((q,k)=>q-pts[0][k]),c=pts[2].map((q,k)=>q-pts[0][k]);let normal=[a[1]*c[2]-a[2]*c[1],a[2]*c[0]-a[0]*c[2],a[0]*c[1]-a[1]*c[0]],len=Math.hypot(...normal)||1;for(const q of [...normal.map(x=>x/len),...pts.flat()]){v.setFloat32(o,q,true);o+=4;}o+=2;}return b;}
export function contains(poly,p){let yes=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a[1]>p[1])!==(b[1]>p[1])&&p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0])yes=!yes;}return yes;}
export function splitObjects(loops,minRatio=.015){const ordered=loops.slice().sort((a,b)=>Math.abs(area(b))-Math.abs(area(a))),roots=[];for(const loop of ordered){let root=roots.find(r=>contains(r[0],loop[0]));if(root)root.push(loop);else roots.push([loop]);}const max=Math.max(...roots.map(r=>Math.abs(area(r[0]))));return roots.filter(r=>Math.abs(area(r[0]))>=max*minRatio).slice(0,1000).map(group=>normalize(group));}
export function combineParts(parts){const n=parts.reduce((s,{part})=>s+part.positions.length/part.stride,0),f=parts.reduce((s,{part})=>s+part.indices.length,0),positions=new Float32Array(n*3),indices=new Uint32Array(f);let v=0,t=0;for(const {part,position=[0,0,0]} of parts){const off=v/3;for(let i=0;i<part.positions.length;i+=part.stride){positions[v++]=part.positions[i]+position[0];positions[v++]=part.positions[i+1]+position[1];positions[v++]=part.positions[i+2]+position[2];}for(const id of part.indices)indices[t++]=id+off;}return {positions,indices,stride:3};}
