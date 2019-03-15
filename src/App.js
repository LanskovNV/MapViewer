import React, { Component } from 'react';
import styled from 'styled-components';

import MapPage from './containers/MapPage';
import Header from './components/Header';
import Footer from './components/Footer';

import GlobalStyle from './global-styles';

const AppWrapper = styled.div`
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
      <AppWrapper>
        <Header />
        <MapPage />
        <Footer />
        <GlobalStyle />
      </AppWrapper>
    );
  }
}

export default App;
