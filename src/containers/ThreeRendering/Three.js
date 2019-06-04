import React, { Component } from 'react';
import PropTypes from 'prop-types';
import threeEntryPoint from './EntryPoint';

class ThreeContainer extends Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (this.threeRootElement.childElementCount) {
      this.threeRootElement.removeChild(this.threeRootElement.firstChild);
    }
    threeEntryPoint(this.threeRootElement, nextProps.objects);
  }

  render() {
    return <div ref={element => (this.threeRootElement = element)} />;
  }
}

ThreeContainer.propTypes = {
  objects: PropTypes.any
};

export default ThreeContainer;
