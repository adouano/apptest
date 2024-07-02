import React, { useState } from 'react'
import {Button, Form, Modal} from 'react-bootstrap';

const Versements = () => {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="success" onClick={handleShow}>Paiement</Button>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Faire un versement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Intitule</Form.Label>
              <Form.Control type="text" placeholder="versement" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Montant</Form.Label>
              <Form.Control type="text" placeholder="7500" autoFocus />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Annuler</Button>
          <Button variant="primary" onClick={handleClose}>Enregistrer</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Versements;
