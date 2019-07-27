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
    const camera = new THREE.PerspectiveCamera(
      90,
      width / height,
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
    if (this.elems === undefined)
      this.elems = objectGeneration(this.props.objects);
    if (this.props.isNew !== this.old) {
      this.old = this.props.isNew; // update status
      while (this.scene.children.length > 0) {
        this.scene.remove(this.scene.children[0]);
      }
      this.elems = updateObjects(this.elems);
      this.elems.forEach(elem => {
        fetch(elem.data)
          .then(statusJSON)
          .then(data => draw(this.scene, data, elem));
      });
      this.renderScene();
    } else {
      this.elems.forEach(elem => {
        if (!elem.toDraw) {
          this.scene.traverse(child => {
            if (child.id === elem.id) {
              this.scene.remove(child);
              elem.id = 0;
            }
          });
        } else {
          let flag = true;
          this.scene.traverse(child => {
            if (child.id === elem.id) flag = false;
          });
          if (flag) {
            fetch(elem.data)
              .then(statusJSON)
              .then(data => draw(this.scene, data, elem));
          }
        }
      });
    }

    /*
    this.drawing_objects.forEach(e => {
      if (e.toDraw)
        this.scene.add(e.data);
      else {
        this.scene.traverse(child => {
          if (child.name === e.toDraw) {
            this.scene.remove(child);
          }
        });
      }
    });
     */
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
