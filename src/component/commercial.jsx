import React, { useState, useEffect } from "react";
import supabase from "../config/dbConfig";
// import { Button, Pagination } from "react-bootstrap";
import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../config/userContext';
import LoadingPage from "./loading";
import AdherentList from "./adherentList";
import Pagination from "./pagination";
import AjoutAdherent from "../pages/adherents/ajouter";

const Commercial = ({userprofile}) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [fetchData, setFetchData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [personPerPage, setPersonPerPage] = useState(10);

    let userId = user.id;
    let todayDate = new Date().toDateString();

    const lastPostIndex = currentPage * personPerPage;
    const firstPostIndex = lastPostIndex - personPerPage;
    const currentPeople = fetchData.slice(firstPostIndex, lastPostIndex);

    const fetchPersons = async () => {
        try{
            const {data,error} = await supabase.from('dvenrollment').select()
            .order('created_at', { ascending: true })
            .eq('agent_id', userId);
    
            if(error){
                throw new Error("Could not fetch data.");
            }
            setFetchData(data);
            setFetchError(null);
            setLoading(false);
        }
        catch(error){
            setFetchError(error.message);
            setFetchData(null);
        }
    };

    useEffect(() => {
        fetchPersons();
    }, []);

    // console.log();


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
    
    // const handleSearch = (e) => {
    //     setSearch(e.target.value);
    // }

    // let searchFilter = fetchData;
    // if(search){
    //     searchFilter = fetchData.filter((itemData) => {
    //         const itemName = itemData.item_name.toLowerCase().includes(search.toLowerCase());
    //         const itemDesc = itemData.description.toLowerCase().includes(search.toLowerCase());
    //         const itemCondition = itemData.item_condition.toLowerCase().includes(search.toLowerCase());
    //         const itemCategory = itemData.categories.name.toLowerCase().includes(search.toLowerCase());
    //         return itemName || itemDesc || itemCondition || itemCategory;
    //     });
    // }

    const date = new Date();
    const hour = date.getHours();

    if(loading){
      return(<LoadingPage />);
      }else{
    return(
        <>
            <header className="bg-primary">
                <div className="container-xl p-5">
                    <div className="row align-items-center justify-content-between">
                        <div className="col-12 col-md mb-4 mb-md-0">
                            <h1 className="mb-1 display-4 fw-500 text-white"> {hour < 12 ? "Bonjour":(hour < 17 ? "Bonsoir":"Bonne soiree")}, {userprofile.prenoms}!</h1>
                            <p className="lead mb-0 text-white"> {hour < 17 ? "Nous avons du boulot aujourd'hui!":"Demain est un autre jour; bon repos!!"}</p>
                        </div>
                        {/* <div className="col-12 col-md-auto flex-shrink-0">
                            <label className="form-label text-white-50" htmlFor="litepickerDateRange">Date range:</label>
                            <input type="date" className="form-control mb-0" id="litepickerDateRange" placeholder="Select date range..." />
                            <div className="litepicker-backdrop"></div>
                        </div> */}
                    </div>
                </div>
            </header>

            <div className="container-xl p-5">
                <div className="row gx-5">
                    <div className="col-xxl-3 col-md-6 mb-5">
                        <div className="card card-raised border-start border-primary border-4">
                            <div className="card-body px-4">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <div className="me-2">
                                        <div className="display-5">3</div>
                                        <div className="card-text">Enregistrement du jour</div>
                                    </div>
                                    <div className="icon-circle text-black"><i className="bi-person-add" style={{fontSize: "5rem", color:"black"}}></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-3 col-md-6 mb-5">
                        <div className="card card-raised border-start border-warning border-4">
                            <div className="card-body px-4">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <div className="me-2">
                                        <div className="display-5">12</div>
                                        <div className="card-text">Payement effectue</div>
                                    </div>
                                    <div className="icon-circle text-black"><i className="bi-cash-coin" style={{fontSize: "5rem", color:"black"}}></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-3 col-md-6 mb-5">
                        <div className="card card-raised border-start border-secondary border-4">
                            <div className="card-body px-4">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <div className="me-2">
                                        <div className="display-5">500</div>
                                        <div className="card-text">Bonus sur paiement</div>
                                    </div>
                                    <div className="icon-circle text-black"><i className="bi-wallet2" style={{fontSize: "5rem", color:"black"}}></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-3 col-md-6 mb-5">
                        <div className="card card-raised border-start border-info border-4">
                            <div className="card-body px-4">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <div className="me-2">
                                        <div className="display-5">{fetchData.length}</div>
                                        <div className="card-text">Total Enregistrer</div>
                                    </div>
                                    <div className="icon-circle text-black"><i className="bi-people" style={{fontSize: "5rem", color:"black"}}></i></div>
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
                                        <input type="text" name="table_search" className="form-control float-right" placeholder="Recherche" />
                                        <div className="input-group-append">
                                            <button type="submit" className="btn btn-secondary">Rechercher</button>
                                        </div>
                                    </div>
                                </div>
                                <Link to={'/adherent/ajouter'}>
                                    <button className="btn btn-primary" type="button"><i className="bi-person-plus-fill" style={{fontWeight: "900", paddingRight: "5px"}}></i>Ajouter Adherent</button>
                                </Link>                            
                            </div>
                        </div>
                    </div>

                    <AdherentList fetchData={currentPeople} />
                    <Pagination totalPerson={fetchData.length} personPerPage={personPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />

                </div>
            </div>
        </>
        )
    }
}

export default Commercial;