import React, { useEffect, useState } from 'react';
import supabase from '../config/dbConfig';
import {Button, Modal, Card, ListGroup} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../config/userContext';

const ModalInfoAgent = ({associate}) => {
    const { user } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [statuts, setStatuts] = useState(!associate?.status);

  const handleStatus = async () => {
    setStatuts(statuts);
    try{
      const { data, error } = await supabase
        .from('associates')
        .update({ status:statuts })
        .eq('id', associate?.id)
        .select();

        if(!error){
          if(statuts===true){
            await supabase
            .from('dvenrollogs')
            .insert({
                action:`Gestion de compte`,
                note:`${user.email} a activé le compte de ${associate?.email}...`
            })
          }else{
            await supabase
            .from('dvenrollogs')
            .insert({
                action:`Gestion de compte`,
                note:`${user.email} a désactivé le compte de ${associate?.email}...`
            })
          }
          window.location.reload();
          setShow(false);
        }else{
        throw new Error(error.message);
      }
    }
    catch(error){
      console.log("Erreur :", error);
    }
  }

  const delectUserAccount = async() => {
    try{
      const {data, error} = await supabase
        .from('associates')
        .update({
            status:'false',
            supp_intention:'true'
        })
        .eq('id', associate?.id)
        .select();

        if(!error){
            await supabase
            .from('dvenrollogs')
            .insert({
                action:`Suppression de compte`,
                note:`${user.email} souhaite supprimer le compte de ${associate?.email}...`
            });
            navigate('/');
            setShow(false);
        }else{
          throw new Error(error.message);
      }
    }
    catch(error){
        console.log("Erreur : ", error);
    }
  }
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="info" onClick={handleShow}>Info</Button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{textAlign: 'center'}}>{associate.nomdefamille} {associate.prenoms}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Card style={{ width: '100%' }}>
                <Card.Img variant="top" src={associate?.photodeprofil} />
                <Card.Body>
                    <Card.Title><i className="bi-briefcase-fill" style={{padding: "10px"}}></i> {associate?.role==='admin' ? ("Administrateur"):(associate?.role==='supervisor' ? ("Superviseur"):(associate?.role==='agent' ? ("Commercial"):(associate?.role==='finance' ? ("Caissiere"):("Informaticien"))))}</Card.Title>
                    {/* <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                    </Card.Text> */}
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item><i className="bi-building-fill" style={{padding: "10px"}}></i> {associate.lieudemission}</ListGroup.Item>
                    <ListGroup.Item><i className="bi-envelope-at-fill" style={{padding: "10px"}}></i> {associate.email}</ListGroup.Item>
                    <ListGroup.Item><i className="bi-phone-fill" style={{padding: "10px"}}></i> {associate.num_telephone}</ListGroup.Item>
                    <ListGroup.Item variant={associate?.status ? 'success':'danger'} style={{padding: "10px"}}>Statut : {associate?.status ? 'Actif':'Inactif'} </ListGroup.Item>
                </ListGroup>
            </Card>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>X</Button>
          <Button onClick={handleStatus} className={associate?.status ? 'btn bg-gradient btn-warning':'btn bg-gradient btn-success'}> {associate?.status ? (<i className="bi-lock-fill" style={{padding: "-10px"}}> Desactiver</i>):(<i className="bi-unlock-fill" style={{padding: "-10px"}}> Activer</i>)} </Button>
          <Button variant="danger" onClick={delectUserAccount}><i className="bi-trash-fill" style={{padding: "-10px"}}> Supprimer</i></Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalInfoAgent;
