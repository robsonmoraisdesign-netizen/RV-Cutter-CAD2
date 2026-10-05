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
