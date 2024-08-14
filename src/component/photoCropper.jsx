import React, { useRef, useState } from 'react';
import {Button, Modal, Card, Alert} from 'react-bootstrap';
import supabase from '../config/dbConfig';
import Cropper from 'react-easy-crop';

const PhotoCropper = ({adherent}) => {
  const [imgError, setImgError] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [picture, setPicture] = useState(null);
  const [crop, setCrop] = useState({x:0, y:0});
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [aspectRatio, setAspectratio] = useState(1/1);
  const [pictureAfter, setPictureAfter] = useState('');
  const [currentPage, setCurrentPage] = useState('choose-img');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const inputRef = useRef();
  const userId = adherent.id;

  const choosePicture = () => {
    inputRef.current.click()
  }

  const selectedPicture = (selectPict) => {
    setPicture(selectPict);
    setCurrentPage('crop-img');
  }

  const uploadpicture = (e) => {
    const file = e.target.files;
    if(file && file.length > 0){
      const reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = function (e){
        selectedPicture(reader.result);
      }
    }
  }

  const onCropDone = (imgCroppedArea) => {
    const canvasEle = document.createElement("canvas");
    canvasEle.width = 800;
    canvasEle.height = 800;
    const context = canvasEle.getContext("2d");

    let imageObj1 = new Image();
    imageObj1.src = picture;
    imageObj1.onload = function(){
      context.drawImage(
        imageObj1,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        800,
        800);

      const dataURL = canvasEle.toDataURL("image/jpeg");
      setPictureAfter(dataURL);
      setCurrentPage("cropped-img");
    }
  }

  const onCropCancel = () => {
      setCurrentPage("choose-img");
      setPicture("");
  }

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
      setCroppedArea(croppedAreaPixels);
  }
  
  const onAspectRatioChange = (e) => {
      setAspectratio(e.target.value);
  }

  // const handleFileChange = (e) => {
  //   const imgType = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  //   if(!file){
  //       setImgError("Veuillez choisir une image...");
  //       return;
  //   }
  //   if(!imgType.includes(file.type)){
  //       setImgError("Extension d'image invalide");
  //       return;
  //   } 
  //     const file = e.target.files?.[0];
  //     const reader = new FileReader();
  //     reader.addEventListener('load', () => {
  //         const imageUrl = reader.result?.toString() || '' ;
  //         setImgSrc(imageUrl);
  //     });
  //     reader.readAsDataURL(file);
  // }

  const applyPicture = async(e) => {
    e.preventDefault();
      try{
          await supabase
          .from('dvenrollment')
          .update({
            photoidentite: pictureAfter,
          })
          .eq("id", adherent.id)
          .select();

          window.location.reload();
      }
      catch(error){
          console.log(error.message);
      }
  }

  return (
    <>
      <Button variant='btn btn-outline-warning text-body m-auto' onClick={handleShow}>Modifier Photo</Button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Changer de photo de profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>            
            {imgError && <Alert variant='danger'>{imgError}</Alert>}
            <Card style={{ width: '100%' }}>
                <Card.Body>
                  {currentPage === "choose-img" ? (
                    <div className='d-flex flex-wrap gap-3 justify-content-center croppedimg'>
                      <img src={adherent.photoidentite} alt={adherent.numerodossier} style={{ width: '100%' }} onClick={choosePicture} />
                      <input type='file' accept='image/*' onChange={uploadpicture} ref={inputRef} style={{display:'none'}} />
                      <button className='btn btn-danger mt-3' onClick={handleClose}>Annuler</button>
                      <button className='btn btn-outline-warning mt-3' onClick={choosePicture}> Choisir la photo</button>
                    </div>
                  ):(currentPage === "crop-img" ? (
                    <>
                        <div className='row'>
                            <div className='cropper'>
                                <div className='crop-container'>
                                    <Cropper
                                        image={picture}
                                        aspect={aspectRatio}
                                        crop={crop}
                                        zoom={zoom}
                                        onCropChange={setCrop}
                                        onZoomChange={setZoom}
                                        onCropComplete={onCropComplete}
                                    />
                                </div>
                            </div>
                            <div className="btn-container controls gap-3 mt-3">
                                <button className='btn btn-outline-danger' onClick={onCropCancel}> Annuler </button>
                                <button className='btn btn-outline-success' onClick={() => onCropDone(croppedArea)}> Appliquer </button>
                            </div>
                        </div>
                    </>
                    ):(
                    <>
                        <div className='croppedimg d-flex flex-wrap gap-3 justify-content-center'>
                            <img src={pictureAfter} className='cropped-img' onClick={choosePicture} />
                            <input type='file' accept='image/*' ref={inputRef} onChange={uploadpicture} style={{display:"none"}} />
                            <button className='btn btn-danger mt-3' onClick={handleClose}>Annuler</button>
                            <button className='btn btn-warning mt-3' onClick={choosePicture}>Changer la photo</button>
                            <button className='btn btn-success mt-3' onClick={applyPicture}>Valider</button>
                        </div>
                    </>
                    )
                  )}
                  
                  
                    {/* <Card.Img variant="top" src={imgSrc} /> */}
                </Card.Body>
            </Card>
        </Modal.Body>

        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>X</Button>
          <Button onClick={updatPhoto}>Changer</Button>
          </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default PhotoCropper;
