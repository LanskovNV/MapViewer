/*
 * MapPage
 */
import React from 'react';
import { ButtonGroup, InputGroup } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { Wrapper } from './wraper';
import { StyledButton } from './button';
import blank from '../../../public/MapViewBlank.png';
import messages from './messages';

export default class MapPage extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <Wrapper>
          <img src={blank} alt="MapView" />
          <div>
            <h2>
              <FormattedMessage {...messages.Info} />
            </h2>
            <h3>
              <FormattedMessage {...messages.Flags} />
            </h3>
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
              marginBottom: 30
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
