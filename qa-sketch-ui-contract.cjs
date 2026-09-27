const assert=require('node:assert/strict'),fs=require('fs');
const html=fs.readFileSync('app/index.html','utf8');
const ui=fs.readFileSync('src/ui.mjs','utf8');
const editor=fs.readFileSync('src/editor.mjs','utf8');
const css=fs.readFileSync('app/style.css','utf8')+'\n'+fs.readFileSync('app/ui-v4.css','utf8');

for(const token of [
  'class="sketch-ribbon onshape-ribbon"',
  'data-tool="select"',
  'data-tool="sketch-line"',
  'data-tool="rectangle"',
  'data-tool="circle"',
  'data-tool="arc"',
  'data-tool="bezier"',
  'data-tool="trim"',
  'data-tool="extend"',
  'data-constraint="midpoint"',
  'id="sketchDimensionCommand"',
  'id="showSketchConstraints"',
  'id="sketchShortcutPalette"',
  'id="sketchInlineDimension"',
  'id="sketchStatusChip"',
  'id="sketchInspector"',
  'id="leaveProjectDialog"',
  'id="leaveSave"',
  'id="leaveDiscard"',
  'id="leaveCancel"'
])assert(html.includes(token),'Missing Phase 2 UI contract: '+token);

assert(!html.includes('class="toolbuttons"'),'Legacy Sketch toolbutton bar must not return.');
assert(!html.includes('class="sketch-controls"'),'Legacy collapsible constraint block must not return.');
assert(!html.includes('>Criar <span class="chevron">'),'Phase 2 must not regress to the previous generic Create menu.');
assert(!html.includes('>Modificar <span class="chevron">'),'Phase 2 must not regress to the previous generic Modify menu.');

for(const token of [
  'resolveProjectTransition','closeCurrentProject','destroyCurrentProject','writeRecovery','projectSignature',
  "map={d:'dimension',m:'trim',l:'sketch-line',r:'rectangle',c:'circle',a:'arc',b:'bezier'}",
  'toggleSketchShortcutPalette','activateSketchTool'
])assert(ui.includes(token),'Missing UI/lifecycle wiring: '+token);

for(const token of [
  'sketch-entity-hit','sketch-box-select','openInlineDimension','parallelInference',
  'finishBezier','sketch.trim','sketch.extend','selectBox'
])assert(editor.includes(token),'Missing Sketch Phase 2 interaction: '+token);

for(const token of [
  '.sketch-entity-hit','.entity-under','.entity-defined','.entity-conflict',
  '.sketch-inline-dimension','.sketch-shortcut-palette','.onshape-ribbon'
])assert(css.includes(token),'Missing Phase 2 Sketch styling: '+token);

assert(ui.includes("window.desktop?.autosave"),'Recovery must remain separate from explicit catalog save.');
console.log('Sketch Phase 2 UI + project lifecycle contract: PASS');
