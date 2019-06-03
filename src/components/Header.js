/* eslint-disable no-unused-vars */
import React from 'react';
import { Dropdown, Badge, Card, ButtonGroup } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../messages';
import About from './About';
import Parser from './Parser';
import InputLoad from './Input/InputLoad';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor() {
    super();
    this.state = { percent: 0, isLoading: false };
    this.handleLoading = this.handleLoading.bind(this);
    this.handleLoadingPercent = this.handleLoadingPercent.bind(this);
    this.Parser = (
      <Parser
        handleLoading={this.handleLoading}
        handleLoadingPercent={this.handleLoadingPercent}
      />
    );
  }
  handleLoading = value => {
    this.setState({ isLoading: value });
    this.props.updateLoading(this.state.isLoading);
  };
  handleLoadingPercent = value => {
    this.setState({ percent: value });
    this.props.updateLoadingPercent(this.state.percent);
  };
  shouldComponentUpdate() {
    return false;
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
                    onClick={this.Parser.LoadPreparedMap}
                  />
                </Dropdown.Item>
                <Dropdown.Item as="label" hred="preloadMap2">
                  {' '}
                  <FormattedMessage {...messages.map2} />{' '}
                  <InputLoad
                    id={'preloadMap2'}
                    type={'submit'}
                    name={'Load2'}
                    onClick={this.Parser.LoadPreparedMap}
                  />
                </Dropdown.Item>
                <Dropdown.Item as="label" hred="preloadMap3">
                  {' '}
                  <FormattedMessage {...messages.map3} />{' '}
                  <InputLoad
                    id={'preloadMap3'}
                    type={'submit'}
                    name={'Load3'}
                    onClick={this.Parser.LoadPreparedMap}
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
                    onChange={this.Parser.PickUsefulFromGeoJSONToTXT}
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
  updateLoading: PropTypes.func,
  updateLoadingPercent: PropTypes.func
};

export default injectIntl(Header);
