export const LOGO_FONT_IDS=Object.freeze(['helvetiker','helvetiker-bold','optimer','gentilis']);
const FONT_STYLES={
 helvetiker:{family:'Arial, Helvetica, sans-serif',weight:600,stretch:1},
 'helvetiker-bold':{family:'Arial Black, Arial, Helvetica, sans-serif',weight:900,stretch:1.02},
 optimer:{family:'Trebuchet MS, Arial, sans-serif',weight:600,stretch:.98},
 gentilis:{family:'Georgia, Times New Roman, serif',weight:700,stretch:1}
};

export function normalizeLogoText(value){
 return String(value??'').replace(/\s+/g,' ').trim().slice(0,32);
}

function fallbackProfile(text,fontId,size){
 const style=FONT_STYLES[fontId]||FONT_STYLES.helvetiker,h=size,w=h*.62*style.stretch,gap=h*.15,loops=[];let x=0;
 for(const ch of text){if(ch===' '){x+=w*.7;continue;}const width=/[ilI1]/.test(ch)?w*.42:/[mwMW]/.test(ch)?w*1.25:w;loops.push([[x,0],[x+width,0],[x+width,h],[x,h]]);x+=width+gap;}
 if(!loops.length)return null;
 const minX=loops[0][0][0],maxX=Math.max(...loops.flat().map(p=>p[0])),cx=(minX+maxX)/2,cy=h/2;
 return {text,font:fontId,size,loops:loops.map(poly=>poly.map(([px,py])=>[px-cx,py-cy])),width:maxX-minX,height:h,fallback:true};
}

function traceRaster(data,w,h,threshold=160){
 const val=(x,y)=>{if(x<=0||y<=0||x>=w-1||y>=h-1)return 255;const i=(y*w+x)*4,a=data[i+3]/255;return (data[i]*.2126+data[i+1]*.7152+data[i+2]*.0722)*a+255*(1-a)};
 const links=new Map(),coords=new Map(),H=(x,y)=>`h${x},${y}`,V=(x,y)=>`v${x},${y}`;
 const table={1:[[3,0]],2:[[0,1]],3:[[3,1]],4:[[1,2]],6:[[0,2]],7:[[3,2]],8:[[2,3]],9:[[2,0]],11:[[2,1]],12:[[1,3]],13:[[1,0]],14:[[0,3]]};
 const add=(a,b)=>{if(!links.has(a))links.set(a,[]);if(!links.has(b))links.set(b,[]);links.get(a).push(b);links.get(b).push(a);};
 for(let y=0;y<h-1;y++)for(let x=0;x<w-1;x++){
  const v=[val(x,y),val(x+1,y),val(x+1,y+1),val(x,y+1)],code=v.reduce((n,a,i)=>n+(a<threshold?(1<<i):0),0);if(!code||code===15)continue;
  const keys=[H(x,y),V(x+1,y),H(x,y+1),V(x,y)],interp=(a,b)=>(threshold-a)/(b-a||1),xy=[[x+interp(v[0],v[1]),y],[x+1,y+interp(v[1],v[2])],[x+interp(v[3],v[2]),y+1],[x,y+interp(v[0],v[3])]];
  let pairs=table[code];if(code===5||code===10){const c=v.reduce((sum,n)=>sum+n)/4<threshold;pairs=(code===5)===c?[[0,1],[2,3]]:[[3,0],[1,2]];}
  for(const [a,b] of pairs){coords.set(keys[a],xy[a]);coords.set(keys[b],xy[b]);add(keys[a],keys[b]);}
 }
 const seen=new Set(),loops=[];
 for(const start of links.keys()){if(seen.has(start))continue;let cur=start,prev=null,p=[];while(!seen.has(cur)){seen.add(cur);p.push(coords.get(cur));const ns=links.get(cur),next=ns.find(n=>n!==prev);prev=cur;cur=next;if(!cur)break;}if(cur===start&&p.length>=6)loops.push(p);}
 return loops;
}

export function createLogoTextProfile(value,fontId='helvetiker',size=8,curveSegments=8){
 const text=normalizeLogoText(value);
 if(!text)return null;
 const font=fonts[fontId]||fonts.helvetiker;
 const physicalSize=Number(size);
 if(!Number.isFinite(physicalSize)||physicalSize<=0)throw Error('Tamanho da logo inválido.');
 const shapes=font.generateShapes(text,physicalSize);
 const loops=[];
 for(const shape of shapes){
  const extracted=shape.extractPoints(Math.max(4,Math.min(24,Math.round(curveSegments))));
  const contour=cleanPoints(extracted.shape);
  if(contour.length>=3)loops.push(contour);
  for(const hole of extracted.holes||[]){
   const poly=cleanPoints(hole);
   if(poly.length>=3)loops.push(poly);
  }
 }
 if(!loops.length)throw Error('A fonte selecionada não gerou contornos para este texto.');
 let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
 for(const [x,y] of loops.flat()){
  minX=Math.min(minX,x);minY=Math.min(minY,y);maxX=Math.max(maxX,x);maxY=Math.max(maxY,y);
 }
 const cx=(minX+maxX)/2,cy=(minY+maxY)/2;
 const centered=loops.map(poly=>poly.map(([x,y])=>[x-cx,y-cy]));
 return {
  text,
  font:fonts[fontId]?fontId:'helvetiker',
  size:physicalSize,
  loops:centered,
  width:maxX-minX,
  height:maxY-minY
 };
}
