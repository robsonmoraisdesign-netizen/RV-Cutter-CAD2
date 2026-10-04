import assert from 'node:assert/strict';
import fs from 'node:fs';
import {contrastRatio,themeDefinition} from './src/theme-controller.mjs';

const legacy=fs.readFileSync('app/style.css','utf8');
const theme=fs.readFileSync('app/theme-engine.css','utf8');
const appearance=fs.readFileSync('app/appearance-engine.css','utf8');
const html=fs.readFileSync('app/index.html','utf8');
const controller=fs.readFileSync('src/appearance-controller.mjs','utf8');
const ui=fs.readFileSync('src/ui.mjs','utf8');
const editor=fs.readFileSync('src/editor.mjs','utf8');

const raw=s=>(s.match(/#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)/g)||[]);
assert.equal(raw(theme).length,0,'theme-engine.css must remain token-only');
assert.equal(raw(appearance).length,0,'appearance-engine.css must remain token-only');
assert.ok(raw(legacy).length>300,'legacy stylesheet fixture should expose hardcoded-color debt');
assert.ok(html.indexOf('theme-engine.css')<html.indexOf('appearance-engine.css'),'appearance governor must load last');
assert.ok(ui.includes('installAppearanceController()'),'appearance controller must be active');
assert.ok(controller.includes('MutationObserver'),'dynamic UI must be classified');
assert.ok(controller.includes('localStorage.setItem(STORAGE_KEY'),'audit reports must persist');

for(const name of ['dark','light']){
 const t=themeDefinition(name);
 for(const [fg,bg,min] of [
  ['textPrimary','surface1',7],
  ['textSecondary','surface1',4.5],
  ['textDisabled','surface2',4.5],
  ['textOnAccent','accent',4.5],
  ['textOnAccent','accentHover',4.5],
  ['danger','surface1',4.5],
  ['warning','surface1',4.5],
  ['success','surface1',4.5],
  ['info','surface1',4.5]
 ]){
  const ratio=contrastRatio(t[fg],t[bg]);
  assert.ok(ratio>=min,name+' '+fg+'/'+bg+' '+ratio.toFixed(2)+' < '+min);
 }
}
assert.ok(editor.includes("referenceId:'datum-origin'"),'Sketch must expose the real origin as a snap datum');
assert.ok(editor.includes("referenceId:'datum-axis-x'"),'Sketch must expose X axis as a snap datum');
assert.ok(editor.includes("referenceId:'datum-axis-y'"),'Sketch must expose Y axis as a snap datum');
assert.ok(editor.includes("localPoint([0,0],n)"),'rendered datum must use real sketch origin');

console.log('PASS 14.28.14 appearance governor + real sketch datums');
