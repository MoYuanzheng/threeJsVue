import {
  BoxBufferGeometry,
  Mesh,
  MeshNormalMaterial,
  Object3D,
  SphereBufferGeometry,
} from "three";
export const basicObjectsList: Object3D[] = [];
export const box: Mesh = new Mesh(
  new BoxBufferGeometry(10, 10, 10),
  new MeshNormalMaterial()
);

export const sphere: Mesh = new Mesh(
  new SphereBufferGeometry(6),
  new MeshNormalMaterial()
);

basicObjectsList.push(box, sphere);
