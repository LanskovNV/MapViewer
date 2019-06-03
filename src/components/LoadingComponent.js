import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { ProgressBar, Modal } from 'react-bootstrap';

class LoadingBar extends React.Component {
  render() {
    if (this.props.isLoading) {
      return (
        <div>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Подождите, идет загрузка файла</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <ProgressBar
                now={this.props.percent}
                label={`${this.props.percent}%`}
              />
            </Modal.Body>
          </Modal.Dialog>
        </div>
      );
    } else {
      return <div />;
    }
  }
  shouldComponentUpdate() {
    return true;
  }
}

LoadingBar.propTypes = {
  isLoading: PropTypes.bool,
  percent: PropTypes.number
};

export default injectIntl(LoadingBar);
