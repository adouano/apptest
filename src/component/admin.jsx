import React, {useState, useEffect} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import supabase from '../config/dbConfig';
import { useAuth } from '../config/userContext';

const Administrator = ({profile}) => {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState(null);
  const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const userProfile = async () => {
    //         // const userId = user?.id;
    //         const { data, error } = await supabase
    //         .from('associates')
    //         .select();
    //         // .eq('associate_id', userId);
    //         setProfiles(data);
    //     }
    //     userProfile();
    // }, []);

    // let currentUser;
    // profiles?.map((profile) => {
    //     if(user?.id === profile.associate_id){
    //         currentUser = profile;
    //     }
    // });
    // console.log(currentUser);
       
    

    if(!loading){
        return(<div className="container-xl p-5">Loading...</div>);
      }else{
        return(

            // currentUser ? (            
            <>
                <header className="bg-primary">
                    <div className="container-xl p-5">
                        <div className="row align-items-center justify-content-between">
                            <div className="col-12 col-md mb-4 mb-md-0">
                                <h1 className="mb-1 display-4 fw-500 text-white">Welcome back, {profile.prenoms}!</h1>
                                <p className="lead mb-0 text-white">Your dashboard is ready to go!</p>
                            </div>
                            {/* <div className="col-12 col-md-auto flex-shrink-0">
                                <label className="form-label text-white-50" htmlFor="litepickerDateRange">Date range:</label>
                                <input type="date" className="form-control mb-0" id="litepickerDateRange" placeholder="Select date range..." />
                                <div className="litepicker-backdrop"></div>
                            </div> */}
                        </div>
                    </div>
                </header>

                {/* currentUser.role === 'admin' ? ():() */}
                <div className="container-xl p-5">
                    <div className="row gx-5">
                        <div className="col-xxl-3 col-md-6 mb-5">
                            <div className="card card-raised border-start border-primary border-4">
                                <div className="card-body px-4">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <div className="me-2">
                                            <div className="display-5">101.1K</div>
                                            <div className="card-text">Downloads</div>
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
                        <div className="col-xxl-3 col-md-6 mb-5">
                            <div className="card card-raised border-start border-warning border-4">
                                <div className="card-body px-4">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <div className="me-2">
                                            <div className="display-5">12.2K</div>
                                            <div className="card-text">Purchases</div>
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
                        <div className="col-xxl-3 col-md-6 mb-5">
                            <div className="card card-raised border-start border-secondary border-4">
                                <div className="card-body px-4">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <div className="me-2">
                                            <div className="display-5">5.3K</div>
                                            <div className="card-text">Customers</div>
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
                        <div className="col-xxl-3 col-md-6 mb-5">
                            <div className="card card-raised border-start border-info border-4">
                                <div className="card-body px-4">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <div className="me-2">
                                            <div className="display-5">7</div>
                                            <div className="card-text">Channels</div>
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
                        <div className="col-xxl-3 col-md-6 mb-5">
                            <div className="card card-raised border-start border-primary border-4">
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
                        <div className="col-xxl-3 col-md-6 mb-5">
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
                        <div className="col-xxl-3 col-md-6 mb-5">
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
                        <div className="col-xxl-3 col-md-6 mb-5">
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

                        <div className="row gx-5">
                            <div className="col-xxl-4 col-md-4 mb-5">

                            <div className="card card-raised">
                                <div className="card-header">
                                    <h4 className=""> Agents Commercials </h4>
                                </div>
                                <div className="p-2">
                                    <div className="card-body">
                                        <svg className="bd-placeholder-img rounded-circle" width="120" height="120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-color)"></rect></svg>
                                        <h2 className="card-title">Card Title</h2>
                                        <p className="card-text">Card Body</p>
                                    </div>
                                    <div className="card-actions">
                                        <div className="d-flex gap-3">
                                            <button className="btn btn-primary" type="button">Read</button>
                                            <button className="btn btn-dark" type="button">Bookmark</button>
                                        </div>
                                    </div>
                                </div>
                                <hr className="my-2" />
                                <div className="p-2">
                                    <div className="card-body">
                                        <svg className="bd-placeholder-img rounded-circle" width="120" height="120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-color)"></rect></svg>
                                        <h2 className="card-title">Card Title</h2>
                                        <p className="card-text">Card Body</p>
                                    </div>
                                    <div className="card-actions">
                                        <div className="d-flex gap-3">
                                            <button className="btn btn-primary" type="button">Read</button>
                                            <button className="btn btn-dark" type="button">Bookmark</button>
                                        </div>
                                    </div>
                                </div>
                                <hr className="my-2" />
                                <div className="p-2">
                                    <div className="card-body">
                                        <svg className="bd-placeholder-img rounded-circle" width="120" height="120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-color)"></rect></svg>
                                        <h2 className="card-title">Card Title</h2>
                                        <p className="card-text">Card Body</p>
                                    </div>
                                    <div className="card-actions">
                                        <div className="d-flex gap-3">
                                            <button className="btn btn-primary" type="button">Read</button>
                                            <button className="btn btn-dark" type="button">Bookmark</button>
                                        </div>
                                    </div>
                                </div>
                                <hr className="my-2" />
                                <div className="p-2">
                                    <div className="card-body">
                                        <svg className="bd-placeholder-img rounded-circle" width="120" height="120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-color)"></rect></svg>
                                        <h2 className="card-title">Card Title</h2>
                                        <p className="card-text">Card Body</p>
                                    </div>
                                    <div className="card-actions">
                                        <div className="d-flex gap-3">
                                            <button className="btn btn-primary" type="button">Read</button>
                                            <button className="btn btn-dark" type="button">Bookmark</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                            <div className="col-xxl-8 col-lg-8 col-md-8 mb-5">
                                <div className="card mb-5">
                                    <div className="card-header border-0">
                                        <div className="d-flex justify-content-between">
                                            <h3 className="card-title">Sales</h3>
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
                                                <span className="text-success"><i className="fas fa-arrow-up"></i> 33.1%</span>
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
                                            <canvas id="sales-chart" height="400" width="1014" className="chartjs-render-monitor"></canvas>
                                        </div>
                                        <div className="d-flex flex-row justify-content-end">
                                            <span className="mr-2"><i className="fas fa-square text-primary"></i> This year</span>
                                            <span><i className="fas fa-square text-gray"></i> Last year</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-header border-0">
                                        <h3 className="card-title">Online Store Overview</h3>
                                        <div className="card-tools">
                                            <a href="#" className="btn btn-sm btn-tool"><i className="fas fa-download"></i></a>
                                            <a href="#" className="btn btn-sm btn-tool"><i className="fas fa-bars"></i></a>
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
                                                <input type="text" name="table_search" className="form-control float-right" placeholder="Recherche" />
                                                <div className="input-group-append">
                                                    <button type="submit" className="btn btn-secondary">Rechercher</button>
                                                </div>
                                            </div>
                                        </div>                            
                                        <Link to={'/ajout_adherent'}>
                                            <button className="btn btn-primary" type="button">Ajouter Adherent</button>
                                        </Link> 
                                    </div>
                                </div>
                            </div>
                            
                            <table className="table table-hover">
                                <thead className="">
                                <tr>
                                    <th scope="col"> Ordre </th>
                                    <th scope="col"> Nom </th>
                                    <th scope="col"> Prenoms </th>
                                    <th scope="col"> Sexe </th>
                                    <th scope="col"> Ville </th>
                                    <th scope="col"> Nationalité </th>
                                    <th scope="col"> Contact </th>
                                    <th scope="col"> Actions </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>H</td>
                                    <td> Bouake </td>
                                    <td> Ivoirienne </td>
                                    <td> 09873435456 </td>
                                    <td className="d-flex gap-2">
                                        <a type="button" className="btn btn-success bg-gradient" href="details-adherent.html">Infos</a>
                                        <a type="button" className="btn btn-warning bg-gradient" href="">Modifier</a>
                                        <a type="button" className="btn btn-danger bg-gradient" href="">Supprimer</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>F</td>
                                    <td> Man </td>
                                    <td> Malienne </td>
                                    <td> 7834545539 </td>
                                    <td>
                                        <a type="button" className="btn btn-success bg-gradient" href="details-adherent.html">Infos</a>
                                        <a type="button" className="btn btn-warning bg-gradient" href="">Modifier</a>
                                        <a type="button" className="btn btn-danger bg-gradient" href="">Supprimer</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Konan</td>
                                    <td>Franck</td>
                                    <td> F </td>
                                    <td>Dabou</td>
                                    <td> Burkinabe </td>
                                    <td> 2345278689 </td>
                                    <td>
                                        <a type="button" className="btn btn-success bg-gradient" href="details-adherent.html">Infos</a>
                                        <a type="button" className="btn btn-warning bg-gradient" href="">Modifier</a>
                                        <a type="button" className="btn btn-danger bg-gradient" href="">Supprimer</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">4</th>
                                    <td>Amadou</td>
                                    <td>Herve</td>
                                    <td> H </td>
                                    <td> Odienne </td>
                                    <td> Ivoirienne </td>
                                    <td> 9802267402 </td>
                                    <td>
                                        <a type="button" className="btn btn-success bg-gradient" href="details-adherent.html">Infos</a>
                                        <a type="button" className="btn btn-warning" href="">Modifier</a>
                                        <a type="button" className="btn btn-danger" href="">Supprimer</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">5</th>
                                    <td>Gnaore</td>
                                    <td>Fulgence</td>
                                    <td> H </td>
                                    <td> Daloa </td>
                                    <td> Ivoirienne </td>
                                    <td> 9802267402 </td>
                                    <td>
                                        <a type="button" className="btn btn-success bg-gradient" href="details-adherent.html">Infos</a>
                                        <a type="button" className="btn btn-warning" href="">Modifier</a>
                                        <a type="button" className="btn btn-danger" href="">Supprimer</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">6</th>
                                    <td>Koffi</td>
                                    <td>Olivier</td>
                                    <td> H </td>
                                    <td> Yakro </td>
                                    <td> Ivoirienne </td>
                                    <td> 9802267402 </td>
                                    <td>
                                        <a type="button" className="btn btn-success bg-gradient" href="details-adherent.html">Infos</a>
                                        <a type="button" className="btn btn-warning" href="">Modifier</a>
                                        <a type="button" className="btn btn-danger" href="">Supprimer</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">7</th>
                                    <td>Kone</td>
                                    <td>Mamadou</td>
                                    <td> H </td>
                                    <td> Korhogo </td>
                                    <td> Ivoirienne </td>
                                    <td> 9802267402 </td>
                                    <td>
                                        <a type="button" className="btn btn-success bg-gradient" href="details-adherent.html">Infos</a>
                                        <a type="button" className="btn btn-warning" href="">Modifier</a>
                                        <a type="button" className="btn btn-danger" href="">Supprimer</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">8</th>
                                    <td>Yapi</td>
                                    <td>Honorine</td>
                                    <td> H </td>
                                    <td> Agboville </td>
                                    <td> Ivoirienne </td>
                                    <td> 9802267402 </td>
                                    <td>
                                        <a type="button" className="btn btn-success bg-gradient" href="details-adherent.html">Infos</a>
                                        <a type="button" className="btn btn-warning" href="">Modifier</a>
                                        <a type="button" className="btn btn-danger" href="">Supprimer</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">9</th>
                                    <td>Zadi</td>
                                    <td>Claude</td>
                                    <td> H </td>
                                    <td> Gagnoa </td>
                                    <td> Ivoirienne </td>
                                    <td> 9802267402 </td>
                                    <td>
                                        <a type="button" className="btn btn-success bg-gradient" href="details-adherent.html">Infos</a>
                                        <a type="button" className="btn btn-warning" href="">Modifier</a>
                                        <a type="button" className="btn btn-danger" href="">Supprimer</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">10</th>
                                    <td>Backary</td>
                                    <td>Issouf</td>
                                    <td> H </td>
                                    <td> Katiola </td>
                                    <td> Ivoirienne </td>
                                    <td> 9802267402 </td>
                                    <td>
                                        <a type="button" className="btn btn-success bg-gradient" href="details-adherent.html">Infos</a>
                                        <a type="button" className="btn btn-warning" href="">Modifier</a>
                                        <a type="button" className="btn btn-danger" href="">Supprimer</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">11</th>
                                    <td>Yao</td>
                                    <td>Nestor</td>
                                    <td> H </td>
                                    <td> San-Pedro </td>
                                    <td> Ivoirienne </td>
                                    <td> 9802267402 </td>
                                    <td>
                                        <a type="button" className="btn btn-success bg-gradient" href="details-adherent.html">Infos</a>
                                        <a type="button" className="btn btn-warning" href="">Modifier</a>
                                        <a type="button" className="btn btn-danger" href="">Supprimer</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">12</th>
                                    <td>Oulai</td>
                                    <td>Pascal</td>
                                    <td> H </td>
                                    <td> Divo </td>
                                    <td> Ivoirienne </td>
                                    <td> 9802267402 </td>
                                    <td>
                                        <a type="button" className="btn btn-success bg-gradient" href="details-adherent.html">Infos</a>
                                        <a type="button" className="btn btn-warning" href="">Modifier</a>
                                        <a type="button" className="btn btn-danger" href="">Supprimer</a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>

                            <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                                <li className="page-item disabled">
                                <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
                                </li>
                                <li className="page-item"><a className="page-link" href="#">1</a></li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item">
                                <a className="page-link" href="#">Next</a>
                                </li>
                            </ul>
                            </nav>
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
