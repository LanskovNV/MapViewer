/* eslint-disable no-unused-vars */
import React from 'react';
import { Dropdown, Badge, Card, ButtonGroup } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../messages';
import About from './About';
import Parser from './Parser';
import InputLoad from './Input/InputLoad';

class Header extends React.Component {
  constructor() {
    super();
    this.loadAlexandria = this.loadAlexandria.bind(this);
    this.loadCairo = this.loadCairo.bind(this);
    this.loadDavis = this.loadDavis.bind(this);
    this.loadSPB = this.loadSPB.bind(this);
    this.load = this.load.bind(this);
  }

  loadAlexandria() {
    this.props.chooseMap('Alexandria', true);
    Parser.LoadPreparedMap('preloadMap1');
  }
  loadCairo() {
    this.props.chooseMap('Cairo', true);
    Parser.LoadPreparedMap('preloadMap2');
  }
  loadDavis() {
    this.props.chooseMap('Davis', true);
    Parser.LoadPreparedMap('preloadMap3');
  }
  loadSPB() {
    this.props.chooseMap('SPB', true);
    Parser.LoadPreparedMap('preloadMap4');
  }
  load() {
    this.props.chooseMap('Custom', false);
    Parser.PickUsefulFromGeoJSONToTXT();
  }
  render() {
    return (
      <Card className="text-center" style={{ marginBottom: 10 }}>
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
                <Dropdown.Item as="label" hred="preloadMap1">
                  {' '}
                  <FormattedMessage {...messages.map1} />{' '}
                  <InputLoad
                    id={'preloadMap1'}
                    type={'submit'}
                    name={'Load1'}
                    onClick={this.loadAlexandria}
                  />
                </Dropdown.Item>
                <Dropdown.Item as="label" hred="preloadMap2">
                  {' '}
                  <FormattedMessage {...messages.map2} />{' '}
                  <InputLoad
                    id={'preloadMap2'}
                    type={'submit'}
                    name={'Load2'}
                    onClick={Parser.LoadPreparedMap}
                  />
                </Dropdown.Item>
                <Dropdown.Item as="label" hred="preloadMap3">
                  {' '}
                  <FormattedMessage {...messages.map3} />{' '}
                  <InputLoad
                    id={'preloadMap3'}
                    type={'submit'}
                    name={'Load3'}
                    onClick={Parser.LoadPreparedMap}
                  />
                </Dropdown.Item>
                <Dropdown.Item as="label" hred="preloadMap4">
                  {' '}
                  <FormattedMessage {...messages.map3} />{' '}
                  <InputLoad
                    id={'preloadMap4'}
                    type={'submit'}
                    name={'Load4'}
                    onClick={Parser.LoadPreparedMap}
                  />
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as="label" hred="loadedMap">
                  {' '}
                  <FormattedMessage {...messages.uploadMap} />
                  <InputLoad
                    id={'loadedMap'}
                    type={'file'}
                    name={'Load'}
                    onChange={this.load}
                  />{' '}
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
