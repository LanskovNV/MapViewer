import React, { Component } from 'react';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';

// import MapPage from './containers/MapPage';
import Header from './components/Header';
import Footer from './components/Footer';
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
  render() {
    return (
      <Wrapper>
        <Header />
        <ThreeContainer />
        <Footer />
        <GlobalStyle />
      </Wrapper>
    );
  }
}

export default injectIntl(App);
