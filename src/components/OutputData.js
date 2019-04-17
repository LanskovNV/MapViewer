/*
 * Checkbox Bar
 */
import React from 'react';
import { Form, Card, CardDeck, Badge } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../messages';

class OutputData extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div style={{ marginTop: 10, marginBottom: 20 }}>
        <CardDeck>
          <Card style={{ width: '18rem', marginLeft: 20 }}>
            <Card.Body>
              <h3>
                <Badge>
                  <FormattedMessage {...messages.Flags} />
                </Badge>
              </h3>
              <Form>
                <div key={`inline-checkbox`} className="mb-3">
                  <Form.Check
                    inline
                    type="checkbox"
                    id={`inline-checkbox-1`}
                    label=<FormattedMessage {...messages.Streets} />
                  />
                  <Form.Check
                    inline
                    type="checkbox"
                    id={`inline-checkbox-2`}
                    label=<FormattedMessage {...messages.Houses} />
                  />
                  <Form.Check
                    inline
                    ype="checkbox"
                    id={`inline-checkbox-3`}
                    label=<FormattedMessage {...messages.Water} />
                  />
                  <Form.Text className="text-muted">
                    <FormattedMessage {...messages.helpOnChoosing} />
                  </Form.Text>
                </div>
              </Form>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Header>
              <FormattedMessage {...messages.Info} />
            </Card.Header>
            <Card.Body />
          </Card>
        </CardDeck>
      </div>
    );
  }
}

export default injectIntl(OutputData);
