import React, { useEffect, useRef, useState } from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import supabase from '../../config/dbConfig';
import Cropper from 'react-easy-crop';

const EditRelative = ({relative}) => {
    const inputRef = useRef();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [picture, setPicture] = useState(null);
    const [crop, setCrop] = useState({x:0, y:0});
    const [zoom, setZoom] = useState(1);
    const [croppedArea, setCroppedArea] = useState(null);
    const [aspectRatio, setAspectratio] = useState(1/1);
    const [pictureAfter, setPictureAfter] = useState('');
    const [currentPage, setCurrentPage] = useState('choose-img');
    const [nomfamille, setNomfamille] = useState('');
    const [prenomfamille, setPrenomfamille] = useState('');
    const [datenaissance, setDatenaissance] = useState('');
    const [lieunaissance, setLieunaissance] = useState('');
    const [genre, setGenre] = useState('');
    const [pays, setPays] = useState('');
    const [relation, setRelation] = useState('');
    const [formError, setFormError] = useState();

    // const [photo, setPhoto] = useState('');
    // const [profilePhoto, setProfilePhoto] = useState();
    // const [userData, setUserData] = useState('');
    // const [imgSrc, setImgSrc] = useState('');
    // const [formData, setFormData] = useState({
    //     nomfamille:"",
    //     prenomfamille:"",
    //     datenaissance:"",
    //     lieunaissance:"",
    //     genre:"",
    //     pays:"",
    //     relation:"",
    //     photo:""
    // });
    // const handleOnChange = (e) => {
    //     const {name,value} = e.target;
    //     setFormData({...formData, [name]:value});
    // }

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
    
    const onAspectRatioChange = (e) => {
        setAspectratio(e.target.value);
    }

    const handlSubmit = async (e) => {
      console.log(nomfamille);
      console.log(prenomfamille);
      console.log(datenaissance);
      console.log(lieunaissance);
      console.log(genre);
      console.log(pays);
      console.log(relation);
      console.log(pictureAfter);

        e.preventDefault();

        if(!nomfamille || !prenomfamille || !datenaissance || !lieunaissance || !genre || !pays || !relation || !pictureAfter){
            setFormError("Tous les champs sont obligatoires.");
            return;
        }

        try{
            const {data, error} = await supabase
            .from('dvrelatives')
            .update({
                nomdefamille:nomfamille,
                prenomsdefamille:prenomfamille,
                datedenaissance:datenaissance,
                lieudenaissance:lieunaissance,
                genresexe:genre,
                paysdenaissance:pays,
                relationship:relation,
                photoidentite:pictureAfter
            })
            .eq('id', relative.id)
            .select();

            if(error){
                throw new Error(error.message);
            }
        setShow(false);
        }
        catch(error){
            console.log(error.message);
        }
    }

  return (
    <>
      <Button variant="btn btn-sm btn-outline-warning" onClick={handleShow}><i className="bi bi-pencil-square" style={{fontWeight: "900", paddingRight: "5px"}}></i>Modifier</Button>

      <Modal centered size="xl" show={show} onHide={handleClose}>
        {/* <Modal.Header closeButton>
          <Modal.Title>Nouveau Protégé de {adherent.nomdefamille}</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <Form>
            <div className="row g-3">
                <div className='col-md-5'>
                    {currentPage === "choose-img" ? (
                        <div className='d-flex flex-wrap justify-content-center croppedimg' onClick={choosePicture}>
                            <img src={relative.photoidentite} alt='Defaut' className='mb-3' />
                            <input type='file' accept='image/*' ref={inputRef} onChange={uploadpicture} style={{display:"none"}} />
                            <button className='btn btn-warning' onClick={choosePicture}>Choissir la photo</button>
                        </div>
                    ):(
                        currentPage === "crop-img" ? (
                        <>
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
                                    <button className='btn btn-danger' onClick={onCropCancel}> Annuler </button>
                                    <button className='btn btn-success' onClick={() => onCropDone(croppedArea)}> Appliquer </button>
                                </div>
                        </>
                        ):(
                        <>
                            <div className='croppedimg d-flex flex-wrap justify-content-center' onClick={choosePicture}>
                                {pictureAfter !== '' && <img src={pictureAfter} className='cropped-img' />}
                                <input type='file' accept='image/*' ref={inputRef} onChange={uploadpicture} style={{display:"none"}} />
                                <button className='btn btn-warning mt-3' onClick={choosePicture}> Changer la photo </button>
                            </div>
                        </>
                        )
                    )}
                </div>
                <div className='col-md-7'>
                    <div className='row g-3'>
                        <Modal.Title>Informations Generales</Modal.Title>
                        <div className="col-md-5">
                            <label htmlFor="nomfamille" className="form-label"> Nom : </label>
                            <input type="text" className="form-control" name='nomfamille' id="nomfamille" defaultValue={relative.nomdefamille} onChange={(e) => setNomfamille(e.target.value)} required />
                            <div className="invalid-feedback">
                                Un nom de famille est requis.
                            </div>
                        </div>
            
                        <div className="col-md-7">
                            <label htmlFor="prenomfamille" className="form-label"> Prénoms : </label>
                            <input type="text" className="form-control" name='prenomfamille' id="prenomfamille" defaultValue={relative.prenomsdefamille} onChange={(e) => setPrenomfamille(e.target.value)} required />
                            <div className="invalid-feedback">
                                Un prenom valide est requis.
                            </div>
                        </div>
            
                        <div className="col-md-5">
                            <label htmlFor="lnaissance" className="form-label"> Genre (Sexe) : </label><br/>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="genre" id="homme" value="Homme" defaultChecked={relative.genresexe === 'Homme'} onChange={(e) => setGenre(e.target.value)} />
                                    <label className="form-check-label" htmlFor="homme"> Homme </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="genre" id="femme" value="Femme" defaultChecked={relative.genresexe === 'Femme'} onChange={(e) => setGenre(e.target.value)} />
                                    <label className="form-check-label" htmlFor="femme"> Femme </label>
                                </div>
                        </div>
            
                        <div className="col-md-7">
                            <label htmlFor="dnaissance" className="form-label"> Date de naissance : </label>
                            <div className="input-group has-validation">
                                {/*<span className="input-group-text">@</span>*/}
                                <input type="date" className="form-control" name='datenaissance' id="datenaissance" defaultValue={relative.datedenaissance} onChange={(e) => setDatenaissance(e.target.value)} required />
                                <div className="invalid-feedback">
                                    La date de naissance est obligatoire.
                                </div>
                            </div>
                        </div>
            
                        <div className="col-md-6">
                            <label htmlFor="lieunaissance" className="form-label"> Lieu de naissance : </label>
                            <div className="input-group has-validation">
                                <input type="text" className="form-control" name='lieunaissance' id="lieunaissance" defaultValue={relative.lieudenaissance} onChange={(e) => setLieunaissance(e.target.value)} required />
                                <div className="invalid-feedback">
                                    Le lieu de naissance est obligatoire.
                                </div>
                            </div>
                        </div>
            
                        <div className="col-md-6">
                            <label htmlFor="pays" className="form-label"> Pays de naissance : </label>
                            <input type="text" className="form-control" name='pays' id="pays" defaultValue={relative.paysdenaissance} onChange={(e) => setPays(e.target.value)} />
                        </div>
            
                        <div className="col-md-6">
                            <label htmlFor="relation" className="form-label"> Relation </label>
                            <select className="form-select" aria-label="Relation" name='relation' onChange={(e) => setRelation(e.target.value)}>
                                <option defaultValue={relative.relationship}> {relative.relationship} </option>
                                <option value="Enfant biologique"> Enfant biologique </option>
                                <option value="Enfant adopté"> Enfant adopté </option>
                                <option value="Beaux-enfants"> Beaux-enfants</option>
                                <option value="Epoux(se)"> Epoux(se) </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Annuler</Button>
          <Button variant="primary" onClick={handlSubmit}>Mettre A Jour</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditRelative;
