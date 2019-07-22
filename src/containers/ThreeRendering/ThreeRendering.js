import React, { Component } from 'react';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';

class ThreeRendering extends Component {
  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      10,
      500
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const controls = new OrbitControls(camera, renderer.domElement);
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
    const cube = new THREE.Mesh(geometry, material);

    controls.enableRotate = false;
    controls.enableKeys = false;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.screenSpacePanning = true;

    camera.position.set(0, 0, 500);
    scene.add(cube);
    renderer.setClearColor('#FAF');
    renderer.setSize(width, height);

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.material = material;
    this.cube = cube;
    this.controls = controls;

    window.addEventListener('resize', this.handleResize);
    this.controls.addEventListener('change', this.animate);
    controls.mouseButtons = {
      RIGHT: THREE.MOUSE.LEFT,
      MIDDLE: THREE.MOUSE.MIDDLE,
      LEFT: THREE.MOUSE.RIGHT
    };

    this.mount.appendChild(this.renderer.domElement);
    this.start();
  }

  componentWillUnmount() {
    window.removeEventListener('resize');
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  handleResize = () => {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  };

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };

  stop = () => {
    cancelAnimationFrame(this.frameId);
  };

  animate = () => {
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  };

  render() {
    return (
      <div
        style={{ width: '52vw', height: '30vw' }}
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}

export default ThreeRendering;
