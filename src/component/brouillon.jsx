
// C. Asynchronous Validation:
const checkUsernameAvailability = async (username) => {
    const response = await fetch(`/api/users/${username}`);
    return response.ok;
  };
  
  const MyForm = () => {
    const [usernameAvailable, setUsernameAvailable] = useState(false);
  
    const handleUsernameChange = async (e) => {
      const username = e.target.value;
      setUsernameAvailable(await checkUsernameAvailability(username));
    };
  
    return (
      <form>
        <input type="text" onChange={handleUsernameChange} />
        {usernameAvailable ? 'Username available' : 'Username already taken'}
        <button disabled={!usernameAvailable}>Submit</button>
      </form>
    );
  };


  // ((bucket_id = 'assets'::text) AND (storage.extension(name) = 'jpg'::text) AND (lower((storage.foldername(name))[1]) = 'public'::text))


  <div className="container-xl p-5">
  <div className="container-fluid">
      <h1 className="page-title"> Nouveau Protégé </h1>
      <div className="col-md-12 col-lg-12">
          <form>
              <div className="row g-3">
                  <div className="col-md-5">
                      <label htmlFor="nomfamille" className="form-label"> Nom : </label>
                      <input type="text" className="form-control" id="nomfamille" placeholder="Komenan" required="" />
                      <div className="invalid-feedback">
                          Un nom de famille est requis.
                      </div>
                  </div>
      
                  <div className="col-md-7">
                      <label htmlFor="prenomfamille" className="form-label"> Prénoms : </label>
                      <input type="text" className="form-control" id="prenomfamille" placeholder="Gramboute Achi Franck" required="" />
                      <div className="invalid-feedback">
                          Un prenom valide est requis.
                      </div>
                  </div>
      
                  <div className="col-md-3">
                      <label htmlFor="dnaissance" className="form-label"> Date de naissance : </label>
                      <div className="input-group has-validation">
                          {/*<span className="input-group-text">@</span>*/}
                          <input type="date" className="form-control" id="datenaissance" required="" />
                          <div className="invalid-feedback">
                              La date de naissance est obligatoire.
                          </div>
                      </div>
                  </div>
      
                  <div className="col-md-6">
                      <label htmlFor="lieunaissance" className="form-label"> Lieu de naissance : </label>
                      <div className="input-group has-validation">
                          <input type="text" className="form-control" id="lieunaissance" placeholder="Ville/Village/Commune de naissance" required="" />
                          <div className="invalid-feedback">
                              Le lieu de naissance est obligatoire.
                          </div>
                      </div>
                  </div>
      
                  <div className="col-md-3">
                      <label htmlFor="lnaissance" className="form-label"> Genre (Sexe) : </label><br/>
                      <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" name="genre" id="homme" value="homme" required="" />
                          <label className="form-check-label" htmlFor="homme"> Homme </label>
                      </div>
                      <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" name="genre" id="femme" value="femme" required="" />
                          <label className="form-check-label" htmlFor="femme"> Femme </label>
                      </div>
                  </div>
      
                  <div className="col-md-5">
                      <label htmlFor="pays" className="form-label"> Pays de naissance : <span className="text-body-secondary"></span></label>
                      <input type="text" className="form-control" id="pays" placeholder="Pays de naissance" />
                  </div>
      
                  <div className="col-md-3">
                      <label htmlFor="relation" className="form-label"> Relation </label>
                      <select className="form-select" aria-label="Relation">
                          <option value="Enfant"> Enfant </option>
                          <option value="Epoux(se)"> Epoux(se) </option>
                      </select>
                  </div>
      
                  <div className="col-md-4">
                      <label htmlFor="photo" className="form-label"> Photo : </label>
                      <input type="file" className="form-control" id="photo" placeholder="Image" />
                      <small htmlFor=""> Telecharger la photo </small>
                  </div>
              </div>
              <hr className="my-4" />
      
              <button className="w-30 btn btn-primary btn-lg" type="submit"> Enregistrer </button>
          </form>
      </div>
      <hr className="my-4" />
  </div>              
</div>


          {/* <Button onClick={(handleStatus) => setStatuts(!associate?.status)} value={associate?.status} className={associate?.status ? 'btn bg-gradient btn-success' : 'btn bg-gradient btn-warning'}> {associate?.status ? (<i className="bi-unlock-fill" style={{padding: "-10px"}}> Activer</i>):(<i className="bi-lock-fill" style={{padding: "-10px"}}> Desactiver</i>)} </Button> */}
          {/* <Button onClick={() => handleStatus(associate?.id,associate?.status)} value={associate?.status} className={associate?.status ? 'btn bg-gradient btn-success' : 'btn bg-gradient btn-warning'}> {associate?.status ? (<i className="bi-unlock-fill" style={{padding: "-10px"}}> Activer</i>):(<i className="bi-lock-fill" style={{padding: "-10px"}}> Desactiver</i>)} </Button> */}
          <td onClick={() => handleStatus(associate?.id, setAssocProfil(associate?.status))} className={associate?.status ? 'text-bg-danger' : 'text-bg-success'}> {associate?.status ? 'Inactif' : 'Actif'} </td>



          import React, { useState } from 'react';
          import {Button, Form, Modal} from 'react-bootstrap';
          import supabase from '../../config/dbConfig';
          
          const EditAdherent = ({adherent}) => {
            const [show, setShow] = useState(false);  
            const handleClose = () => setShow(false);
            const handleShow = () => setShow(true);
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
          
            const handleOnChange = () => {}
          
            const handleSubmit = async(e) => {
              e.preventDefault();
          
              console.log(adherent);
              console.log(nomfamille);
              console.log(prenomfamille);
              console.log(datenaissance);
              console.log(lieunaissance);
              console.log(genre);
              console.log(pays);
              console.log(email);
              console.log(adresse);
              console.log(codepostal);
              console.log(paysresidence);
              console.log(villeresidence);
              console.log(quartier);
              console.log(telephone);
              console.log(telephone1);
              console.log(niveauscolaire);
              console.log(statutmarital);
          
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
                      .eq('id', adherent.id);
              }
              catch(error){
                  console.log(error.message);
              }
            }
          
          
            return (
              <>
                <Button variant="warning" onClick={handleShow}><i className="bi bi-pencil-square" style={{fontWeight: "900", paddingRight: "5px"}}></i>Modifier</Button>
          
                <Modal centered size="lg" show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Modifier {adherent.nomdefamille}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
          
                      <div className='row mb-3'>
                          <div className="col-md-4">
                              <label htmlFor="numdossier" className="form-label"> Numero de Dossier : </label>
                              <input type="text" className="form-control" name="numdossier" id="numdossier" defaultValue={adherent.numerodossier} onChange={handleOnChange} disabled />
                          </div>
                          <div className="col-md-4">
                              <label htmlFor="numdvlottery" className="form-label"> Numero DV Lottery : </label>
                              <input type="text" className="form-control" name="numdvlottery" id="numdvlottery" defaultValue={adherent.numerodvlottery} placeholder="Numero de confirmation DV Lottery" disabled />
                          </div>
                          <div className="col-md-4">
                              <label htmlFor="enrollocation" className="form-label"> Bureau d'enrollement: </label>
                              <input type="text" className="form-control" name="enrollocation" id="enrollocation" defaultValue={adherent.centrenroll} onChange={handleOnChange} placeholder="Lieu/Bureau d'enrollement" disabled />
                          </div>
                      </div>
          
                      <div className="row g-3 mb-3">
                          <div className="col-md-5">
                              <label htmlFor="nomfamille" className="form-label"> Nom : </label>
                              <input type="text" className="form-control" name="nomfamille" id="nomfamille" defaultValue={adherent.nomdefamille} onChange={(e) => setNomfamille(e.target.value)} required />
                              <div className="invalid-feedback">Le nom de famille est requis.</div>
                          </div>
          
                          <div className="col-md-7">
                              <label htmlFor="prenomfamille" className="form-label"> Prénoms : </label>
                              <input type="text" className="form-control" name="prenomfamille" id="prenomfamille" defaultValue={adherent.prenomdefamille} onChange={(e) => setPrenomfamille(e.target.value)} required />
                              <div className="invalid-feedback">Le prénom valide est requis.</div>
                          </div>
          
                          <div className="col-md-3">
                              <label htmlFor="datenaissance" className="form-label"> Date de naissance : </label>
                              <div className="input-group has-validation">
                                  {/*<span className="input-group-text">@</span>*/}
                                  <input type="date" className="form-control" name="datenaissance" id="datenaissance" defaultValue={adherent.datedenaissance} onChange={(e) => setDatenaissance(e.target.value)} required />
                                  <div className="invalid-feedback">La date de naissance est obligatoire.</div>
                              </div>
                          </div>
          
                          <div className="col-md-6">
                              <label htmlFor="lieunaissance" className="form-label"> Lieu de naissance : </label>
                              <div className="input-group has-validation">
                                  <input type="text" className="form-control" name="lieunaissance" id="lieunaissance" defaultValue={adherent.lieudenaissance} onChange={(e) => setLieunaissance(e.target.value)} required />
                                  <div className="invalid-feedback">Le lieu de naissance est obligatoire.</div>
                              </div>
                          </div>
          
                          <div className="col-md-3">
                              <label className="form-label"> Genre (Sexe) : <br/>
                                  <div className="form-check form-check-inline">
                                      <input className="form-check-input" type="radio" name="genre" id="homme" value="Homme" checked={adherent.genresexe === 'Homme'} onChange={(e) => setGenre(e.target.value)} />
                                      <label className="form-check-label" htmlFor="homme"> Homme </label>
                                  </div>
                                  <div className="form-check form-check-inline">
                                      <input className="form-check-input" type="radio" name="genre" id="femme" value="Femme" checked={adherent.genresexe === 'Femme'} onChange={(e) => setGenre(e.target.value)} />
                                      <label className="form-check-label" htmlFor="femme"> Femme </label>
                                  </div>
                              </label>
                          </div>
                      </div>
          
                      <div className="row g-3">
                          <div className="col-md-6">
                              <label htmlFor="pays" className="form-label"> Pays de naissance : </label>
                              <input type="text" className="form-control" name="pays" id="pays" defaultValue={adherent.paysdenaissance} onChange={(e) => setPays(e.target.value)} />
                          </div>
          
                          <div className="col-md-6">
                              <label htmlFor="email" className="form-label"> Email </label>
                              <input type="email" className="form-control" name="email" id="email" defaultValue={adherent.adresseemail} onChange={(e) => setEmail(e.target.value)} autoComplete="off" />
                              <div className="invalid-feedback">L'adresse e-mail est obligatoire.</div>
                              {/*{formError.email && <p>Ajouter une adresse email valide</p>} */}
                          </div>
          
                          <div className="col-md-8">
                              <label htmlFor="adresse" className="form-label"> Adresse : </label>
                              <input type="text" className="form-control" name="adresse" id="adresse" defaultValue={adherent.adressepostal} onChange={(e) => setAdresse(e.target.value)} required />
                              <div className="invalid-feedback">Une adresse postale est requise.</div>
                          </div>
          
                          <div className="col-md-4">
                              <label htmlFor="codepostal" className="form-label"> Code postal : </label>
                              <input type="number" className="form-control" name="codepostal" id="codepostal" maxLength="5" defaultValue={adherent.codepostal} onChange={(e) => setCodepostal(e.target.value)} required />
                              <div className="invalid-feedback">Le code postale est requise.</div>
                          </div>
          
                          <div className="col-md-6">
                              <label htmlFor="paysresidence" className="form-label"> Pays de résidence : </label>
                              <input type="text" className="form-control" name="paysresidence" id="paysresidence" defaultValue={adherent.paysderesidence} onChange={(e) => setPaysresidence(e.target.value)} />
                              <div className="invalid-feedback">Champ obligatoire.</div>
                          </div>
          
                          <div className="col-md-6">
                              <label htmlFor="villeresidence" className="form-label"> Ville de résidence : </label>
                              <input type="text" className="form-control" name="villeresidence" id="villeresidence" defaultValue={adherent.villederesidence} onChange={(e) => setVilleresidence(e.target.value)} />
                              <div className="invalid-feedback">Champ obligatoire.</div>
                          </div>
          
                          <div className="col-md-6">
                              <label htmlFor="quartier" className="form-label"> Quartier : </label>
                              <input type="text" className="form-control" name="quartier" id="quartier" defaultValue={adherent.quartierderesidence} onChange={(e) => setQuartier(e.target.value)} required />
                              <div className="invalid-feedback">Champ obligatoire.</div>
                          </div>
          
                          <div className="col-md-6">
                              <label htmlFor="telephone" className="form-label"> Numéro de téléphone : </label>
                              <input type="tel" className="form-control" name="telephone" id="telephone" defaultValue={adherent.telephoneprimaire} maxLength="10" onChange={(e) => setTelephone(e.target.value)} />
                              <div className="invalid-feedback">Champ obligatoire.</div>
                          </div>
          
                          <div className="col-md-6">
                              <label htmlFor="telephone1" className="form-label"> Numéro de téléphone : <span className="text-body-secondary">(Optionel)</span></label>
                              <input type="tel" className="form-control" name="telephone1" id="telephone1" defaultValue={adherent.telephonesecondaire} maxLength="10" onChange={(e) => setTelephone1(e.target.value)} />
                              <div className="invalid-feedback">Champ obligatoire.</div>
                          </div>
                      </div>
          
                      <hr className="my-4" />
          
                      <div className="row">
                          <div className="col-md-6">
                              <h4 className=""> Etudes et Diplômes </h4>
                              <div className="">
                                  <div className="form-check">
                                      <input className="form-check-input" type="radio" name="niveauscolaire" id="primaire" value="Ecole Primaire" checked={adherent.niveauscolaire === "Ecole Primaire"} onChange={(e) => setNiveauscolaire(e.target.value)} />
                                      <label className="form-check-label" htmlFor="primaire"> Ecole Primaire </label>
                                  </div>
                                  <div className="form-check">
                                      <input className="form-check-input" type="radio" name="niveauscolaire" id="collegesansdiplome" value="Collège - Aucun diplôme" checked={adherent.niveauscolaire === "Collège - Aucun diplôme"} onChange={(e) => setNiveauscolaire(e.target.value)} />
                                      <label className="form-check-label" htmlFor="collegesansdiplome"> Collège - Aucun diplôme </label>
                                  </div>
                                  <div className="form-check">
                                      <input className="form-check-input" type="radio" name="niveauscolaire" id="collegeavecdiplome" value="Collège - Diplômé" checked={adherent.niveauscolaire === "Collège - Diplômé"} onChange={(e) => setNiveauscolaire(e.target.value)} />
                                      <label className="form-check-label" htmlFor="collegeavecdiplome"> Collège - Diplômé </label>
                                  </div>
                                  <div className="form-check">
                                      <input className="form-check-input" type="radio" name="niveauscolaire" id="ecoleprof" value="Ecole Professionnelle" checked={adherent.niveauscolaire === "Ecole Professionnelle"} onChange={(e) => setNiveauscolaire(e.target.value)} />
                                      <label className="form-check-label" htmlFor="ecoleprof"> Ecole Professionnelle </label>
                                  </div>
                                  <div className="form-check">
                                      <input className="form-check-input" type="radio" name="niveauscolaire" id="coursuniversitaire" value="Cours Universitaire" checked={adherent.niveauscolaire === "Cours Universitaire"} onChange={(e) => setNiveauscolaire(e.target.value)} />
                                      <label className="form-check-label" htmlFor="coursuniversitaire"> Cours Universitaires </label>
                                  </div>
                                  <div className="form-check">
                                      <input className="form-check-input" type="radio" name="niveauscolaire" id="diplomeuniversitaire" value="Diplôme Universitaire" checked={adherent.niveauscolaire === "Diplôme Universitaire"} onChange={(e) => setNiveauscolaire(e.target.value)} />
                                      <label className="form-check-label" htmlFor="diplomeuniversitaire"> Diplôme Universitaire </label>
                                  </div>
                                  <div className="form-check">
                                      <input className="form-check-input" type="radio" name="niveauscolaire" id="superieur" value="Cours de Niveau Supérieur" checked={adherent.niveauscolaire === "Cours de Niveau Supérieur"} onChange={(e) => setNiveauscolaire(e.target.value)} />
                                      <label className="form-check-label" htmlFor="superieur"> Cours de Niveau Supérieur </label>
                                  </div>
                                  <div className="form-check">
                                      <input className="form-check-input" type="radio" name="niveauscolaire" id="maitrise" value="Maîtrise" checked={adherent.niveauscolaire === "Maîtrise"} onChange={(e) => setNiveauscolaire(e.target.value)} />
                                      <label className="form-check-label" htmlFor="maitrise"> Maîtrise </label>
                                  </div>
                                  <div className="form-check">
                                      <input className="form-check-input" type="radio" name="niveauscolaire" id="nivdoctorat" value="Cours de Niveau Doctorat" checked={adherent.niveauscolaire === "Cours de Niveau Doctorat"} onChange={(e) => setNiveauscolaire(e.target.value)} />
                                      <label className="form-check-label" htmlFor="nivdoctorat"> Cours de Niveau Doctorat </label>
                                  </div>
                                  <div className="form-check">
                                      <input className="form-check-input" type="radio" name="niveauscolaire" id="doctorat" value="Doctorat" checked={adherent.niveauscolaire === "Doctorat"} onChange={(e) => setNiveauscolaire(e.target.value)} />
                                      <label className="form-check-label" htmlFor="doctorat"> Doctorat </label>
                                  </div>
                                  <div className="form-check">
                                      <input className="form-check-input" type="radio" name="niveauscolaire" id="deuxansexperience" value="Travailleur qualifié dans un métier qui nécessite au moins deux (2) ans de formation ou d'expérience" checked={adherent.niveauscolaire === "Travailleur qualifié dans un métier qui nécessite au moins deux (2) ans de formation ou d'expérience"} onChange={(e) => setNiveauscolaire(e.target.value)} />
                                      <label className="form-check-label" htmlFor="deuxansexperience"> Travailleur qualifié dans un métier qui nécessite au moins deux (2) ans de formation ou d'expérience </label>
                                  </div>
                              </div>
                          </div>
          
                          <div className="col-md-6">
                              <h4 className=""> Situation Matrimoniale </h4>
                              <div className="">
                                  <div className="form-check">
                                      <input className="form-check-input" type="radio" name="statutmarital" id="celibataire" value="Célibataire" checked={adherent.etatmatrimoniale === "Célibataire"} onChange={(e) => setStatutmarital(e.target.value)} />
                                      <label className="form-check-label" htmlFor="celibataire"> Célibataire </label>
                                  </div>
                                  <div className="form-check">
                                      <div>
                                          <input className="form-check-input" type="radio" name="statutmarital" id="marieenus" value="Marié(e)" checked={adherent.etatmatrimoniale === "Marié(e)"} onChange={(e) => setStatutmarital(e.target.value)} />
                                      <label className="form-check-label" htmlFor="marieenus"> Marié(e) </label>
                                      </div>
                                      <small className=""> Epoux(se) n'est pas citoyen Americain ou résident permanent légal </small>
                                  </div>
                                  <div className="form-check">
                                      <div>
                                          <input className="form-check-input" type="radio" name="statutmarital" id="marieeus" value="Marié(e)-US" checked={adherent.etatmatrimoniale === "Marié(e)-US"} onChange={(e) => setStatutmarital(e.target.value)} />
                                          <label className="form-check-label" htmlFor="marieeus"> Marié(e) </label>
                                      </div>
                                      <small className=""> Epoux(se) est citoyen Americain ou résident permanent légal </small>
                                  </div>
                                  <div className="form-check">
                                      <input className="form-check-input" type="radio" name="statutmarital" id="divorce" value="Divorcé(e)" checked={adherent.etatmatrimoniale === "Divorcé(e)"} onChange={(e) => setStatutmarital(e.target.value)} />
                                      <label className="form-check-label" htmlFor="divorce"> Divorcé(e) </label>
                                  </div>
                                  <div className="form-check">
                                      <input className="form-check-input" type="radio" name="statutmarital" id="veufve" value="Veuf/Veuve" checked={adherent.etatmatrimoniale === "Veuf/Veuve"} onChange={(e) => setStatutmarital(e.target.value)} />
                                      <label className="form-check-label" htmlFor="veufve"> Veuf/Veuve </label>
                                  </div>
                                  <div className="form-check">
                                      <div>
                                          <input className="form-check-input" type="radio" name="statutmarital" id="separee" value="Séparés Légalement" checked={adherent.etatmatrimoniale === "Séparés Légalement"} onChange={(e) => setStatutmarital(e.target.value)} />
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
          
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Annuler</Button>
                    <Button variant="primary" onClick={handleSubmit}>Appliquer</Button>
                  </Modal.Footer>
                </Modal>
              </>
            )
          }
          
          export default EditAdherent;
          







