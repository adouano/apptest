import React, { useState, useEffect } from "react";
import supabase from "../../config/dbConfig";
import { useAuth }  from '../../config/userContext';
import { Link, useParams, useNavigate } from "react-router-dom";
import { Alert,Stack,Form,Button } from 'react-bootstrap';
import Versements from '../../component/versements';
import AjoutRelative from "../relatives/ajouter";
import LoadingPage from "../../component/loading";
import Header from "../../header";
import Footer from "../../footer";
import EditAdherent from "./modifier";
import PhotoCropper from "../../component/photoCropper";

const InfoAdherent = () => {
    const {personId} = useParams();
    const { user, profile, handleGoBack } = useAuth();
    const [config, setConfig] = useState('');
    const [adherent, setAdherent] = useState([]);
    const [relatives, setRelatives] = useState([]);
    const [depots, setDepots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    const parametres = async () => {
        const {data, error} = await supabase.from('configurations').select().eq('id', 1).single();
        setConfig(data);
    }

    const fetchPersons = async () => {
        try{
            const { data,error } = await supabase.from('dvenrollment').select().eq('id', personId).single();

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

    const fetchRelatives = async () => {
        try{
            const { data,error } = await supabase.from('dvrelatives').select().eq('adherent_id', personId);

            if(error){
                throw new Error(error.message);
            }
            setRelatives(data);
        }
        catch(error){
            setFetchError(error.message);
        }
    };

    const versements = async () => {
        try{
            const { data,error } = await supabase.from('dvtransaction').select().eq('adherent_id', personId);

            if(error){
                throw new Error(error.message);
            }
            setDepots(data);
        }
        catch(error){
            setFetchError(error.message);
        }
    };

    const netApayer = Number(config.montant_adherent) + Number(relatives.length * config.montant_relative);
    let depoTotal = 0;
    depots.map((calculDepot) => {
        depoTotal += Number(calculDepot.depots);
        return depoTotal;
    });
    const restApayer = Number(netApayer) - Number(depoTotal);

    const suppPay= async (payId) => {
        try {
          const { error } = await supabase.from('dvtransaction').delete().eq('id', payId);
    
          if (error) {
            throw new Error(error.message);
          }         
          setDepots(depots.filter((depot) => depot.id !== payId));
        } catch (error) {
            console.log("Deleting error :", error);
        }
    };

    useEffect(() => {
        parametres();
        fetchPersons();
        fetchRelatives();
        versements();
    }, []);

    const [addConfirm, setAddConfirm] = useState(false);
    const [dvConfirm, setDvConfirm] = useState("");
    const openDvConfirm = () => {
        setAddConfirm(true);
    } 
    const startEnroll = () => {}

    const dvconfirmUpdate = async(e) => {
        e.preventDefault();

        if(dvConfirm === ""){
            setFetchError("Veuillez ajouter le numero de confirmation");
            return;
        }
        try{
            const { data, error } = await supabase
                .from('dvenrollment')
                .update({ numerodvlottery: dvConfirm })
                .eq('id', personId);
            // setBonusSupervisor(data);
            if(!error){setAddConfirm(false)}
        }
        catch(error){
            console.log(error.message);
        }
    }

    const resetBtn = () => {setAddConfirm(false)}

    // console.log(profile);
    useEffect(() => {
        const interval = setTimeout(() => setFetchError(""), 5000);
        return () => clearTimeout(interval);
    }, [fetchError]);

    if(loading){
      return(<LoadingPage />);
      }else{

        return (
        <>
        <Header userprofile={profile} />
            <div className="container-xl pb-5 pt-5">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    {fetchError && <Alert className="alert alert-danger">{fetchError}</Alert>}
                    {/* {adherent.map((person) => ( */}
                            <div className="" key={adherent.id}>
                                <div className="d-flex justify-content-between gap-3 mb-2">
                                    <h3 className=""> {adherent.nomdefamille} {adherent.prenomdefamille} -/- {adherent.numerodossier}</h3>
                                    <button className='float-end btn btn-dark' onClick={handleGoBack}><i className='bi-arrow-left-square'></i> Retour</button>
                                    {/* bloquer adherent lors d'Enregistrement a la DV */}
                                </div>
                                <div className="bg-body-tertiary mb-2">
                                    <div className="row">
                                        <div className="col-md-3 col-lg-3 gap-3 justify-content-center"> 
                                            <img alt={adherent.nomdefamille} src={adherent.photoidentite} className="img-circle img-responsive" />
                                            <div className="d-flex justify-content-between gap-3 mt-3">
                                                <Link to={adherent.photoidentite} download={`${adherent.nomdefamille}-${adherent.numerodossier}`} className="btn btn-outline-secondary m-auto"> <i className="bi bi-download"></i> Télécharger</Link>
                                                <PhotoCropper adherent={adherent} />
                                                {/* <Link to={adherent.photoidentite} className="btn btn-warning"> <i className="bi bi-pencil"></i> Changer</Link> */}
                                            </div>
                                        </div>
                                        <div className="col-md-9 col-lg-9"> 
                                            <table className="table info_adht">
                                                <tbody>
                                                    <>
                                                    {adherent.numerodvlottery !== null ? (
                                                        <tr>
                                                            <td>Numero de confirmation DV : </td>
                                                            <td> {adherent.numerodvlottery} </td>
                                                        </tr>
                                                    ):(<></>)}
                                                    <tr>
                                                        <td>Nom : </td>
                                                        <td> {adherent.nomdefamille} </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Prénoms : </td>
                                                        <td> {adherent.prenomdefamille} </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Pays de naissance : </td>
                                                        <td> {adherent.paysdenaissance} </td>
                                                    </tr>
                                                    <tr>
                                                        <td> Lieu de Naissance : </td>
                                                        <td> {adherent.lieudenaissance} </td>
                                                    </tr> 
                                                    <tr>
                                                        <td> Date de Naissance : </td>
                                                        <td> {adherent.datedenaissance} </td>
                                                    </tr>                            
                                                    <tr>
                                                        <td> Genre : </td>
                                                        <td>  {adherent.genresexe}  </td>
                                                    </tr>
                                                    <tr>
                                                        <td> Adresse : </td>
                                                        <td> {adherent.adressepostal} </td>
                                                    </tr>
                                                    <tr>
                                                        <td> Code postal : </td>
                                                        <td> {adherent.codepostal} </td>
                                                    </tr>
                                                    <tr>
                                                        <td> Email : </td>
                                                        <td><a href={adherent.adresseemail} > {adherent.adresseemail}  </a></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Pays de résidence : </td>
                                                        <td> {adherent.paysderesidence} </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Ville actuelle d'habitation : </td>
                                                        <td> {adherent.villederesidence} </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Quartier actuel : </td>
                                                        <td> {adherent.quartierderesidence} </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Niveau d'étude / Expérience : </td>
                                                        <td> {adherent.niveauscolaire} </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Situation Matrimoniale : </td>
                                                        <td> {adherent.etatmatrimoniale} </td>
                                                    </tr>
                                                    <tr>
                                                        <td> Contact telephonique :</td>
                                                        <td> {adherent.telephoneprimaire} (<i>Principal</i>)<br/>{adherent.telephonesecondaire} (<i>Secondaire</i>)</td>                                    
                                                    </tr>
                                                    </>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/* ))} */}

                        <div className="">
                            <div className="d-flex gap-2 float-start">
                                <button data-original-title="Broadcast Message" data-toggle="tooltip" type="button" className="btn btn-sm btn-primary"><i className="bi bi-envelope-arrow-up-fill"></i></button>
                                <button data-original-title="Edit this user" data-toggle="tooltip" type="button" className="btn btn-sm btn-warning"><i className="bi bi-pencil-square"></i></button>
                                <button data-original-title="Remove this user" data-toggle="tooltip" type="button" className="btn btn-sm btn-danger"><i className="bi bi-trash3-fill"></i></button>
                            </div>
                            <div className='d-flex gap-2 float-end'>
                                {restApayer !== 0 && <Versements adherent={adherent} relatives={relatives} depots={depots} config={config} restApayer={restApayer} />}
                                <AjoutRelative adherent={adherent} />
                                {adherent.numerodvlottery === null && 
                                <>
                                    {/* <EditAdherent adherent={adherent} /> */}
                                    <Link to={`/adherent/${adherent.id}/modifier`}>
                                        <button className="btn btn-warning bg-gradient">Modifier</button>
                                    </Link>
                                    <button className="btn btn-dark" onClick={openDvConfirm}>Enregistrer</button>
                                </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {addConfirm && 
                <div className="row">
                    <div className="col-5"></div>
                    <div className="col-7">
                        <Stack direction="horizontal" gap={3} className='mt-3 mb-3'>
                            <Form.Control className="me-auto" name='mtadherent' onChange={(e) => setDvConfirm(e.target.value)} placeholder="Confirmation" />
                            <Button variant="secondary" onClick={dvconfirmUpdate}>Confirmer</Button>
                            <div className="vr" />
                            <Button variant="outline-danger" type="reset" onClick={resetBtn} defaultValue="Reset">Annuler</Button>
                        </Stack>
                    </div>
                </div>}

                <hr />
                {/*Visible par la Caissiere, admin et superviseur*/}
                {relatives.length !== 0 ?
                (<>
                    <div className="">
                        <div className="row mb-3">
                            <div className="col">
                                <h2 className=""> Liste de Versements</h2>
                                <div className={depoTotal === 0 ? ('card-subtitle badge text-bg-info'):(netApayer > depoTotal ? 'card-subtitle badge text-bg-warning' : 'card-subtitle badge text-bg-success')}>{depoTotal ===0 ? ('Paiement en attente'):(netApayer > depoTotal ? 'Paiement en cours' : 'Soldé')}</div>
                                <table className="table">
                                    <tbody>
                                    {depots.map((depot) => (
                                        <tr key={depot.id}>
                                            <td> {new Date(depot.created_at).toLocaleDateString()} </td>
                                            <td> {depot.designation} </td>
                                            <td> {depot.depots} </td>
                                            <td> <button className="btn btn-danger" onClick={() => suppPay(depot.id)}>X</button> </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col">
                                <div className="card text-bg-info mb-3">
                                    <div className="card-header">A payer</div>
                                    <div className="card-body">
                                        <h5 className="card-title"> {netApayer} </h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card text-bg-light mb-3">
                                    <div className="card-header">Dépôts total</div>
                                    <div className="card-body">
                                        <h5 className="card-title"> {depoTotal} </h5>
                                    </div>
                                </div>
                            </div>                
                            <div className="col">
                                <div className="card text-bg-warning mb-3">
                                    <div className="card-header">Reste à payer</div>
                                    <div className="card-body">
                                        <h5 className="card-title"> {restApayer} </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                </>
                ):(
                    <div className="row g-3">
                        <small className="text-body-secondary">
                            Veuillez utiliser le boutton "Paiement" pour effectuer un/des versement(s)...
                        </small>
                    </div>
                )}

                {(adherent.nombredeprotege !== 0 && relatives.length) ? (
                <div className="row py-5 bg-body-tertiary">
                    <h1 className="panel-heading"> Liste de protégé - ({relatives.length}) </h1>
                    <small className=""> Les enfants comprennent tous les enfants biologiques, les enfants légalement adoptés, et les beaux-enfants célibataires et âgés de moins de 21 ans à la date d'inscription. 
                        Tous les enfants éligibles doivent etre inclus, même s'ils ne vivent pas avec vous ou s'ils n'ont pas l'intention de partir aux USA. Le fait de ne pas répertorier tous les enfants éligibles constitue un motif de disqualification. Tout enfant citoyen américain ou résident permanent légal, ne doit pas etre ajouté lors de l'inscription.
                    </small>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
                        {relatives.map((relative) => (
                        <div className="col" key={relative.id}>
                            <div className="card shadow-sm">
                                <img className="" src={relative.photoidentite} alt={relative.prenomsdefamille} />
                                <div className="card-body">
                                    <table className="table table-user-information">
                                        <tbody>
                                            <tr>
                                                <td>Nom & Prenoms : </td>
                                                <td> <b>{relative.nomdefamille}</b> {relative.prenomsdefamille} </td>
                                            </tr>
                                            <tr>
                                                <td> Date de Naissance : </td>
                                                <td> {relative.datedenaissance} </td>
                                            </tr>
                                            <tr>
                                                <td> Lieu de Naissance : </td>
                                                <td> {relative.lieudenaissance} </td>
                                            </tr>
                                            <tr>
                                                <td> Pays de Naissance : </td>
                                                <td> {relative.paysdenaissance} </td>
                                            </tr>
                                            <tr>
                                                <td> Genre : </td>
                                                <td> {relative.genresexe} </td>
                                            </tr>
                                            <tr>
                                                <td> Relation : </td>
                                                <td> {relative.relationship} </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <div className="btn-group">
                                            {/* <a type="button" className="btn btn-sm btn-outline-primary" href="details-relative.html"> Details </a> */}
                                            <button type="button" className="btn btn-sm btn-outline-warning"><i className="bi bi-pencil-square"></i> Modifier </button>
                                            <button type="button" className="btn btn-sm btn-outline-danger"><i className="bi bi-trash3"></i> Supprimer </button>
                                        </div>
                                        <small className="text-body-secondary"></small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
                ):(
                    <div className="row g-3">
                        <small className="text-body-secondary">
                            Veuillez utiliser le boutton "Ajouter Protégé" pour commencer à ajouter le/les protégé(s)...<br/>
                            Les enfants comprennent tous les enfants biologiques, les enfants légalement adoptés, et les beaux-enfants célibataires et âgés de moins de 21 ans à la date d'inscription. 
                            Tous les enfants éligibles doivent etre inclus, même s'ils ne vivent pas avec vous ou s'ils n'ont pas l'intention de partir aux USA. Le fait de ne pas répertorier tous les enfants éligibles constitue un motif de disqualification. Tout enfant citoyen américain ou résident permanent légal, ne doit pas etre ajouté lors de l'inscription.
                        </small>
                    </div>
                )}
            </div>
        <Footer />
        </>
        )
    }
}

export default InfoAdherent;
