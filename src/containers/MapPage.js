/*
 * MapPage
 */
import React from 'react';
import { Button, ButtonGroup, InputGroup } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import styled from 'styled-components';
import blank from './MapViewBlank.png';
import messages from '../messages';

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
            <Button variant="info">+</Button>
            <Button variant="info">-</Button>
            <Button variant="info">
              <FormattedMessage {...messages.Up} />
            </Button>
            <Button variant="info">
              <FormattedMessage {...messages.Down} />
            </Button>
            <Button variant="info">
              <FormattedMessage {...messages.Left} />
            </Button>
            <Button variant="info">
              <FormattedMessage {...messages.Right} />
            </Button>
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

export default injectIntl(MapPage);
