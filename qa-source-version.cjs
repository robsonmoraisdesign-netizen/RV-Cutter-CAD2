const assert=require('node:assert/strict'),fs=require('node:fs');
const root=require('./package.json'),app=require('./app/package.json');
assert.equal(root.version,app.version);assert.ok(fs.readFileSync('app/ui.js','utf8').includes(root.version));
assert.match(fs.readFileSync('app/main.cjs','utf8'),/require\(['"]\.\/package.json['"]\)/);
console.log('Source/runtime version consistency: PASS');
