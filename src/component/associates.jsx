import React, { useEffect, useState } from 'react';
import supabase from '../config/dbConfig';
import defaultAvatar from '/src/assets/avatar-profile.webp';
import LoadingPage from './loading';
import { useAuth } from '../config/userContext';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Associates = () => {
    const {handleGoBack} = useAuth();
    const navigate = useNavigate()
    const [fetchAssoc, setFetchAssoc] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [search, setSearch] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statuts, setStatuts] = useState(false);

    const associatesData = async() => {
        try{
            const {data,error} = await supabase.from('associates').select();

            if(error){
                throw new Error("Unable to fetch associate data");
            }
            setFetchAssoc(data);
            setTimeout(() => {
                setLoading(false)
            }, 1500);
        }
        catch(error){
            setFetchError(error.message);
            setFetchAssoc(null);
        }
    };

    useEffect(() => {
        associatesData();
    }, []);

    const handleStatus = async (assoId,assoStatus) => {
        const assocStatus = !assoStatus;
        try{
          const { data, error } = await supabase
            .from('associates')
            .update({ status:assocStatus })
            .eq('id', assoId)
            .select();
    
          if (error) {
            throw new Error(error.message);
          }
          window.location.reload();
        }
        catch(error){
          console.log("Erreur :", error);
        }
    }

    const deletAssociate = async (assoId) => {
        try{
          const {error} = await supabase.from('associates').delete().eq('id', assoId);
          
          if(error){
            throw new Error("Something went wrong when deleting ...");
          }
          // Alert(`Are you sure to delete this item: ${item.item_name}`);
          setFetchAssoc(fetchAssoc.filter((associate) => associate.id !== assoId));
        }
        catch(error){
          console.log("Error: ", error);
        }
      }

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    let searchFilter = fetchAssoc;
    if(search){
        searchFilter = fetchAssoc.filter((associate) => {
            const nomFamille = associate.nomdefamille?.toLowerCase().includes(search.toString().toLowerCase());
            const prenomFamille = associate.prenoms?.toLowerCase().includes(search.toString().toLowerCase());
            const assRole = associate.role?.toLowerCase().includes(search.toString().toLowerCase());
            const adressEmail = associate.email?.toLowerCase().includes(search.toString().toLowerCase());
            const phonePrimaire = associate.num_telephone?.toLowerCase().includes(search.toString().toLowerCase());
            const lieuMission = associate.lieudemission?.toLowerCase().includes(search.toString().toLowerCase());
            const assStatus = associate.status?.toString().includes(search.toString().toLowerCase());
            return nomFamille || prenomFamille || assRole || adressEmail || phonePrimaire || lieuMission || assStatus;
        });
    }

    if(loading){
        return(<LoadingPage />);
        }else{
  return (
    <>
    <div className="container-xl pb-5 pt-5">
        <div className="row py-5 justify-content-center">
            <h1 className="panel-heading"> Liste d'associates - ({fetchAssoc.length}) <button className='float-end btn btn-dark' onClick={handleGoBack}><i className='bi-arrow-left-square'></i> Retour</button></h1>
            <input type='search' onChange={handleSearch} className='form-control' placeholder='Recherchez un partenaire...' />
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
                {fetchError && <Alert className="alert alert-danger">{fetchError}</Alert>}
                {searchFilter.map((associate) => (
                <div className="col" key={associate.associate_id}>
                    <div className="card shadow-sm profilpict">
                        <img className="" src={associate.photodeprofil ? (associate.photodeprofil):(defaultAvatar)} height="275" alt={associate.prenoms} />
                        <div className="card-body">
                            <table className="table table-user-information">
                                <tbody>
                                    <tr>
                                        <td>Nom & Prenoms : </td>
                                        <td> <b>{associate.nomdefamille}</b> {associate.prenoms} </td>
                                    </tr>
                                    <tr>
                                        <td> Groupe de travail : </td>
                                        <td> {associate?.role==='admin' ? ("Administrateur"):(associate?.role==='supervisor' ? ("Superviseur"):(associate?.role==='agent' ? ("Commercial"):(associate?.role==='finance' ? ("Caissiere"):("Informaticien"))))} </td>
                                    </tr>
                                    <tr>
                                        <td> Email : </td>
                                        <td> {associate.email} </td>
                                    </tr>
                                    <tr>
                                        <td> Teleplone : </td>
                                        <td> {associate.num_telephone} </td>
                                    </tr>
                                    <tr>
                                        <td> Lieu de travail : </td>
                                        <td> {associate.lieudemission} </td>
                                    </tr>
                                    <tr>
                                        <td className={associate?.status ? 'text-bg-success':'text-bg-danger'}> Status : </td>
                                        <td className={associate?.status ? 'text-bg-success':'text-bg-danger'}> {associate?.status ? 'Actif':'Inactif'} </td>
                                    </tr>
                                    {associate?.supp_intention !== false ? (
                                        <tr>
                                            <td className={associate?.supp_intention ? 'text-bg-warning':''}> Fermeture de compte : </td>
                                            <td className={associate?.supp_intention ? 'text-bg-warning':''}> {associate?.supp_intention ? ("Demande de suppression"):(<></>)} </td>
                                        </tr>
                                    ):(<></>)}
                                    
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="btn-group">
                                    {/* <a type="button" className="btn btn-sm btn-outline-primary" href="details-associate.html"> Details </a> */}
                                    <button onClick={() => handleStatus(associate?.id,associate?.status)} className={associate?.status ? 'btn bg-gradient btn-warning':'btn bg-gradient btn-success'}> {associate?.status ? (<i className="bi-lock-fill" style={{padding: "-10px"}}> Desactiver</i>):(<i className="bi-unlock-fill" style={{padding: "-10px"}}> Activer</i>)}</button>
                                    <button onClick={() => {deletAssociate(associate?.id,)}} className="btn btn-sm btn-outline-danger"><i className="bi bi-trash3"></i> Supprimer </button>
                                </div>
                                <small className="text-body-secondary"></small>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    </div>
    </>
  )}
}

export default Associates;
