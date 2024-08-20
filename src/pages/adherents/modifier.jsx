import React, { useEffect, useState } from 'react';
import {Button, Form, Modal} from 'react-bootstrap';
import supabase from '../../config/dbConfig';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../../footer';
import { useAuth } from '../../config/userContext';
import Header from '../../header';
import LoadingPage from '../../component/loading';

const EditAdherent = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const {user} = useAuth();
  const {personId} = useParams();
  const { handleGoBack } = useAuth();
  const [updata, setUpdata] = useState('');
  const [formError, setFormError] = useState(null);
  const [nomfamille, setNomfamille] = useState('');
  const [prenomfamille, setPrenomfamille] = useState('');
  const [datenaissance, setDatenaissance] = useState('');
  const [lieunaissance, setLieunaissance] = useState('');
  const [genre, setGenre] = useState('');
  const [pays, setPays] = useState('');
  const [email, setEmail] = useState('');
  const [adresse, setAdresse] = useState('');
  const [codepostal, setCodepostal] = useState('');
  const [paysresidence, setPaysresidence] = useState('');
  const [villeresidence, setVilleresidence] = useState('');
  const [quartier, setQuartier] = useState('');
  const [telephone, setTelephone] = useState('');
  const [telephone1, setTelephone1] = useState('');
  const [niveauscolaire, setNiveauscolaire] = useState('');
  const [statutmarital, setStatutmarital] = useState('');
  const [adherent, setAdherent] = useState('');
  const [fetchError, setFetchError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchPersons = async () => {
    try{
        const { data,error } = await supabase.from('dvenrollment').select().eq('id', personId).single();

        if(data){
            setNomfamille(data.nomdefamille);
            setPrenomfamille(data.prenomdefamille);
            setDatenaissance(data.datedenaissance);
            setLieunaissance(data.lieudenaissance);
            setGenre(data.genresexe);
            setPays(data.paysdenaissance);
            setEmail(data.adresseemail);
            setAdresse(data.adressepostal);
            setCodepostal(data.codepostal);
            setPaysresidence(data.paysderesidence);
            setVilleresidence(data.villederesidence);
            setQuartier(data.quartierderesidence);
            setTelephone(data.telephoneprimaire);
            setTelephone1(data.telephonesecondaire);
            setNiveauscolaire(data.niveauscolaire);
            setStatutmarital(data.etatmatrimoniale);
        }
        
        if(error){
            throw new Error(error.message);
        }
        setAdherent(data);
        setFetchError(null);
        setLoading(false);
    }
    catch(error){
        setFetchError(error.message);
        setAdherent(null);
    }
};

useEffect(() => {
    fetchPersons();
}, []);

  const changeNiveauScolaire = (e) => {
    setNiveauscolaire(e.target.value);
  }

  const changeStatutMarital = (e) => {
    setStatutmarital(e.target.value);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(!nomfamille || !prenomfamille || !datenaissance || !lieunaissance || !genre || !pays || !email || !adresse || !codepostal || !paysresidence || !villeresidence || !quartier || !telephone || !niveauscolaire || !statutmarital){
        setFormError("Tous les champs sont obligatoires.");
        return;
    }
    
    try{
        const { data,error } = await supabase
            .from('dvenrollment')
            .update({
                nomdefamille:nomfamille,
                prenomdefamille:prenomfamille,
                datedenaissance:datenaissance,
                lieudenaissance:lieunaissance,
                genresexe:genre,
                paysdenaissance:pays,
                adresseemail:email,
                adressepostal:adresse,
                codepostal:codepostal,
                paysderesidence:paysresidence,
                villederesidence:villeresidence,
                quartierderesidence:quartier,
                telephoneprimaire:telephone,
                telephonesecondaire:telephone1,
                niveauscolaire:niveauscolaire,
                etatmatrimoniale:statutmarital
            })
            .eq('id', adherent.id)
            .select();

        if(!error){
            await supabase
            .from('dvenrollogs')
            .insert({
                action:`Mise a jour`,
                note:`${user.email} a modifié les informations de ${prenomfamille} / ${email}...`
            });
            navigate(`/adherent/${adherent.id}/info`);
        }
    }
    catch(error){
        console.log(error.message);
    }
  }

  if(loading){
    return(<LoadingPage />);
    }else{

  return (
    <>
    <Header />
    <div className="container-xl pb-5 pt-5">
        <div className="container-fluid">
            <div className="d-flex justify-content-between gap-3 mb-2">
                <h2 className="page-title"> Mise a jours -/- {adherent.numerodossier}  </h2>
                <button className='float-end btn btn-dark' onClick={handleGoBack}><i className='bi-arrow-left-square'></i> Retour</button>
                {/* bloquer adherent lors d'Enregistrement a la DV */}
            </div>
            <div className="col-md-12 col-lg-12">

                {formError && <Alert className="alert alert-danger">{formError}</Alert>}
                <form>

                    <div className='row mb-3'>
                        <div className="col-md-4">
                            <label htmlFor="numdossier" className="form-label"> Numero de Dossier : </label>
                            <input type="text" className="form-control" name="numdossier" id="numdossier" defaultValue={adherent.numerodossier} disabled />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="numdvlottery" className="form-label"> Numero DV Lottery : </label>
                            <input type="text" className="form-control" name="numdvlottery" id="numdvlottery" defaultValue={adherent.numerodvlottery} placeholder="Numero de confirmation DV Lottery" disabled />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="enrollocation" className="form-label"> Bureau d'enrollement: </label>
                            <input type="text" className="form-control" name="enrollocation" id="enrollocation" defaultValue={adherent.centrenroll} disabled />
                        </div>
                    </div>

                    <div className="row g-3 mb-3">
                        <div className="col-md-5">
                            <label htmlFor="nomfamille" className="form-label"> Nom : </label>
                            <input type="text" className="form-control" name="nomfamille" id="nomfamille" defaultValue={nomfamille} onChange={(e) => setNomfamille(e.target.value)} required />
                            <div className="invalid-feedback">Le nom de famille est requis.</div>
                        </div>

                        <div className="col-md-7">
                            <label htmlFor="prenomfamille" className="form-label"> Prénoms : </label>
                            <input type="text" className="form-control" name="prenomfamille" id="prenomfamille" defaultValue={prenomfamille} onChange={(e) => setPrenomfamille(e.target.value)} required />
                            <div className="invalid-feedback">Le prénom valide est requis.</div>
                        </div>

                        <div className="col-md-3">
                            <label htmlFor="datenaissance" className="form-label"> Date de naissance : </label>
                            <div className="input-group has-validation">
                                {/*<span className="input-group-text">@</span>*/}
                                <input type="date" className="form-control" name="datenaissance" id="datenaissance" defaultValue={datenaissance} onChange={(e) => setDatenaissance(e.target.value)} required />
                                <div className="invalid-feedback">La date de naissance est obligatoire.</div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="lieunaissance" className="form-label"> Lieu de naissance : </label>
                            <div className="input-group has-validation">
                                <input type="text" className="form-control" name="lieunaissance" id="lieunaissance" defaultValue={lieunaissance} onChange={(e) => setLieunaissance(e.target.value)} required />
                                <div className="invalid-feedback">Le lieu de naissance est obligatoire.</div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label className="form-label"> Genre (Sexe) : <br/>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="genre" id="homme" value="Homme" checked={genre === 'Homme'} onChange={(e) => setGenre(e.target.value)} />
                                    <label className="form-check-label" htmlFor="homme"> Homme </label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="genre" id="femme" value="Femme" checked={genre === 'Femme'} onChange={(e) => setGenre(e.target.value)} />
                                    <label className="form-check-label" htmlFor="femme"> Femme </label>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className="row g-3">
                        <div className="col-md-6">
                            <label htmlFor="pays" className="form-label"> Pays de naissance : </label>
                            <input type="text" className="form-control" name="pays" id="pays" defaultValue={pays} onChange={(e) => setPays(e.target.value)} />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="email" className="form-label"> Email </label>
                            <input type="email" className="form-control" name="email" id="email" defaultValue={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" />
                            <div className="invalid-feedback">L'adresse e-mail est obligatoire.</div>
                            {/*{formError.email && <p>Ajouter une adresse email valide</p>} */}
                        </div>

                        <div className="col-md-8">
                            <label htmlFor="adresse" className="form-label"> Adresse : </label>
                            <input type="text" className="form-control" name="adresse" id="adresse" defaultValue={adresse} onChange={(e) => setAdresse(e.target.value)} required />
                            <div className="invalid-feedback">Une adresse postale est requise.</div>
                        </div>

                        <div className="col-md-4">
                            <label htmlFor="codepostal" className="form-label"> Code postal : </label>
                            <input type="number" className="form-control" name="codepostal" id="codepostal" maxLength="5" defaultValue={codepostal} onChange={(e) => setCodepostal(e.target.value)} required />
                            <div className="invalid-feedback">Le code postale est requise.</div>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="paysresidence" className="form-label"> Pays de résidence : </label>
                            <input type="text" className="form-control" name="paysresidence" id="paysresidence" defaultValue={paysresidence} onChange={(e) => setPaysresidence(e.target.value)} />
                            <div className="invalid-feedback">Champ obligatoire.</div>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="villeresidence" className="form-label"> Ville de résidence : </label>
                            <input type="text" className="form-control" name="villeresidence" id="villeresidence" defaultValue={villeresidence} onChange={(e) => setVilleresidence(e.target.value)} />
                            <div className="invalid-feedback">Champ obligatoire.</div>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="quartier" className="form-label"> Quartier : </label>
                            <input type="text" className="form-control" name="quartier" id="quartier" defaultValue={quartier} onChange={(e) => setQuartier(e.target.value)} required />
                            <div className="invalid-feedback">Champ obligatoire.</div>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="telephone" className="form-label"> Numéro de téléphone : </label>
                            <input type="tel" className="form-control" name="telephone" id="telephone" defaultValue={telephone} maxLength="10" onChange={(e) => setTelephone(e.target.value)} />
                            <div className="invalid-feedback">Champ obligatoire.</div>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="telephone1" className="form-label"> Numéro de téléphone : <span className="text-body-secondary">(Optionel)</span></label>
                            <input type="tel" className="form-control" name="telephone1" id="telephone1" defaultValue={telephone1} maxLength="10" onChange={(e) => setTelephone1(e.target.value)} />
                            <div className="invalid-feedback">Champ obligatoire.</div>
                        </div>
                    </div>

                    <hr className="my-4" />

                    <div className="row">
                        <div className="col-md-6">
                            <h4 className=""> Etudes et Diplômes </h4>
                            <div className="">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="niveauscolaire" id="primaire" value="Ecole Primaire" checked={niveauscolaire === "Ecole Primaire"} onChange={changeNiveauScolaire} />
                                    <label className="form-check-label" htmlFor="primaire"> Ecole Primaire </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="niveauscolaire" id="collegesansdiplome" value="Collège - Aucun diplôme" checked={niveauscolaire === "Collège - Aucun diplôme"} onChange={changeNiveauScolaire} />
                                    <label className="form-check-label" htmlFor="collegesansdiplome"> Collège - Aucun diplôme </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="niveauscolaire" id="collegeavecdiplome" value="Collège - Diplômé" checked={niveauscolaire === "Collège - Diplômé"} onChange={changeNiveauScolaire} />
                                    <label className="form-check-label" htmlFor="collegeavecdiplome"> Collège - Diplômé </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="niveauscolaire" id="ecoleprof" value="Ecole Professionnelle" checked={niveauscolaire === "Ecole Professionnelle"} onChange={changeNiveauScolaire} />
                                    <label className="form-check-label" htmlFor="ecoleprof"> Ecole Professionnelle </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="niveauscolaire" id="coursuniversitaire" value="Cours Universitaire" checked={niveauscolaire === "Cours Universitaire"} onChange={changeNiveauScolaire} />
                                    <label className="form-check-label" htmlFor="coursuniversitaire"> Cours Universitaires </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="niveauscolaire" id="diplomeuniversitaire" value="Diplôme Universitaire" checked={niveauscolaire === "Diplôme Universitaire"} onChange={changeNiveauScolaire} />
                                    <label className="form-check-label" htmlFor="diplomeuniversitaire"> Diplôme Universitaire </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="niveauscolaire" id="superieur" value="Cours de Niveau Supérieur" checked={niveauscolaire === "Cours de Niveau Supérieur"} onChange={changeNiveauScolaire} />
                                    <label className="form-check-label" htmlFor="superieur"> Cours de Niveau Supérieur </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="niveauscolaire" id="maitrise" value="Maîtrise" checked={niveauscolaire === "Maîtrise"} onChange={changeNiveauScolaire} />
                                    <label className="form-check-label" htmlFor="maitrise"> Maîtrise </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="niveauscolaire" id="nivdoctorat" value="Cours de Niveau Doctorat" checked={niveauscolaire === "Cours de Niveau Doctorat"} onChange={changeNiveauScolaire} />
                                    <label className="form-check-label" htmlFor="nivdoctorat"> Cours de Niveau Doctorat </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="niveauscolaire" id="doctorat" value="Doctorat" checked={niveauscolaire === "Doctorat"} onChange={changeNiveauScolaire} />
                                    <label className="form-check-label" htmlFor="doctorat"> Doctorat </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="niveauscolaire" id="deuxansexperience" value="Travailleur qualifié dans un métier qui nécessite au moins deux (2) ans de formation ou d'expérience" checked={niveauscolaire === "Travailleur qualifié dans un métier qui nécessite au moins deux (2) ans de formation ou d'expérience"} onChange={changeNiveauScolaire} />
                                    <label className="form-check-label" htmlFor="deuxansexperience"> Travailleur qualifié dans un métier qui nécessite au moins deux (2) ans de formation ou d'expérience </label>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <h4 className=""> Situation Matrimoniale </h4>
                            <div className="">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="statutmarital" id="celibataire" value="Célibataire" checked={statutmarital === "Célibataire"} onChange={changeStatutMarital} />
                                    <label className="form-check-label" htmlFor="celibataire"> Célibataire </label>
                                </div>
                                <div className="form-check">
                                    <div>
                                        <input className="form-check-input" type="radio" name="statutmarital" id="marieenus" value="Marié(e)" checked={statutmarital === "Marié(e)"} onChange={changeStatutMarital} />
                                    <label className="form-check-label" htmlFor="marieenus"> Marié(e) </label>
                                    </div>
                                    <small className=""> Epoux(se) n'est pas citoyen Americain ou résident permanent légal </small>
                                </div>
                                <div className="form-check">
                                    <div>
                                        <input className="form-check-input" type="radio" name="statutmarital" id="marieeus" value="Marié(e)-US" checked={statutmarital === "Marié(e)-US"} onChange={changeStatutMarital} />
                                        <label className="form-check-label" htmlFor="marieeus"> Marié(e) </label>
                                    </div>
                                    <small className=""> Epoux(se) est citoyen Americain ou résident permanent légal </small>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="statutmarital" id="divorce" value="Divorcé(e)" checked={statutmarital === "Divorcé(e)"} onChange={changeStatutMarital} />
                                    <label className="form-check-label" htmlFor="divorce"> Divorcé(e) </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="statutmarital" id="veufve" value="Veuf/Veuve" checked={statutmarital === "Veuf/Veuve"} onChange={changeStatutMarital} />
                                    <label className="form-check-label" htmlFor="veufve"> Veuf/Veuve </label>
                                </div>
                                <div className="form-check">
                                    <div>
                                        <input className="form-check-input" type="radio" name="statutmarital" id="separee" value="Séparés Légalement" checked={statutmarital === "Séparés Légalement"} onChange={changeStatutMarital} />
                                        <label className="form-check-label" htmlFor="separee"> Séparés Légalement </label>
                                    </div>
                                    <small className=""> La séparation légale est un arrangement lorsqu'un couple reste marié mais vit séparé, suite à une décision de justice. </small>
                                </div>
                            </div>
                        </div>

                        {/* <hr className="my-4" />
                        <div className="col-md-12">
                            <label htmlFor="nombrelative" className="form-label"> Nombre de protégé(s) : <span className="text-body-primary">(Optionel)</span></label>
                            <input type="text" className="form-control" name="nombrelative" id="nombrelative" value={adherent.nombredeprotege} onChange={(e) => setNomfamille(e.target.value)} />
                            <small className=""> Les enfants comprennent tous les enfants biologiques, les enfants légalement adoptés, et les beaux-enfants célibataires et âgés de moins de 21 ans à la date d'inscription. 
                                Tous les enfants éligibles doivent etre inclus, même s'ils ne vivent pas avec vous ou s'ils n'ont pas l'intention de partir aux USA. Le fait de ne pas répertorier tous les enfants éligibles constitue un motif de disqualification. Tout enfant citoyen américain ou résident permanent légal, ne doit pas etre ajouté lors de l'inscription.
                            </small>
                        </div> */}
                    </div>

                    <hr className="my-4" />                
                    <button className="w-30 btn btn-primary btn-lg" type="submit" onClick={handleSubmit}> Enregistrer </button>
                </form>
            </div>
        </div>
    </div>
    <Footer />
    </>
  )}
}

export default EditAdherent;
