/*
 * MapPage
 */
import React from 'react';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import blank from './MapViewBlank.png';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

class MapPage extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <Wrapper>
          <img src={blank} alt="MapView" />
        </Wrapper>
      </div>
    );
  }
}

export default injectIntl(MapPage);
