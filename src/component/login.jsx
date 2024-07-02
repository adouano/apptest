import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { useAuth } from '../config/userContext';

const LoginForm = () => {

//   const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement login logic (e.g., call login method from AuthContext)
    login({ username, password });
  };

  return (
    <>

      <section className="account-connect bg-light m-auto">
      <div className="account-acces py-3 py-md-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
              <div className="card border border-light-subtle rounded-3 shadow-sm">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <div className="text-center mb-3">
                    <a href="#!">
                      <img src='https://png.pngtree.com/png-clipart/20190611/original/pngtree-wolf-logo-png-image_2306634.jpg' alt='logo' className='img-responsive'  width="132" height="242" />
                    </a>
                  </div>
                  
                  <div className="fs-6 fw-normal text-center mb-5"><h3>Connectez-vous pour commencer...</h3></div>
                  
                  <form>
                    <div className="row gy-2 overflow-hidden">
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input type="email" className="form-control" name="email" id="email" placeholder="" required />
                          <label htmlFor="email" className="form-label">Adresse email</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input type="password" className="form-control" name="password" id="password" placeholder="" required />
                          <label htmlFor="password" className="form-label">Mot de passe</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-flex gap-2 justify-content-between">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" name="rememberMe" id="rememberMe" />
                            <label className="form-check-label text-secondary" htmlFor="rememberMe">Se Souvenir</label>
                          </div>
                          {/* <a href="#!" className="link-primary text-decoration-none">Reinitialiser mot de passe?</a> */}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-grid my-3">
                          <button type="submit" className="btn btn-primary btn-lg w-100" onClick={handleLogin}>Se Connecter</button>
                        </div>
                      </div>
                      {/* <div className="col-12">
                        <p className="m-0 text-secondary text-center">Don't have an account? <a href="#!" className="link-primary text-decoration-none">Sign up</a></p>
                      </div> */}
                      <div className="row">
                          <div className="col-12">
                              <hr className="mt-5 mb-4 border-secondary-subtle" />
                              <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end">
                              <Link to={"./inscription"} className="text-center link-secondary text-decoration-none">Creer un compte</Link>
                              <a href="#!" className="link-secondary text-decoration-none">Reinitialiser votre mot de passe</a>
                              </div>
                          </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
        </>
  )
}

export default LoginForm;
