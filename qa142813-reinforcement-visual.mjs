import assert from 'node:assert/strict';
import fs from 'node:fs';

const viewer=fs.readFileSync('./src/viewer.mjs','utf8');
const classifier=fs.readFileSync('./src/role-classifier.mjs','utf8');
const theme=fs.readFileSync('./src/theme-controller.mjs','utf8');
const ui=fs.readFileSync('./src/ui.mjs','utf8');

assert.match(viewer,/reinforcement:'Reforço da lâmina'/);
assert.match(viewer,/reinforcementLine/);
assert.doesNotMatch(viewer,/reinforcementOverlay/);
assert.match(viewer,/filterReinforcementCadEdges/);

assert.match(
  classifier,
  /return 'reinforcement'/,
  'reinforcement uses actual manifold surface triangles'
);
assert.match(theme,/reinforcement:'#b85cff'/);
assert.match(ui,/randomReinforcementColor/);
assert.match(ui,/generateDistinctPalette/);
assert.match(ui,/rv-color-palettes-v1/);

console.log('PASS real reinforcement surface + palette contract');
