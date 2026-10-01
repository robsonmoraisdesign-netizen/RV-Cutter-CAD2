import assert from 'node:assert/strict';
import fs from 'node:fs';
import {contrastRatio,themeDefinition} from './src/theme-controller.mjs';

for(const name of ['dark','light']){
  const t=themeDefinition(name);
  for(const [fg,min] of [
    ['sketchTextPrimary',7],
    ['sketchTextSecondary',4.5],
    ['sketchTextMuted',4.5],
    ['sketchDimension',7],
    ['sketchDimensionDriven',4.5],
    ['sketchLiveDimension',4.5],
    ['sketchConstraintText',4.5],
  ]){
    const ratio=contrastRatio(t[fg],t.sketchBg);
    assert.ok(ratio>=min,`${name} ${fg}/sketchBg contrast ${ratio.toFixed(2)} < ${min}`);
  }
}

const css=fs.readFileSync('app/theme-engine.css','utf8');
assert.ok(css.includes('--rv-sketch-dimension'),'Sketch dimensions must use canvas-specific semantic text colors');
assert.ok(css.includes('.sketch-contextbar #selection')&&css.includes('font-size:10.5px!important'),'Sketch context text must be large enough to read');
assert.ok(css.includes('.sketch-status-chip')&&css.includes('font-size:10px!important'),'Sketch status text must be readable');
assert.ok(css.includes('.sketch-selection-meta')&&css.includes('font-size:11px!important'),'Sketch inspector explanatory text must be readable');
assert.ok(css.includes('#editor .sketch-dimension')&&css.includes('font-size:1.9%!important'),'Sketch dimensions must have increased visual size');

console.log('PASS 14.28.12 Sketch clarity: canvas contrast and readable CAD typography');
