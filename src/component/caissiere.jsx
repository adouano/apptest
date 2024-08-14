import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Versements from './versements';
import supabase from '../config/dbConfig';
import LoadingPage from './loading';
import { useAuth } from '../config/userContext';
import PaymentList from './paymentList';
import Pagination from './pagination';
import AdherentList from './adherentList';

const Caissiere = ({userprofile}) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    let userId = user.id;
    const [adherent, setAdherent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [personPerPage, setPersonPerPage] = useState(10);

    const fetchPersons = async () => {
        try{
            const {data,error} = await supabase.from('dvenrollment').select(`*, dvrelatives(*), dvtransaction(*)`).eq('centrenroll', userprofile?.lieudemission).order('created_at', { ascending: true });
            // const {data,error} = await supabase.from('dvenrollment').select().eq('centrenroll', userprofile?.lieudemission).order('created_at', { ascending: true });
    
            if(error){
                throw new Error("Could not fetch data.");
            }
            setAdherent(data);
            setFetchError(null);
            setTimeout(() => {
                setLoading(false)
            }, 1500);
        }
        catch(error){
            setFetchError(error.message);
            setAdherent(null);
        }
    };

    useEffect(() => {
        fetchPersons();
    }, []);

    const lastPostIndex = currentPage * personPerPage;
    const firstPostIndex = lastPostIndex - personPerPage;
    const currentPeople = adherent?.slice(firstPostIndex, lastPostIndex);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    let searchFilter = currentPeople;
    if(search){
        searchFilter = currentPeople?.filter((adherent) => {
            const numLottery = adherent.numerodvlottery?.toLowerCase().includes(search.toString().toLowerCase());
            const numDossier = adherent.numerodossier?.toLowerCase().includes(search.toString().toLowerCase());
            const nomFamille = adherent.nomdefamille?.toLowerCase().includes(search.toString().toLowerCase());
            const prenomFamille = adherent.prenomdefamille?.toLowerCase().includes(search.toString().toLowerCase());
            const lieuNaissance = adherent.lieudenaissance?.toLowerCase().includes(search.toString().toLowerCase());
            const paysNaissance = adherent.paysdenaissance?.toLowerCase().includes(search.toString().toLowerCase());
            const adressEmail = adherent.adresseemail?.toLowerCase().includes(search.toString().toLowerCase());
            const phonePrimaire = adherent.telephoneprimaire?.toLowerCase().includes(search.toString().toLowerCase());
            const phoneSecondaire = adherent.telephonesecondaire?.toLowerCase().includes(search.toString().toLowerCase());
            return numLottery || numDossier || nomFamille || prenomFamille || lieuNaissance || paysNaissance || adressEmail || phonePrimaire || phoneSecondaire;
        });
    }

    const date = new Date();
    const hour = date.getHours();
    let todayDate = new Date().toDateString();

    if(loading){
      return(<LoadingPage />);
      }else{
    return(
        <>
        <header className="bg-primary">
            <div className="container-xl p-5">
                <div className="row align-items-center justify-content-between">
                    <div className="col-12 col-md mb-4 mb-md-0">
                        <h1 className="mb-1 display-4 fw-500 text-white"> {hour < 12 ? "Bonjour":(hour < 17 ? "Bonsoir":"Bonne soirée")}, {userprofile.prenoms}!</h1>
                        <p className="lead mb-0 text-white"> {hour < 17 ? "Nous avons du boulot aujourd'hui!":"Demain est un autre jour; bon repos!!"}</p>
                    </div>
                    <div className="col-12 col-md-auto flex-shrink-0">
                        <label className="form-label text-white-50" htmlFor="litepickerDateRange">{todayDate}</label>
                        <div className="litepicker-backdrop"></div>
                    </div>
                </div>
            </div>
        </header>

        <div className="container-xl pb-5 pt-5">
            <div className="row gx-5">
                <div className="col-xxl-3 col-md-3 mb-5">
                    <div className="card card-raised border-start border-primary border-4">
                        <div className="card-body px-4">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <div className="me-2">
                                    <div className="display-5">101.1K</div>
                                    <div className="card-text">Nombre Total d'Adhérents</div>
                                </div>
                                <div className="icon-circle bg-primary text-white"><i className="material-icons">download</i></div>
                            </div>
                            <div className="card-text">
                                <div className="d-inline-flex align-items-center">
                                    <i className="material-icons icon-xs text-success">arrow_upward</i>
                                    <div className="caption text-success fw-500 me-2">3%</div>
                                    <div className="caption">from last month</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-3 col-md-3 mb-5">
                    <div className="card card-raised border-start border-warning border-4">
                        <div className="card-body px-4">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <div className="me-2">
                                    <div className="display-5">12.2K</div>
                                    <div className="card-text">Nb Adherent ayant effectuer des versements</div>
                                </div>
                                <div className="icon-circle bg-warning text-white"><i className="material-icons">storefront</i></div>
                            </div>
                            <div className="card-text">
                                <div className="d-inline-flex align-items-center">
                                    <i className="material-icons icon-xs text-success">arrow_upward</i>
                                    <div className="caption text-success fw-500 me-2">3%</div>
                                    <div className="caption">from last month</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-3 col-md-3 mb-5">
                    <div className="card card-raised border-start border-secondary border-4">
                        <div className="card-body px-4">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <div className="me-2">
                                    <div className="display-5">5.3K</div>
                                    <div className="card-text">Nb Adherent ayant solde</div>
                                </div>
                                <div className="icon-circle bg-secondary text-white"><i className="material-icons">people</i></div>
                            </div>
                            <div className="card-text">
                                <div className="d-inline-flex align-items-center">
                                    <i className="material-icons icon-xs text-success">arrow_upward</i>
                                    <div className="caption text-success fw-500 me-2">3%</div>
                                    <div className="caption">from last month</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-3 col-md-3 mb-5">
                    <div className="card card-raised border-start border-info border-4">
                        <div className="card-body px-4">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <div className="me-2">
                                    <div className="display-5">7</div>
                                    <div className="card-text">Encaissement du jour</div>
                                </div>
                                <div className="icon-circle bg-info text-white"><i className="material-icons">devices</i></div>
                            </div>
                            <div className="card-text">
                                <div className="d-inline-flex align-items-center">
                                    <i className="material-icons icon-xs text-success">arrow_upward</i>
                                    <div className="caption text-success fw-500 me-2">3%</div>
                                    <div className="caption">from last month</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card card-raised">
                <div className="card-header bg-transparent px-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="me-4">
                            <h2 className="card-title mb-0">List d'adhérent</h2>
                            <div className="card-subtitle">Details and history</div>
                        </div>
                        <div className="d-flex gap-5">
                            <div className="card-tools">
                                <div className="input-group input-group-sm">
                                    <input type="text" name="adherent_search" value={search} onChange={handleSearch} className="form-control float-right" placeholder="Recherche" />
                                    <div className="input-group-append">
                                        <button type="submit" className="btn btn-secondary"> <i className="bi-search" aria-hidden="true"></i> </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* <AdherentList adherents={searchFilter} userprofile={userprofile} /> */}
                <table className="table table-hover">
                    <thead className="">
                        <tr>
                            <th scope="col"> Num Dossier </th>
                            <th scope="col"> Nom </th>
                            <th scope="col"> Prenoms </th>
                            <th scope="col"> Nombre de protéger</th>
                            <th scope="col"> Montant Dû </th>
                            <th scope="col"> Montant Versé </th>
                            <th scope="col"> Reste à payer </th>
                            <th scope="col"> Actions </th>
                        </tr>
                    </thead>
                    <tbody>
                    {searchFilter.map((adherent) => (
                        <PaymentList adherent={adherent} key={adherent.id} />
                    ))}
                    </tbody>
                </table>
                <Pagination totalPerson={adherent?.length} personPerPage={personPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </div>
        </div>
        </>
    )}
}

export default Caissiere;
