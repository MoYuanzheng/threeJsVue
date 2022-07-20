import { BoxBufferGeometry, Mesh, MeshNormalMaterial } from "three";

const box: Mesh = new Mesh(
  new BoxBufferGeometry(10, 10, 10),
  new MeshNormalMaterial()
);
