import assert from 'node:assert/strict';
import fs from 'node:fs';
import {contrastRatio,ensureContrast,themeDefinition,MODEL_COLORS,LEGACY_MODEL_COLORS} from './src/theme-controller.mjs';

for(const name of ['dark','light']){
 const t=themeDefinition(name);
 const checks=[
  ['textPrimary','surface1',7],
  ['textSecondary','surface1',4.5],
  ['textMuted','surface1',4.5],
  ['textOnAccent','accent',4.5],
  ['dimensionText','dimensionBg',7],
  ['dimensionEditable','dimensionBg',4.5],
  ['measureLabel','viewportBg',4.5]
 ];
 for(const [fg,bg,min] of checks){
  const ratio=contrastRatio(t[fg],t[bg]);
  assert.ok(ratio>=min, name+' '+fg+'/'+bg+' contrast '+ratio.toFixed(2)+' < '+min);
 }
 assert.equal(ensureContrast(t.dimensionText,t.dimensionBg,7),t.dimensionText);
}

const html=fs.readFileSync('app/index.html','utf8');
const engine=fs.readFileSync('app/theme-engine.css','utf8');
const ui=fs.readFileSync('src/ui.mjs','utf8');
const viewer=fs.readFileSync('src/viewer.mjs','utf8');
const editor=fs.readFileSync('src/editor.mjs','utf8');
const measure=fs.readFileSync('src/measure-tool.js','utf8');
const build=fs.readFileSync('scripts/build.mjs','utf8');

assert.ok(html.indexOf('ui-v4.css')<html.indexOf('theme-engine.css'),'theme engine must load after legacy UI CSS');
assert.ok(ui.includes("from './theme-controller.mjs'")&&ui.includes('toggleTheme()'),'UI theme toggle must use controller');
assert.ok(!ui.includes("classList.toggle('ui-light')"),'legacy class-only theme toggle must be removed');
assert.ok(viewer.includes("themeColor('dimensionBg')")||viewer.includes('t.dimensionBg'),'3D dimension labels must use theme tokens');
assert.ok(viewer.includes('ensureContrast(preferred,bg'),'3D annotations must enforce contrast');
assert.ok(measure.includes("theme('measureLabel')")&&measure.includes("theme('measureOutline')"),'measure overlay must use semantic colors');
assert.equal((editor.match(/#[0-9a-fA-F]{3,8}\b|rgba?\(/g)||[]).length,0,'Sketch editor must not hardcode runtime colors');
assert.equal((measure.match(/#[0-9a-fA-F]{3,8}\b|rgba?\(/g)||[]).length,0,'Measure tool must not hardcode runtime colors');
assert.equal((engine.match(/#[0-9a-fA-F]{3,8}\b|rgba?\(/g)||[]).length,0,'Theme engine stylesheet must use semantic variables only');
assert.ok(build.includes("copyFileSync('src/measure-tool.js','app/measure-tool.js')"),'build must synchronize measure source');
assert.deepEqual(Object.keys(MODEL_COLORS).sort(),Object.keys(LEGACY_MODEL_COLORS).sort(),'model color migrations must stay centralized');

console.log('PASS 14.28.11 universal theme engine: semantic tokens, contrast and runtime consumers');
