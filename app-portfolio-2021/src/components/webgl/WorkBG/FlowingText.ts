import {
  CylinderBufferGeometry,
  Group,
  Mesh,
  RepeatWrapping,
  SphereBufferGeometry,
} from 'three';
import MaterialCanvas from './MaterialCanvas';

export default class FlowingText {
  matCanvas: MaterialCanvas;
  geometry: CylinderBufferGeometry;
  mesh: Mesh;
  group: Group;
  constructor() {
    this.geometry = new CylinderBufferGeometry(1, 1, 10, 30, 30, false);
    this.matCanvas = new MaterialCanvas();
    this.mesh = new Mesh(this.geometry, this.matCanvas.material);
    this.group = new Group();
    this.group.rotation.z = Math.PI * 0.25;
    this.group.add(this.mesh);
  }
  update = (time: number, delta: number) => {
    this.matCanvas.material.uniforms.uTime.value = time;
    this.mesh.rotation.y += delta * 0.0001;
    this.matCanvas.texture.needsUpdate = true;
  };
}
