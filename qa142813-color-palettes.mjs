import assert from 'node:assert/strict';
import fs from 'node:fs';

const ui=fs.readFileSync('./src/ui.mjs','utf8');
const html=fs.readFileSync('./app/index.html','utf8');

assert.match(ui,/function generateDistinctPalette/);
assert.match(ui,/rv-color-palettes-v1/);
assert.match(ui,/saveCurrentColorPalette/);
assert.match(ui,/applySavedColorPalette/);
assert.match(ui,/persistColorPalettes/);
assert.match(ui,/randomReinforcementColor/);
assert.match(html,/id="savedColorPalette"/);
assert.match(html,/id="saveColorPalette"/);
assert.match(html,/id="applyColorPalette"/);
assert.match(html,/id="deleteColorPalette"/);

console.log('PASS color palette library contract');
