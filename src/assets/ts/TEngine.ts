import {
  AmbientLight,
  AxesHelper,
  GridHelper,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
  MOUSE,
  Object3D,
  Vector2,
  Raycaster,
} from "three";

import Stats from "three/examples/jsm/libs/stats.module";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
export class TEngine {
  private dom: HTMLElement;
  private renderer: WebGLRenderer;
  private scene: Scene;
  private camera: PerspectiveCamera;

  constructor(dom: HTMLElement) {
    this.scene = new Scene();
    this.dom = dom;
    this.renderer = new WebGLRenderer({
      //抗锯齿
      antialias: true,
    });
    this.camera = new PerspectiveCamera(
      45,
      dom.offsetWidth / dom.offsetHeight,
      1,
      1000
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

    ambientLight.raycast = () => {};
    axesHelper.raycast = () => {};
    gridHelper.raycast = () => {};
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

    //初始轨道控制器
    const orbitControls: OrbitControls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );

    orbitControls.mouseButtons = {
      RIGHT: MOUSE.ROTATE,
    };

    //跟随转动
    // orbitControls.autoRotate = true;

    //惯性
    orbitControls.enableDamping = true;

    //初始化变换控制器
    const transformControls = new TransformControls(
      this.camera,
      this.renderer.domElement
    );
    // transformControls.raycast = () => {};
    this.scene.add(transformControls);

    // const target = new Object3D();
    // transformControls.attach(target);
    // this.scene.add(target);

    //射线发射器
    const raycaster = new Raycaster();

    //添加鼠标事件
    const mouse = new Vector2();
    this.renderer.domElement.addEventListener("mousemove", (event) => {
      const domx = event.offsetX;
      const domy = event.offsetY;
      const width = this.renderer.domElement.offsetWidth;
      const height = this.renderer.domElement.offsetHeight;
      mouse.x = (domx / width) * 2 - 1;
      mouse.y = (-domy * 2) / height + 1;
      //console.log(mouse.x, mouse.y);
    });

    //判断此次鼠标事件是否是变换事件
    let transing = false;

    transformControls.addEventListener("mouseDown", (event) => {
      console.log("mousedown");
      transing = true;
    });
    //绑定键盘事件
    document.addEventListener("keyup", (event) => {
      if (event.key == "e") {
        transformControls.mode = "scale";
        return false;
      }
      if (event.key == "r") {
        transformControls.mode = "rotate";
        return false;
      }
      if (event.key == "t") {
        transformControls.mode = "translate";
        return false;
      }
    });

    //点击选定对象
    this.renderer.domElement.addEventListener("click", (event) => {
      if (transing) {
        transing = false;
        return false;
      }
      console.log("click");

      raycaster.setFromCamera(mouse, this.camera);

      //规避变换控制器遮挡问题
      this.scene.remove(transformControls);
      //第二个参数 只拾取射线第一个穿过的对象
      const interSection = raycaster.intersectObjects(
        this.scene.children,
        true
      );
      this.scene.add(transformControls);

      let object = new Object3D();
      if (interSection.length) {
        object = interSection[0].object;

        console.log(interSection);
        transformControls.attach(object);
      }
    });

    this.camera.position.set(50, 50, 50);
    this.camera.lookAt(new Vector3(0, 0, 0));
    this.camera.up = new Vector3(1, 1, 1);
    this.renderer.setSize(dom.offsetWidth, dom.offsetHeight, true);

    //动画 循环
    const renderfun = () => {
      orbitControls.update();
      this.renderer.render(this.scene, this.camera);
      stats.update();
      requestAnimationFrame(renderfun);
    };
    renderfun();
    dom.appendChild(this.renderer.domElement);
    dom.appendChild(statsDom);
  }

  //添加对象
  addObject(...object: Object3D[]) {
    object.forEach((elem) => {
      this.scene.add(elem);
    });
  }
}
