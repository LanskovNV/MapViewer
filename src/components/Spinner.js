import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import messages from '../messages';

class Spinner extends React.Component {
  render() {
    return (
      <div>
        <Modal
          show={this.props.isLoading}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title>
              <h5>
                <FormattedMessage {...messages.loading} />
              </h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <div className="spinner-border text-info" />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

Spinner.propTypes = {
  isLoading: PropTypes.bool
};

export default injectIntl(Spinner);
