import assert from 'node:assert/strict';
import {kernel,build,defaults} from './src/geometry.mjs';
import {createLogoTextProfile,LOGO_FONT_IDS} from './src/logo-text.mjs';

for(const font of LOGO_FONT_IDS){
 const profile=createLogoTextProfile('RV',font,6);
 assert.ok(profile?.loops?.length>0,'font profile '+font);
 assert.ok(profile.width>0&&profile.height>0,'font bounds '+font);
}

const m=await kernel();
const loops=[[[-.5,-.4],[.5,-.4],[.5,.4],[-.5,.4]]];
const common={...defaults,mode:'cutter',size:50,mirror:false,logoText:'FIORI',logoFont:'helvetiker-bold',logoSize:6,logoHeight:.6,logoOffset:0};
const plain=build(m,loops,{...common,logoEnabled:false});
const bottom=build(m,loops,{...common,logoEnabled:true,logoPosition:0});
const right=build(m,loops,{...common,logoEnabled:true,logoPosition:25});

for(const [name,result] of [['bottom',bottom],['right',right]]){
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
assert.ok(Math.abs(Math.abs(right.logoPlacement.angle)-90)<5,'side logo must auto-rotate vertically with the border tangent');
assert.ok(Math.abs(bottom.parts[0].bounds.max[2]-plain.parts[0].bounds.max[2])<1e-6,'logo height must stay below cutting edge');

console.log('PASS 14.28.16: edge logo is parametric, attached, printable and follows border position.');
