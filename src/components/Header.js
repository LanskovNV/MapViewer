import React from 'react';
import { Dropdown, Badge, Card, ButtonGroup } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../messages';
import About from './About';
import InputLoad from './Input/InputLoad';
import LoadPreparedMap from '../containers/Parsing/StaticLoading';
import PickUsefulFromGeoJSONToTXT from '../containers/Parsing/DynamicLoading';

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
    LoadPreparedMap('Alexandria');
  }
  loadCairo() {
    this.props.loaded();
    LoadPreparedMap('Cairo');
  }
  loadDavis() {
    this.props.loaded();
    LoadPreparedMap('Davis');
  }
  loadSPB() {
    this.props.loaded();
    LoadPreparedMap('SPB');
  }
  load() {
    this.props.chooseMap('Custom', false);
    PickUsefulFromGeoJSONToTXT(this.props.loaded);
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
                  <FormattedMessage {...messages.Alexandria} />{' '}
                  <InputLoad
                    id={'Alexandria'}
                    type={'submit'}
                    onClick={this.loadAlexandria}
                  />
                </Dropdown.Item>
                <Dropdown.Item as="label" hred="preloadMap2">
                  {' '}
                  <FormattedMessage {...messages.Cairo} />{' '}
                  <InputLoad
                    id={'Cairo'}
                    type={'submit'}
                    onClick={this.loadCairo}
                  />
                </Dropdown.Item>
                <Dropdown.Item as="label" hred="preloadMap3">
                  {' '}
                  <FormattedMessage {...messages.Davis} />{' '}
                  <InputLoad
                    id={'Davis'}
                    type={'submit'}
                    onClick={this.loadDavis}
                  />
                </Dropdown.Item>
                <Dropdown.Item as="label" hred="preloadMap4">
                  {' '}
                  <FormattedMessage {...messages.SPB} />{' '}
                  <InputLoad
                    id={'SPB'}
                    type={'submit'}
                    onClick={this.loadSPB}
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
