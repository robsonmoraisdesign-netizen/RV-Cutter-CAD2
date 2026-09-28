import {defaults,migrateParams} from './geometry.mjs';

export const FEATURE_SCHEMA_VERSION=1;
export const COOKIE_CUTTER_FEATURE='cookie-cutter';

const makeId=prefix=>`${prefix}-${globalThis.crypto.randomUUID()}`;

export function createCookieCutterFeature(params={}){
  return {
    id:makeId('feature'),
    type:COOKIE_CUTTER_FEATURE,
    name:'Cortador de biscoito',
    schemaVersion:FEATURE_SCHEMA_VERSION,
    enabled:true,
    visible:true,
    params:migrateParams(params)
  };
}

export function cutterFeature(node){
  return node?.features?.find(f=>f?.type===COOKIE_CUTTER_FEATURE&&f.enabled!==false)||null;
}

export function hasManufacturingFeature(node){
  return !!cutterFeature(node);
}

export function syncRuntimeParams(node){
  const feature=cutterFeature(node);
  if(feature){
    feature.params=migrateParams(feature.params||node.params||defaults);
    node.params=feature.params;
  }else{
    // Compatibilidade transitória: o Sketch ainda precisa de uma escala física
    // enquanto o editor é migrado para um modelo totalmente independente de features.
    node.params=migrateParams(node.params||defaults);
  }
  return node;
}

export function migrateSketchNode(input,{legacyFeature=true}={}){
  const node={...input};
  node.kind='sketch';
  node.features=Array.isArray(input?.features)
    ? input.features.map(f=>({
        ...f,
        id:typeof f.id==='string'&&f.id?f.id:makeId('feature'),
        schemaVersion:FEATURE_SCHEMA_VERSION,
        enabled:f.enabled!==false,
        visible:f.visible!==false,
        params:f.type===COOKIE_CUTTER_FEATURE?migrateParams(f.params||input.params||defaults):structuredClone(f.params||{})
      }))
    : [];
  if(legacyFeature&&!node.features.length&&input?.params){
    node.features.push(createCookieCutterFeature(input.params));
  }
  node.visible=input?.visible!==false;
  return syncRuntimeParams(node);
}

export function attachCookieCutter(node,params=null){
  let feature=cutterFeature(node);
  if(feature)return feature;
  feature=createCookieCutterFeature(params||node.params||defaults);
  node.features??=[];
  node.features.push(feature);
  syncRuntimeParams(node);
  return feature;
}

export function detachCookieCutter(node){
  if(!Array.isArray(node?.features))return false;
  const before=node.features.length;
  node.features=node.features.filter(f=>f.type!==COOKIE_CUTTER_FEATURE);
  syncRuntimeParams(node);
  return node.features.length!==before;
}

export function featureTree(node){
  const children=(node?.features||[]).map(feature=>({
    id:feature.id,
    kind:'feature',
    type:feature.type,
    name:feature.name||feature.type,
    enabled:feature.enabled!==false,
    visible:feature.visible!==false,
    parentId:node.id
  }));
  if(node?.result?.parts?.length){
    const parent=cutterFeature(node);
    for(let i=0;i<node.result.parts.length;i++){
      const part=node.result.parts[i];
      children.push({
        id:`${node.id}:body:${i}`,
        kind:'body',
        name:part.name||`Corpo ${i+1}`,
        parentId:parent?.id||node.id,
        partIndex:i
      });
    }
  }
  return children;
}
