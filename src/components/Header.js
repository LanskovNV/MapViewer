/* eslint-disable no-unused-vars */
import React from 'react';
import { Dropdown, Badge, Card, ButtonGroup } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../messages';
import About from './About';

class Header extends React.Component {
  render() {
    return (
      <Card className="text-center">
        <Card.Body>
          <Card.Title>
            {' '}
            <h1>
              Map
              <Badge variant="info">Viewer</Badge>
            </h1>{' '}
          </Card.Title>
          <ButtonGroup>
            <Dropdown>
              <Dropdown.Toggle split variant="outline-info" id="dropdown-basic">
                <FormattedMessage {...messages.chooseMap} />
              </Dropdown.Toggle>

              <Dropdown.Menu alignRight={true}>
                <Dropdown.Item hred="#/action-1">
                  {' '}
                  <FormattedMessage {...messages.map1} />{' '}
                </Dropdown.Item>
                <Dropdown.Item hred="#/action-2">
                  {' '}
                  <FormattedMessage {...messages.map2} />{' '}
                </Dropdown.Item>
                <Dropdown.Item hred="#/action-3">
                  {' '}
                  <FormattedMessage {...messages.map3} />{' '}
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item hred="#/action-4">
                  {' '}
                  <FormattedMessage {...messages.uploadMap} />{' '}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <About />
          </ButtonGroup>
        </Card.Body>
      </Card>
    );
  }
}

export default injectIntl(Header);
