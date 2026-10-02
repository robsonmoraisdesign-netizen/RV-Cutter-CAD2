import assert from 'node:assert/strict';
import {kernel,build,defaults} from './src/geometry.mjs';

const m=await kernel();
const loops=[[[-.5,-.35],[.5,-.35],[.5,.35],[-.5,.35]]];

const baseParams={
  ...defaults,
  mode:'cutter',
  size:60,
  wall:.8,
  rim:4,
  base:2.5,
  height:12.5,
  chamfer:true,
  tip:.4,
  chamferHeight:2,
  bladeReinforcement:false
};

const plain=build(m,loops,baseParams);
const reinforced=build(m,loops,{
  ...baseParams,
  bladeReinforcement:true,
  reinforcementHeight:2,
  reinforcementWidth:1.5
});

assert.equal(plain.parts[0].stats.open,0);
assert.equal(plain.parts[0].stats.nonmanifold,0);
assert.equal(reinforced.parts[0].stats.open,0);
assert.equal(reinforced.parts[0].stats.nonmanifold,0);
assert.ok(
  reinforced.parts[0].volume > plain.parts[0].volume,
  'reinforcement must add material'
);
assert.deepEqual(
  reinforced.cuttingOutline,
  plain.cuttingOutline,
  'reinforcement must not alter the internal cutting outline'
);
assert.ok(
  reinforced.parts[0].bounds.max[0] >= plain.parts[0].bounds.max[0],
  'reinforcement may expand outward but never inward'
);

assert.throws(
  ()=>build(m,loops,{
    ...baseParams,
    bladeReinforcement:true,
    reinforcementHeight:2,
    reinforcementWidth:5
  }),
  /largura do reforço/i
);

assert.throws(
  ()=>build(m,loops,{
    ...baseParams,
    bladeReinforcement:true,
    reinforcementHeight:9,
    reinforcementWidth:1
  }),
  /altura do reforço/i
);

console.log(
  'PASS blade reinforcement:',
  'plainVolume=',plain.parts[0].volume.toFixed(3),
  'reinforcedVolume=',reinforced.parts[0].volume.toFixed(3)
);
