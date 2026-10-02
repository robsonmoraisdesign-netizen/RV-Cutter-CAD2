import {auditContrast,themeName} from './theme-controller.mjs';

export const APPEARANCE_ENGINE_VERSION='14.28.14-appearance-1';
const STORAGE_KEY='rv-appearance-audit-v1';

const SELECTOR_ROLES=[
 ['.app-header,.tool-rail-v4,.workspace .toolbar,.workspace footer,.onshape-ribbon,.sketch-commandbar','surface-chrome'],
 ['.project-drawer-v4,.right,.library-section,.project-card,.sketch-contextbar,.option-card,.param-group','surface-panel'],
 ['dialog,.command-palette-v4,.leave-project-dialog,.visual-popover,.sketch-menu-popover,.sketch-inline-dimension,.sketch-shortcut-palette,.sketch-diagnostics-popover','surface-elevated'],
 ['#viewport,.workspace','surface-viewport'],
 ['.primary,.big-action,.feature-action.accent,#export,.right .primary,.finish-sketch','button-primary'],
 ['.danger-quiet,.danger,.delete,.destructive','button-danger'],
 ['.secondary-accent,.isolation-banner','button-accent'],
 ['.project-type-card,.import,.project-card','button-card'],
 ['.workspace-tab,.rail-tool,.header-action,.icon-button,.command-button,.layer-actions button,.help-button,.feature-action,.sketch-tool-button,.sketch-shortcut-button,.measure-actions button,.object-quick-actions button,.full-button,.button-row button','button-neutral'],
 ['input:not([type="checkbox"]):not([type="radio"]):not([type="color"]):not([type="range"]),select,textarea','field'],
 ['input[type="checkbox"],input[type="radio"],input[type="range"],input[type="color"]','field-control'],
 ['.hint,.mini-label,.section-eyebrow,.library-status,.metrics-hint,.coming-soon,.save-state,.count-badge,.cap,.sketch-context-hint,.sketch-selection-meta,.brand-copy small,.popover-title small','text-muted'],
 ['h1,h2,h3,h4,.workspace-context-title strong,.project-title-row #name,.popover-title strong','text-title'],
 ['label,strong,.property-group-title,.metrics-head strong','text-primary'],
 ['summary','summary'],
 ['.badge,.inspector-badge,.sketch-status-chip,.constraint-icon,kbd','badge'],
 ['#status,#homeStatus,[role="status"]','status']
];

function matchesAny(el,selector){try{return el.matches(selector);}catch{return false;}}
function inferredRole(el){
 if(el.dataset?.rvRole)return {role:el.dataset.rvRole,source:'explicit'};
 for(const [selector,role] of SELECTOR_ROLES)if(matchesAny(el,selector))return {role,source:'selector'};
 if(el.closest?.('#editor'))return {role:'sketch-ui',source:'sketch'};
 const tag=el.tagName?.toLowerCase();
 if(tag==='button')return {role:'button-neutral',source:'fallback'};
 if(['input','select','textarea'].includes(tag))return {role:'field',source:'fallback'};
 if(['header','footer','nav'].includes(tag))return {role:'surface-chrome',source:'fallback'};
 if(['aside','dialog'].includes(tag))return {role:'surface-panel',source:'fallback'};
 if(['h1','h2','h3','h4','strong'].includes(tag))return {role:'text-title',source:'fallback'};
 if(['label'].includes(tag))return {role:'text-primary',source:'fallback'};
 if(['p','small','span','code','output'].includes(tag))return {role:'text-secondary',source:'fallback'};
 if(tag==='summary')return {role:'summary',source:'fallback'};
 if(['div','section','article'].includes(tag)){
  const cs=getComputedStyle(el),bg=cs.backgroundColor,border=[cs.borderTopColor,cs.borderRightColor,cs.borderBottomColor,cs.borderLeftColor];
  const coloredBackground=bg&&!/^rgba?\(0, 0, 0, 0\)$/.test(bg)&&bg!=='transparent';
  const visibleBorder=border.some(v=>v&&v!=='transparent'&&!/^rgba?\(0, 0, 0, 0\)$/.test(v));
  if(coloredBackground||visibleBorder)return {role:'surface-neutral',source:'computed'};
 }
 return null;
}

function colorBearing(el){
 const tag=el.tagName?.toLowerCase();
 if(['button','input','select','textarea','label','p','span','small','strong','h1','h2','h3','h4','summary','dialog','aside','header','footer','nav','code','output'].includes(tag))return true;
 if(el.matches?.('.app-header,.tool-rail-v4,.workspace,.right,.project-drawer-v4,.library-section,.project-card,.option-card,.param-group,.visual-popover,.sketch-menu-popover,.sketch-contextbar,.sketch-commandbar,.badge,.inspector-badge,.sketch-status-chip'))return true;
 if(['div','section','article'].includes(tag)){const cs=getComputedStyle(el);if(cs.backgroundColor!=='rgba(0, 0, 0, 0)'||['solid','double','inset','outset'].includes(cs.borderTopStyle))return true;}
 return false;
}
function descriptor(el){
 return {
  tag:el.tagName?.toLowerCase()||'',
  id:el.id||null,
  classes:typeof el.className==='string'?el.className.split(/\s+/).filter(Boolean).slice(0,8):[],
  role:el.dataset?.rvRole||null,
  roleSource:el.dataset?.rvRoleSource||null
 };
}
export function applyAppearanceRoles(root=document){
 const nodes=[...(root===document?document.querySelectorAll('*'):root.querySelectorAll('*'))];
 let controlled=0,uncontrolled=0;
 const unresolved=[];
 for(const el of nodes){
  if(!colorBearing(el))continue;
  const result=inferredRole(el);
  if(result){
   el.dataset.rvRole=result.role;
   el.dataset.rvRoleSource=result.source;
   controlled++;
  }else{
   uncontrolled++;
   unresolved.push(descriptor(el));
  }
 }
 return {controlled,uncontrolled,unresolved};
}
export function appearanceAudit(root=document){
 const coverage=applyAppearanceRoles(root),contrast=auditContrast(document.body,{fix:true});
 const roleCounts={};
 for(const el of document.querySelectorAll('[data-rv-role]'))roleCounts[el.dataset.rvRole]=(roleCounts[el.dataset.rvRole]||0)+1;
 const report={
  version:APPEARANCE_ENGINE_VERSION,
  timestamp:new Date().toISOString(),
  theme:themeName(),
  controlled:coverage.controlled,
  uncontrolled:coverage.uncontrolled,
  coverage:coverage.controlled+coverage.uncontrolled?coverage.controlled/(coverage.controlled+coverage.uncontrolled):1,
  roleCounts,
  unresolved:coverage.unresolved.slice(0,200),
  contrast
 };
 try{localStorage.setItem(STORAGE_KEY,JSON.stringify(report));}catch{}
 return report;
}
let observer=null,timer=0;
function schedule(){clearTimeout(timer);timer=setTimeout(()=>requestAnimationFrame(()=>appearanceAudit()),24);}
export function installAppearanceController(){
 applyAppearanceRoles(document);
 if(!observer&&document.body){
  observer=new MutationObserver(records=>{
   let changed=false;
   for(const r of records){
    for(const n of r.addedNodes||[])if(n.nodeType===1){applyAppearanceRoles(n);changed=true;}
    if(r.type==='attributes')changed=true;
   }
   if(changed)schedule();
  });
  observer.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class','disabled','hidden','data-state']});
 }
 window.addEventListener('rv-theme-change',schedule);
 window.RVAppearance={version:APPEARANCE_ENGINE_VERSION,audit:appearanceAudit,apply:applyAppearanceRoles,last:()=>{try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');}catch{return null;}}};
 schedule();
 return window.RVAppearance;
}
