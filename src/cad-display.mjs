import * as T from 'three';

export const DISPLAY_VERSION='14.28.6-cad-2';
export const CAD_DISPLAY=Object.freeze({
  faceColor:'#45aaf2',
  edgeColor:'#182934',
  background:'#f7fafc',
  edgeThreshold:28,
  smoothAngle:35,
  edgeWidth:1.08,
  edgeDepthBias:.00042,
  roughness:.62,
  metalness:0,
  ambient:.72,
  key:2.25,
  fill:.28,
  gridOpacity:.24
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
