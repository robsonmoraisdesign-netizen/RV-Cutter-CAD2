import * as T from 'three';

export const DISPLAY_VERSION='14.28.5-cad-1';
export const CAD_DISPLAY=Object.freeze({
  faceColor:'#9bc9e7',
  edgeColor:'#31424d',
  background:'#f5f7f8',
  edgeThreshold:28,
  smoothAngle:35,
  roughness:.82,
  metalness:0,
  ambient:1.35,
  key:1.65,
  fill:.5,
  gridOpacity:.18
});

export function buildCadEdgePositions(part,threshold=CAD_DISPLAY.edgeThreshold){
  const source=new T.BufferGeometry();
  source.setAttribute('position',new T.BufferAttribute(part.positions,3));
  source.setIndex(new T.BufferAttribute(part.indices,1));
  const edges=new T.EdgesGeometry(source,threshold),a=edges.getAttribute('position')?.array;
  const out=a?new Float32Array(a):new Float32Array();
  edges.dispose();source.dispose();
  return out;
}
