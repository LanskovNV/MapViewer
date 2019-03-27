/* eslint-disable no-unused-vars */
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';

class About extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <>
        <Button variant="outline-info" onClick={this.handleShow}>
          <FormattedMessage {...messages.about} />
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <FormattedMessage {...messages.about} />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormattedMessage {...messages.aboutText} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-info" onClick={this.handleClose}>
              <FormattedMessage {...messages.close} />
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default About;
