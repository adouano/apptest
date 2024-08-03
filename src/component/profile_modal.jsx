import React, { useState } from 'react';
import {Button, Modal, Card, Alert} from 'react-bootstrap';
import supabase from '../config/dbConfig';

const ProfileModal = ({profile}) => {
    const [imgError, setImgError] = useState('');
    const [imgSrc, setImgSrc] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const userId = profile.associate_id;

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        const imgType = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if(!file){
            setImgError("Veuillez choisir une image...");
            return;
        }
        if(!imgType.includes(file.type)){
            setImgError("Extension d'image invalide");
            return;
        } 
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            const imageUrl = reader.result?.toString() || '' ;
            setImgSrc(imageUrl);
        });
        reader.readAsDataURL(file);
    }

    const updatPhoto = async() => {
        try{
            await supabase
            .from('associates')
            .update({
                photodeprofil: imgSrc,
            })
            .eq("associate_id", userId)
            .select();

            window.location.reload();
        }
        catch(error){
            console.log(error.message);
        }
    }

  return (
    <>
      <Button variant='btn btn-outline-warning text-body m-auto rounded-3 p-2 mb-5' onClick={handleShow}>Modifier Photo</Button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Changer de photo de profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>            
            {imgError && <Alert variant='danger'>{imgError}</Alert>}
            <Card style={{ width: '100%' }}>
                <input type='file' onChange={handleFileChange} />
                <Card.Body>
                    <Card.Img variant="top" src={imgSrc} />
                </Card.Body>
            </Card>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>X</Button>
          <Button onClick={updatPhoto}>Changer</Button>
          </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProfileModal;
