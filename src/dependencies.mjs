// Versioned dependency graph. Only plain data / typed arrays are retained: never WASM handles.
export const ENGINE_VERSION='14.28.18';
const shape=['size','mirror','tolerance'];
export const PARAMETRIC_GRAPH={
 source:{parents:[],params:shape},
 outer:{parents:['source'],params:['outlineOffset','mode','stampExpansion']},
 inner:{parents:['outer'],params:['clearance','cornerRadius','wall']},
 blade:{parents:['inner'],params:['wall','tip','chamfer','wallEdits']},
 rim:{parents:['blade'],params:['rim']},
 bladeSolid:{parents:['blade'],params:['base','height','rim','chamferHeight','bladeReinforcement','reinforcementHeight','reinforcementWidth']},
 art:{parents:['source'],params:['detailOffset','removeOutline','outlineBand','stampInset','mode','outlineOffset']},
 footprint:{parents:['outer'],params:['stampInset','stampExpansion']},
 cutter:{parents:['rim','bladeSolid'],params:['base','height','chamferHeight','bladeReinforcement','reinforcementHeight','reinforcementWidth','logoEnabled','logoText','logoFont','logoSize','logoHeight','logoBaseWidthExtra','logoPosition','logoOffset','logoOrientationMode','logoRotationOffset','logoRotationAbsolute','mode']},
 stamp:{parents:['art','footprint'],params:['stampBase','base','relief','reliefInverted','mode']},
 integrated:{parents:['cutter','stamp'],params:['base','relief','reliefInverted']}
};
export function dependencyKeys(source,p){const keys={};for(const [node,spec] of Object.entries(PARAMETRIC_GRAPH)){const fields=new Set(spec.params);for(const parent of spec.parents)for(const field of keys[parent].fields)fields.add(field);
 // Separate stamps do not depend on cutter offsets, clearance, or blade thickness.
 if(node==='stamp'&&p.mode!=='integrated'){fields.clear();for(const f of [...shape,'mode','stampInset','stampExpansion','detailOffset','removeOutline','outlineBand','stampBase','relief','reliefInverted','reliefSeparate'])fields.add(f);}
 keys[node]={fields:[...fields].sort()};keys[node].key=ENGINE_VERSION+':'+source+':'+node+':'+JSON.stringify(keys[node].fields.map(k=>[k,p[k]]));}return keys;}
export function dataBytes(x){if(ArrayBuffer.isView(x))return x.byteLength;if(x instanceof ArrayBuffer)return x.byteLength;if(typeof x==='string')return x.length*2;if(typeof x==='number')return 8;if(!x||typeof x!=='object')return 4;let n=48;for(const v of Object.values(x))n+=dataBytes(v)+8;return n;}
export class BoundedCache{
 constructor(limit=48*1024*1024){this.limit=limit;this.bytes=0;this.entries=new Map();this.hits=0;this.misses=0;}
 get(key){const e=this.entries.get(key);if(!e){this.misses++;return;}this.entries.delete(key);this.entries.set(key,e);this.hits++;return e.value;}
 set(key,value){const bytes=dataBytes(value)+key.length*2;const old=this.entries.get(key);if(old){this.bytes-=old.bytes;this.entries.delete(key);}if(bytes>this.limit)return value;while(this.bytes+bytes>this.limit&&this.entries.size){const [k,e]=this.entries.entries().next().value;this.entries.delete(k);this.bytes-=e.bytes;}this.entries.set(key,{bytes,value});this.bytes+=bytes;return value;}
 clear(){this.entries.clear();this.bytes=0;}
 stats(){return {bytes:this.bytes,limit:this.limit,entries:this.entries.size,hits:this.hits,misses:this.misses};}
}
export function graphContext(cache,source,p,solids=null){const keys=dependencyKeys(source,p),computed=[],reused=[];return {keys,computed,reused,getSolid(node){const v=solids?.get(keys[node].key);if(v)reused.push(node);return v;},setSolid(node,solid){computed.push(node);if(solids)solids.set(keys[node].key,solid);else solid.delete();},memo(node,fn){const key=keys[node].key;let value=cache.get(key);if(value!==undefined){reused.push(node);return value;}computed.push(node);return cache.set(key,fn());},get(node){const v=cache.get(keys[node].key);if(v!==undefined)reused.push(node);return v;},set(node,v){computed.push(node);return cache.set(keys[node].key,v);}};}

// Native solids preserve double precision; each retained handle has an explicit owner.
export class SolidCache{
 constructor(limit=24*1024*1024){this.limit=limit;this.bytes=0;this.entries=new Map();}
 get(key){const e=this.entries.get(key);if(!e)return;this.entries.delete(key);this.entries.set(key,e);return e.solid;}
 set(key,solid){let bytes;try{const mesh=solid.getMesh();bytes=(mesh.vertProperties.byteLength+mesh.triVerts.byteLength)*6;}catch(e){solid.delete();throw e;}if(bytes>this.limit){solid.delete();return;}const old=this.entries.get(key);if(old){old.solid.delete();this.bytes-=old.bytes;this.entries.delete(key);}while(this.entries.size&&(this.bytes+bytes>this.limit||this.entries.size>=4)){const [k,e]=this.entries.entries().next().value;e.solid.delete();this.bytes-=e.bytes;this.entries.delete(k);}this.entries.set(key,{solid,bytes});this.bytes+=bytes;}
 clear(){for(const e of this.entries.values())e.solid.delete();this.entries.clear();this.bytes=0;}
}
