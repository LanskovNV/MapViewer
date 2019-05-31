import * as THREE from 'three';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import threeEntryPoint from './EntryPoint';

class ThreeContainer extends Component {
  constructor() {
    super();
    this.state = { scene: this.buildScene() };
  }

  buildScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#FFF');

    return scene;
  }

  componentDidMount() {
    threeEntryPoint(
      this.threeRootElement,
      this.props.objects,
      this.state.scene,
      false
    );
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    threeEntryPoint(
      this.threeRootElement,
      this.props.objects,
      this.state.scene,
      true
    );
  }
  render() {
    return <div ref={element => (this.threeRootElement = element)} />;
  }
}

ThreeContainer.propTypes = {
  objects: PropTypes.any
};

export default ThreeContainer;
