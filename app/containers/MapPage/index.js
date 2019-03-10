/*
 * MapPage
 */
import React from 'react';
import Img from '../../components/Img';
import blank from '../../images/MapViewBlank.png';

export default class MapPage extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <Img src={blank} alt="MapView" />;
  }
}
