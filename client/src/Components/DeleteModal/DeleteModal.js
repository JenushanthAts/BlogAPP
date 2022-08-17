import React from "react";
import { Modal, Button } from "react-bootstrap";
export const DeleteModal = ({ show, setShow, handleDelete }) => {
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Deleting Content</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure to delete this content?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleDelete}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
