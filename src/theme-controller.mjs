const STORAGE_KEY='rv-theme-v2';
const LEGACY_KEY='rv-ui-light';

export const MODEL_COLORS=Object.freeze({cutterBase:'#2f9fe8',blade:'#126fd0',stampBase:'#25c7b5',relief:'#f2a93b'});
export const LEGACY_MODEL_COLORS=Object.freeze({cutterBase:'#78a9ee',blade:'#e9b45e',stampBase:'#659ea9',relief:'#7be0b6'});

const THEMES={
 dark:{
  appBg:'#080c10',chrome:'#0d1319',surface1:'#121a21',surface2:'#182128',surface3:'#22303a',surfaceElevated:'#263641',
  inputBg:'#0d141a',hoverBg:'#1b262f',activeBg:'#26343d',
  textPrimary:'#f8fbfd',textSecondary:'#dbe7ef',textMuted:'#9badba',textDisabled:'#687984',
  borderSubtle:'#27343d',borderStrong:'#3d5262',
  accent:'#2bd3b3',accentHover:'#54e4ca',accentSoft:'#183a38',focus:'#72f2d7',
  danger:'#ff737c',warning:'#f2ad45',success:'#4bd39e',info:'#5aa7e8',
  overlayBackdrop:'rgba(5,9,12,.58)',shadowColor:'rgba(0,0,0,.42)',
  viewportBg:'#eef3f6',viewportGrid:'#95a7b4',viewportGridStrong:'#526b7b',
  dimensionBg:'#10202e',dimensionText:'#ffffff',dimensionEditable:'#8fd2ff',dimensionLine:'#1769d3',
  measureLabel:'#f8fbfd',measureOutline:'#0b1117',measureP1:'#c68400',measureP2:'#007f8a',measureX:'#d63f4e',measureY:'#26804f',measureZ:'#276fc1',
  sketchBg:'#edf2f1',sketchEntity:'#286bbb',sketchUnder:'#476a90',sketchSelected:'#d96d1f',sketchHover:'#008c9e',
  sketchConstrained:'#187d6c',sketchConstruction:'#6b7c88',sketchConstraint:'#9a5b00',sketchHandle:'#ffffff',sketchBlade:'#b56f00',
  selection3d:'#2d78b8',hover3d:'#183d59',selectionMix:'#91c8ff',hoverMix:'#75a8d5',
  neutralWhite:'#ffffff',viewportLight:'#e4eeff',viewportGround:'#263347',viewportFill:'#a6ceff'
 },
 light:{
  appBg:'#e7ecef',chrome:'#f7f9fa',surface1:'#ffffff',surface2:'#f2f5f7',surface3:'#e5ecef',surfaceElevated:'#ffffff',
  inputBg:'#ffffff',hoverBg:'#edf2f4',activeBg:'#dfe8ec',
  textPrimary:'#182129',textSecondary:'#33434f',textMuted:'#5e6e79',textDisabled:'#87939b',
  borderSubtle:'#d2dbe0',borderStrong:'#9fadb7',
  accent:'#0b927d',accentHover:'#087663',accentSoft:'#d7f1eb',focus:'#006f60',
  danger:'#b92f41',warning:'#8f5600',success:'#18794e',info:'#1768aa',
  overlayBackdrop:'rgba(18,25,30,.28)',shadowColor:'rgba(26,36,44,.20)',
  viewportBg:'#f3f6f8',viewportGrid:'#9aaab6',viewportGridStrong:'#5d7382',
  dimensionBg:'#ffffff',dimensionText:'#17212a',dimensionEditable:'#0b4f85',dimensionLine:'#0b63ce',
  measureLabel:'#17212a',measureOutline:'#ffffff',measureP1:'#9a6500',measureP2:'#006f78',measureX:'#b62f3d',measureY:'#1d7447',measureZ:'#1b63ad',
  sketchBg:'#f2f5f4',sketchEntity:'#1f62a8',sketchUnder:'#486b89',sketchSelected:'#b65c14',sketchHover:'#007b89',
  sketchConstrained:'#126b5d',sketchConstruction:'#657783',sketchConstraint:'#8a5100',sketchHandle:'#ffffff',sketchBlade:'#9e6200',
  selection3d:'#1b66a5',hover3d:'#315a73',selectionMix:'#7fbbf4',hoverMix:'#81a6c4',
  neutralWhite:'#ffffff',viewportLight:'#ffffff',viewportGround:'#c4d0d8',viewportFill:'#d7e7f2'
 }
};

const CSS_NAMES={
 appBg:'--rv-app-bg',chrome:'--rv-chrome',surface1:'--rv-surface-1',surface2:'--rv-surface-2',surface3:'--rv-surface-3',surfaceElevated:'--rv-surface-elevated',
 inputBg:'--rv-input-bg',hoverBg:'--rv-hover-bg',activeBg:'--rv-active-bg',
 textPrimary:'--rv-text-primary',textSecondary:'--rv-text-secondary',textMuted:'--rv-text-muted',textDisabled:'--rv-text-disabled',textOnAccent:'--rv-text-on-accent',
 borderSubtle:'--rv-border-subtle',borderStrong:'--rv-border-strong',
 accent:'--rv-accent',accentHover:'--rv-accent-hover',accentSoft:'--rv-accent-soft',focus:'--rv-focus',
 danger:'--rv-danger',warning:'--rv-warning',success:'--rv-success',info:'--rv-info',
 overlayBackdrop:'--rv-overlay-backdrop',shadowColor:'--rv-shadow-color',
 viewportBg:'--rv-viewport-bg',viewportGrid:'--rv-viewport-grid',viewportGridStrong:'--rv-viewport-grid-strong',
 dimensionBg:'--rv-dimension-bg',dimensionText:'--rv-dimension-text',dimensionEditable:'--rv-dimension-editable',dimensionLine:'--rv-dimension-line',
 measureLabel:'--rv-measure-label',measureOutline:'--rv-measure-outline',measureP1:'--rv-measure-p1',measureP2:'--rv-measure-p2',measureX:'--rv-measure-x',measureY:'--rv-measure-y',measureZ:'--rv-measure-z',
 sketchBg:'--rv-sketch-bg',sketchEntity:'--rv-sketch-entity',sketchUnder:'--rv-sketch-under',sketchSelected:'--rv-sketch-selected',sketchHover:'--rv-sketch-hover',
 sketchConstrained:'--rv-sketch-constrained',sketchConstruction:'--rv-sketch-construction',sketchConstraint:'--rv-sketch-constraint',sketchHandle:'--rv-sketch-handle',sketchBlade:'--rv-sketch-blade'
};

let current='dark',revision=0,lastAudit={checked:0,corrected:0,violations:[]},auditTimer=0,observer=null;

function parseColor(value){
 const s=String(value||'').trim();
 if(/^#[0-9a-f]{3}$/i.test(s))return s.slice(1).split('').map(x=>parseInt(x+x,16));
 if(/^#[0-9a-f]{6}$/i.test(s))return [parseInt(s.slice(1,3),16),parseInt(s.slice(3,5),16),parseInt(s.slice(5,7),16)];
 const m=s.match(/^rgba?\(([^)]+)\)$/i);if(m){const p=m[1].split(',').map(Number);return p.slice(0,3);}
 return null;
}
function luminance(value){const rgb=parseColor(value);if(!rgb)return 0;const v=rgb.map(x=>{x=Math.max(0,Math.min(255,x))/255;return x<=.04045?x/12.92:Math.pow((x+.055)/1.055,2.4)});return .2126*v[0]+.7152*v[1]+.0722*v[2];}
export function contrastRatio(a,b){const l1=luminance(a),l2=luminance(b);return (Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05);}
export function ensureContrast(preferred,background,min=4.5){
 if(preferred&&contrastRatio(preferred,background)>=min)return preferred;
 const candidates=['#0b1117','#17212a','#ffffff','#f8fbfd'];
 return candidates.sort((a,b)=>contrastRatio(b,background)-contrastRatio(a,background))[0];
}
export function contrastText(background,preferred=null,min=4.5){return ensureContrast(preferred,background,min);}

function normalized(name){
 const raw={...(THEMES[name]||THEMES.dark)};
 raw.textPrimary=ensureContrast(raw.textPrimary,raw.surface1,7);
 raw.textSecondary=ensureContrast(raw.textSecondary,raw.surface1,4.5);
 raw.textMuted=ensureContrast(raw.textMuted,raw.surface1,4.5);
 raw.textOnAccent=ensureContrast(name==='light'?'#ffffff':'#10231f',raw.accent,4.5);
 raw.dimensionText=ensureContrast(raw.dimensionText,raw.dimensionBg,7);
 raw.dimensionEditable=ensureContrast(raw.dimensionEditable,raw.dimensionBg,4.5);
 raw.measureLabel=ensureContrast(raw.measureLabel,raw.viewportBg,4.5);
 return raw;
}

function applyCss(tokens){
 const root=document.documentElement;
 for(const [key,css] of Object.entries(CSS_NAMES))if(tokens[key]!=null)root.style.setProperty(css,tokens[key]);
 root.style.setProperty('--rv-shadow-elevation',`0 18px 48px ${tokens.shadowColor}`);
 root.dataset.rvTheme=current;
 if(document.body){
  document.body.classList.toggle('ui-light',current==='light');
  document.body.classList.toggle('ui-dark',current==='dark');
  document.body.dataset.rvTheme=current;
 }
}

function rgba(value){
 const s=String(value||'').trim(),rgb=parseColor(s);if(!rgb)return null;
 const m=s.match(/^rgba?\(([^)]+)\)$/i),alpha=m&&m[1].split(',').length>3?Math.max(0,Math.min(1,Number(m[1].split(',')[3]))):1;
 return [...rgb,Number.isFinite(alpha)?alpha:1];
}
function composite(fg,bg){const a=fg[3]+bg[3]*(1-fg[3]);if(a<=1e-6)return [255,255,255,0];return [0,1,2].map(i=>(fg[i]*fg[3]+bg[i]*bg[3]*(1-fg[3]))/a).concat(a);}
function effectiveBackground(el){
 const layers=[];for(let n=el;n&&n.nodeType===1;n=n.parentElement){const v=rgba(getComputedStyle(n).backgroundColor);if(v&&v[3]>0)layers.push(v);if(v?.[3]>=.995)break;}
 let bg=current==='light'?[255,255,255,1]:[8,12,16,1];for(let i=layers.length-1;i>=0;i--)bg=composite(layers[i],bg);return '#'+bg.slice(0,3).map(v=>Math.round(v).toString(16).padStart(2,'0')).join('');
}
export function auditContrast(root=document.body,{fix=true}={}){
 if(!root)return {checked:0,corrected:0,violations:[]};const violations=[];let checked=0,corrected=0;
 const nodes=root.querySelectorAll('button,label,p,span,small,strong,h1,h2,h3,h4,summary,input,select,textarea,code,[role="status"]');
 for(const el of nodes){if(el.closest('[hidden],[aria-hidden="true"]')||el.dataset.rvContrastExempt==='true')continue;const cs=getComputedStyle(el),r=el.getBoundingClientRect();if(cs.display==='none'||cs.visibility==='hidden'||Number(cs.opacity)<.2||r.width<1||r.height<1)continue;const fg=cs.color,bg=effectiveBackground(el);if(!parseColor(fg)||!parseColor(bg))continue;const size=parseFloat(cs.fontSize)||12,weight=parseInt(cs.fontWeight)||400,min=size>=24||size>=18&&weight>=700?3:4.5,ratio=contrastRatio(fg,bg);checked++;if(ratio+1e-3<min){const safe=ensureContrast(fg,bg,min);violations.push({tag:el.tagName,id:el.id||null,className:typeof el.className==='string'?el.className:'',ratio:+ratio.toFixed(2),min,foreground:fg,background:bg,safe});if(fix){el.style.setProperty('--rv-auto-contrast',safe);el.classList.add('rv-contrast-guard');corrected++;}}else if(fix&&el.classList.contains('rv-contrast-guard')){el.classList.remove('rv-contrast-guard');el.style.removeProperty('--rv-auto-contrast');}}
 lastAudit={checked,corrected,violations:violations.slice(0,100)};return lastAudit;
}
function scheduleContrastAudit(){clearTimeout(auditTimer);auditTimer=setTimeout(()=>requestAnimationFrame(()=>auditContrast(document.body)),30);}
function installContrastObserver(){if(observer||!document.body)return;observer=new MutationObserver(m=>{if(m.some(x=>x.addedNodes?.length))scheduleContrastAudit();});observer.observe(document.body,{subtree:true,childList:true});}

export function setTheme(name,{persist=true,emit=true}={}){
 current=name==='light'?'light':'dark';const tokens=normalized(current);revision++;applyCss(tokens);
 if(persist)try{localStorage.setItem(STORAGE_KEY,current);localStorage.removeItem(LEGACY_KEY);}catch{}
 if(emit)window.dispatchEvent(new CustomEvent('rv-theme-change',{detail:{name:current,revision,tokens:{...tokens}}}));
 scheduleContrastAudit();return current;
}
export function toggleTheme(){return setTheme(current==='light'?'dark':'light');}
export function initTheme(){
 let saved='';try{saved=localStorage.getItem(STORAGE_KEY)||'';if(!saved&&localStorage.getItem(LEGACY_KEY)==='1')saved='light';}catch{}
 return setTheme(saved==='light'?'light':'dark',{persist:false,emit:false});
}
export function themeName(){return current;}
export function themeRevision(){return revision;}
export function themeSnapshot(){return {...normalized(current),name:current,revision};}
export function themeDefinition(name){return {...normalized(name==='light'?'light':'dark')};}
export function themeColor(role){return normalized(current)[role]||'#ff00ff';}
export function themeDiagnostics(){
 const t=normalized(current),pairs=[
  ['textPrimary','surface1',7],['textSecondary','surface1',4.5],['textMuted','surface1',4.5],
  ['textPrimary','surface2',7],['textSecondary','surface2',4.5],['textOnAccent','accent',4.5],
  ['dimensionText','dimensionBg',7],['dimensionEditable','dimensionBg',4.5],['measureLabel','viewportBg',4.5]
 ];
 return {theme:current,revision,pairs:pairs.map(([fg,bg,min])=>({fg,bg,min,ratio:+contrastRatio(t[fg],t[bg]).toFixed(2),pass:contrastRatio(t[fg],t[bg])>=min})),audit:lastAudit,tokens:t};
}
export function installThemeGlobal(){
 window.RVTheme={init:initTheme,set:setTheme,toggle:toggleTheme,name:themeName,color:themeColor,snapshot:themeSnapshot,contrastRatio,ensureContrast,audit:auditContrast,diagnostics:themeDiagnostics};
 installContrastObserver();scheduleContrastAudit();return window.RVTheme;
}
