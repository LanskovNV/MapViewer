import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import objectGeneration from './ObjectsGeneration';
import draw from './Draw';

class ThreeRendering extends Component {
  createCamera() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    const camera = new THREE.PerspectiveCamera(
      90,
      width / height,
      7000,
      1000000
    );
    camera.position.set(0, 0, 1000000);

    return camera;
  }
  createRenderer() {
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setClearColor('#FFF');
    renderer.setSize(width, height);
    return renderer;
  }
  createControls() {
    const controls = new OrbitControls(this.camera, this.renderer.domElement);

    controls.enableRotate = false;
    controls.enableKeys = false;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.zoomSpeed = 4;
    controls.panSpeed = 2;
    controls.screenSpacePanning = true;
    controls.mouseButtons = {
      RIGHT: THREE.MOUSE.LEFT,
      MIDDLE: THREE.MOUSE.MIDDLE,
      LEFT: THREE.MOUSE.RIGHT
    };

    return controls;
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
  componentDidMount() {
    this.scene = new THREE.Scene();
    this.camera = this.createCamera();
    this.renderer = this.createRenderer();
    this.controls = this.createControls();
    this.old = this.props.isNew;

    window.addEventListener('resize', this.handleResize);
    this.controls.addEventListener('change', this.animate);
    this.mount.appendChild(this.renderer.domElement);
    this.start();
  }
  componentDidUpdate() {
    this.elems = objectGeneration();

    if (this.props.isNew) {
      this.scene.traverse(child => {
        this.scene.remove(child);
      });
      this.elems.forEach(object => {
        object.data = data => draw(data, object);
      });
    }

    this.elems.forEach(e => {
      e.data.name = e.id;
      if (e.toDraw) this.scene.add(e.data);
      else {
        this.scene.traverse(child => {
          if (child.name === e.id) {
            this.scene.remove(child);
          }
        });
      }
    });
  }
  componentWillUnmount() {
    window.removeEventListener('resize');
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }
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

ThreeRendering.propTypes = {
  objects: PropTypes.any,
  isLoading: PropTypes.bool,
  isNew: PropTypes.bool
};

export default ThreeRendering;
