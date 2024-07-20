import React from 'react';
import {Link} from 'react-router-dom';


const ResetPassword = () => {
    const handleReset = () => {
        // let { data, error } = await supabase.auth.resetPasswordForEmail(email);
    }


    return (
        <>
        <section className="account-connect bg-light m-auto">
            <div className="account-acces py-3 py-md-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
                        
                        <small>Page en cours de construction</small>

                        <div className="card border border-light-subtle rounded-3 shadow-sm">
                            <div className="card-body p-3 p-md-4 p-xl-5">
                                <div className="text-center mb-3">                                
                                    <h3><i className="fa fa-lock fa-4x"></i></h3>
                                    <h2 className="text-center"> Avez-vous oublier votre mot de passe ?</h2>
                                    <p> Vous pouvez reinitialiser votre mot de passe ici...</p>
                        
                                    <form>                        
                                        <div className="form-group mb-3">
                                            <div className="input-group">
                                                <span className="input-group-addon"><i className="bi-envelope-at-fill" style={{height: '64px', weight: '64px'}}></i></span>
                                                <input name="email" placeholder="email address" className="form-control" type="email" autoComplete='off' />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary w-100" onClick={handleReset}> Reinitialiser </button>
                                        </div>
                                        
                                        <input type="hidden" className="hide" name="token" id="token" value="" /> 
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-center mt-4">
                            <Link to={'/connexion'} className="text-center link-secondary text-decoration-none">Connexion</Link>
                            <Link to={"/inscription"} className="text-center link-secondary text-decoration-none">S'inscrire</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default ResetPassword
