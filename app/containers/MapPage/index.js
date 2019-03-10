/*
 * MapPage
 */
import React from 'react';
import styled from 'styled-components';

import H3 from '../../components/H3';
import Img from '../../components/Img';
import blank from '../../images/MapViewBlank.png';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export default class MapPage extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <Wrapper>
          <Img src={blank} alt="MapView" />
          <H3> Map data </H3>
        </Wrapper>
        <Wrapper>
          <div />
        </Wrapper>
      </div>
    );
  }
}
