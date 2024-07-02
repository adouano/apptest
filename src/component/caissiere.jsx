import React from 'react';
import {Link} from 'react-router-dom';
import Versements from './versements';

const Caissiere = () => {
    return(
        <>
        <header className="bg-primary">
            <div className="container-xl p-5">
                <div className="row align-items-center justify-content-between">
                    <div className="col-12 col-md mb-4 mb-md-0">
                        <h1 className="mb-1 display-4 fw-500 text-white">Welcome back, Robert!</h1>
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

        <div className="container-xl p-5">
            <div className="row gx-5">
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
                        </div>
                    </div>
                </div>
                
                <table className="table table-hover">
                    <thead className="">
                    <tr>
                        <th scope="col"> Num Dossier </th>
                        <th scope="col"> Nom </th>
                        <th scope="col"> Prenoms </th>
                        <th scope="col"> Nombre de protéger</th>
                        <th scope="col"> Montant Du </th>
                        <th scope="col"> Montant Verse </th>
                        <th scope="col"> Reste a payer </th>
                        <th scope="col"> Actions </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">2024GC85412</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>4</td>
                        <td> 13000 </td>
                        <td> 9000 </td>
                        <td> 4000 </td>
                        <td className="d-flex gap-2">
                            <Link to={'/info_adherent'}>
                                <button className="btn btn-info bg-gradient">Infos</button>
                            </Link>
                            <Versements/>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">2024GC12975</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>2</td>
                        <td> 9000 </td>
                        <td> 9000 </td>
                        <td> 0 </td>
                        <td className="d-flex gap-2">
                            <Link to={'/info_adherent'}>
                                <button className="btn btn-info bg-gradient">Infos</button>
                            </Link>
                            <Versements/>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">2024GC51132</th>
                        <td>Konan</td>
                        <td>Franck</td>
                        <td> 0 </td>
                        <td>5000</td>
                        <td> 3500 </td>
                        <td> 1500 </td>
                        <td className="d-flex gap-2">
                            <Link to={'/info_adherent'}>
                                <button className="btn btn-info bg-gradient">Infos</button>
                            </Link>
                            <Versements/>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">2024GC85412</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>4</td>
                        <td> 13000 </td>
                        <td> 9000 </td>
                        <td> 4000 </td>
                        <td className="d-flex gap-2">
                            <Link to={'/info_adherent'}>
                                <button className="btn btn-info bg-gradient">Infos</button>
                            </Link>
                            <Versements/>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">2024GC12975</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>2</td>
                        <td> 9000 </td>
                        <td> 9000 </td>
                        <td> 0 </td>
                        <td>
                            <a type="button" className="btn btn-success bg-gradient" href="details-adherent.html">Infos</a>
                            <a type="button" className="btn btn-warning bg-gradient" href="">Modifier</a>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">2024GC51132</th>
                        <td>Konan</td>
                        <td>Franck</td>
                        <td> 0 </td>
                        <td>5000</td>
                        <td> 3500 </td>
                        <td> 1500 </td>
                        <td>
                            <a type="button" className="btn btn-success bg-gradient" href="details-adherent.html">Infos</a>
                            <a type="button" className="btn btn-warning bg-gradient" href="">Modifier</a>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">2024GC85412</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>4</td>
                        <td> 13000 </td>
                        <td> 9000 </td>
                        <td> 4000 </td>
                        <td className="d-flex gap-2">
                            <a type="button" className="btn btn-success bg-gradient" href="details-adherent.html">Infos</a>
                            <a type="button" className="btn btn-warning bg-gradient" href="">Modifier</a>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">2024GC12975</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>2</td>
                        <td> 9000 </td>
                        <td> 9000 </td>
                        <td> 0 </td>
                        <td>
                            <a type="button" className="btn btn-success bg-gradient" href="details-adherent.html">Infos</a>
                            <a type="button" className="btn btn-warning bg-gradient" href="">Modifier</a>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">2024GC51132</th>
                        <td>Konan</td>
                        <td>Franck</td>
                        <td> 0 </td>
                        <td>5000</td>
                        <td> 3500 </td>
                        <td> 1500 </td>
                        <td>
                            <a type="button" className="btn btn-success bg-gradient" href="details-adherent.html">Infos</a>
                            <a type="button" className="btn btn-warning bg-gradient" href="">Modifier</a>
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
    )
}

export default Caissiere;
