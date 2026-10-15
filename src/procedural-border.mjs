// Physical millimetres. Authoring parameters remain independent of tessellation.
export const borderDefaults={borderEnabled:false,borderCount:24,borderDiameter:0,borderMargin:2,borderRadius:0,borderDepth:3,borderRotation:0,borderProfile:'circular',borderDirection:'outward'};
export const borderKeys=Object.keys(borderDefaults);

export function proceduralBorder(source,params={}){
 const p={...borderDefaults,...params};
 for(const key of ['borderCount','borderDiameter','borderMargin','borderRadius','borderDepth','borderRotation'])if(!Number.isFinite(p[key]))throw Error('Valor inválido em '+key+'.');
 const n=p.borderCount;
 if(!Number.isInteger(n)||n<4||n>120)throw Error('Use de 4 a 120 curvas inteiras.');
 if(!['circular','elliptical','wave'].includes(p.borderProfile)||!['outward','inward','alternating'].includes(p.borderDirection))throw Error('Tipo de borda inválido.');
 if(p.borderDirection==='alternating'&&n%2)throw Error('A borda alternada precisa de uma quantidade par de curvas.');
 if(p.borderDiameter<0||p.borderDiameter>2000||p.borderRadius<0||p.borderRadius>2000||p.borderMargin<0||p.borderMargin>100||p.borderDepth<=0||p.borderDepth>100)throw Error('Medidas da borda fora dos limites: diâmetro/raio 0–2000 mm, margem 0–100 mm e profundidade maior que 0 até 100 mm.');
 let extent=0;
 for(const point of source){if(point.length!==2||!point.every(Number.isFinite))throw Error('Contorno de referência inválido.');extent=Math.max(extent,Math.hypot(...point));}
 if(!extent)throw Error('Crie ou importe um Sketch antes de configurar a borda.');
 const alpha=Math.PI/n,ca=Math.cos(alpha),sa=Math.sin(alpha),inward=p.borderDirection!=='outward';
 // Automatic radius guarantees a disk containing the source even at inward valleys.
 const R=p.borderDiameter/2||(p.borderProfile==='circular'&&inward?(extent+p.borderMargin)*ca/(1-sa):(extent+p.borderMargin+(inward?p.borderDepth:0))/ca);
 const half=R*sa,baseline=R*ca,minimum=half/(inward?ca:1),r=p.borderRadius||minimum;
 if(p.borderProfile==='circular'&&r<minimum-1e-9)throw Error(`Raio pequeno para ${n} curvas: use pelo menos ${minimum.toFixed(3)} mm ou 0 para automático.`);
 const radius=Math.max(r,half),sweep=2*Math.asin(half/radius),offset=Math.sqrt(Math.max(0,radius*radius-half*half));
 const depth=p.borderProfile==='circular'?radius-offset:p.borderDepth;
 if(inward&&depth>=baseline)throw Error('As curvas internas chegam ao centro. Reduza a profundidade ou aumente o diâmetro.');
 // Sagitta bound for circles/ellipses; cap counts for predictable worker memory.
 const steps=Math.min(512,Math.max(24,Math.ceil(Math.PI*Math.sqrt(Math.max(half,depth)/.01))));
 const points=[],rotation=p.borderRotation*Math.PI/180;
 for(let i=0;i<n;i++){
  const angle=rotation+i*2*Math.PI/n,c=Math.cos(angle),s=Math.sin(angle);
  const sign=p.borderDirection==='inward'||p.borderDirection==='alternating'&&i%2?-1:1;
  for(let j=0;j<steps;j++){
   const t=j/steps;let x,y;
   if(p.borderProfile==='circular'){
    const a=(t-.5)*sweep;y=radius*Math.sin(a);x=baseline+sign*(radius*Math.cos(a)-offset);
   }else if(p.borderProfile==='elliptical'){
    const a=(t-.5)*Math.PI,theta=alpha*Math.sin(a),radial=R+sign*depth*Math.cos(a);y=radial*Math.sin(theta);x=radial*Math.cos(theta);
   }else{const theta=alpha*(2*t-1),radial=R+sign*depth*(1-Math.cos(2*Math.PI*t))/2;y=radial*Math.sin(theta);x=radial*Math.cos(theta);}
   points.push([x*c-y*s,x*s+y*c]);
  }
 }
 return {points,count:n,radius:p.borderProfile==='circular'?radius:null,diameter:2*R,depth};
}
