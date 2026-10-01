const assert=require('node:assert/strict'),fs=require('fs');
const html=fs.readFileSync('app/index.html','utf8');
const css=fs.readFileSync('app/ui-v4.css','utf8');
const ui=fs.readFileSync('src/ui.mjs','utf8');
const geometry=fs.readFileSync('src/geometry.mjs','utf8');
const worker=fs.readFileSync('src/worker.mjs','utf8');
// 14.28.10: one pathological object must not permanently poison the shared geometry worker.

for(const token of [
  'class="app-header v4-top"','id="tabHome"','id="tab3d"','id="tab2d"','id="tabPresentation"',
  '>3D</button>','>Sketch 2D</button>','id="cmdBtn"','Biblioteca de projetos',
  'class="tool-rail-v4"','class="left project-drawer-v4"','class="studio-v4"',
  'id="pieceModeHost"','id="presentationStyles"','id="inspectorLevels"',
  'data-inspector-level="essential"','data-inspector-level="advanced"','data-inspector-level="expert"',
  'id="commandPalette"','id="newSketch"','id="convertCutter"','id="convertAllCutters"','id="finishSketch"','OUTLINER','Objetos da cena'
])assert(html.includes(token),'Missing approved v4 MASTER shell contract: '+token);

assert(!html.includes('id="tab2d" class="workspace-tab" hidden'),'Sketch 2D must be a visible persistent workspace.');
assert.equal((html.match(/id="viewport"/g)||[]).length,1,'Viewport ID must be unique.');
assert(/id="artFile"[^>]*multiple/.test(html),'Artwork picker must support multiple image files.');
assert(css.includes('--v4-brand:#22ddb9'),'Stronger high-contrast v4 teal token missing.');
assert(css.includes('grid-template-columns:var(--v4-rail) var(--v4-drawer) minmax(0,1fr) var(--v4-inspector)'),'V4 rail/drawer/viewport/inspector layout missing.');
assert(css.includes('.piece-mode-host'),'Piece type selector must live in the viewport workspace.');
assert(css.includes('.inspector-levels'),'Essential/Advanced/Expert inspector missing.');
assert(css.includes('.sketch-reference-tile'),'Multi-object Sketch reference dock missing.');
assert(html.includes('value="cad" selected')&&html.includes('CAD técnico · faces + arestas'),'CAD technical display must be the default 3D style.');
assert(css.includes('min-height:180px'),'Outliner must retain a usable object-list height.');
assert(html.includes('todas as configurações salvas, inclusive modo, relevo, chanfro e ajustes locais da lâmina'),'Preset UI must describe complete parameter application.');
assert(ui.includes("version:2,featureType:'cookie-cutter'"),'Preset v2 complete schema missing.');
assert(ui.includes('batchProtectedIds')&&ui.includes('limit=384*1024*1024'),'Batch geometry protection/memory policy missing.');
assert(!ui.includes('params.wallEdits=[];const row={id:uid(),name,params,version:1}'),'Legacy preset code must not silently strip wall edits.');
assert(css.includes('#pieceModeHost:not([hidden])~.viewport-title{top:68px!important}'),'Viewport title must move below the piece-mode selector.');
assert(css.includes('--v4-bg:#080c10')&&css.includes('--v4-text:#ffffff'),'Stronger high-contrast global UI palette missing.');
for(const token of ['installMasterLayout','syncMasterShell','syncViewportChrome','ensureOutlinerVisible','convertAllToCutters','importFiles',"objects:()=>state.objects","state.stage='2d'","$('tab2d').onclick=()=>setStage('2d')"])
  assert(ui.includes(token),'Missing v4 MASTER behavior: '+token);
assert(ui.includes("document.body.classList.toggle('drawer-collapsed')"),'Project drawer collapse wiring missing.');
assert(ui.includes('featureTree(o)')&&ui.includes('convertToCutter'),'Sketch/Feature tree wiring missing.');
assert(ui.includes('RV_WORKER_TIMEOUT')&&ui.includes("buildProfile:'recovery'")&&ui.includes('workerRestarts'),'Stuck-worker watchdog and automatic recovery path missing.');
assert(geometry.includes('maxChamferProfiles')&&geometry.includes("buildProfile==='recovery'?12")&&geometry.includes('automaticSafe'),'Adaptive complexity guard for expensive chamfer builds missing.');
assert(worker.includes("buildProfile:d.buildProfile||'normal'"),'Worker must forward geometry build profiles.');
console.log('Workspace System v4 MASTER COMPLETE contract: PASS');
