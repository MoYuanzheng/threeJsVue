import {
  AmbientLight,
  AxesHelper,
  BoxBufferGeometry,
  GridHelper,
  Mesh,
  MeshNormalMaterial,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";

import Stats from "three/examples/jsm/libs/stats.module";

export class TEngine {
  private dom: HTMLElement;
  private renderer: WebGLRenderer;
  private scene: Scene;
  private camera: PerspectiveCamera;

  constructor(dom: HTMLElement) {
    this.scene = new Scene();
    this.dom = dom;
    this.renderer = new WebGLRenderer();
    this.camera = new PerspectiveCamera(
      45,
      dom.offsetWidth / dom.offsetHeight,
      1,
      1000
    );

    const box: Mesh = new Mesh(
      new BoxBufferGeometry(10, 10, 10),
      new MeshNormalMaterial()
    );

    //环境光
    const ambientLight: AmbientLight = new AmbientLight("rgb(255,255,255)", 1);
    const axesHelper: AxesHelper = new AxesHelper(50);
    const gridHelper: GridHelper = new GridHelper(
      500,
      100,
      "rgb(100,12,222)",
      "rgb(50,150,5)"
    );
    this.scene.add(box);
    this.scene.add(ambientLight);
    this.scene.add(axesHelper);
    this.scene.add(gridHelper);
    //性能监视器
    const stats = Stats();
    const statsDom = stats.domElement;
    statsDom.style.position = "fixed";
    statsDom.style.top = "0";
    statsDom.style.right = "5px";
    statsDom.style.left = "unset";

    this.camera.position.set(50, 50, 50);
    this.camera.lookAt(new Vector3(0, 0, 0));
    this.camera.up = new Vector3(1, 1, 1);
    this.renderer.setSize(dom.offsetWidth, dom.offsetHeight, true);

    const renderfun = () => {
      box.position.x += 0.01;
      this.camera.position.x += 0.01;
      this.renderer.render(this.scene, this.camera);
      stats.update();
      requestAnimationFrame(renderfun);
    };
    renderfun();
    dom.appendChild(this.renderer.domElement);
    dom.appendChild(statsDom);
  }
}
