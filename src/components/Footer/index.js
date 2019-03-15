import React from 'react';
import { FormattedMessage } from 'react-intl';

import LocaleToggle from '../../containers/LocaleToggle';
import Wrapper from './Wrapper';
import messages from './messages';

function Footer() {
  return (
    <Wrapper>
      <section>
        <LocaleToggle />
      </section>
      <section>
        <FormattedMessage
          {...messages.authorMessage}
          values={{
            author: (
              <a href="https://github.com/LanskovNV/MapViewer">MapViewer</a>
            )
          }}
        />
      </section>
    </Wrapper>
  );
}

export default Footer;
