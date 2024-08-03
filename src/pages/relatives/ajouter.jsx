import React, { useEffect, useState } from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import supabase from '../../config/dbConfig';

const AjoutRelative = ({adherent}) => {
    const [show, setShow] = useState(false);  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
        relation:"",
        photo:""
    });

    const handleOnChange = (e) => {
        const {name,value,files} = e.target;
        setFormData({...formData, [name]:value});

        const file = e.target.files?.[0];
        const imgType = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if(file){
            if(!imgType.includes(file.type)){
                setFormError("Extension d'image invalide");
                return;
            } 
        }
        if(files){
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                const imageUrl = reader.result?.toString() || '' ;
                setImgSrc(imageUrl);
            });
            reader.readAsDataURL(file);
            setProfilePhoto(URL.createObjectURL(files[0]));
        }        
    }

    const handlSubmit = async (e) => {
        e.preventDefault();

        if(!formData.nomfamille || !formData.prenomfamille || !formData.datenaissance || !formData.lieunaissance || !formData.genre || !formData.pays || !formData.relation || !formData.photo){
            setFormError("Tous les champs sont obligatoires.");
            return;
        }

        try{
            const {data, error} = await supabase
            .from('dvrelatives')
            .insert({
                id_associate:adherent?.agent_id,
                id_adherent:adherent?.id,
                num_dossier:adherent?.numerodossier,
                nomdefamille:formData.nomfamille,
                prenomsdefamille:formData.prenomfamille,
                datedenaissance:formData.datenaissance,
                lieudenaissance:formData.lieunaissance,
                genresexe:formData.genre,
                paysdenaissance:formData.pays,
                relationship:formData.relation,
                photoidentite:imgSrc,
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

      <Modal centered size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nouveau Protégé de {adherent.nomdefamille}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row g-3">
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
    
                <div className="col-md-3">
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
    
                <div className="col-md-3">
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
    
                <div className="col-md-5">
                    <label htmlFor="pays" className="form-label"> Pays de naissance : </label>
                    <input type="text" className="form-control" name='pays' id="pays" placeholder="Pays de naissance" onChange={handleOnChange} />
                </div>
    
                <div className="col-md-3">
                    <label htmlFor="relation" className="form-label"> Relation </label>
                    <select className="form-select" aria-label="Relation" name='relation' onChange={handleOnChange}>
                        <option value=""> choix de relation </option>
                        <option value="Enfant biologique"> Enfant biologique </option>
                        <option value="Enfant adopté"> Enfant adopté </option>
                        <option value="Beaux-enfants"> Beaux-enfants</option>
                        <option value="Epoux(se)"> Epoux(se) </option>
                    </select>
                </div>

                <div className="col-md-4">
                    <label htmlFor="photo" className="form-label"> Photo : </label>
                    <input type="file" className="form-control" name="photo" id="photo" placeholder="Photo d'identite" onChange={handleOnChange} />
                    <small> Telecharger la photo </small>
                </div>
                <div className="col-md-12 mt-2 d-flex justify-content-center">
                    {profilePhoto &&
                        <div className="pprofile"><img src={profilePhoto} alt='' className='preview' /></div>
                    }
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
