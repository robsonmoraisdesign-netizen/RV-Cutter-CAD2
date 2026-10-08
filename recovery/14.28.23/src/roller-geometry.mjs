// Parametric cylindrical height field. Shared periodic indices close the seam exactly.
export const defaults={diameter:30,length:90,axle:8,depth:1.2,repeatAround:3,repeatLength:3,margin:2,mirror:true,invert:false,relief:'raised',quality:'normal'};
export function parameters(raw={}){
 const p={...defaults,...raw};
 const limits={diameter:[10,150],length:[10,300],axle:[0,140],depth:[0,8],repeatAround:[1,24],repeatLength:[1,24],margin:[0,50]};
 for(const [k,[a,b]] of Object.entries(limits)){p[k]=Number(p[k]);if(!Number.isFinite(p[k])||p[k]<a||p[k]>b)throw Error(`Parâmetro inválido: ${k}`);}
 p.repeatAround=Math.round(p.repeatAround);p.repeatLength=Math.round(p.repeatLength);
 if(p.margin*2>=p.length)throw Error('As margens devem ocupar menos que o comprimento do rolo.');
 if(p.diameter/2-(p.relief==='recessed'?p.depth:0)-p.axle/2<1)throw Error('Mantenha pelo menos 1 mm entre a textura e o furo. Reduza o furo ou a profundidade.');
 if(!['raised','recessed'].includes(p.relief)||!['draft','normal','fine'].includes(p.quality))throw Error('Modo de geração inválido.');
 return p;
}
export function generateRoller(raw,bitmap){
 const p=parameters(raw),pitch={draft:.7,normal:.35,fine:.18}[p.quality];
 let around=Math.max(64,Math.ceil(Math.PI*(p.diameter+2*p.depth)/pitch)),along=Math.max(16,Math.ceil(p.length/pitch));
 const factor=Math.max(1,Math.sqrt(around*(along+1)/350000));around=Math.ceil(around/factor);along=Math.ceil(along/factor);
 const outer=around*(along+1),hole=p.axle>0,verts=outer+(hole?around*2:2),pos=new Float32Array(verts*3),indices=[];
 const {width:w,height:h,data}=bitmap;
 if(!Number.isInteger(w)||!Number.isInteger(h)||w<2||h<2||w>2048||h>2048||data?.length!==w*h)throw Error('Arte inválida.');
 const fract=x=>x-Math.floor(x);
 function sample(u,v){const x=fract(u)*w,y=fract(v)*h,ix=Math.floor(x),iy=Math.floor(y),fx=x-ix,fy=y-iy;
 const s=(xx,yy)=>data[(yy%h)*w+(xx%w)]/255;
 let a=(s(ix,iy)*(1-fx)+s(ix+1,iy)*fx)*(1-fy)+(s(ix,iy+1)*(1-fx)+s(ix+1,iy+1)*fx)*fy;
 return p.invert?1-a:a;}
 const put=(id,r,t,z)=>{pos[id*3]=r*Math.cos(t);pos[id*3+1]=r*Math.sin(t);pos[id*3+2]=z;};
 for(let j=0;j<=along;j++){const z=p.length*j/along;for(let i=0;i<around;i++){
  const t=i/around*Math.PI*2,u=(p.mirror?1-i/around:i/around)*p.repeatAround;
  // Fade inside each physical end margin; no caps intersect raised/recessed detail.
  const fade=p.margin===0?1:Math.max(0,Math.min(1,(z-p.margin)/Math.min(.6,p.length/20),(p.length-p.margin-z)/Math.min(.6,p.length/20)));
  const relief=sample(u,(1-(z-p.margin)/(p.length-2*p.margin))*p.repeatLength)*fade;
  put(j*around+i,p.diameter/2+(p.relief==='raised'?1:-1)*p.depth*relief,t,z);
 }}
 const tri=(a,b,c)=>indices.push(a,b,c);
 for(let j=0;j<along;j++)for(let i=0;i<around;i++){const a=j*around+i,b=j*around+(i+1)%around,c=a+around,d=b+around;tri(a,b,c);tri(b,d,c);}
 for(let i=0;i<around;i++){const next=(i+1)%around,a=i,b=next,c=along*around+i,d=along*around+next;
  if(hole){const low=outer+i,ln=outer+next,high=outer+around+i,hn=outer+around+next;
   put(low,p.axle/2,i/around*Math.PI*2,0);put(high,p.axle/2,i/around*Math.PI*2,p.length);
   tri(a,low,b);tri(b,low,ln);tri(c,d,high);tri(d,hn,high);
   tri(low,high,ln);tri(ln,high,hn);
  }else{tri(a,outer,b);tri(c,d,outer+1);}
 }
 if(!hole){put(outer,0,0,0);put(outer+1,0,0,p.length);}
 return {positions:pos,indices:new Uint32Array(indices),params:p,stats:{vertices:verts,triangles:indices.length/3,around,along,pitch:Math.max(Math.PI*(p.diameter+2*p.depth)/around,p.length/along)}};
}
export function binarySTL(mesh){
 const p=mesh.positions,ix=mesh.indices,buffer=new ArrayBuffer(84+ix.length/3*50),v=new DataView(buffer);
 new Uint8Array(buffer,0,80).set(new TextEncoder().encode('RV Cutter CAD - Texture Roller - millimeters'));
 v.setUint32(80,ix.length/3,true);
 for(let f=0;f<ix.length;f+=3){let at=84+f/3*50;const a=ix[f]*3,b=ix[f+1]*3,c=ix[f+2]*3;
 const ux=p[b]-p[a],uy=p[b+1]-p[a+1],uz=p[b+2]-p[a+2],vx=p[c]-p[a],vy=p[c+1]-p[a+1],vz=p[c+2]-p[a+2];
 let nx=uy*vz-uz*vy,ny=uz*vx-ux*vz,nz=ux*vy-uy*vx,n=Math.hypot(nx,ny,nz)||1;
 for(const x of [nx/n,ny/n,nz/n,...p.subarray(a,a+3),...p.subarray(b,b+3),...p.subarray(c,c+3)]){v.setFloat32(at,x,true);at+=4;}
 }
 return buffer;
}
