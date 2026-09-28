import assert from 'node:assert/strict';
import {defaults} from './src/geometry.mjs';
import {createCookieCutterFeature,migrateSketchNode,attachCookieCutter,cutterFeature,hasManufacturingFeature,featureTree} from './src/project-model.mjs';

{
 const node=migrateSketchNode({id:'sketch-new',name:'Sketch 1',loops:[],params:{...defaults},features:[],visible:true},{legacyFeature:false});
 assert.equal(node.kind,'sketch');
 assert.equal(node.features.length,0);
 assert.equal(hasManufacturingFeature(node),false);
 attachCookieCutter(node);
 assert.equal(hasManufacturingFeature(node),true);
 assert.equal(cutterFeature(node).name,'Cortador de biscoito');
 assert.equal(node.params,cutterFeature(node).params,'runtime params must alias active cutter feature params');
}
{
 const legacy=migrateSketchNode({id:'legacy',name:'Flor',loops:[[[0,0],[1,0],[0,1]]],params:{...defaults,size:62},visible:true},{legacyFeature:true});
 assert.equal(legacy.features.length,1);
 assert.equal(cutterFeature(legacy).params.size,62);
 assert.equal(featureTree(legacy)[0].kind,'feature');
}
{
 const f=createCookieCutterFeature({...defaults,wall:1.2});
 assert.equal(f.type,'cookie-cutter');
 assert.equal(f.params.wall,1.2);
}
console.log('Sketch-first feature model and legacy migration: PASS');
