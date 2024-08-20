import React, { useState, useEffect } from "react";
import supabase from "../config/dbConfig";
// import { Button, Pagination } from "react-bootstrap";
import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../config/userContext';
import LoadingPage from "./loading";
import AdherentList from "./adherentList";
import Pagination from "./pagination";
import AjoutAdherent from "../pages/adherents/ajouter";
import StatistiquesGraph from "./statGraph";

const Commercial = ({userprofile}) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [fetchData, setFetchData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState([]);
    const [fetchError, setFetchError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [personPerPage, setPersonPerPage] = useState(10);

    const lastPostIndex = currentPage * personPerPage;
    const firstPostIndex = lastPostIndex - personPerPage;
    const currentPeople = fetchData.slice(firstPostIndex, lastPostIndex);

    const fetchPersons = async () => {
        try{
            const {data,error} = await supabase.from('dvenrollment').select(`*, dvrelatives(*), dvtransaction(*)`).eq('associate_id', user?.id).order('created_at', { ascending: true });
            // const {data,error} = await supabase.from('dvenrollment').select()
            // .order('created_at', { ascending: true })
            // .eq('agent_id', userId);
    
            if(error){
                throw new Error("Could not fetch data.");
            }
            setFetchData(data);
            setFetchError(null);
            setTimeout(() => {
                setLoading(false)
            }, 1500);
        }
        catch(error){
            setFetchError(error.message);
            setFetchData(null);
        }
    };

    useEffect(() => {
        fetchPersons();
        // getFunction();
    }, []);

    // console.log(functData);


    // const deleteItem = async (itemId) => {
    //     try{
    //       const {error} = await supabase.from('items').delete().eq('id', itemId);
          
    //       if(error){
    //         throw new Error("Something went wrong when deleting ...");
    //       }
    //       // Alert(`Are you sure to delete this item: ${item.item_name}`);
    //       setFetchData(fetchData.filter((item) => item.id !== itemId));
    //     }
    //     catch(error){
    //       console.log("Error: ", error);
    //     }
    // }
    
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    let searchFilter = currentPeople;
    if(search){
        searchFilter = currentPeople.filter((adherent) => {
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
                <StatistiquesGraph adherents={fetchData} />
                {fetchData.length > 0 ? (
                <>
                <div className="row gx-5">
                    <div className="col-xxl-3 col-md-3 mb-5">
                        <div className="card card-raised border-start border-primary border-4">
                            <div className="card-body px-4">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <div className="me-2">
                                        <div className="display-5">3</div>
                                        <div className="card-text">Enregistrement du jour</div>
                                    </div>
                                    <div className="icon-circle text-black"><i className="bi-person-add" style={{fontSize: "4rem", color:"black"}}></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-3 col-md-3 mb-5">
                        <div className="card card-raised border-start border-warning border-4">
                            <div className="card-body px-4">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <div className="me-2">
                                        <div className="display-5">12</div>
                                        <div className="card-text">Payement effectue</div>
                                    </div>
                                    <div className="icon-circle text-black"><i className="bi-cash-coin" style={{fontSize: "4rem", color:"black"}}></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-3 col-md-3 mb-5">
                        <div className="card card-raised border-start border-secondary border-4">
                            <div className="card-body px-4">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <div className="me-2">
                                        <div className="display-5">500</div>
                                        <div className="card-text">Bonus sur paiement</div>
                                    </div>
                                    <div className="icon-circle text-black"><i className="bi-wallet2" style={{fontSize: "4rem", color:"black"}}></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-3 col-md-3 mb-5">
                        <div className="card card-raised border-start border-info border-4">
                            <div className="card-body px-4">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <div className="me-2">
                                        <div className="display-5">{fetchData.length}</div>
                                        <div className="card-text">Total Enregistrer</div>
                                    </div>
                                    <div className="icon-circle text-black"><i className="bi-people" style={{fontSize: "4rem", color:"black"}}></i></div>
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
                                <Link to={'/adherent/ajouter'}>
                                    <button className="btn btn-primary" type="button"><i className="bi-person-plus-fill" style={{fontWeight: "900", paddingRight: "5px"}}></i>Ajouter Adhérent</button>
                                </Link>                            
                            </div>
                        </div>
                    </div>
                    
                    <AdherentList adherents={searchFilter} userprofile={userprofile} setFetchData={setFetchData} key={userprofile.id} />
                    <Pagination totalPerson={fetchData.length} personPerPage={personPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />

                </div>
                </>
                ):(
                    <>
                    <div className="account-connect bg-light">
                        <div className="account-acces">
                            <div className="row">
                                <div className="col">
                                    <h1 className="text-body-secondary mb-3">Bienvenue dans votre espace de travail...</h1>
                                    <p className="row justify-content-center mb-4 fs-5">
                                        Veuillez utiliser le boutton "Ajouter Adhérent" afin d'enroller votre premier adhérent...
                                    </p>
                                    <div className="d-flex justify-content-center">
                                        <Link to={'/adherent/ajouter'} className="">
                                            <button className="btn btn-primary" type="button"><i className="bi-person-plus-fill" style={{fontWeight: "900", paddingRight: "5px"}}></i>Ajouter Adhérent</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </>
                )}
                
            </div>
        </>
        )
    }
}

export default Commercial;