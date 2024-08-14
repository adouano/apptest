import React, { useEffect, useRef, useState } from 'react';
import {Button, Modal, Card, Alert} from 'react-bootstrap';
import Cropper from 'react-easy-crop';

const PhotoResizer = ({selectedPicture, currentPage, setCurrentPage, pictureAfter, setPictureAfter, picture, setPicture}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [imgSrc, setImgSrc] = useState(null);
  const [adhPict, setAdhPict] = useState(null);
  const [imgError, setImgError] = useState('');
  const [crop, setCrop] = useState({x:0, y:0});
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [aspectRatio, setAspectratio] = useState(1/1);
  // const [picture, setPicture] = useState(null);
  const inputRef = useRef();

  // const handleFileChange = (e) => {
  //   const file = e.target.files?.[0];
  //   const imgType = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  //   if(!file){
  //       setImgError("Veuillez choisir une image...");
  //       return;
  //   }
  //   if(!imgType.includes(file.type)){
  //       setImgError("Extension d'image invalide");
  //       return;
  //   } 
  //   const reader = new FileReader();
  //   reader.addEventListener('load', () => {
  //       const imageUrl = reader.result?.toString() || '' ;
  //       setImgSrc(imageUrl);
  //   });
  //   reader.readAsDataURL(file);
  // }

  // const uploadpicture = (e) => {
  //   if(e.target.files && e.target.files.length > 0){
  //       const reader = new FileReader();
  //       reader.readAsDataURL(e.target.files[0]);
  //       reader.onload = function (e){
  //           selectedPicture(reader.result);
  //       }
  //   }
  // }


//   const selectedPicture = (selectPict) => {
//     setPicture(selectPict);
//     setCurrentPage('crop-img');
// }

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

const choosePicture = () => {
    inputRef.current.click();
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

  useEffect(() => {
    const interval = setTimeout(() => setImgError(""), 5000);
    return () => clearTimeout(interval);
  }, [imgError]);

  const updatPhoto = () => {}
  return (
    <>
      <Button variant='btn btn-outline-warning text-body m-auto rounded-3 p-2 mb-5' onClick={(handleShow)}>Ajouter Photo</Button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {imgError && <Alert variant='danger'>{imgError}</Alert>}
          <div className='col-md-12'>
            {currentPage === "choose-img" ? (
              <div className='d-flex flex-wrap justify-content-center croppedimg' onClick={choosePicture}>
                {/* {picture ? (
                    <img variant="top" src={picture} className='mb-3' />
                ):(
                    <img src='/src/assets/default-picture.jpg' alt='Defaut' className='mb-3' />
                )} */}
                <img src='/src/assets/default-picture.jpg' alt='Defaut' className='mb-3' />
                <input type='file' accept='image/*' ref={inputRef} onChange={uploadpicture} style={{display:"none"}} />
                <button className='btn btn-warning' onClick={choosePicture}>Choissir la photo</button>
              </div>
            ):(
                currentPage === "crop-img" ? (
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

                        <div className="btn-container controls">
                            <button className='btn btn-danger' onClick={onCropCancel}> Annuler </button>
                            <button className='btn btn-success' onClick={() => onCropDone(croppedArea)}> Appliquer </button>
                        </div>
                    </div>
                </>
                ):(
                <>
                    <div className='croppedimg d-flex flex-wrap justify-content-center' onClick={choosePicture}>
                        <img src={pictureAfter} className='cropped-img' />
                        <input type='file' accept='image/*' ref={inputRef} onChange={uploadpicture} style={{display:"none"}} />
                        <button className='btn btn-warning mt-3' onClick={choosePicture}>Changer la photo</button>
                    </div>
                </>
                )
            )}
          </div>


          



          {/* <Card style={{ width: '100%' }}>
            <Card.Body onClick={choosePicture}>
              {imgSrc ? (
                <Card.Img variant="top" src={imgSrc} className='mb-3' />
              ):(
                <Card.Img src='/src/assets/default-picture.jpg' alt='Defaut' className='mb-3' />
              )}
              <input type='file' accept='image/*' ref={inputRef} onChange={uploadpicture} style={{display:"none"}} />
              <Button onClick={choosePicture}>Choissir l'image</Button>
            </Card.Body>
          </Card> */}


        </Modal.Body>

        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>X</Button>
          <Button onClick={updatPhoto}> Ajouter </Button>
        </Modal.Footer> */}
        
      </Modal>
    </>
  );
}

export default PhotoResizer;
