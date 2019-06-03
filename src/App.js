import React, { Component } from 'react';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';

import Header from './components/Header';
import Footer from './components/Footer';
import CheckboxBar from './components/OutputData';
import ThreeContainer from './containers/ThreeRendering/Three';
import LoadingBar from './components/LoadingComponent';

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
  state = {
    isHouses: false,
    isStreets: false,
    isWater: false
  };
  loadingProps = {
    isLoading: false,
    percent: 0
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
  updateLoading = value => {
    this.setState({ isLoading: value });
  };
  updateLoadingPercent = value => {
    this.setState({ percent: value });
  };
  render() {
    return (
      <Wrapper>
        <Header
          updateLoading={this.updateLoading}
          updateLoadingPercent={this.updateLoadingPercent}
        />
        <LoadingBar
          isLoading={this.loadingProps.isLoading}
          percent={this.loadingProps.percent}
        />
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
