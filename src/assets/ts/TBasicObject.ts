import {
  BoxBufferGeometry,
  Mesh,
  MeshNormalMaterial,
  MeshStandardMaterial,
  Object3D,
  SphereBufferGeometry,
} from "three";
export const basicObjectsList: Object3D[] = [];
export const box: Mesh = new Mesh(
  new BoxBufferGeometry(10, 10, 10),
  new MeshStandardMaterial({
    color: 0xff0000,
    //金属度
    //metalness: 100,
    //粗糙度
    //roughness: 100,
  })
);
box.position.set(0, 20, 0);
export const sphere: Mesh = new Mesh(
  new SphereBufferGeometry(6),
  new MeshNormalMaterial()
);
sphere.position.set(0, -10, 0);
export const stage: Mesh = new Mesh(
  new BoxBufferGeometry(200, 2, 200),
  new MeshStandardMaterial({ color: "rgb(0,255,0)" })
);
stage.position.set(0, -6, 0);
basicObjectsList.push(sphere, box);
