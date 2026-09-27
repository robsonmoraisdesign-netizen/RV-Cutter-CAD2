const assert=require('node:assert/strict'),fs=require('fs');
const html=fs.readFileSync('app/index.html','utf8');
const css=fs.readFileSync('app/ui-v4.css','utf8');
const ui=fs.readFileSync('src/ui.mjs','utf8');

for(const token of [
  'class="app-header v4-top"',
  'id="tabHome"',
  'id="tab3d"',
  'id="tab2d"',
  'id="tabPresentation"',
  'id="cmdBtn"',
  'Biblioteca de projetos',
  'Cortadores &amp; carimbos',
  'class="tool-rail-v4"',
  'class="left project-drawer-v4"',
  'class="studio-v4"',
  'class="workspace-nav"',
  'id="commandPalette"'
]) assert(html.includes(token),'Missing v4 shell contract: '+token);

assert(!html.includes('<div class="tabs"><button id="tab3d"'),'Legacy local workspace tabs must not return.');
assert(css.includes('--v4-brand:#58b9a8'),'Approved v4 teal token missing.');
assert(css.includes('grid-template-columns:var(--v4-rail) var(--v4-drawer) minmax(0,1fr) var(--v4-inspector)'),'V4 rail/drawer/viewport/inspector layout missing.');
assert(ui.includes("openCommandPalette"),'Command palette wiring missing.');
assert(ui.includes("document.body.classList.toggle('drawer-collapsed')"),'Project drawer collapse wiring missing.');
assert(ui.includes("$('projectLabel').textContent"),'Persistent project/library label sync missing.');
console.log('Workspace System v4 contract: PASS');
