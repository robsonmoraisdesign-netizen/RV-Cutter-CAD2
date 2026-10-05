import assert from 'node:assert/strict';
import fs from 'node:fs';
import {kernel,build,defaults,migrateParams,edgePositionFromPoint} from './src/geometry.mjs';
import {createLogoTextProfile,LOGO_FONT_IDS} from './src/logo-text.mjs';

const pickerBorder=[[-25,-20],[25,-20],[25,20],[-25,20]];
assert.ok(Math.abs(edgePositionFromPoint(pickerBorder,[0,-30]).position-0)<.01,'bottom click must resolve to 0%');
assert.ok(Math.abs(edgePositionFromPoint(pickerBorder,[30,0]).position-25)<.01,'right click must resolve to 25%');
assert.ok(Math.abs(edgePositionFromPoint(pickerBorder,[0,30]).position-50)<.01,'top click must resolve to 50%');
assert.ok(Math.abs(edgePositionFromPoint(pickerBorder,[-30,0]).position-75)<.01,'left click must resolve to 75%');
const migrated=migrateParams({logoEnabled:true,logoText:'   ',logoFont:'missing',logoPosition:140});
assert.equal(migrated.logoText,defaults.logoText,'empty logo text must fall back predictably');
assert.equal(migrated.logoFont,defaults.logoFont,'unknown font must migrate safely');
assert.equal(migrated.logoPosition,100,'perimeter position must be clamped');
const geometrySource=fs.readFileSync('src/geometry.mjs','utf8'),workerSource=fs.readFileSync('src/worker.mjs','utf8'),viewerSource=fs.readFileSync('src/viewer.mjs','utf8'),uiSource=fs.readFileSync('src/ui.mjs','utf8'),htmlSource=fs.readFileSync('app/index.html','utf8');
assert(!geometrySource.includes("from './logo-text.mjs'"),'font payload must not leak into shared geometry/UI bundle');
assert(workerSource.includes("from './logo-text.mjs'")&&workerSource.includes('preparedLogoProfile'),'font vectorization must stay in the worker');
assert(viewerSource.includes('setPlacementMode')&&viewerSource.includes("point:hit?.point")&&viewerSource.includes("phase:'move'")&&viewerSource.includes("'pointercancel'"),'viewer must expose live model hit points and cancel interrupted drags safely');
assert(uiSource.includes('edgePositionFromPoint')&&uiSource.includes('applyLogoPlacement')&&uiSource.includes("evt.phase==='cancel'")&&htmlSource.includes('pickLogoPosition'),'live 3D border picker wiring and rollback must remain available');

for(const font of LOGO_FONT_IDS){
 const profile=createLogoTextProfile('RV',font,6);
 assert.ok(profile?.loops?.length>0,'font profile '+font);
 assert.ok(profile.width>0&&profile.height>0,'font bounds '+font);
}

const m=await kernel();
const loops=[[[-.5,-.4],[.5,-.4],[.5,.4],[-.5,.4]]];
const common={...defaults,mode:'cutter',size:50,mirror:false,logoText:'FIORI',logoFont:'helvetiker-bold',logoSize:6,logoHeight:.6,logoOffset:0};
const run=params=>build(m,loops,params,null,{logoProfile:params.logoEnabled?createLogoTextProfile(params.logoText,params.logoFont,params.logoSize,10):null});
const plain=run({...common,logoEnabled:false});
const bottom=run({...common,logoEnabled:true,logoPosition:0});
const right=run({...common,logoEnabled:true,logoPosition:25});
const top=run({...common,logoEnabled:true,logoPosition:50});
const left=run({...common,logoEnabled:true,logoPosition:75});
const offsetLogo=run({...common,logoEnabled:true,logoPosition:0,logoOffset:5});
const integratedLogo=run({...common,mode:'integrated',logoEnabled:true,logoPosition:0});
const separatePlain=run({...common,mode:'separate',logoEnabled:false});
const separateLogo=run({...common,mode:'separate',logoEnabled:true,logoPosition:0});

for(const [name,result] of [['bottom',bottom],['right',right],['top',top],['left',left],['offset',offsetLogo],['integrated',integratedLogo]]){
 const part=result.parts[0];
 assert.equal(part.bodies,1,name+' logo must remain a single printable body');
 assert.equal(part.stats.open,0,name+' logo mesh open edges');
 assert.equal(part.stats.nonmanifold,0,name+' logo mesh non-manifold');
 assert.ok(result.logoOutline.length>0,name+' text outline must be available for display classification');
 assert.ok(part.volume>plain.parts[0].volume,name+' logo must add real printable volume');
}
assert.ok(bottom.parts[0].bounds.min[1]<plain.parts[0].bounds.min[1]-1,'0% must place logo on lower border');
assert.ok(right.parts[0].bounds.max[0]>plain.parts[0].bounds.max[0]+1,'25% must move logo along the perimeter to the right border');
assert.ok(Math.abs(bottom.logoPlacement.angle)<5,'bottom logo must auto-align horizontally');
assert.ok(Math.abs(Math.abs(right.logoPlacement.angle)-90)<5,'right-side logo must auto-rotate vertically with the border tangent');
assert.ok(Math.abs(top.logoPlacement.angle)<5,'top logo must remain horizontally readable');
assert.ok(Math.abs(Math.abs(left.logoPlacement.angle)-90)<5,'left-side logo must auto-rotate vertically with the border tangent');
assert.ok(offsetLogo.parts[0].bounds.min[1]<bottom.parts[0].bounds.min[1]-3,'positive offset must move the logo farther outside without disconnecting it');
assert.ok(Math.abs(bottom.parts[0].bounds.max[2]-plain.parts[0].bounds.max[2])<1e-6,'logo height must stay below cutting edge');
assert.equal(separatePlain.parts.length,2);
assert.equal(separateLogo.parts.length,2);
assert.ok(Math.abs(separatePlain.parts[1].volume-separateLogo.parts[1].volume)<1e-6,'base logo must never change stamp geometry');
assert.deepEqual(separatePlain.parts[1].bounds,separateLogo.parts[1].bounds,'stamp bounds must remain independent from base logo');

console.log('PASS 14.28.16: edge logo is parametric, attached, printable and follows border position.');
