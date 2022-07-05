import dynamic from 'next/dynamic';
import { useRef, useEffect, useCallback, useState } from 'react';
import * as T from 'three';

class GL {
  canvas?: HTMLCanvasElement;
  scene: T.Scene;
  renderer?: T.WebGLRenderer;
  camera?: T.PerspectiveCamera;
  width: number;
  height: number;
  destroyed: boolean;
  constructor() {
    this.scene = new T.Scene();
    this.width = 1;
    this.height = 1;
    this.destroyed = false;
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
    this.camera.position.z = 3;
    this.scene.add(this.camera);
    this.scene.background = new T.Color('pink');

    this.scene.add(new T.AxesHelper(3));

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

  onLoop: XRFrameRequestCallback = () => {
    if (!this.camera || !this.renderer) return;
    this.renderer.render(this.scene, this.camera);
  };
  destroy() {
    this.log('destroying');
    this.renderer?.dispose();
    this.camera = undefined;
    this.destroyed = true;
  }
}
const WorkBG: React.FC = () => {
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const refState = useRef({ gl: new GL() });

  const onResize = useCallback(() => {
    if (!refCanvas.current) return;
    refState.current.gl.resize(
      refCanvas.current.clientWidth,
      refCanvas.current.clientHeight
    );
  }, []);
  useEffect(() => {
    if (!refCanvas.current) return;
    const state = refState.current;
    console.log('useEffect() triggering init');
    if (state.gl.destroyed) state.gl = new GL();
    state.gl.init({
      canvas: refCanvas.current,
      width: refCanvas.current.clientWidth,
      height: refCanvas.current.clientHeight,
    });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      state.gl.destroy();
    };
  }, []);
  return <canvas ref={refCanvas} className="gl work-bg"></canvas>;
};

export default dynamic(() => Promise.resolve(WorkBG), { ssr: false });
