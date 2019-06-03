import React, { Component } from 'react';
import PropTypes from 'prop-types';
import threeEntryPoint from './EntryPoint';

class ThreeContainer extends Component {
  componentDidMount() {
    threeEntryPoint(this.threeRootElement, this.props.objects);
  }

  render() {
    return <div ref={element => (this.threeRootElement = element)} />;
  }
}

ThreeContainer.propTypes = {
  objects: PropTypes.any
};

export default ThreeContainer;
