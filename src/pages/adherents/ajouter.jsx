import React, {useState, useEffect} from 'react';
import supabase from '../../config/dbConfig';
import { useAuth }  from '../../config/userContext';
import {Link, useNavigate} from 'react-router-dom';
import { Alert } from 'react-bootstrap';

import Footer from '/src/footer';
import Header from '/src/header';

const AjoutAdherent = () => {
    const { user, handleGoBack } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        numdvlottery:"",
        numdossier:"",
        nomfamille:"",
        prenomfamille:"",
        datenaissance:"",
        lieunaissance:"",
        genre:"",
        pays:"",
        email:"",
        adresse:"",
        paysresidence:"",
        villeresidence:"",
        quartier:"",
        telephone:"",
        telephone1:"",
        photo:"",
        niveauscolaire:"",
        statutmarital:"",
        nombrelative:""
    });
    const [formError, setFormError] = useState();
    const [profilePhoto, setProfilePhoto] = useState();

    const [numDossier, setNumDossier] = useState(0);
    useEffect(() => {
        const NumDossierAleatoire = () => {
            return Math.floor(Math.random() * (99990 - 1 + 1)) + 1;
        }
        setNumDossier(NumDossierAleatoire());
    }, []);
    const enrolDossier = new Date().getFullYear()+'GC'+numDossier;
    // const enrolDossier = new Date().getFullYear()+'GC'+Math.floor(Math.random() (99999 - 1 + 1)) + 1;

    const handleOnChange = (e) => {
        const {name,value,files} = e.target;
        setFormData({...formData, [name]:value});
        if(files){
            setProfilePhoto(URL.createObjectURL(files[0]));
        }
    }

    const handleSubmit = async (e) => {
        console.log(formData);
        // console.dir(enrolDossier);
        e.preventDefault(); 
        // const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%^&*()_+-=[]{};':"|\\,.<>/?]).{8,}$/i;

        if(!formData.nomfamille || !formData.prenomfamille || !formData.datenaissance || !formData.lieunaissance || !formData.genre || !formData.pays || !formData.email || !formData.adresse || !formData.paysresidence || !formData.villeresidence || !formData.quartier || !formData.telephone || !formData.niveauscolaire || !formData.statutmarital){
            setFormError("Tous les champs sont obligatoires.");
            return;
        }
        if(!emailRegex.test(formData.email)){
            setFormError("Erreur de format email.");
            return;
        }
        // if(phoneRegex.test(formData.telephone)){
        if(!(formData.telephone.match('[0-9]{10}')) ){
            setFormError("Le numero de telephone doit contenir 10 caracteres.");
            return;
       }

       try{
        const { data, error } = await supabase
        .from('dvenrollment')
        .insert({
            agent_id:user?.id,
            numerodvlottery:null,
            numerodossier:enrolDossier,
            nomdefamille:formData.nomfamille,
            prenomdefamille:formData.prenomfamille,
            datedenaissance:formData.datenaissance,
            lieudenaissance:formData.lieunaissance,
            genresexe:formData.genre,
            paysdenaissance:formData.pays,
            adresseemail:formData.email,
            adressepostal:formData.adresse,
            paysderesidence:formData.paysresidence,
            villederesidence:formData.villeresidence,
            quartierderesidence:formData.quartier,
            telephoneprimaire:formData.telephone,
            telephonesecondaire:formData.telephone1,
            photoidentite:formData.photo,
            niveauscolaire:formData.niveauscolaire,
            etatmatrimoniale:formData.statutmarital,
            nombredeprotege:formData.nombrelative
        })
        .select();

        console.log(data);
        console.log(user?.id);
  
        if(!error){
            setFormError(null);
            navigate('/');
        }
      }catch (error){
        setFormError(error.message);
      }

    }


  return (
    <>
    <Header />
        <div className="container-xl p-5">
            <div className="container-fluid">
            <h1 className="page-title"> Nouveau Adhérent  </h1>
            <button onClick={handleGoBack}>Go Back</button>
            <div className="col-md-12 col-lg-12">

                {formError && <Alert className="alert alert-danger">{formError}</Alert>}
                    <form onSubmit={handleSubmit}>

                        <div className='row mb-3'>
                            <div className="col-md-6">
                                <label htmlFor="numdossier" className="form-label"> Numero de Dossier : </label>
                                <input type="text" className="form-control" name="numdossier" id="numdossier" value={enrolDossier} onChange={handleOnChange} disabled />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="numdvlottery" className="form-label"> Numero DV Lottery : </label>
                                <input type="text" className="form-control" name="numdvlottery" id="numdvlottery" value="" placeholder="Numero de confirmation DV Lottery" disabled />
                            </div>
                        </div>

                        <div className="row g-3">
                            <div className="col-md-5">
                                <label htmlFor="nomfamille" className="form-label"> Nom : </label>
                                <input type="text" className="form-control" name="nomfamille" id="nomfamille" placeholder="Komenan" onChange={handleOnChange} required />
                                <div className="invalid-feedback">Le nom de famille est requis.</div>
                            </div>
                
                            <div className="col-md-7">
                                <label htmlFor="prenomfamille" className="form-label"> Prénoms : </label>
                                <input type="text" className="form-control" name="prenomfamille" id="prenomfamille" placeholder="Gramboute Achi Franck" onChange={handleOnChange} required />
                                <div className="invalid-feedback">Le prénom valide est requis.</div>
                            </div>
                
                            <div className="col-md-3">
                                <label htmlFor="datenaissance" className="form-label"> Date de naissance : </label>
                                <div className="input-group has-validation">
                                    {/*<span className="input-group-text">@</span>*/}
                                    <input type="date" className="form-control" name="datenaissance" id="datenaissance" onChange={handleOnChange} required />
                                    <div className="invalid-feedback">La date de naissance est obligatoire.</div>
                                </div>
                            </div>
                
                            <div className="col-md-6">
                                <label htmlFor="lieunaissance" className="form-label"> Lieu de naissance : </label>
                                <div className="input-group has-validation">
                                    <input type="text" className="form-control" name="lieunaissance" id="lieunaissance" placeholder="Ville/Village/Commune de naissance" onChange={handleOnChange} required />
                                    <div className="invalid-feedback">Le lieu de naissance est obligatoire.</div>
                                </div>
                            </div>
                
                            <div className="col-md-3">
                                <label className="form-label"> Genre (Sexe) : <br/>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="genre" id="homme" value="homme" onChange={handleOnChange} required />
                                    <label className="form-check-label" htmlFor="homme"> Homme </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="genre" id="femme" value="femme" onChange={handleOnChange} required />
                                    <label className="form-check-label" htmlFor="femme"> Femme </label>
                                </div>
                                </label>
                            </div>
                
                            <div className="col-md-6">
                                <label htmlFor="pays" className="form-label"> Pays de naissance : <span className="text-body-secondary"></span></label>
                                <input type="text" className="form-control" name="pays" id="pays" placeholder="Pays de naissance" onChange={handleOnChange} />
                            </div>
                
                            <div className="col-md-6">
                                <label htmlFor="email" className="form-label">Email <span className="text-body-secondary"></span></label>
                                <input type="email" className="form-control" name="email" id="email" placeholder="monadresse@email.com" onChange={handleOnChange} autoComplete="off" />
                                <div className="invalid-feedback">L'adresse e-mail est obligatoire.</div>
                                {/*{formError.email && <p>Ajouter une adresse email valide</p>} */}
                            </div>
                
                            <div className="col-md-12">
                                <label htmlFor="adresse" className="form-label"> Adresse : </label>
                                <input type="text" className="form-control" name="adresse" id="adresse" placeholder="01 bp 1010 Abidjan 05" onChange={handleOnChange} required />
                                <div className="invalid-feedback">Une adresse postale est requise.</div>
                            </div>
                
                            <div className="col-md-5">
                                <label htmlFor="paysresidence" className="form-label"> Pays de résidence : </label>
                                <input type="text" className="form-control" name="paysresidence" id="paysresidence" placeholder="Pays d'habitation" onChange={handleOnChange} />
                                <div className="invalid-feedback">Champ obligatoire.</div>
                            </div>
                
                            <div className="col-md-4">
                                <label htmlFor="villeresidence" className="form-label"> Ville de résidence : </label>
                                <input type="text" className="form-control" name="villeresidence" id="villeresidence" placeholder="Ville d'habitation" onChange={handleOnChange} />
                                <div className="invalid-feedback">Champ obligatoire.</div>
                            </div>
                
                            <div className="col-md-3">
                                <label htmlFor="quartier" className="form-label"> Quartier : </label>
                                <input type="text" className="form-control" name="quartier" id="quartier" placeholder="Quartier d'habitation" onChange={handleOnChange} required />
                                <div className="invalid-feedback">Champ obligatoire.</div>
                            </div>
                
                            <div className="col-md-4">
                                <label htmlFor="telephone" className="form-label"> Numéro de téléphone : </label>
                                <input type="tel" className="form-control" name="telephone" id="telephone" placeholder="Contact téléphonique principal" maxLength="10" onChange={handleOnChange} />
                                <div className="invalid-feedback">Champ obligatoire.</div>
                            </div>
                
                            <div className="col-md-4">
                                <label htmlFor="telephone1" className="form-label"> Numéro de téléphone : <span className="text-body-secondary">(Optionel)</span></label>
                                <input type="tel" className="form-control" name="telephone1" id="telephone1" placeholder="Contact téléphonique secondaire" maxLength="10" onChange={handleOnChange} />
                                <div className="invalid-feedback">Champ obligatoire.</div>
                            </div>
                
                            <div className="col-md-4">
                                <label htmlFor="photo" className="form-label"> Photo : </label>
                                <input type="file" className="form-control" name="photo" id="photo" placeholder="Image" onChange={handleOnChange} />
                                <small> Telecharger la photo </small>
                            </div>
                            <div className="col-md-12 mt-2 d-flex justify-content-center">
                                {profilePhoto &&
                                    <div className="pprofile"><img src={profilePhoto} alt='' className='preview' /></div>
                                }
                            </div>
                        </div>
            
                        <hr className="my-4" />

                        <div className="row">
                            <div className="col-md-6">
                                <h4 className=""> Etudes et Diplômes </h4>
                                <div className="">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="niveauscolaire" id="primaire" value="Ecole Primaire" onChange={handleOnChange} />
                                        <label className="form-check-label" htmlFor="primaire"> Ecole Primaire </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="niveauscolaire" id="collegesansdiplome" value="Collège - Aucun diplôme" onChange={handleOnChange} />
                                        <label className="form-check-label" htmlFor="collegesansdiplome"> Collège - Aucun diplôme </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="niveauscolaire" id="collegeavecdiplome" value="Collège - Diplômé" onChange={handleOnChange} />
                                        <label className="form-check-label" htmlFor="collegeavecdiplome"> Collège - Diplômé </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="niveauscolaire" id="ecoleprof" value="Ecole Professionnelle" onChange={handleOnChange} />
                                        <label className="form-check-label" htmlFor="ecoleprof"> Ecole Professionnelle </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="niveauscolaire" id="coursuniversitaire" value="Cours Universitaire" onChange={handleOnChange} />
                                        <label className="form-check-label" htmlFor="coursuniversitaire"> Cours Universitaires </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="niveauscolaire" id="diplomeuniversitaire" value="Diplôme Universitaire" onChange={handleOnChange} />
                                        <label className="form-check-label" htmlFor="diplomeuniversitaire"> Diplôme Universitaire </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="niveauscolaire" id="superieur" value="Cours de Niveau Supérieur" onChange={handleOnChange} />
                                        <label className="form-check-label" htmlFor="superieur"> Cours de Niveau Supérieur </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="niveauscolaire" id="maitrise" value="Maîtrise" onChange={handleOnChange} />
                                        <label className="form-check-label" htmlFor="maitrise"> Maîtrise </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="niveauscolaire" id="nivdoctorat" value="Cours de Niveau Doctorat" onChange={handleOnChange} />
                                        <label className="form-check-label" htmlFor="nivdoctorat"> Cours de Niveau Doctorat </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="niveauscolaire" id="doctorat" value="Doctorat" onChange={handleOnChange} />
                                        <label className="form-check-label" htmlFor="doctorat"> Doctorat </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="niveauscolaire" id="deuxansexperience" value="Travailleur qualifié dans un métier qui nécessite au moins deux (2) ans de formation ou d'expérience" onChange={handleOnChange} />
                                        <label className="form-check-label" htmlFor="deuxansexperience"> Travailleur qualifié dans un métier qui nécessite au moins deux (2) ans de formation ou d'expérience </label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <h4 className=""> Situation Matrimoniale </h4>
                                <div className="">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="statutmarital" id="celibataire" value="Célibataire" onChange={handleOnChange} />
                                        <label className="form-check-label" htmlFor="celibataire"> Célibataire </label>
                                    </div>
                                    <div className="form-check">
                                        <div>
                                            <input className="form-check-input" type="radio" name="statutmarital" id="marieenus" value="Marié(e)" onChange={handleOnChange} />
                                        <label className="form-check-label" htmlFor="marieenus"> Marié(e) </label>
                                        </div>
                                        <small className=""> Epoux(se) n'est pas citoyen Americain ou résident permanent légal </small>
                                    </div>
                                    <div className="form-check">
                                        <div>
                                            <input className="form-check-input" type="radio" name="statutmarital" id="marieeus" value="Marié(e)-US" onChange={handleOnChange} />
                                            <label className="form-check-label" htmlFor="marieeus"> Marié(e) </label>
                                        </div>
                                        <small className=""> Epoux(se) est citoyen Americain ou résident permanent légal </small>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="statutmarital" id="divorce" value="Divorcé(e)" onChange={handleOnChange} />
                                        <label className="form-check-label" htmlFor="divorce"> Divorcé(e) </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="statutmarital" id="veufve" value="Veuf/Veuve" onChange={handleOnChange} />
                                        <label className="form-check-label" htmlFor="veufve"> Veuf/Veuve </label>
                                    </div>
                                    <div className="form-check">
                                        <div>
                                            <input className="form-check-input" type="radio" name="statutmarital" id="separee" value="Séparés Légalement" onChange={handleOnChange} />
                                        <label className="form-check-label" htmlFor="separee"> Séparés Légalement </label>
                                        </div>
                                        <small className=""> La séparation légale est un arrangement lorsqu'un couple reste marié mais vit séparé, suite à une décision de justice. </small>
                                    </div>
                                </div>
                            </div>
                
                            <hr className="my-4" />
                            <div className="col-md-12">
                                <label htmlFor="nombrelative" className="form-label"> Nombre de protégé(s) : <span className="text-body-primary">(Optionel)</span></label>
                                <input type="text" className="form-control" name="nombrelative" id="nombrelative" placeholder="Mettre 0 s'il n'y a personne" onChange={handleOnChange} />
                            </div>
                        </div>
                        
                        <hr className="my-4" />                
                        <button className="w-30 btn btn-primary btn-lg" type="submit" onClick={handleSubmit}> Enregistrer </button>
                    </form>
                </div>
            </div>
        </div>
    <Footer />
    </>
  )
}

export default AjoutAdherent;
