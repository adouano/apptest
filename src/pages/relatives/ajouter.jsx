import React, { useEffect, useRef, useState } from 'react';
import {Alert, Button, Form, Modal} from 'react-bootstrap';
import supabase from '../../config/dbConfig';
import Cropper from 'react-easy-crop';

const AjoutRelative = ({adherent}) => {
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

    const [formError, setFormError] = useState();
    const [profilePhoto, setProfilePhoto] = useState();
    const [userData, setUserData] = useState('');
    const [imgSrc, setImgSrc] = useState('');
    const [formData, setFormData] = useState({
        nomfamille:"",
        prenomfamille:"",
        datenaissance:"",
        lieunaissance:"",
        genre:"",
        pays:"",
        relation:""
    });

    const handleOnChange = (e) => {
        const {name,value} = e.target;
        setFormData({...formData, [name]:value});
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

    // const handleOnChange = (e) => {
    //     const {name,value,files} = e.target;
    //     setFormData({...formData, [name]:value});

    //     const file = e.target.files?.[0];
    //     const imgType = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    //     if(file){
    //         if(!imgType.includes(file.type)){
    //             setFormError("Extension d'image invalide");
    //             return;
    //         } 
    //     }
    //     if(files){
    //         const reader = new FileReader();
    //         reader.addEventListener('load', () => {
    //             const imageUrl = reader.result?.toString() || '' ;
    //             setImgSrc(imageUrl);
    //         });
    //         reader.readAsDataURL(file);
    //         setProfilePhoto(URL.createObjectURL(files[0]));
    //     }        
    // }

    const handlSubmit = async (e) => {
        console.log(formData);
        e.preventDefault();

        if(!formData.nomfamille || !formData.prenomfamille || !formData.datenaissance || !formData.lieunaissance || !formData.genre || !formData.pays || !formData.relation || !pictureAfter){
            setFormError("Tous les champs sont obligatoires.");
            return;
        }

        try{
            const {data, error} = await supabase
            .from('dvrelatives')
            .insert({
                id_associate:adherent?.agent_id,
                adherent_id:adherent?.id,
                num_dossier:adherent?.numerodossier,
                nomdefamille:formData.nomfamille,
                prenomsdefamille:formData.prenomfamille,
                datedenaissance:formData.datenaissance,
                lieudenaissance:formData.lieunaissance,
                genresexe:formData.genre,
                paysdenaissance:formData.pays,
                relationship:formData.relation,
                photoidentite:pictureAfter,
                supp_intention: 'FALSE'
            })
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
      <Button variant="primary" onClick={handleShow}><i className="bi-person-plus-fill" style={{fontWeight: "900", paddingRight: "5px"}}></i>Ajouter Protégé</Button>

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
                            <img src='/src/assets/default-picture.jpg' alt='Defaut' className='mb-3' />
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
                        <Modal.Title>Nouveau Protégé de {adherent.nomdefamille}</Modal.Title>
                    {formError && <Alert className="alert alert-danger">{formError}</Alert>}

                        <div className="col-md-5">
                            <label htmlFor="nomfamille" className="form-label"> Nom : </label>
                            <input type="text" className="form-control" name='nomfamille' id="nomfamille" placeholder="Komenan" onChange={handleOnChange} required />
                            <div className="invalid-feedback">
                                Un nom de famille est requis.
                            </div>
                        </div>
            
                        <div className="col-md-7">
                            <label htmlFor="prenomfamille" className="form-label"> Prénoms : </label>
                            <input type="text" className="form-control" name='prenomfamille' id="prenomfamille" placeholder="Gramboute Achi Franck" onChange={handleOnChange} required />
                            <div className="invalid-feedback">
                                Un prenom valide est requis.
                            </div>
                        </div>
            
                        <div className="col-md-5">
                            <label htmlFor="lnaissance" className="form-label"> Genre (Sexe) : </label><br/>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="genre" id="homme" value="Homme" onChange={handleOnChange} required />
                                <label className="form-check-label" htmlFor="homme"> Homme </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="genre" id="femme" value="Femme" onChange={handleOnChange} required />
                                <label className="form-check-label" htmlFor="femme"> Femme </label>
                            </div>
                        </div>
            
                        <div className="col-md-7">
                            <label htmlFor="dnaissance" className="form-label"> Date de naissance : </label>
                            <div className="input-group has-validation">
                                {/*<span className="input-group-text">@</span>*/}
                                <input type="date" className="form-control" name='datenaissance' id="datenaissance" onChange={handleOnChange} required />
                                <div className="invalid-feedback">
                                    La date de naissance est obligatoire.
                                </div>
                            </div>
                        </div>
            
                        <div className="col-md-6">
                            <label htmlFor="lieunaissance" className="form-label"> Lieu de naissance : </label>
                            <div className="input-group has-validation">
                                <input type="text" className="form-control" name='lieunaissance' id="lieunaissance" placeholder="Ville/Village/Commune de naissance" onChange={handleOnChange} required />
                                <div className="invalid-feedback">
                                    Le lieu de naissance est obligatoire.
                                </div>
                            </div>
                        </div>
            
                        <div className="col-md-6">
                            <label htmlFor="pays" className="form-label"> Pays de naissance : </label>
                            <input type="text" className="form-control" name='pays' id="pays" placeholder="Pays de naissance" onChange={handleOnChange} />
                        </div>
            
                        <div className="col-md-6">
                            <label htmlFor="relation" className="form-label"> Relation </label>
                            <select className="form-select" aria-label="Relation" name='relation' onChange={handleOnChange}>
                                <option value=""> choix de relation </option>
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
          <Button variant="primary" onClick={handlSubmit}>Enregistrer</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AjoutRelative;
