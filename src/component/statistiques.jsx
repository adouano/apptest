import React from 'react';

const Statistiques = () => {
  return (
    <>
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
    </>
  )
}

export default Statistiques
