/*
 * MapPage
 */
import React from 'react';
import { ButtonGroup, InputGroup } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { Wrapper } from './wraper';
import { StyledButton } from './button';
import H2 from '../../components/H2';
import H3 from '../../components/H3';
import Img from '../../components/Img';
import blank from '../../images/MapViewBlank.png';
import messages from './messages';

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
            <H2>
              <FormattedMessage {...messages.Info} />
            </H2>
            <H3>
              <FormattedMessage {...messages.Flags} />
            </H3>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Checkbox style={{ marginLeft: 10 }} />
                <InputGroup.Text style={{ marginLeft: 10 }}>
                  <FormattedMessage {...messages.Streets} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <InputGroup.Prepend>
                <InputGroup.Checkbox style={{ marginLeft: 10 }} />
                <InputGroup.Text style={{ marginLeft: 10 }}>
                  <FormattedMessage {...messages.Houses} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <InputGroup.Prepend>
                <InputGroup.Checkbox style={{ marginLeft: 10 }} />
                <InputGroup.Text style={{ marginLeft: 10 }}>
                  <FormattedMessage {...messages.Water} />
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
            <StyledButton>
              <FormattedMessage {...messages.Up} />
            </StyledButton>
            <StyledButton>
              <FormattedMessage {...messages.Down} />
            </StyledButton>
            <StyledButton>
              <FormattedMessage {...messages.Left} />
            </StyledButton>
            <StyledButton>
              <FormattedMessage {...messages.Right} />
            </StyledButton>
          </ButtonGroup>
        </div>
      </div>
    );
  }
}
