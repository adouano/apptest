import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import supabase from '../config/dbConfig';
import { useAuth } from '../config/userContext';
import LoadingPage from "./loading";
import AdherentList from "./adherentList";
import Pagination from "./pagination";
import ModalInfoAgent from './modal_agent';

const Administrator = ({userprofile}) => {
    const { user } = useAuth();
    const [fetchData, setFetchData] = useState([]);
    const [fetchAssoc, setFetchAssoc] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState([]);
    const [fetchError, setFetchError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [personPerPage, setPersonPerPage] = useState(9);

    let userId = user.id;

    const lastPostIndex = currentPage * personPerPage;
    const firstPostIndex = lastPostIndex - personPerPage;
    const currentPeople = fetchData.slice(firstPostIndex, lastPostIndex);

    const fetchPersons = async () => {
        try{
            const {data,error} = await supabase.from('dvenrollment').select(`*, dvrelatives(*), dvtransaction(*)`).order('created_at', { ascending: true });
    
            if(error){
                throw new Error("Could not fetch data.");
            }
            setFetchData(data);
            setFetchError(null);
            setTimeout(() => {
                setLoading(false)
            }, 3000);
        }
        catch(error){
            setFetchError(error.message);
            setFetchData(null);
        }
    };

    const associatesData = async() => {
        try{
            const {data,error} = await supabase.from('associates').select().eq('role', 'agent').limit(4);

            if(error){
                throw new Error("Unable to fetch associate data");
            }
            setFetchAssoc(data);
            setTimeout(() => {
                setLoading(false)
            }, 3000);
        }
        catch(error){
            setFetchError(error.message);
            setFetchAssoc(null);
        }
    };

    useEffect(() => {
        fetchPersons();
        associatesData();
    }, []);

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
    // let todayDate = new Date().toLocaleDateString();	

    if(loading){
      return(<LoadingPage />);
      }else{
        return(

            // currentUser ? (            
            <>
                <header className="bg-primary">
                    <div className="container-xl p-5">
                        <div className="row align-items-center justify-content-between">
                            <div className="col-12 col-md mb-4 mb-md-0">
                                <h1 className="mb-1 display-4 fw-500 text-white"> {hour < 12 ? "Bonjour":(hour < 17 ? "Bonsoir":"Bonne soiree")}, {userprofile.prenoms}!</h1>
                                <p className="lead mb-0 text-white"> {hour < 17 ? "Nous avons du boulot aujourd'hui!":"Demain est un autre jour; bon repos!!"}</p>
                            </div>
                            <div className="col-12 col-md-auto flex-shrink-0">
                                <label className="form-label text-white-50" htmlFor="litepickerDateRange">{todayDate}</label>
                                {/* <input type="date" className="form-control mb-0" id="litepickerDateRange" placeholder="Select date range..." /> */}
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
                                        <div className="display-5">3</div>
                                        <div className="card-text">Enregistrement du jour</div>
                                    </div>
                                    <div className="icon-circle text-black"><i className="bi-person-add" style={{fontSize: "5rem", color:"black"}}></i></div>
                                </div>
                            {/* <div className="card-text">
                                    <div className="d-inline-flex align-items-center">
                                        <i className="material-icons icon-xs text-success">arrow_upward</i>
                                        <div className="caption text-success fw-500 me-2">3%</div>
                                        <div className="caption">from last month</div>
                                    </div>
                                </div>*/}
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
                                    <div className="icon-circle text-black"><i className="bi-cash-coin" style={{fontSize: "5rem", color:"black"}}></i></div>
                                </div>
                                {/* <div className="card-text">
                                    <div className="d-inline-flex align-items-center">
                                        <i className="material-icons icon-xs text-success">arrow_upward</i>
                                        <div className="caption text-success fw-500 me-2">3%</div>
                                        <div className="caption">from last month</div>
                                    </div>
                                </div> */}
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
                                    <div className="icon-circle text-black"><i className="bi-wallet2" style={{fontSize: "5rem", color:"black"}}></i></div>
                                </div>
                                {/* <div className="card-text">
                                    <div className="d-inline-flex align-items-center">
                                        <i className="material-icons icon-xs text-success">arrow_upward</i>
                                        <div className="caption text-success fw-500 me-2">3%</div>
                                        <div className="caption">from last month</div>
                                    </div>
                                </div> */}
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
                                    <div className="icon-circle text-black"><i className="bi-people" style={{fontSize: "5rem", color:"black"}}></i></div>
                                </div>
                                {/* <div className="card-text">
                                    <div className="d-inline-flex align-items-center">
                                        <i className="material-icons icon-xs text-success">arrow_upward</i>
                                        <div className="caption text-success fw-500 me-2">3%</div>
                                        <div className="caption">from last month</div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-3 col-md-3 mb-5">
                        <div className="card card-raised border-start border-dark border-4">
                            <div className="card-body px-4">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <div className="me-2">
                                        <div className="display-5">101.1K</div>
                                        <div className="card-text">Nombre Total d'Adherents</div>
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
                        <div className="card card-raised border-start border-light border-4">
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
                        <div className="card card-raised border-start border-success border-4">
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
                        <div className="card card-raised border-start border-danger border-4">
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

                <div className="row gx-5">
                    <div className="col-xxl-4 col-md-4 mb-5">
                        <div className="card card-raised">
                            <div className="card-header">
                                <h4 className=""> Agents Commercials </h4>
                            </div>
                            {fetchAssoc.map((associat) => (
                            <div key={associat.id}>
                                <div className="p-2">
                                    <div className="card-body">
                                        {/* <svg className="bd-placeholder-img rounded-circle" width="120" height="120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-color)"></rect></svg> */}
                                        <div className='d-flex'>
                                            <img className="bd-placeholder-img rounded-circle" width="110" height="110" src={associat.photodeprofil} alt={associat.nomdefamille} />
                                            <div>
                                                <h4 className="card-title mt-1 ms-2"> {associat.nomdefamille} {associat.prenoms} </h4>
                                                <p className="card-text text-center"> {associat.role} </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-actions">
                                        <div className="d-flex justify-content-between gap-1">
                                            <ModalInfoAgent associate={associat} key={associat.id} />
                                            <button className="btn btn-dark" type="button">Bookmark</button>
                                        </div>
                                    </div>
                                </div>
                                <hr className="my-2" />
                            </div>
                            ))}
                            <div className='p-2'>
                                <div className='card-body text-center'><a href="/associates">Tous les partenaires <i className="bi-caret-right-fill" aria-hidden="true"></i> </a></div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xxl-8 col-lg-8 col-md-8 mb-5">
                        <div className="card mb-5">
                            <div className="card-header border-0">
                                <div className="d-flex justify-content-between">
                                    <h3 className="card-title">Statistiques</h3>
                                    <a href="#">View Report</a>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="d-flex">
                                    <p className="d-flex flex-column">
                                        <span className="text-bold text-lg">$18,230.00</span>
                                        <span>Sales Over Time</span>
                                    </p>
                                    <p className="ml-auto d-flex flex-column text-right">
                                        <span className="text-success"><i className="bi-arrow-up"></i> 33.1%</span>
                                        <span className="text-muted">Since last month</span>
                                    </p>
                                </div>

                                <div className="position-relative mb-4">
                                    <div className="chartjs-size-monitor">
                                        <div className="chartjs-size-monitor-expand">
                                            <div className=""></div>
                                        </div>
                                        <div className="chartjs-size-monitor-shrink">
                                            <div className=""></div>
                                        </div>
                                    </div>
                                    <canvas id="stat-chart" height="400" width="500" className="chartjs-render-monitor"></canvas>
                                </div>
                                <div className="d-flex flex-row justify-content-end">
                                    <span className="mr-2"><i className="bi-square text-primary"></i> This year</span>
                                    <span><i className="bi-square text-gray"></i> Last year</span>
                                </div>

                                {/* <StatistiquesGraph adherents={fetchData} /> */}
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header border-0">
                                <h3 className="card-title"> Vue d'ensemble </h3>
                                <div className="card-tools">
                                    <a href="#" className="btn btn-sm btn-tool"><i className="bi-download"></i></a>
                                    <a href="#" className="btn btn-sm btn-tool"><i className="bi-bars"></i></a>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center border-bottom mb-3">
                                    <p className="text-success text-xl"><i className="ion ion-ios-refresh-empty"></i></p>
                                    <p className="d-flex flex-column text-right">
                                        <span className="font-weight-bold"><i className="ion ion-android-arrow-up text-success"></i> 12%</span>
                                        <span className="text-muted">CONVERSION RATE</span>
                                    </p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center border-bottom mb-3">
                                    <p className="text-warning text-xl"><i className="ion ion-ios-cart-outline"></i></p>
                                    <p className="d-flex flex-column text-right">
                                        <span className="font-weight-bold"><i className="ion ion-android-arrow-up text-warning"></i> 0.8%</span>
                                        <span className="text-muted">SALES RATE</span>
                                    </p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-0">
                                    <p className="text-danger text-xl"><i className="ion ion-ios-people-outline"></i></p>
                                    <p className="d-flex flex-column text-right">
                                        <span className="font-weight-bold"><i className="ion ion-android-arrow-down text-danger"></i> 1%</span>
                                        <span className="text-muted">REGISTRATION RATE</span>
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="card card-raised">
                    <div className="card-header bg-transparent px-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="me-4">
                                <h2 className="card-title mb-0">List d'adherent</h2>
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
                                <Link to={'/ajout_adherent'}>
                                    <button className="btn btn-primary" type="button"><i className="bi-person-plus-fill" style={{fontWeight: "900", paddingRight: "5px"}}></i>Ajouter Adhérent</button>
                                </Link> 
                            </div>
                        </div>
                    </div>
                    
                    <AdherentList adherents={searchFilter} userprofile={userprofile} setFetchData={setFetchData} key={userprofile.id} />
                    <Pagination totalPerson={fetchData.length} personPerPage={personPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </div>
            </div>
            </>
            // ):(
            // <>
            //     <h1>Vous n'avez pas le droit d'etre sur cette page...</h1>
            // </>
            // )    
        )

    }
}

export default Administrator;
