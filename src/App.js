import React, { Component } from 'react';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import Spinner from './components/Spinner';
import Header from './components/Header';
import Footer from './components/Footer';
import CheckboxBar from './components/OutputData';
import ThreeContainer from './containers/ThreeRendering/Three';

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
  }
  state = {
    isHouses: true,
    isStreets: true,
    isWater: true,
    preloadMapMode: true,
    mapName: 'Davis',
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
  // Choose preload map
  changeMapName = (name, isPreload) => {
    this.setState({ mapName: name, preloadMapMode: isPreload });
  };
  loadedCallback() {
    this.setState({ isLoaded: this.state.isLoaded + 1 });
  }
  render() {
    return (
      <Wrapper>
        <Header chooseMap={this.changeMapName} loaded={this.loadedCallback} />
        <Spinner isLoading={this.isLoading} />
        <ThreeContainer objects={this.state} />
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
