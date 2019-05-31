/*
 * Checkbox Bar
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Card, CardDeck, Badge } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../messages';

class OutputData extends React.Component {
  constructor() {
    super();
    this.state = { houses: true, streets: true, water: true };
    this.handleToggleHouses = this.handleToggleHouses.bind(this);
    this.handleToggleStreets = this.handleToggleStreets.bind(this);
    this.handleToggleWater = this.handleToggleWater.bind(this);
  }
  handleToggleHouses() {
    this.setState({ houses: !this.state.houses });
    this.props.updateHouses(!this.state.houses);
  }
  handleToggleStreets() {
    this.setState({ streets: !this.state.streets });
    this.props.updateStreets(!this.state.streets);
  }
  handleToggleWater() {
    this.setState({ water: !this.state.water });
    this.props.updateWater(!this.state.water);
  }
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
                    defaultChecked={true}
                    onChange={this.handleToggleStreets}
                    label=<FormattedMessage {...messages.Streets} />
                  />
                  <Form.Check
                    inline
                    type="checkbox"
                    id={`inline-checkbox-2`}
                    defaultChecked={true}
                    onChange={this.handleToggleHouses}
                    label=<FormattedMessage {...messages.Houses} />
                  />
                  <Form.Check
                    inline
                    ype="checkbox"
                    id={`inline-checkbox-3`}
                    defaultChecked={true}
                    onChange={this.handleToggleWater}
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

OutputData.propTypes = {
  updateHouses: PropTypes.func,
  updateStreets: PropTypes.func,
  updateWater: PropTypes.func
};

export default injectIntl(OutputData);
