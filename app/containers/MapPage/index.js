/*
 * MapPage
 */
import React from 'react';
import styled from 'styled-components';
import { Button, ButtonGroup, InputGroup } from 'react-bootstrap';

import PropTypes from 'prop-types';
import H2 from '../../components/H2';
import H3 from '../../components/H3';
import Img from '../../components/Img';
import blank from '../../images/MapViewBlank.png';

import buttonStyles from '../../components/Button/buttonStyles';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const myButton = ({ className, children }) => (
  <Button className={className}> {children} </Button>
);

const StyledButton = styled(myButton)`
  ${buttonStyles};
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
          <div>
            <H2> Map data: </H2>
            <H3> Output: </H3>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Checkbox style={{ marginLeft: 10 }} />
                <InputGroup.Text style={{ marginLeft: 10 }}>
                  streets
                </InputGroup.Text>
              </InputGroup.Prepend>
              <InputGroup.Prepend>
                <InputGroup.Checkbox style={{ marginLeft: 10 }} />
                <InputGroup.Text style={{ marginLeft: 10 }}>
                  houses
                </InputGroup.Text>
              </InputGroup.Prepend>
              <InputGroup.Prepend>
                <InputGroup.Checkbox style={{ marginLeft: 10 }} />
                <InputGroup.Text style={{ marginLeft: 10 }}>
                  water objects
                </InputGroup.Text>
              </InputGroup.Prepend>
            </InputGroup>
          </div>
        </Wrapper>
        <div align="center">
          <ButtonGroup
            style={{
              marginTop: 30,
              marginBottom: 30,
            }}
          >
            <StyledButton>+</StyledButton>
            <StyledButton>-</StyledButton>
            <StyledButton>up</StyledButton>
            <StyledButton>down</StyledButton>
            <StyledButton>left</StyledButton>
            <StyledButton>right</StyledButton>
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

myButton.propTypes = {
  className: PropTypes.any,
  children: PropTypes.node.isRequired,
};
