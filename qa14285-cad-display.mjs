import assert from 'node:assert/strict';
import * as T from 'three';
import {weightedNormals} from './src/presentation.mjs';
import {buildCadEdgePositions,CAD_DISPLAY,DISPLAY_VERSION} from './src/cad-display.mjs';

function geometry(positions,indices){
 const g=new T.BufferGeometry();
 g.setAttribute('position',new T.BufferAttribute(new Float32Array(positions),3));
 g.setIndex(indices);
 return g;
}

// Two coplanar triangles with duplicated seam vertices: display smoothing must weld
// the duplicate tessellation vertices. The manufacturing mesh is not modified.
{
 const g=geometry([
  0,0,0, 1,0,0, 1,1,0,
  0,0,0, 1,1,0, 0,1,0
 ],[0,1,2,3,4,5]);
 const smooth=weightedNormals(g,{},'blade');
 assert.equal(smooth.getAttribute('position').count,4,'coplanar duplicate tessellation vertices should weld for display normals');
 for(let i=0;i<smooth.getAttribute('normal').count;i++)assert(Math.abs(smooth.getAttribute('normal').getZ(i)-1)<1e-6);
 smooth.dispose();g.dispose();
}

// A real 90-degree wall crease must remain split.
{
 const g=geometry([
  0,0,0, 0,0,1, 1,0,0,
  0,0,0, 0,1,0, 0,0,1
 ],[0,1,2,3,4,5]);
 const smooth=weightedNormals(g,{},'blade'),pos=smooth.getAttribute('position'),normal=smooth.getAttribute('normal'),atOrigin=[];
 for(let i=0;i<pos.count;i++)if(Math.hypot(pos.getX(i),pos.getY(i),pos.getZ(i))<1e-8)atOrigin.push([normal.getX(i),normal.getY(i),normal.getZ(i)]);
 assert.equal(atOrigin.length,2,'real sharp crease must keep separate display normals');
 const dot=atOrigin[0][0]*atOrigin[1][0]+atOrigin[0][1]*atOrigin[1][1]+atOrigin[0][2]*atOrigin[1][2];
 assert(Math.abs(dot)<.2,'90-degree crease normals must not be averaged together');
 smooth.dispose();g.dispose();
}

// EdgesGeometry with our CAD threshold hides the diagonal between nearly-coplanar
// tessellation faces while retaining the outer feature boundary.
{
 const part={
  positions:new Float32Array([0,0,0, 1,0,0, 0,1,0, 1,1,.08]),
  indices:new Uint32Array([0,1,2,1,3,2]),stride:3
 };
 const edges=buildCadEdgePositions(part);
 assert.equal(edges.length,24,'internal triangulation edge should be suppressed in CAD display');
 assert(CAD_DISPLAY.edgeThreshold>=20&&CAD_DISPLAY.edgeThreshold<=40);
 assert.equal(DISPLAY_VERSION,'14.28.15-cad-4');
 assert(CAD_DISPLAY.edgeDepthBias>0&&CAD_DISPLAY.edgeDepthBias<=.00001&&CAD_DISPLAY.edgeWidth>=1,'CAD edges need only a tiny anti-z-fighting depth bias; large bias leaks hidden edges through faces');
 assert(CAD_DISPLAY.ambient<1&&CAD_DISPLAY.key>2,'CAD lighting must preserve face contrast instead of washing it out');
}

console.log('CAD display smoothing + feature-edge suppression: PASS');
