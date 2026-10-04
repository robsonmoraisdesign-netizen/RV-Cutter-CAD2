const assert=require('node:assert/strict'),fs=require('fs');
const html=fs.readFileSync('app/index.html','utf8');
const ui=fs.readFileSync('src/ui.mjs','utf8');
const editor=fs.readFileSync('src/editor.mjs','utf8');
const css=fs.readFileSync('app/style.css','utf8')+'\n'+fs.readFileSync('app/ui-v4.css','utf8');

for(const token of [
  'class="sketch-ribbon v4-sketchbar"','>Criar</span>','>Modificar</span>','>Restringir</span>',
  'id="sketchDimensionCommand"','>Referência</span>','id="sketchDiagnosticsCommand"',
  'data-tool="select"','data-tool="sketch-line"','data-tool="rectangle"','data-tool="circle"',
  'data-tool="arc"','data-tool="bezier"','data-tool="point"','data-tool="trim"','data-tool="extend"',
  'data-constraint="midpoint"','id="showSketchConstraints"','id="sketchShortcutPalette"',
  'id="sketchInlineDimension"','id="sketchStatusChip"','id="sketchInspector"',
  'id="leaveProjectDialog"','id="leaveSave"','id="leaveDiscard"','id="leaveCancel"'
])assert(html.includes(token),'Missing approved Sketch v4 menu contract: '+token);

assert(!html.includes('class="sketch-ribbon onshape-ribbon"'),'Old flat Sketch ribbon must not return.');
for(const token of [
  'resolveProjectTransition','closeCurrentProject','destroyCurrentProject','writeRecovery','projectSignature',
  "map={d:'dimension',m:'trim',l:'sketch-line',r:'rectangle',c:'circle',a:'arc',b:'bezier',p:'point'}",
  'toggleSketchShortcutPalette','activateSketchTool'
])assert(ui.includes(token),'Missing UI/lifecycle wiring: '+token);
for(const token of ['sketch-entity-hit','sketch-box-select','openInlineDimension','parallelInference','finishBezier','sketch.trim','sketch.extend','selectBox'])
  assert(editor.includes(token),'Missing Sketch interaction: '+token);
for(const token of ['.v4-sketchbar','.v4-menu-group','.sketch-entity-hit','.sketch-box-select','.sketch-inline-dimension','.sketch-shortcut-palette'])
  assert(css.includes(token),'Missing Sketch v4 styling: '+token);
assert(ui.includes("window.desktop?.autosave"),'Recovery must remain separate from explicit catalog save.');
console.log('Sketch v4 grouped menu + lifecycle contract: PASS');
