import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';
import objectGeneration from './ObjectsGeneration';
import updateObjects from './UpdateObjects';
import { statusJSON } from '../Parsing/Handle';
import draw from './Draw';

class ThreeRendering extends Component {
  createCamera(width, height) {
    const h_o = 1000000 * 2 * Math.atan((90 * Math.PI) / 180 / 2);
    const w_o = (width / height) * h_o;
    const camera = new THREE.OrthographicCamera(
      w_o / -2,
      w_o / 2,
      h_o / 2,
      h_o / -2,
      7000,
      1000000
    );
    camera.position.set(0, 0, 1000000);
    return camera;
  }
  createRenderer(width, height) {
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
    controls.zoomSpeed = 2;
    controls.panSpeed = 1;
    controls.screenSpacePanning = true;
    controls.maxZoom = 10;
    controls.minZoom = 1;
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
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = this.createCamera(width, height);
    this.renderer = this.createRenderer(width, height);
    this.controls = this.createControls();
    this.old = this.props.isNew;

    window.addEventListener('resize', this.handleResize);
    this.controls.addEventListener('change', this.animate);
    this.mount.appendChild(this.renderer.domElement);
    this.start();
  }
  componentDidUpdate() {
    if (this.props.isLoading) {
      // clear scene
      while (this.scene.children.length > 0) {
        this.scene.remove(this.scene.children[0]);
      }
    }
    if (this.elems === undefined)
      this.elems = objectGeneration(this.props.objects);
    if (this.props.isNew !== this.old) {
      // update status
      this.old = this.props.isNew;

      // clear scene
      while (this.scene.children.length > 0) {
        this.scene.remove(this.scene.children[0]);
      }

      this.elems = updateObjects(this.elems, this.props.objects);
      this.elems.forEach(elem => {
        if (elem.toDraw && this.scene.children.length < 3) {
          fetch(elem.data)
            .then(statusJSON)
            .then(data => draw(this.scene, data, elem));
        }
      });
      //this.renderScene();
    } else if (this.scene.children.length !== 0) {
      this.elems.forEach(elem => {
        // updating toDraw flags
        if (elem.name === 'houses') {
          elem.toDraw = this.props.objects.isHouses;
        } else if (elem.name === 'streets') {
          elem.toDraw = this.props.objects.isStreets;
        } else {
          elem.toDraw = this.props.objects.isWater;
        }

        if (!elem.toDraw && elem.id) {
          // del old from scene
          const toDel = this.scene.getObjectById(elem.id);
          this.scene.remove(toDel);
          elem.id = 0;
        }
        if (elem.toDraw && !elem.id && this.scene.children.length < 3) {
          // add new to scene
          fetch(elem.data)
            .then(statusJSON)
            .then(data => draw(this.scene, data, elem));
        }
      });
    }
    this.animate();
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
  isNew: PropTypes.number
};

export default ThreeRendering;
