import React from 'react'

const AjoutRelative = () => {
  return (
    <div className="container-xl p-5">
        <div className="container-fluid">
            <h1 class="page-title"> Nouveau Protégé </h1>
            <div className="col-md-12 col-lg-12">
                <form className="needs-validation" novalidate="" action="" method="">
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
  )
}

export default AjoutRelative;
