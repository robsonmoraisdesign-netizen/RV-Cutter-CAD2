import assert from 'node:assert/strict';
import fs from 'node:fs';
import {kernel,build,defaults,migrateParams} from './src/geometry.mjs';
import {createLogoTextProfile} from './src/logo-text.mjs';
import {LOGO_FONT_CATALOG,LOGO_FONT_IDS} from './src/logo-font-catalog.mjs';

assert.ok(LOGO_FONT_CATALOG.length>=20,'expanded logo font library must expose at least 20 choices');
assert.equal(new Set(LOGO_FONT_IDS).size,LOGO_FONT_IDS.length,'font ids must be unique');
for(const id of ['allerta-stencil','arimo','balthazar','baumans','bebas-neue','comic-neue','courier-prime','didact-gothic','droid-sans-mono','inconsolata','inter','michroma','mplus-rounded-1c','noto-sans','noto-sans-sc','noto-sans-tc','noto-sans-jp','noto-sans-kr','noto-serif']){
 assert.ok(LOGO_FONT_IDS.includes(id),'missing requested font family '+id);
}
for(const font of LOGO_FONT_CATALOG){
 const profile=createLogoTextProfile('FIORI',font.id,5);
 assert.ok(profile?.loops?.length>0,'font profile '+font.id);
 assert.ok(profile.width>0&&profile.height>0,'font bounds '+font.id);
 assert.ok(font.family&&font.label,'font catalog metadata '+font.id);
}

const migrated=migrateParams({logoEnabled:true,logoFont:'inter',logoBaseWidthExtra:99});
assert.equal(migrated.logoFont,'inter');
assert.equal(migrated.logoBaseWidthExtra,40,'extra logo base width must clamp to 40 mm');

const m=await kernel();
const loops=[[[-.5,-.4],[.5,-.4],[.5,.4],[-.5,.4]]];
const make=params=>build(m,loops,params,null,{logoProfile:params.logoEnabled?createLogoTextProfile(params.logoText,params.logoFont,params.logoSize,10):null});
const base={...defaults,mode:'cutter',size:55,mirror:false,logoEnabled:true,logoText:'FIORI',logoFont:'inter',logoHeight:.7,logoPosition:0,logoOffset:0};
const largeText=make({...base,logoSize:8,logoBaseWidthExtra:0});
const smallTextWideBase=make({...base,logoSize:4,logoBaseWidthExtra:22});
const smallTextAuto=make({...base,logoSize:4,logoBaseWidthExtra:0});

assert.ok(smallTextWideBase.logoPlacement.textHeight<largeText.logoPlacement.textHeight,'font size must stay independent from base width');
assert.ok(smallTextWideBase.logoPlacement.baseWidth>largeText.logoPlacement.baseWidth,'small text must be able to sit on a wider base');
assert.ok(smallTextWideBase.logoPlacement.baseWidth>smallTextAuto.logoPlacement.baseWidth+20,'extra base width must affect only the plaque width');
assert.ok(Math.abs(smallTextWideBase.logoPlacement.baseDepth-smallTextAuto.logoPlacement.baseDepth)<1e-6,'widening the plaque must not deepen it');
for(const result of [largeText,smallTextWideBase,smallTextAuto]){
 const part=result.parts[0];
 assert.equal(part.bodies,1,'logo base must stay attached as one printable body');
 assert.equal(part.stats.open,0,'logo base mesh must be closed');
 assert.equal(part.stats.nonmanifold,0,'logo base mesh must stay manifold');
}

const ui=fs.readFileSync('src/ui.mjs','utf8'),geometry=fs.readFileSync('src/geometry.mjs','utf8'),catalog=fs.readFileSync('src/logo-font-catalog.mjs','utf8');
assert(ui.includes('Largura extra da base')&&ui.includes('LOGO_FONT_CATALOG'),'inspector must expose independent base width and catalog-driven fonts');
assert(geometry.includes('logoBaseWidthExtra')&&geometry.includes('profile.width+pad*2+p.logoBaseWidthExtra'),'geometry must keep text size and base width independent');
assert(catalog.includes('Noto Sans Japanese')&&catalog.includes('Bebas Neue')&&catalog.includes('Allerta Stencil'),'requested font choices must remain in the catalog');

console.log('PASS 14.28.17: expanded font library and independent logo-base width are functional.');
