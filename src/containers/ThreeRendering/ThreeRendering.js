import React, { Component } from 'react';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import { statusJSON } from '../Parsing/Handle';

import draw from './Draw';

class ThreeRendering extends Component {
  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    const scene = new THREE.Scene();
    /*const camera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      10,
      500
    );*/
    const camera = new THREE.PerspectiveCamera(
      90,
      width / height,
      7000,
      1000000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const controls = new OrbitControls(camera, renderer.domElement);

    controls.enableRotate = false;
    controls.enableKeys = false;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.zoomSpeed = 4;
    controls.panSpeed = 2;
    controls.screenSpacePanning = true;

    camera.position.set(0, 0, 1000000);
    renderer.setClearColor('#FFF');
    renderer.setSize(width, height);

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
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

  componentDidUpdate() {
    const holesMaterial = new THREE.MeshBasicMaterial({ color: '#FFF' });
    const elems = [];

    const houses = {
      toDraw: true,
      data: document.getElementById('housesProcFile'),
      material: new THREE.MeshBasicMaterial({ color: '#520' })
    };
    const streets = {
      toDraw: true,
      data: document.getElementById('streetsProcFile'),
      material: new THREE.MeshBasicMaterial({ color: '#E90' })
    };
    const water = {
      toDraw: true,
      data: document.getElementById('waterProcFile'),
      material: new THREE.MeshBasicMaterial({ color: '#0AF' })
    };
    elems.push(houses, streets, water);

    elems.forEach(object => {
      if (object.toDraw) {
        fetch(object.data)
          .then(statusJSON)
          .then(data => draw(this.scene, data, object, holesMaterial));
      }
    });
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
        style={{ width: 'inherit', height: '50vh' }}
        ref={mount => {
          this.mount = mount;
        }}
      />
    );
  }
}

export default ThreeRendering;
