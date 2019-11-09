import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import messages from '../messages';
import ProgressBar from 'react-bootstrap/ProgressBar';

class ShowProgress extends React.Component {
  render() {
    return (
      <div>
        <Modal
          show={this.props.isLoading && this.props.isParsing}
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
            <h5>
              Обрабатывается {this.props.numCur} порция данных из{' '}
              {this.props.numFiles}
            </h5>
            <ProgressBar
              variant="info"
              min={0}
              max={this.props.numFiles}
              now={this.props.numCur}
              label={`${Math.floor(
                (this.props.numCur * 100) / this.props.numFiles
              )}%`}
            />
          </Modal.Body>
        </Modal>

        <Modal
          show={this.props.isLoading && !this.props.isParsing}
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
            <h5>Идет отрисовка карты, пожалуйста, подождите...</h5>
            <div className="text-center">
              <div className="spinner-border text-info" />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

ShowProgress.propTypes = {
  isLoading: PropTypes.bool,
  isParsing: PropTypes.bool,
  numFiles: PropTypes.number,
  numCur: PropTypes.number
};

export default injectIntl(ShowProgress);
