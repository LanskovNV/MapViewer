/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
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
    this.loadBaku = this.loadBaku.bind(this);
    this.loadStockton = this.loadStockton.bind(this);
    this.load = this.load.bind(this);
  }
  loadAlexandria() {
    this.props.loaded();
    LoadPreparedMap('Alexandria');
  }
  loadBaku() {
    this.props.loaded();
    LoadPreparedMap('Baku');
  }
  loadStockton() {
    this.props.loaded();
    LoadPreparedMap('Stockton');
  }
  load() {
    PickUsefulFromGeoJSONToTXT(this.props.loading, this.props.loaded);
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
                  <FormattedMessage {...messages.Baku} />{' '}
                  <InputLoad
                    id={'Baku'}
                    type={'submit'}
                    onClick={this.loadBaku}
                  />
                </Dropdown.Item>
                <Dropdown.Item as="label" hred="preloadMap3">
                  {' '}
                  <FormattedMessage {...messages.Stockton} />{' '}
                  <InputLoad
                    id={'Stockton'}
                    type={'submit'}
                    onClick={this.loadStockton}
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
                    h
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

Header.propTypes = {
  loading: PropTypes.func,
  loaded: PropTypes.func
};

export default injectIntl(Header);
