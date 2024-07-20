import React, { useState } from 'react';
import supabase from '../config/dbConfig';
import {Button, Modal, Card, ListGroup} from 'react-bootstrap';

const ModalInfoAgent = ({associate}) => {
    const [show, setShow] = useState(false);
    const [statuts, setStatus] = useState(0);

    const handleStatus = async(statusId) => {

        console.log(statuts);
        // setStatus(!statuts);
        setStatus(statuts === '1' ? 0 : 1);

        try{
            const { data, error } = await supabase
              .from('associates')
              .update({ status: statuts })
              .eq('id', statusId);

            if (error) {
              throw new Error("Impossible de changer le statut...");
            }
            setShow(false)
        }
        catch(error){
          console.log("Erreur de changement :", error);
        }
    }
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="info" onClick={handleShow}>Info</Button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>{associate.nomdefamille} {associate.prenoms}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Card style={{ width: '100%' }}>
                <Card.Img variant="top" src={associate.photodeprofil} />
                <Card.Body>
                    <Card.Title>{associate?.role==='admin' ? ("Administrateur"):(associate?.role==='supervisor' ? ("Superviseur"):(associate?.role==='agent' ? ("Commercial"):(associate?.role==='finance' ? ("Caissiere"):("Informaticien"))))}</Card.Title>
                    {/* <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                    </Card.Text> */}
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>{associate.lieudemission}</ListGroup.Item>
                    <ListGroup.Item>{associate.num_telephone}</ListGroup.Item>
                    <ListGroup.Item variant={associate?.status === '0' ? 'success' : 'danger'}>Statut : {associate?.status === '0' ? 'Activer' : 'Desactiver'}</ListGroup.Item>
                </ListGroup>
            </Card>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>X</Button>
          <Button onClick={() => handleStatus(associate?.id)} className={`btn bg-gradient ${associate?.status === '0' ? 'btn-success' : 'btn-danger'}`}> {associate?.status === '0' ? (<i className="bi-unlock-fill" style={{padding: "-10px"}}></i>) : (<i className="bi-lock-fill" style={{padding: "-10px"}}></i>)} </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalInfoAgent;
