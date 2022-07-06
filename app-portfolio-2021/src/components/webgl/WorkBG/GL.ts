import * as T from 'three';
import FlowingText from './GroupFlowingText';
export default class GL {
  canvas?: HTMLCanvasElement;
  scene: T.Scene;
  renderer?: T.WebGLRenderer;
  camera?: T.PerspectiveCamera;
  width: number = 1;
  height: number = 1;
  destroyed: boolean = false;
  prevTime: number = 0;
  delta: number = 0;
  flowingText?: FlowingText;
  mouse: T.Vector2 = new T.Vector2(0, 0);
  constructor() {
    this.scene = new T.Scene();
  }
  log(...args: any[]) {
    const dev =
      process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';
    if (!dev) return;
    console.log('gl:', ...args);
  }
  init({
    canvas,
    width,
    height,
    renderer = {},
  }: {
    canvas: GL['canvas'];
    width: number;
    height: number;
    renderer?: T.WebGLRendererParameters;
  }) {
    if (this.canvas) {
      this.log('already initialized');
      return;
    }
    this.canvas = canvas;
    this.width = width;
    this.height = height;

    this.camera = new T.PerspectiveCamera(70, this.aspect, 0.01, 20);
    this.camera.position.z = 5;
    this.scene.add(this.camera);

    this.flowingText = new FlowingText(100);
    this.scene.add(this.flowingText.group);

    this.renderer = new T.WebGLRenderer({ ...renderer, canvas, alpha: true });
    this.resize(width, height);

    this.renderer.setAnimationLoop(this.onLoop);
  }
  get aspect() {
    return this.width / this.height;
  }

  resize(width: number, height: number) {
    this.log('resize', width, height);
    if (!this.camera || !this.renderer) return;
    this.width = width;
    this.height = height;
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(1.5);
    this.camera.aspect = this.aspect;
    this.camera.updateProjectionMatrix();
  }

  onLoop: XRFrameRequestCallback = (time) => {
    if (!this.camera || !this.renderer) return;
    if (this.prevTime !== 0) this.delta = time - this.prevTime;
    if (this.flowingText) this.flowingText.update(time, this.delta);
    this.camera.position.z = T.MathUtils.damp(
      this.camera.position.z,
      5 + this.mouse.y * 2,
      4,
      this.delta * 0.0001
    );
    this.camera.position.x = T.MathUtils.damp(
      this.camera.position.x,
      -this.mouse.x * 2,
      4,
      this.delta * 0.0001
    );
    this.renderer.render(this.scene, this.camera);
    this.prevTime = time;
  };

  onMouseMove(x: number, y: number) {
    this.mouse.x = x;
    this.mouse.y = y;
  }

  destroy() {
    this.log('destroying');
    this.renderer?.dispose();
    this.camera = undefined;
    this.destroyed = true;
  }
}
