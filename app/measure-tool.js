/* RV Cutter CAD 14.19 - Ferramenta Medir
 * Camada de viewport independente do motor geométrico/paramétrico.
 * Não altera meshes, parâmetros ou worker. Apenas lê a geometria já renderizada.
 */
(()=>{
  'use strict';
  if(window.RVMeasureToolLoaded)return;
  window.RVMeasureToolLoaded=true;

  const roleNames={cutterBase:'Base do cortador',blade:'Lâmina / chanfro',stampBase:'Base do carimbo',relief:'Relevo do carimbo'};
  const fmt=(v,d=3)=>Number.isFinite(v)?Number(v).toFixed(d):'—';
  const sub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]];
  const add=(a,b)=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]];
  const mul=(a,s)=>[a[0]*s,a[1]*s,a[2]*s];
  const dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
  const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  const len=a=>Math.hypot(a[0],a[1],a[2]);
  const norm=a=>{const l=len(a)||1;return[a[0]/l,a[1]/l,a[2]/l];};

  function boot(attempt=0){
    const api=window.RVTest,viewer=api?.viewer,canvas=viewer?.renderer?.domElement,viewport=document.getElementById('viewport');
    if(!api||!viewer||!canvas||!viewport){if(attempt<120)setTimeout(()=>boot(attempt+1),50);return;}
    install(api,viewer,canvas,viewport);
  }

  function install(api,viewer,canvas,viewport){
    if(document.getElementById('measureTool'))return;
    const state={active:false,points:[],down:null};

    const toolbar=document.querySelector('.workspace .toolbar .view-actions');
    const visualMenu=toolbar?.querySelector('.visual-menu');
    const divider=document.createElement('span');divider.className='toolbar-divider measure-divider';
    const button=document.createElement('button');button.id='measureTool';button.className='measure-toggle';button.type='button';button.title='Medir entre duas faces ou pontos (M)';button.textContent='Medir';
    if(toolbar){toolbar.insertBefore(divider,visualMenu||null);toolbar.insertBefore(button,visualMenu||null);}

    const panel=document.createElement('div');panel.id='measurePanel';panel.className='measure-panel';panel.hidden=true;panel.innerHTML=`
      <div class="measure-head"><div><span class="mini-label">FERRAMENTA</span><strong>Medir</strong></div><button id="measureClose" class="icon-button" title="Fechar medição">×</button></div>
      <p id="measureHint" class="hint">Clique na primeira face ou ponto do modelo.</p>
      <div id="measureResults" hidden>
        <div class="measure-points"><span id="measureP1">P1</span><span id="measureP2">P2</span></div>
        <div class="measure-grid">
          <div class="axis-x"><span>ΔX</span><strong><b id="measureDX">0.000</b> mm</strong></div>
          <div class="axis-y"><span>ΔY</span><strong><b id="measureDY">0.000</b> mm</strong></div>
          <div class="axis-z"><span>ΔZ</span><strong><b id="measureDZ">0.000</b> mm</strong></div>
          <div><span>Plano XY</span><strong><b id="measureXY">0.000</b> mm</strong></div>
          <div><span>Plano XZ</span><strong><b id="measureXZ">0.000</b> mm</strong></div>
          <div><span>Plano YZ</span><strong><b id="measureYZ">0.000</b> mm</strong></div>
          <div class="measure-primary"><span>Linear 3D</span><strong><b id="measureLinear">0.000</b> mm</strong></div>
          <div><span>Ângulo faces</span><strong id="measureAngle">—</strong></div>
        </div>
        <details class="measure-coordinates"><summary>Coordenadas dos pontos</summary><div><span>P1</span><code id="measureCoords1">—</code></div><div><span>P2</span><code id="measureCoords2">—</code></div></details>
      </div>
      <div class="measure-actions"><button id="measureNew">Nova medição</button><button id="measureClear">Limpar</button></div>`;
    viewport.appendChild(panel);

    const NS='http://www.w3.org/2000/svg',overlay=document.createElementNS(NS,'svg');overlay.id='measureOverlay';overlay.classList.add('measure-overlay');overlay.setAttribute('aria-hidden','true');viewport.appendChild(overlay);
    const q=id=>document.getElementById(id);

    function objectName(id){return api.state?.objects?.find(o=>o.id===id)?.name||'';}
    function pointLabel(p,n){const name=objectName(p.id),role=roleNames[p.role]||p.role||'';return `P${n}${name?' · '+name:''}${role?' · '+role:''}`;}
    function values(){if(state.points.length<2)return null;const a=state.points[0],b=state.points[1],d=sub(b.point,a.point),ax=Math.abs(d[0]),ay=Math.abs(d[1]),az=Math.abs(d[2]);let angle=null;if(a.normal&&b.normal){const c=Math.max(-1,Math.min(1,dot(norm(a.normal),norm(b.normal))));angle=Math.acos(c)*180/Math.PI;if(angle>90)angle=180-angle;}return {x:ax,y:ay,z:az,xy:Math.hypot(d[0],d[1]),xz:Math.hypot(d[0],d[2]),yz:Math.hypot(d[1],d[2]),linear:Math.hypot(...d),angle};}
    function refreshPanel(){
      panel.hidden=!state.active&&!state.points.length;button.classList.toggle('active',state.active);canvas.classList.toggle('measure-mode',state.active);
      if(!state.points.length){q('measureHint').textContent='Clique na primeira face ou ponto do modelo.';q('measureResults').hidden=true;renderOverlay();return;}
      q('measureP1').textContent=pointLabel(state.points[0],1);q('measureCoords1').textContent=state.points[0].point.map(v=>fmt(v)).join(', ');
      if(state.points.length===1){q('measureHint').textContent='Primeiro ponto definido. Clique na segunda face ou ponto.';q('measureResults').hidden=true;renderOverlay();return;}
      const m=values();q('measureHint').textContent='Medição concluída. Clique em outra face para iniciar uma nova medição.';q('measureResults').hidden=false;q('measureP2').textContent=pointLabel(state.points[1],2);q('measureCoords2').textContent=state.points[1].point.map(v=>fmt(v)).join(', ');
      q('measureDX').textContent=fmt(m.x);q('measureDY').textContent=fmt(m.y);q('measureDZ').textContent=fmt(m.z);q('measureXY').textContent=fmt(m.xy);q('measureXZ').textContent=fmt(m.xz);q('measureYZ').textContent=fmt(m.yz);q('measureLinear').textContent=fmt(m.linear);q('measureAngle').textContent=m.angle==null?'—':fmt(m.angle,2)+'°';renderOverlay();
    }
    function setActive(value,clearOnStart=false){
      if(value&&api.state?.stage==='2d'){api.state&&setStatus('A ferramenta Medir está disponível no Modelo 3D e em Apresentação.');return;}
      state.active=!!value;if(clearOnStart)state.points=[];refreshPanel();
      setStatus(state.active?'Medir: clique em duas faces ou pontos do modelo.':'Ferramenta Medir encerrada.');
    }
    function clear(){state.points=[];refreshPanel();}
    function setStatus(text){const el=document.getElementById('status');if(el)el.textContent=text;}

    function cameraBasis(){const c=viewer.getCamera?.();if(!c?.position||!c?.target)return null;const pos=c.position.slice(0,3),target=c.target.slice(0,3),forward=norm(sub(target,pos)),up0=norm((c.up||[0,0,1]).slice(0,3));let right=norm(cross(forward,up0));if(len(right)<1e-8)right=[1,0,0];const up=norm(cross(right,forward));return {...c,pos,target,forward,right,up};}
    function screenRay(clientX,clientY){const r=canvas.getBoundingClientRect(),cam=cameraBasis();if(!cam||!r.width||!r.height)return null;const nx=((clientX-r.left)/r.width)*2-1,ny=1-((clientY-r.top)/r.height)*2,aspect=r.width/r.height,zoom=cam.zoom||1;if(cam.projection==='orthographic'){const span=cam.span||100,hh=span/(2*zoom),hw=hh*aspect,origin=add(cam.pos,add(mul(cam.right,nx*hw),mul(cam.up,ny*hh)));return {origin,dir:cam.forward};}const tan=Math.tan(35*Math.PI/360)/zoom,dir=norm(add(cam.forward,add(mul(cam.right,nx*aspect*tan),mul(cam.up,ny*tan))));return {origin:cam.pos,dir};}
    function worldToScreen(point){const r=canvas.getBoundingClientRect(),cam=cameraBasis();if(!cam||!r.width||!r.height)return null;const v=sub(point,cam.pos),aspect=r.width/r.height,zoom=cam.zoom||1;let nx,ny;if(cam.projection==='orthographic'){const span=cam.span||100,hh=span/(2*zoom),hw=hh*aspect;nx=dot(v,cam.right)/hw;ny=dot(v,cam.up)/hh;}else{const z=dot(v,cam.forward);if(z<=1e-5)return null;const tan=Math.tan(35*Math.PI/360)/zoom;nx=dot(v,cam.right)/(z*tan*aspect);ny=dot(v,cam.up)/(z*tan);}return {x:(nx+1)*r.width/2,y:(1-ny)*r.height/2};}
    function transformPoint(e,x,y,z){return[e[0]*x+e[4]*y+e[8]*z+e[12],e[1]*x+e[5]*y+e[9]*z+e[13],e[2]*x+e[6]*y+e[10]*z+e[14]];}
    function rayBox(ray,min,max){let tmin=-Infinity,tmax=Infinity;for(let i=0;i<3;i++){const o=ray.origin[i],d=ray.dir[i];if(Math.abs(d)<1e-12){if(o<min[i]||o>max[i])return false;continue;}let t1=(min[i]-o)/d,t2=(max[i]-o)/d;if(t1>t2)[t1,t2]=[t2,t1];tmin=Math.max(tmin,t1);tmax=Math.min(tmax,t2);if(tmax<Math.max(tmin,0))return false;}return true;}
    function worldBounds(mesh){const g=mesh.geometry;if(!g)return null;if(!g.boundingBox)g.computeBoundingBox?.();const b=g.boundingBox;if(!b)return null;const e=mesh.matrixWorld.elements,min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];for(const x of [b.min.x,b.max.x])for(const y of [b.min.y,b.max.y])for(const z of [b.min.z,b.max.z]){const p=transformPoint(e,x,y,z);for(let k=0;k<3;k++){min[k]=Math.min(min[k],p[k]);max[k]=Math.max(max[k],p[k]);}}return {min,max};}
    function triHit(ray,a,b,c){const e1=sub(b,a),e2=sub(c,a),h=cross(ray.dir,e2),det=dot(e1,h);if(Math.abs(det)<1e-10)return null;const inv=1/det,s=sub(ray.origin,a),u=inv*dot(s,h);if(u<0||u>1)return null;const q=cross(s,e1),v=inv*dot(ray.dir,q);if(v<0||u+v>1)return null;const t=inv*dot(e2,q);if(t<=1e-6)return null;return {t,normal:norm(cross(e1,e2))};}
    function objectId(mesh){let n=mesh;while(n){if(n.userData?.objectId)return n.userData.objectId;n=n.parent;}return null;}
    function worldVisible(mesh){let n=mesh;while(n){if(n.visible===false)return false;n=n.parent;}return true;}
    function pickSurface(clientX,clientY){
      const ray=screenRay(clientX,clientY);if(!ray)return null;viewer.root.updateMatrixWorld?.(true);let best=null,bestT=Infinity;
      viewer.root.traverse?.(mesh=>{if(!mesh?.isMesh||!mesh.userData?.role||mesh.userData?.proxy||!worldVisible(mesh))return;const g=mesh.geometry,pos=g?.attributes?.position;if(!pos?.array)return;const wb=worldBounds(mesh);if(wb&&!rayBox(ray,wb.min,wb.max))return;const arr=pos.array,item=pos.itemSize||3,index=g.index?.array,e=mesh.matrixWorld.elements,triCount=index?Math.floor(index.length/3):Math.floor(pos.count/3);for(let ti=0;ti<triCount;ti++){const ia=index?index[ti*3]:ti*3,ib=index?index[ti*3+1]:ti*3+1,ic=index?index[ti*3+2]:ti*3+2;const a=transformPoint(e,arr[ia*item],arr[ia*item+1],arr[ia*item+2]),b=transformPoint(e,arr[ib*item],arr[ib*item+1],arr[ib*item+2]),c=transformPoint(e,arr[ic*item],arr[ic*item+1],arr[ic*item+2]),hit=triHit(ray,a,b,c);if(hit&&hit.t<bestT){bestT=hit.t;best={id:objectId(mesh),role:mesh.userData.role,point:add(ray.origin,mul(ray.dir,hit.t)),normal:hit.normal,faceIndex:ti};}}});return best;
    }

    function svgLine(x1,y1,x2,y2,stroke,width=1.5,dash=''){const line=document.createElementNS(NS,'line');line.setAttribute('x1',x1);line.setAttribute('y1',y1);line.setAttribute('x2',x2);line.setAttribute('y2',y2);line.setAttribute('stroke',stroke);line.setAttribute('stroke-width',width);line.setAttribute('vector-effect','non-scaling-stroke');if(dash)line.setAttribute('stroke-dasharray',dash);overlay.appendChild(line);}
    function marker(p,color,label){const s=worldToScreen(p);if(!s)return;const c=document.createElementNS(NS,'circle');c.setAttribute('cx',s.x);c.setAttribute('cy',s.y);c.setAttribute('r','5');c.setAttribute('fill',color);c.setAttribute('stroke','#0b1117');c.setAttribute('stroke-width','2');overlay.appendChild(c);const t=document.createElementNS(NS,'text');t.setAttribute('x',s.x+8);t.setAttribute('y',s.y-8);t.setAttribute('fill','#f2f7fb');t.setAttribute('font-size','10');t.setAttribute('font-family','Segoe UI, sans-serif');t.textContent=label;overlay.appendChild(t);}
    function renderOverlay(){overlay.replaceChildren();if(!state.points.length)return;marker(state.points[0].point,'#ffd166','P1');if(state.points.length<2)return;marker(state.points[1].point,'#5de0e6','P2');const a=state.points[0].point,b=state.points[1].point,px=[b[0],a[1],a[2]],py=[b[0],b[1],a[2]],sa=worldToScreen(a),sb=worldToScreen(b),sx=worldToScreen(px),sy=worldToScreen(py);if(sa&&sb)svgLine(sa.x,sa.y,sb.x,sb.y,'#ffffff',1.4,'5 4');if(sa&&sx)svgLine(sa.x,sa.y,sx.x,sx.y,'#ef5350',2);if(sx&&sy)svgLine(sx.x,sx.y,sy.x,sy.y,'#66bb6a',2);if(sy&&sb)svgLine(sy.x,sy.y,sb.x,sb.y,'#42a5f5',2);}
    let overlayRaf=0;function scheduleOverlay(){if(overlayRaf)return;overlayRaf=requestAnimationFrame(()=>{overlayRaf=0;renderOverlay();});}

    button.onclick=()=>setActive(!state.active,!state.active);q('measureClose').onclick=()=>setActive(false);q('measureClear').onclick=clear;q('measureNew').onclick=()=>{state.points=[];state.active=true;refreshPanel();setStatus('Nova medição: clique na primeira face.');};
    canvas.addEventListener('pointerdown',e=>{if(state.active&&e.button===0)state.down={x:e.clientX,y:e.clientY};});
    canvas.addEventListener('pointerup',e=>{if(!state.active||e.button!==0)return;const d=state.down;state.down=null;if(!d||Math.hypot(e.clientX-d.x,e.clientY-d.y)>5){scheduleOverlay();return;}const hit=pickSurface(e.clientX,e.clientY);if(!hit){setStatus('Nenhuma face encontrada nesse ponto.');return;}if(state.points.length>=2)state.points=[];state.points.push(hit);refreshPanel();if(state.points.length===2){const m=values();setStatus(`Medida: ${fmt(m.linear)} mm · X ${fmt(m.x)} · Y ${fmt(m.y)} · Z ${fmt(m.z)}`);}});
    canvas.addEventListener('pointermove',scheduleOverlay);canvas.addEventListener('wheel',()=>{scheduleOverlay();setTimeout(scheduleOverlay,40)},{passive:true});window.addEventListener('resize',scheduleOverlay);new ResizeObserver(scheduleOverlay).observe(viewport);
    window.addEventListener('keydown',e=>{if(['INPUT','TEXTAREA','SELECT'].includes(e.target?.tagName))return;if(e.key.toLowerCase()==='m'&&api.state?.stage!=='2d'){e.preventDefault();setActive(!state.active,!state.active);}else if(e.key==='Escape'&&state.active){e.preventDefault();setActive(false);}},true);

    refreshPanel();
    window.RVMeasureTool={state,setActive,clear,pickSurface,values,refresh:refreshPanel};
  }
  boot();
})();
