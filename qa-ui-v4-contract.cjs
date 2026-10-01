const assert=require('node:assert/strict'),fs=require('fs');
const html=fs.readFileSync('app/index.html','utf8');
const css=fs.readFileSync('app/ui-v4.css','utf8');
const ui=fs.readFileSync('src/ui.mjs','utf8');

for(const token of [
  'class="app-header v4-top"','id="tabHome"','id="tab3d"','id="tab2d"','id="tabPresentation"',
  '>3D</button>','>Sketch 2D</button>','id="cmdBtn"','Biblioteca de projetos',
  'class="tool-rail-v4"','class="left project-drawer-v4"','class="studio-v4"',
  'id="pieceModeHost"','id="presentationStyles"','id="inspectorLevels"',
  'data-inspector-level="essential"','data-inspector-level="advanced"','data-inspector-level="expert"',
  'id="commandPalette"','id="newSketch"','id="convertCutter"','id="convertAllCutters"','id="finishSketch"','OUTLINER','Objetos da cena'
])assert(html.includes(token),'Missing approved v4 MASTER shell contract: '+token);

assert(!html.includes('id="tab2d" class="workspace-tab" hidden'),'Sketch 2D must be a visible persistent workspace.');
assert(css.includes('--v4-brand:#2bd3b3'),'High-contrast v4 teal token missing.');
assert(css.includes('grid-template-columns:var(--v4-rail) var(--v4-drawer) minmax(0,1fr) var(--v4-inspector)'),'V4 rail/drawer/viewport/inspector layout missing.');
assert(css.includes('.piece-mode-host'),'Piece type selector must live in the viewport workspace.');
assert(css.includes('.inspector-levels'),'Essential/Advanced/Expert inspector missing.');
assert(css.includes('.sketch-reference-tile'),'Multi-object Sketch reference dock missing.');
assert(html.includes('value="cad" selected')&&html.includes('CAD técnico · faces + arestas'),'CAD technical display must be the default 3D style.');
assert(css.includes('min-height:180px'),'Outliner must retain a usable object-list height.');
assert(css.includes('#pieceModeHost:not([hidden])~.viewport-title{top:68px!important}'),'Viewport title must move below the piece-mode selector.');
assert(css.includes('--v4-bg:#10151a')&&css.includes('--v4-text:#ffffff'),'High-contrast global UI palette missing.');
for(const token of ['installMasterLayout','syncMasterShell','ensureOutlinerVisible','convertAllToCutters',"objects:()=>state.objects","state.stage='2d'","$('tab2d').onclick=()=>setStage('2d')"])
  assert(ui.includes(token),'Missing v4 MASTER behavior: '+token);
assert(ui.includes("document.body.classList.toggle('drawer-collapsed')"),'Project drawer collapse wiring missing.');
assert(ui.includes('featureTree(o)')&&ui.includes('convertToCutter'),'Sketch/Feature tree wiring missing.');
console.log('Workspace System v4 MASTER COMPLETE contract: PASS');
