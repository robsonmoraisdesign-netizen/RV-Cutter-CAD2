import assert from 'node:assert/strict';
import fs from 'node:fs';
import {kernel,build,defaults,migrateParams,resolveLogoOrientation} from './src/geometry.mjs';
import {createLogoTextProfile} from './src/logo-text.mjs';

const near=(a,b,eps=1e-6)=>Math.abs(a-b)<=eps;

const auto=resolveLogoOrientation(7.4,{logoOrientationMode:'auto',logoRotationOffset:-7.4,logoRotationAbsolute:0});
assert.equal(auto.mode,'auto');
assert.ok(near(auto.autoAngle,7.4)&&near(auto.finalAngle,7.4),'automatic mode must preserve border tangent');

const fine=resolveLogoOrientation(7.4,{logoOrientationMode:'autoOffset',logoRotationOffset:-7.4,logoRotationAbsolute:23});
assert.equal(fine.mode,'autoOffset');
assert.ok(near(fine.finalAngle,0),'fine correction must be added after automatic tangent');

const manual=resolveLogoOrientation(87,{logoOrientationMode:'manual',logoRotationAbsolute:0,logoRotationOffset:22});
assert.equal(manual.mode,'manual');
assert.ok(near(manual.finalAngle,0),'manual global 0 degrees must force horizontal logo regardless of border tangent');

const migrated=migrateParams({logoOrientationMode:'invalid',logoRotationOffset:99,logoRotationAbsolute:540});
assert.equal(migrated.logoOrientationMode,defaults.logoOrientationMode,'invalid rotation mode must migrate safely');
assert.equal(migrated.logoRotationOffset,45,'fine correction must clamp to +45 degrees');
assert.equal(migrated.logoRotationAbsolute,180,'absolute rotation must normalize to global angle');

const m=await kernel();
const loops=[[[-.5,-.4],[.5,-.4],[.5,.4],[-.5,.4]]];
const run=params=>build(m,loops,params,null,{logoProfile:params.logoEnabled?createLogoTextProfile(params.logoText,params.logoFont,params.logoSize,10):null});
const common={...defaults,mode:'cutter',size:55,mirror:false,logoEnabled:true,logoText:'FIORI',logoFont:'inter',logoSize:5,logoHeight:.7,logoBaseWidthExtra:12,logoOffset:0};

const bottomAuto=run({...common,logoPosition:0,logoOrientationMode:'auto',logoRotationOffset:0});
const bottomFine=run({...common,logoPosition:0,logoOrientationMode:'autoOffset',logoRotationOffset:6.5});
const rightManual=run({...common,logoPosition:25,logoOrientationMode:'manual',logoRotationAbsolute:0});
const rightFine=run({...common,logoPosition:25,logoOrientationMode:'autoOffset',logoRotationOffset:-4.2});

assert.ok(Math.abs(bottomAuto.logoPlacement.autoAngle)<5,'bottom tangent should be approximately horizontal');
assert.ok(near(bottomFine.logoPlacement.finalAngle,bottomFine.logoPlacement.autoAngle+6.5,.05),'fine angle must be reflected in final placement');
assert.ok(Math.abs(Math.abs(rightManual.logoPlacement.autoAngle)-90)<5,'right edge automatic tangent should be approximately vertical');
assert.ok(near(rightManual.logoPlacement.finalAngle,0,.01),'manual global angle must override vertical edge tangent');
assert.ok(near(rightFine.logoPlacement.finalAngle,rightFine.logoPlacement.autoAngle-4.2,.05),'side fine correction must remain relative to local tangent');

for(const [name,result] of [['bottomAuto',bottomAuto],['bottomFine',bottomFine],['rightManual',rightManual],['rightFine',rightFine]]){
 const part=result.parts[0];
 assert.equal(part.bodies,1,name+' logo must remain attached to cutter as one body');
 assert.equal(part.stats.open,0,name+' mesh must stay closed');
 assert.equal(part.stats.nonmanifold,0,name+' mesh must stay manifold');
 assert.ok(result.logoPlacement.baseWidth>result.logoPlacement.textWidth,name+' base must still contain the text');
}

const ui=fs.readFileSync('src/ui.mjs','utf8'),deps=fs.readFileSync('src/dependencies.mjs','utf8'),geometry=fs.readFileSync('src/geometry.mjs','utf8');
assert(ui.includes('Automática + ajuste fino')&&ui.includes('Manual · ângulo global'),'inspector must expose automatic fine and manual rotation modes');
assert(ui.includes('Correção fina da rotação (°)')&&ui.includes('Ângulo global da logo (°)'),'rotation controls must remain available');
assert(deps.includes('logoOrientationMode')&&deps.includes('logoRotationOffset')&&deps.includes('logoRotationAbsolute'),'rotation params must participate in parametric cache invalidation');
assert(geometry.includes('resolveLogoOrientation')&&geometry.includes('bridgeTangent'),'geometry must resolve final orientation and keep a robust structural connector');

console.log('PASS 14.28.18: logo supports automatic, fine relative and absolute global rotation.');
