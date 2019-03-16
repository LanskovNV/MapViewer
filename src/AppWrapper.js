import React, { Component } from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import ruLocaleData from 'react-intl/locale-data/ru';
import translations from './i18n/locales';
import App from './App';

addLocaleData(ruLocaleData);

class AppWrapper extends Component {
  render() {
    // get locale from url
    const locale = window.location.search.replace('?locale=', '') || 'en';
    const messages = translations[locale];
    return (
      <IntlProvider locale={locale} key={locale} messages={messages}>
        <App />
      </IntlProvider>
    );
  }
}

export default AppWrapper;
