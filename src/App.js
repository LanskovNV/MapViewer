import React, { Component } from 'react';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import Spinner from './components/Spinner';
import Header from './components/Header';
import Footer from './components/Footer';
import CheckboxBar from './components/OutputData';
// import ThreeContainer from './containers/ThreeRendering/Three';
import ThreeRendering from './containers/ThreeRendering/ThreeRendering';

import GlobalStyle from './global-styles';

const Wrapper = styled.div`
  max-width: calc(1000px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

class App extends Component {
  constructor() {
    super();
    this.loadedCallback = this.loadedCallback.bind(this);
    this.startLoadingCallback = this.startLoadingCallback.bind(this);
    this.endLoadingCallback = this.endLoadingCallback.bind(this);
  }
  state = {
    isHouses: true,
    isStreets: true,
    isWater: true,
    isLoaded: 0,
    isLoading: false
  };
  // Callbacks to support checkboxes
  updateHouses = value => {
    this.setState({ isHouses: value });
  };
  updateStreets = value => {
    this.setState({ isStreets: value });
  };
  updateWater = value => {
    this.setState({ isWater: value });
  };
  loadedCallback() {
    this.setState({ isLoaded: this.state.isLoaded + 1 });
    this.endLoadingCallback();
  }
  startLoadingCallback() {
    this.setState({ isLoading: true });
  }
  endLoadingCallback() {
    this.setState({ isLoading: false });
  }
  render() {
    const objects = {
      isHouses: this.state.isHouses,
      isStreets: this.state.isStreets,
      isWater: this.state.isWater
    };
    return (
      <Wrapper>
        <Header
          loaded={this.loadedCallback}
          loading={this.startLoadingCallback}
        />
        <Spinner isLoading={this.state.isLoading} />
        <ThreeRendering
          objects={objects}
          isLoading={this.state.isLoading}
          isNew={this.state.isLoaded}
        />
        <CheckboxBar
          updateHouses={this.updateHouses}
          updateStreets={this.updateStreets}
          updateWater={this.updateWater}
        />
        <Footer />
        <GlobalStyle />
      </Wrapper>
    );
  }
}

export default injectIntl(App);
