import {
  CylinderGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
} from 'three';
import MaterialCanvas from './MaterialCanvas';

export default class FlowingText {
  matCanvas: MaterialCanvas;
  geometry: PlaneGeometry;
  mesh: Mesh;
  group: Group;
  debug: boolean = false;
  constructor(size: number) {
    this.geometry = new PlaneGeometry(size, size, 256, 256);
    this.matCanvas = new MaterialCanvas();
    this.mesh = new Mesh(
      this.geometry,
      this.debug
        ? new MeshBasicMaterial({ color: 'red', wireframe: true })
        : this.matCanvas.material
    );
    this.group = new Group();
    this.group.rotation.z = Math.PI * 0.25;
    this.group.rotation.order = 'YXZ';
    this.group.rotation.x = -Math.PI * 0.25;
    this.group.add(this.mesh);
  }
  update = (time: number, delta: number) => {
    this.matCanvas.material.uniforms.uTime.value = time;
    this.matCanvas.texture.offset.y += delta * 0.00001;
    this.matCanvas.texture.needsUpdate = true;
  };
}
