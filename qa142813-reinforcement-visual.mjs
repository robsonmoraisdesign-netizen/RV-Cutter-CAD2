import assert from 'node:assert/strict';
import fs from 'node:fs';

const viewer=fs.readFileSync('./src/viewer.mjs','utf8');
const classifier=fs.readFileSync('./src/role-classifier.mjs','utf8');
const theme=fs.readFileSync('./src/theme-controller.mjs','utf8');
const ui=fs.readFileSync('./src/ui.mjs','utf8');

assert.match(viewer,/reinforcement:'Reforço da lâmina'/);
assert.match(viewer,/reinforcementLine/);
assert.match(viewer,/reinforcement:\[\]/);
assert.match(classifier,/return 'reinforcement'/);
assert.match(theme,/reinforcement:'#b85cff'/);
assert.match(ui,/randomReinforcementColor/);
assert.match(ui,/reinforcement:randomReinforcementColor\(\)/);

console.log('PASS reinforcement visual contract');
