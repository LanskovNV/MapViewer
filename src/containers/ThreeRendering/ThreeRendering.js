import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';
import * as d3 from 'd3';
import objectGeneration from './ObjectsGeneration';
import updateObjects from './UpdateObjects';
import { statusJSON } from '../Parsing/Handle';
import draw from './Draw';
import updateToDrawFlags from './UpdateToDrawFlags';
import zoomInit from './D3Zoom';

class ThreeRendering extends Component {
  createCamera(width, height) {
    const near = 7000;
    const far = 1000000;
    const camera = new THREE.PerspectiveCamera(90, width / height, near, far);
    camera.position.set(0, 0, far);
    return camera;
  }
  createRenderer(width, height) {
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setClearColor('#FFF');
    renderer.setSize(width, height);
    return renderer;
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

    // threejs setup
    this.scene = new THREE.Scene();
    this.camera = this.createCamera(width, height);
    this.renderer = this.createRenderer(width, height);

    // get map id
    this.old = this.props.isNew;

    // setup zoom handling
    const zoom = zoomInit(this.camera, width, height);
    const view = d3.select(this.renderer.domElement);
    view.call(zoom);
    view.on('dblclick.zoom', null);
    zoom.scaleTo(view, this.camera.far);

    window.addEventListener('resize', this.handleResize);
    this.mount.appendChild(this.renderer.domElement);
    this.start();
  }
  componentDidUpdate() {
    if (this.props.isLoading) {
      // clear scene
      while (this.scene.children.length > 0) {
        this.scene.remove(this.scene.children[0]);
      }
    } else {
      if (this.elems === undefined)
        this.elems = objectGeneration(this.props.objects);
      if (this.props.isNew !== this.old) {
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
      } else {
        this.elems.forEach(elem => {
          elem = updateToDrawFlags(elem, this.props.objects);
          if (!elem.toDraw && elem.id) {
            const toDel = this.scene.getObjectById(elem.id);
            this.scene.remove(toDel);
            elem.id = 0;
          }
          if (elem.toDraw && !elem.id && this.scene.children.length < 3) {
            fetch(elem.data)
              .then(statusJSON)
              .then(data => draw(this.scene, data, elem));
          }
        });
      }
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
