import * as T from 'three';
import FlowingText from './FlowingText';
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
  constructor() {
    this.scene = new T.Scene();
  }
  log(...args: any[]) {
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

    this.camera = new T.PerspectiveCamera(70, this.aspect, 0.01, 10);
    this.camera.position.z = 1.5;
    this.scene.add(this.camera);
    this.scene.background = new T.Color('pink');

    this.scene.add(new T.AxesHelper(3));
    this.flowingText = new FlowingText();
    this.scene.add(this.flowingText.group);

    this.renderer = new T.WebGLRenderer({ ...renderer, canvas });
    this.resize(width, height);

    this.renderer.setAnimationLoop(this.onLoop);
  }
  get aspect() {
    return this.width / this.height;
  }

  resize(width: number, height: number) {
    this.log('resize', width, height);
    if (!this.camera || !this.renderer) return;
    this.camera.aspect = this.aspect;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(1.5);
  }

  onLoop: XRFrameRequestCallback = (time) => {
    if (!this.camera || !this.renderer) return;
    if (this.prevTime !== 0) this.delta = time - this.prevTime;
    if (this.flowingText) this.flowingText.update(time, this.delta);
    this.renderer.render(this.scene, this.camera);
    this.prevTime = time;
  };
  destroy() {
    this.log('destroying');
    this.renderer?.dispose();
    this.camera = undefined;
    this.destroyed = true;
  }
}
