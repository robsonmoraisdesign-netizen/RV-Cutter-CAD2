import {BufferGeometry,Vector3,MathUtils,BufferAttribute,DataTexture,RedFormat,NearestFilter,LinearFilter,Color,MeshBasicMaterial,MeshToonMaterial,MeshStandardMaterial,ShaderMaterial,BackSide} from "three";

  var defaultHatchProfiles={
   cutterBase:{enabled:false,type:'parallel',mode:'overlay',rotation:28,color:'#65584d',thickness:.12,scale:4.8,intensity:.42},
   blade:{enabled:false,type:'parallel',mode:'overlay',rotation:-28,color:'#65584d',thickness:.11,scale:4.0,intensity:.38},
   stampBase:{enabled:false,type:'cross',mode:'overlay',rotation:42,color:'#65584d',thickness:.10,scale:5.2,intensity:.38},
   relief:{enabled:false,type:'double45',mode:'overlay',rotation:18,color:'#65584d',thickness:.09,scale:3.6,intensity:.34},
   shadow:{enabled:false,type:'cross',mode:'replace',rotation:45,color:'#4d443e',thickness:.10,scale:4.4,intensity:.44}
  };

  var presentationDefaults={
   style:'illustrated',shadeSoftness:.65,background:'#a9eaf8',modelColor:'#ffba24',componentColors:true,
   colors:{cutterBase:'#e18e25',blade:'#ffbf28',stampBase:'#38bfb8',relief:'#f07891'},
   lightAzimuth:-40,lightElevation:55,lightIntensity:2.4,ambient:.8,
   shadows:true,groundDistance:4,projectedShadows:true,modelShadows:true,modelShadowMode:'soft',
   aoIntensity:.32,aoRadius:1.4,shadowOpacity:.3,shadowSoftness:3,
   lineColor:'#382a24',lineWidth:1.4,internalEdges:true,hatching:.45,hatchMaster:false,hatchProfiles:structuredClone(defaultHatchProfiles),
   projection:'perspective',showDims:false,transparent:false,exportSize:1600
  };

  function preset(style){
   const base=structuredClone(presentationDefaults);
   return {...base,style,...(
    style==='technical'?{background:'#ffffff',modelColor:'#ffffff',componentColors:false,lineColor:'#454851',lineWidth:.9,internalEdges:true,shadows:false,projectedShadows:false,modelShadows:false,modelShadowMode:'none',aoIntensity:.18,projection:'orthographic'}:
    style==='sketch'?{background:'#faf8f0',modelColor:'#eee9dc',componentColors:false,lineColor:'#39362f',lineWidth:1.15,internalEdges:true,shadows:true,groundDistance:3,projectedShadows:true,modelShadows:true,modelShadowMode:'soft',aoIntensity:.28,shadowOpacity:.18,projection:'orthographic'}:{}
   )};
  }

  function mergeHatchProfiles(p){
   const out={};
   for(const [role,base] of Object.entries(defaultHatchProfiles))out[role]={...base,...(p?.hatchProfiles?.[role]||{})};
   return out;
  }

  // Corner-angle weighting is invariant to long/short triangulation diagonals.
  // Separate planar caps, vertical walls and bevel surfaces at physical creases.
  function weightedNormals(g,params={}){
   const a=g.attributes.position.array,idx=g.index?.array||Uint32Array.from({length:a.length/3},(_,i)=>i),positions=[],normals=[],faces=[],groups=new Map();
   const shoulder=params.height-params.chamferHeight;
   for(let i=0;i<idx.length;i+=3){const ids=[idx[i],idx[i+1],idx[i+2]],p=ids.map(j=>[a[j*3],a[j*3+1],a[j*3+2]]),u=p[1].map((v,k)=>v-p[0][k]),v=p[2].map((v,k)=>v-p[0][k]);let n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]],len=Math.hypot(...n);if(len<1e-15)continue;n=n.map(x=>x/len);const zs=p.map(x=>x[2]),region=Math.abs(n[2])>.9999?'cap:'+Math.round(zs[0]*1e4):params.chamfer&&Math.min(...zs)>=shoulder-1e-4&&Math.max(...zs)>shoulder+1e-4&&n[2]>.001?'bevel':'wall';
    for(let j=0;j<3;j++){const key=region+':'+ids[j];let list=groups.get(key);if(!list){list=[];groups.set(key,list);}let group=list.find(x=>x.n[0]*n[0]+x.n[1]*n[1]+x.n[2]*n[2]>.20);if(!group){group={n,id:positions.length/3};list.push(group);positions.push(...p[j]);normals.push(0,0,0);}const u=p[(j+1)%3].map((v,k)=>v-p[j][k]),v=p[(j+2)%3].map((v,k)=>v-p[j][k]),angle=Math.acos(Math.max(-1,Math.min(1,(u[0]*v[0]+u[1]*v[1]+u[2]*v[2])/(Math.hypot(...u)*Math.hypot(...v)||1))));for(let k=0;k<3;k++)normals[group.id*3+k]+=n[k]*angle;faces.push(group.id);}
   }
   for(let i=0;i<normals.length;i+=3){const len=Math.hypot(normals[i],normals[i+1],normals[i+2])||1;for(let k=0;k<3;k++)normals[i+k]/=len;}
   const out=new BufferGeometry();out.setAttribute('position',new BufferAttribute(new Float32Array(positions),3));out.setAttribute('normal',new BufferAttribute(new Float32Array(normals),3));out.setIndex(faces);return out;
  }

  function updateGradient(mat,softness){if(!mat.gradientMap||mat.userData.shadowMode==='hard')return;const a=mat.gradientMap.image.data,s=Math.max(0,Math.min(1,softness??.65)),width=.001+s*.32;
   const step=(edge,x)=>{const t=MathUtils.clamp((x-edge+width/2)/width,0,1);return t*t*(3-2*t);};
   for(let i=0;i<a.length;i++){const x=i/(a.length-1);a[i]=Math.round(70+95*step(1/3,x)+90*step(2/3,x));}mat.gradientMap.needsUpdate=true;}

  function toonGradient(mode,softness){
   if(mode==='hard'){
    const tex=new DataTexture(new Uint8Array([72,72,156,156,255,255]),6,1,RedFormat);
    tex.minFilter=tex.magFilter=NearestFilter;tex.needsUpdate=true;return tex;
   }
   const tex=new DataTexture(new Uint8Array(256),256,1,RedFormat);
   tex.minFilter=tex.magFilter=LinearFilter;tex.needsUpdate=true;
   const holder={gradientMap:tex,userData:{shadowMode:'soft'}};updateGradient(holder,softness);return tex;
  }

  function hatchTypeCode(type){
   return type==='parallel'?1:type==='cross'?2:type==='double45'?3:type==='triple'?4:type==='dots'?5:type==='dotsDense'?6:type==='dotsSparse'?7:type==='dash'?8:type==='scribble'?9:0;
  }
  function lightVector(p){const az=MathUtils.degToRad(p.lightAzimuth??-40),el=MathUtils.degToRad(p.lightElevation??55);return new Vector3(Math.cos(az)*Math.cos(el),Math.sin(az)*Math.cos(el),Math.sin(el)).normalize();}
  function profile(p,role){return {...defaultHatchProfiles[role],...(p.hatchProfiles?.[role]||{})};}

  function installBasePresentationShader(mat){
   if(mat.userData.rvBasePresentationShader)return;
   const previous=mat.onBeforeCompile;
   mat.onBeforeCompile=shader=>{
    previous?.(shader);
    const u=(mat.userData.rvUniforms={
     aoIntensity:{value:mat.userData.aoIntensity||0},aoAnchor:{value:mat.userData.aoAnchor||0},aoRadius:{value:mat.userData.aoRadius||1}
    });
    Object.assign(shader.uniforms,{rvAOIntensity:u.aoIntensity,rvAOAnchor:u.aoAnchor,rvAORadius:u.aoRadius});
    shader.vertexShader='varying vec3 rvObjPos; varying vec3 rvObjNormal;\n'+shader.vertexShader;
    shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nrvObjPos=position; rvObjNormal=normal;');
    shader.fragmentShader='varying vec3 rvObjPos; varying vec3 rvObjNormal; uniform float rvAOIntensity; uniform float rvAOAnchor; uniform float rvAORadius;\n'+shader.fragmentShader;
    shader.fragmentShader=shader.fragmentShader.replace('#include <shadowmap_pars_fragment>','#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>');
    shader.fragmentShader=shader.fragmentShader.replace('#include <tonemapping_fragment>',`float rvAOD=abs(rvObjPos.z-rvAOAnchor);float rvAOContact=1.-smoothstep(0.,max(rvAORadius,.001),rvAOD);float rvAOWall=.22+.78*(1.-abs(normalize(rvObjNormal).z));float rvAO=clamp(rvAOIntensity*rvAOContact*rvAOWall,0.,.72);gl_FragColor.rgb*=1.-rvAO;
#include <tonemapping_fragment>`);
    mat.userData.shader=shader;
    syncBasePresentationMaterial(mat,mat.userData.presentationSettings||presentationDefaults);
   };
   mat.userData.rvBasePresentationShader=true;
   mat.needsUpdate=true;
  }

  function syncBasePresentationMaterial(mat,p){
   const u=mat.userData.rvUniforms||mat.userData.shader?.uniforms;if(!u)return;
   const set=(name,value)=>{const slot=u[name]||u['rv'+name[0].toUpperCase()+name.slice(1)];if(slot)slot.value=value;};
   set('aoIntensity',p.aoIntensity??0);set('aoAnchor',mat.userData.aoAnchor??0);set('aoRadius',p.aoRadius??1.4);
  }

  function installPresentationShader(mat){
   if(mat.userData.rvPresentationShader)return;
   const previous=mat.onBeforeCompile;
   mat.onBeforeCompile=shader=>{
    previous?.(shader);
    const u=(mat.userData.rvUniforms={
     aoIntensity:{value:mat.userData.aoIntensity||0},aoAnchor:{value:mat.userData.aoAnchor||0},aoRadius:{value:mat.userData.aoRadius||1},
     hatchEnabled:{value:0},hatchType:{value:0},hatchMode:{value:0},hatchRotation:{value:0},hatchColor:{value:new Color('#555555')},hatchThickness:{value:.1},hatchScale:{value:4},hatchIntensity:{value:0},
     shadowHatchEnabled:{value:0},shadowHatchType:{value:0},shadowHatchMode:{value:1},shadowHatchRotation:{value:0},shadowHatchColor:{value:new Color('#444444')},shadowHatchThickness:{value:.1},shadowHatchScale:{value:4},shadowHatchIntensity:{value:0},lightDir:{value:new Vector3(.5,-.5,.7).normalize()},baseColor:{value:new Color(mat.color)},backgroundColor:{value:new Color('#ffffff')}
    });
    Object.assign(shader.uniforms,{rvAOIntensity:u.aoIntensity,rvAOAnchor:u.aoAnchor,rvAORadius:u.aoRadius,rvHatchEnabled:u.hatchEnabled,rvHatchType:u.hatchType,rvHatchMode:u.hatchMode,rvHatchRotation:u.hatchRotation,rvHatchColor:u.hatchColor,rvHatchThickness:u.hatchThickness,rvHatchScale:u.hatchScale,rvHatchIntensity:u.hatchIntensity,rvShadowHatchEnabled:u.shadowHatchEnabled,rvShadowHatchType:u.shadowHatchType,rvShadowHatchMode:u.shadowHatchMode,rvShadowHatchRotation:u.shadowHatchRotation,rvShadowHatchColor:u.shadowHatchColor,rvShadowHatchThickness:u.shadowHatchThickness,rvShadowHatchScale:u.shadowHatchScale,rvShadowHatchIntensity:u.shadowHatchIntensity,rvLightDir:u.lightDir,rvBaseColor:u.baseColor,rvBackgroundColor:u.backgroundColor});
    shader.vertexShader='varying vec3 rvObjPos; varying vec3 rvObjNormal; varying vec3 rvWorldNormal;\n'+shader.vertexShader;
    shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nrvObjPos=position; rvObjNormal=normal; rvWorldNormal=normalize(mat3(modelMatrix)*normal);');
    shader.fragmentShader=`varying vec3 rvObjPos; varying vec3 rvObjNormal; varying vec3 rvWorldNormal;
  uniform float rvAOIntensity; uniform float rvAOAnchor; uniform float rvAORadius;
  uniform float rvHatchEnabled; uniform int rvHatchType; uniform float rvHatchMode; uniform float rvHatchRotation; uniform vec3 rvHatchColor; uniform float rvHatchThickness; uniform float rvHatchScale; uniform float rvHatchIntensity;
  uniform float rvShadowHatchEnabled; uniform int rvShadowHatchType; uniform float rvShadowHatchMode; uniform float rvShadowHatchRotation; uniform vec3 rvShadowHatchColor; uniform float rvShadowHatchThickness; uniform float rvShadowHatchScale; uniform float rvShadowHatchIntensity; uniform vec3 rvLightDir; uniform vec3 rvBaseColor; uniform vec3 rvBackgroundColor;
  float rvHash21(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
  float rvHatchLine(vec2 p,float rot,float scale,float thickness){float a=radians(rot),c=cos(a),s=sin(a);vec2 q=mat2(c,-s,s,c)*p;float v=q.y/max(scale,.05);float d=abs(fract(v)-.5);float aa=max(fwidth(v),.001);float t=clamp(thickness,.015,.46);return 1.-smoothstep(t,t+aa,d);}
  float rvDotPattern(vec2 p,float rot,float scale,float thickness,float density){float a=radians(rot),c=cos(a),s=sin(a);vec2 q=mat2(c,-s,s,c)*p/max(scale,.08);vec2 cell=floor(q*density);vec2 fracp=fract(q*density)-.5;vec2 jitter=(vec2(rvHash21(cell),rvHash21(cell+7.13))-.5)*.35;float r=length(fracp-jitter);float rad=max(.06,.16*clamp(thickness*5.,.25,2.))+0.015*(density-1.);float aa=max(fwidth(r),.002);return 1.-smoothstep(rad,rad+aa,r);}
  float rvScribblePattern(vec2 p,float rot,float scale,float thickness){float l1=rvHatchLine(p,rot,scale,thickness*.8);float l2=rvHatchLine(p+vec2(scale*.17,scale*.11),rot+23.,scale*1.2,thickness*.7);return max(l1*.9,l2*.75);}
  float rvHatchPattern(vec2 p,int type,float rot,float scale,float thickness){if(type<=0)return 0.;float a=rvHatchLine(p,rot,scale,thickness);if(type==1)return a;if(type==2)return max(a,rvHatchLine(p,rot+90.,scale,thickness));if(type==3)return max(a,rvHatchLine(p,rot+45.,scale,thickness));if(type==4)return max(a,max(rvHatchLine(p,rot+60.,scale,thickness),rvHatchLine(p,rot-60.,scale,thickness)));if(type==5)return rvDotPattern(p,rot,scale,thickness,1.0);if(type==6)return rvDotPattern(p,rot,scale,thickness,1.6);if(type==7)return rvDotPattern(p,rot,scale,thickness,.7);if(type==8)return a*(1.-rvHatchLine(p,rot+90.,scale*1.7,.3));if(type==9)return rvScribblePattern(p,rot,scale,thickness);return a;}
  float rvTriHatch(vec3 pos,vec3 n,int type,float rot,float scale,float thickness){vec3 wn=normalize(n);vec3 w=pow(abs(wn),vec3(5.));w/=max(w.x+w.y+w.z,.0001);float x=rvHatchPattern(pos.yz,type,rot,scale,thickness),y=rvHatchPattern(pos.xz,type,rot,scale,thickness),z=rvHatchPattern(pos.xy,type,rot,scale,thickness);return x*w.x+y*w.y+z*w.z;}
  `+shader.fragmentShader;
    shader.fragmentShader=shader.fragmentShader.replace('#include <shadowmap_pars_fragment>','#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>');
    shader.fragmentShader=shader.fragmentShader.replace('#include <tonemapping_fragment>',`float rvAOD=abs(rvObjPos.z-rvAOAnchor);float rvAOContact=1.-smoothstep(0.,max(rvAORadius,.001),rvAOD);float rvAOWall=.22+.78*(1.-abs(normalize(rvObjNormal).z));float rvAO=clamp(rvAOIntensity*rvAOContact*rvAOWall,0.,.88);gl_FragColor.rgb*=1.-rvAO;
  float rvProjectedShadow=0.;
  #if defined(USE_SHADOWMAP) && !defined(RV_UNLIT)
  rvProjectedShadow=clamp(1.-getShadowMask(),0.,1.);
  #endif
  if(rvHatchEnabled>.5){float hp=rvTriHatch(rvObjPos,rvObjNormal,rvHatchType,rvHatchRotation,rvHatchScale,rvHatchThickness);float hm=clamp(hp*rvHatchIntensity,0.,1.);if(rvHatchMode>.5){vec3 rvPaper=mix(rvBackgroundColor,gl_FragColor.rgb,.14);gl_FragColor.rgb=mix(rvPaper,rvHatchColor,hm);}else{gl_FragColor.rgb=mix(gl_FragColor.rgb,rvHatchColor,hm);}}
  if(rvShadowHatchEnabled>.5){float rvShadowRegion=max(rvProjectedShadow,rvAO*.82);rvShadowRegion=smoothstep(.06,.24,rvShadowRegion);if(rvShadowRegion>.001){float hp=rvTriHatch(rvObjPos,rvObjNormal,rvShadowHatchType,rvShadowHatchRotation,rvShadowHatchScale,rvShadowHatchThickness);float hm=clamp(hp*rvShadowHatchIntensity*rvShadowRegion,0.,1.);if(rvShadowHatchMode>.5){vec3 rvShadowBase=mix(gl_FragColor.rgb,mix(rvBaseColor*.92,rvBackgroundColor,.15),.72*rvShadowRegion);gl_FragColor.rgb=mix(rvShadowBase,rvShadowHatchColor,hm);}else{gl_FragColor.rgb=mix(gl_FragColor.rgb,rvShadowHatchColor,hm);}}}
  #include <tonemapping_fragment>`);
    if(mat.userData.flatMode)shader.fragmentShader=shader.fragmentShader.replace('#include <opaque_fragment>','outgoingLight=diffuseColor.rgb*getShadowMask();\n#include <opaque_fragment>');
    mat.userData.shader=shader;
    syncPresentationMaterial(mat,mat.userData.presentationSettings||presentationDefaults,mat.userData.role);
   };
   mat.userData.rvPresentationShader=true;
   mat.needsUpdate=true;
  }

  function configurePresentationMaterial(mat,role,geometry,p){
   geometry.computeBoundingBox();const box=geometry.boundingBox,minZ=box?.min?.z??0,maxZ=box?.max?.z??0;
   mat.userData.aoAnchor=(role==='cutterBase'||role==='stampBase')?maxZ:minZ;
   mat.userData.aoIntensity=p.aoIntensity??0;mat.userData.aoRadius=p.aoRadius??1.4;mat.userData.role=role;mat.userData.presentationSettings=p;
   installPresentationShader(mat);syncPresentationMaterial(mat,p,role);
  }

  function syncPresentationMaterial(mat,p,role){
   mat.userData.presentationSettings=p;mat.userData.role=role;
   const u=mat.userData.rvUniforms||mat.userData.shader?.uniforms;if(!u)return;
   const hp=profile(p,role),sp=profile(p,'shadow'); const hatchOn=!!p.hatchMaster;
   const set=(name,value)=>{const slot=u[name]||u['rv'+name[0].toUpperCase()+name.slice(1)];if(slot)slot.value=value;};
   set('aoIntensity',p.aoIntensity??0);set('aoAnchor',mat.userData.aoAnchor??0);set('aoRadius',p.aoRadius??1.4);
   set('hatchEnabled',hatchOn&&hp.enabled?1:0);set('hatchType',hatchTypeCode(hp.type));set('hatchMode',hp.mode==='replace'?1:0);set('hatchRotation',+hp.rotation||0);if((u.hatchColor||u.rvHatchColor)?.value)(u.hatchColor||u.rvHatchColor).value.set(hp.color||'#555555');set('hatchThickness',+hp.thickness||.1);set('hatchScale',+hp.scale||4);set('hatchIntensity',+hp.intensity||0);
   set('shadowHatchEnabled',hatchOn&&sp.enabled?1:0);set('shadowHatchType',hatchTypeCode(sp.type));set('shadowHatchMode',sp.mode==='replace'?1:0);set('shadowHatchRotation',+sp.rotation||0);if((u.shadowHatchColor||u.rvShadowHatchColor)?.value)(u.shadowHatchColor||u.rvShadowHatchColor).value.set(sp.color||'#444444');set('shadowHatchThickness',+sp.thickness||.1);set('shadowHatchScale',+sp.scale||4);set('shadowHatchIntensity',+sp.intensity||0);const lv=lightVector(p);if((u.lightDir||u.rvLightDir)?.value)(u.lightDir||u.rvLightDir).value.copy(lv);if((u.baseColor||u.rvBaseColor)?.value)(u.baseColor||u.rvBaseColor).value.copy(mat.color);if((u.backgroundColor||u.rvBackgroundColor)?.value)(u.backgroundColor||u.rvBackgroundColor).value.set(p.background||'#ffffff');
  }

  function presentationMaterial(p,role){
   const color=p.componentColors?p.colors[role]:p.modelColor;
   const mode=p.modelShadowMode||(p.modelShadows===false?'none':'soft');
   let mat;
   if(mode==='none'){mat=new MeshToonMaterial({color});mat.userData.flatMode=true;}
   else if(mode==='hard'){
    mat=new MeshToonMaterial({color,gradientMap:toonGradient('hard',p.shadeSoftness)});
    mat.userData.shadowMode='hard';
   }else if(p.style==='illustrated'||p.style==='sketch'){
    mat=new MeshToonMaterial({color,gradientMap:toonGradient('soft',p.shadeSoftness)});
    mat.userData.shadowMode='soft';
   }else{
    mat=new MeshStandardMaterial({color,roughness:1,metalness:0});
    mat.userData.shadowMode='soft';
   }
   mat.userData.role=role;return mat;
  }

  function outlineMaterial(p){return new ShaderMaterial({side:BackSide,depthWrite:false,polygonOffset:true,polygonOffsetFactor:2,polygonOffsetUnits:2,uniforms:{ink:{value:new Color(p.lineColor)},width:{value:p.lineWidth},resolution:{value:800}},vertexShader:'uniform float width; uniform float resolution; void main(){vec4 v=modelViewMatrix*vec4(position,1.);vec4 c=projectionMatrix*v;vec3 n=normalMatrix*normal;vec2 d=normalize(n.xy+vec2(1e-8)); c.xy+=d*width*2./resolution*c.w;gl_Position=c;}',fragmentShader:'uniform vec3 ink;void main(){gl_FragColor=vec4(ink,1.); #include <colorspace_fragment>\n}'.replace('; #include',';\n#include')});}

export {defaultHatchProfiles,presentationDefaults,preset,mergeHatchProfiles,weightedNormals,updateGradient,presentationMaterial,outlineMaterial,configurePresentationMaterial,syncPresentationMaterial};
