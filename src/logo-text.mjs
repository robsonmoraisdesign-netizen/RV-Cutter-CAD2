import {FontLoader} from 'three/addons/loaders/FontLoader.js';
import helvetikerRegular from 'three/examples/fonts/helvetiker_regular.typeface.json' with {type:'json'};
import helvetikerBold from 'three/examples/fonts/helvetiker_bold.typeface.json' with {type:'json'};
import optimerRegular from 'three/examples/fonts/optimer_regular.typeface.json' with {type:'json'};
import gentilisRegular from 'three/examples/fonts/gentilis_regular.typeface.json' with {type:'json'};

const loader=new FontLoader();
const fonts={
 helvetiker:loader.parse(helvetikerRegular),
 'helvetiker-bold':loader.parse(helvetikerBold),
 optimer:loader.parse(optimerRegular),
 gentilis:loader.parse(gentilisRegular)
};

export const LOGO_FONT_IDS=Object.freeze(Object.keys(fonts));

function cleanPoints(points){
 const out=points.map(p=>[p.x,p.y]).filter(p=>p.every(Number.isFinite));
 if(out.length>2){
  const a=out[0],b=out.at(-1);
  if(Math.hypot(a[0]-b[0],a[1]-b[1])<1e-7)out.pop();
 }
 return out;
}

export function normalizeLogoText(value){
 return String(value??'').replace(/\s+/g,' ').trim().slice(0,32);
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
