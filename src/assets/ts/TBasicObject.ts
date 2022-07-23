import {
  BoxBufferGeometry,
  Color,
  Group,
  Mesh,
  MeshNormalMaterial,
  MeshStandardMaterial,
  Object3D,
  SphereBufferGeometry,
  Vector3,
} from "three";

export const basicObjectsList: Object3D[] = [];

const box: Mesh = new Mesh(
  new BoxBufferGeometry(10, 30, 20),
  new MeshStandardMaterial({
    color: 0xff0000,
    //金属度
    //metalness: 100,
    //粗糙度
    //roughness: 100,
  })
);
box.position.set(0, 0, 0);
basicObjectsList.push(box);
let VPGroup = new Group();
let tempList: Object3D[] = [];
//box顶点
let boxDepth = box.geometry.parameters.depth * box.scale.x;
let boxWidth = box.geometry.parameters.width * box.scale.y;
let boxHight = box.geometry.parameters.height * box.scale.z;
{
  let VertexPoint: Mesh = new Mesh(
    new SphereBufferGeometry(0.2),
    new MeshNormalMaterial()
  );
  let boxVertex = new Array();
  boxVertex[0] = [
    box.position.x - boxWidth / 2,
    box.position.y + boxHight / 2,
    box.position.z - boxDepth / 2,
  ];
  boxVertex[1] = [
    box.position.x + boxWidth / 2,
    box.position.y + boxHight / 2,
    box.position.z - boxDepth / 2,
  ];
  boxVertex[2] = [
    box.position.x - boxWidth / 2,
    box.position.y + boxHight / 2,
    box.position.z + boxDepth / 2,
  ];
  boxVertex[3] = [
    box.position.x + boxWidth / 2,
    box.position.y + boxHight / 2,
    box.position.z + boxDepth / 2,
  ];
  boxVertex[4] = [
    box.position.x - boxWidth / 2,
    box.position.y - boxHight / 2,
    box.position.z - boxDepth / 2,
  ];
  boxVertex[5] = [
    box.position.x + boxWidth / 2,
    box.position.y - boxHight / 2,
    box.position.z - boxDepth / 2,
  ];
  boxVertex[6] = [
    box.position.x - boxWidth / 2,
    box.position.y - boxHight / 2,
    box.position.z + boxDepth / 2,
  ];
  boxVertex[7] = [
    box.position.x + boxWidth / 2,
    box.position.y - boxHight / 2,
    box.position.z + boxDepth / 2,
  ];
  boxVertex.forEach((xyz) => {
    VertexPoint.position.set(xyz[0], xyz[1], xyz[2]);
    let temp = VertexPoint.clone();
    VPGroup.add(temp);
    tempList.push(temp);
  });
  basicObjectsList.push(VPGroup);
}

box.addEventListener("mouseenter", () => {
  (box.material as MeshStandardMaterial).color = new Color("white");
  boxDepth = box.geometry.parameters.depth * box.scale.z;
  boxWidth = box.geometry.parameters.width * box.scale.x;
  boxHight = box.geometry.parameters.height * box.scale.y;
});

box.addEventListener("mouseleave", () => {
  (box.material as MeshStandardMaterial).color = new Color("red");
  console.log(box);

  //获取box长宽高，
  boxDepth = box.geometry.parameters.depth * box.scale.z;
  boxWidth = box.geometry.parameters.width * box.scale.x;
  boxHight = box.geometry.parameters.height * box.scale.y;

  VPGroup.position.set(box.position.x, box.position.y, box.position.z);

  let boxVertex = new Array();
  boxVertex[0] = [-boxWidth / 2, +boxHight / 2, -boxDepth / 2];
  boxVertex[1] = [+boxWidth / 2, +boxHight / 2, -boxDepth / 2];
  boxVertex[2] = [-boxWidth / 2, +boxHight / 2, +boxDepth / 2];
  boxVertex[3] = [+boxWidth / 2, +boxHight / 2, +boxDepth / 2];
  boxVertex[4] = [-boxWidth / 2, -boxHight / 2, -boxDepth / 2];
  boxVertex[5] = [+boxWidth / 2, -boxHight / 2, -boxDepth / 2];
  boxVertex[6] = [-boxWidth / 2, -boxHight / 2, +boxDepth / 2];
  boxVertex[7] = [+boxWidth / 2, -boxHight / 2, +boxDepth / 2];

  for (let i = 0; i <= 7; i++) {
    tempList[i].position.set(boxVertex[i][0], boxVertex[i][1], boxVertex[i][2]);
  }
  VPGroup.rotation.set(box.rotation._x, box.rotation._y, box.rotation._z);

  console.log("GROUP POSITION");
  console.log(VPGroup);

  console.log("BOX POSITION");
  console.log(box.position);
});

basicObjectsList.push(box);

/*-=-=--=-=-=-=--==-=-=-=-=--=-=-=-*/
const sphere: Mesh = new Mesh(
  new SphereBufferGeometry(6),
  new MeshNormalMaterial()
);
sphere.position.set(0, -10, 0);
basicObjectsList.push(sphere);

/*---------------------------------*/
const stage: Mesh = new Mesh(
  new BoxBufferGeometry(200, 2, 200),
  new MeshStandardMaterial({ color: "rgb(0,255,0)" })
);
stage.position.set(0, -6, 0);
