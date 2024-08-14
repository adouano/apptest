import React, { useEffect, useState } from 'react'
import {Button, Form, Modal, Alert} from 'react-bootstrap';
import supabase from '../config/dbConfig';

const Versements = ({adherent,restApayer}) => {
    const [show, setShow] = useState(false);
    const [libelle, setLibelle] = useState('');
    const [montant, setMontant] = useState('');
    const [transact, setTransact] = useState('');
    const [erreur, setErreur] = useState(null);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDepots = async (e) => {
      e.preventDefault();
      if(montant > restApayer){
        setErreur('Le montant ne doit pas être supérieur à la somme due...');
        return;
      }
      try{
        const { data,error } = await supabase
        .from('dvtransaction')
        .insert({
          associate_id:adherent.associate_id,
          adherent_id:adherent.id,
          designation:libelle,
          depots:montant,
          status:'false'
        })
        .eq('adherent_id', adherent.id)
        .select();

        if(error){
          throw new Error(error.message);
        }

        setTransact(data);
        setShow(false);
      }
      catch(error){
        console.log(error.message);
      }
    };

    useEffect(() => {
      const interval = setTimeout(() => setErreur(""), 2000);
      return () => clearTimeout(interval);
    }, [erreur]);


  return (
    <>
      <Button variant="success" onClick={handleShow}> <i className="bi bi-currency-exchange"></i> Paiement</Button>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Faire un versement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {erreur && <Alert className="alert alert-danger">{erreur}</Alert>}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Intitule</Form.Label>
              <Form.Control type="text" name='libelle' placeholder="versement" onChange={(e) => setLibelle(e.target.value)} autoFocus />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Montant</Form.Label>
              <Form.Control type="number" name='montant' placeholder="7500" min='500' max='50000' maxLength='5' onChange={(e) => setMontant(e.target.value)} autoFocus />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Annuler</Button>
          <Button variant="primary" onClick={handleDepots}>Enregistrer</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Versements;
