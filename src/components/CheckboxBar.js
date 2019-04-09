/*
 * Checkbox Bar
 */
import React from 'react';
import { InputGroup } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../messages';

class CheckboxBar extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div>
        <h2>
          <FormattedMessage {...messages.Info} />
        </h2>
        <h3>
          <FormattedMessage {...messages.Flags} />
        </h3>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Checkbox style={{ marginLeft: 10 }} />
            <InputGroup.Text style={{ marginRight: 10 }}>
              <FormattedMessage {...messages.Streets} />
            </InputGroup.Text>
          </InputGroup.Prepend>
          <InputGroup.Prepend>
            <InputGroup.Checkbox style={{ marginLeft: 10 }} />
            <InputGroup.Text style={{ marginRight: 10 }}>
              <FormattedMessage {...messages.Houses} />
            </InputGroup.Text>
          </InputGroup.Prepend>
          <InputGroup.Prepend>
            <InputGroup.Checkbox style={{ marginLeft: 10 }} />
            <InputGroup.Text style={{ marginRight: 10 }}>
              <FormattedMessage {...messages.Water} />
            </InputGroup.Text>
          </InputGroup.Prepend>
        </InputGroup>
      </div>
    );
  }
}

export default injectIntl(CheckboxBar);
