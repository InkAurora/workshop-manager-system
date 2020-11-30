import React from 'react';
import { Modal } from 'react-bootstrap';

class ModalForm extends React.Component {
  render() {
    const { title, body, footer, show, onHide } = this.props;
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>{footer}</Modal.Footer>
      </Modal>
    );
  }
}

export default ModalForm;
