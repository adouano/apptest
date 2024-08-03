import React, { useState, useEffect } from 'react';
import supabase from '../config/dbConfig';
import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../config/userContext';
import { Alert } from 'react-bootstrap';

const LoginForm = () => {
  const { login, userError } = useAuth();
  const [password, setPassword] = useState('');  
  const [email, setEmail] = useState(null);
  const [errors, setErrors] = useState(null);
  const [fetchEmail, setFetchEmail] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!regex.test(email)){
      setErrors("Veuillez verifier le format email.");
    }
    if(email===null){
      setErrors("L'adresse email est obligatoire, veuillez remplir ce champ.");
      return;
    }
    if(!password){
      setErrors('Le mot de passe ne doit pas etre vide');
      return;
    }
    if(password.length < 8){
      setErrors('Le mot de passe doit contenir 8 caracteres au moins.');
      return;
    }

    try{
        const { data, error } = await supabase.from('associates').select().eq('email',email).single();

        if(!data.email){
          setErrors("Cette adresse email n'existe pas dans notre base de donnee.");
          return;
        }
        if(data.status !== true){
          setErrors("Veuillez contacter votre superviseur afin d'activer votre compte...");
          return;
        }
        if(data.supp_intention === true){
          setErrors("Ce compte a été supprimé...; veuillez contacter votre superviseur pour plus d'info.");
          return;
        }
        setProfile(data);
      }
      catch(error){
        console.log(error.message);
      }

    try{
      login(email, password);
      navigate('/');
    }
    catch(error){
      setErrors(error.message);
    }
  }

  useEffect(() => {
    const interval = setTimeout(() => setErrors(""), 4000);
    return () => clearTimeout(interval);
  }, [errors]);


  return (
    <>
      <section className="account-connect bg-light m-auto">
        <div className="account-acces py-3 py-md-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-8 col-md-5 col-lg-4 col-xl-4 col-xxl-4">
                <div className="card border border-light-subtle rounded-3 shadow-sm">
                  <div className="card-body p-3 p-md-4 p-xl-5">
                    <div className="text-center mb-3">
                      <a href="#!">
                        <img src='https://png.pngtree.com/png-clipart/20190611/original/pngtree-wolf-logo-png-image_2306634.jpg' alt='logo' className='img-responsive'  width="132" height="242" />
                      </a>
                    </div>
                    
                    <div className="fs-6 fw-normal text-center mb-5"><h3>Connectez-vous pour commencer...</h3></div>
                    {errors && <Alert className="alert alert-danger">{errors}</Alert>}
                    {userError && <Alert className="alert alert-danger">{userError}</Alert>}
                    <form>
                      <div className="row gy-2 overflow-hidden">
                        <div className="col-12">
                          <div className="form-floating mb-3">
                            <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} id="email" placeholder="" autoComplete="off" required />
                            <label htmlFor="email" className="form-label">Adresse email</label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-floating mb-3">
                            <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} id="password" placeholder="" required />
                            <label htmlFor="password" className="form-label">Mot de passe</label>
                          </div>
                        </div>

                        {/* <div className="col-12">
                          <div className="d-flex gap-2 justify-content-between">
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" value="" name="rememberMe" id="rememberMe" />
                              <label className="form-check-label text-secondary" htmlFor="rememberMe">Se Souvenir</label>
                            </div>
                            <a href="#!" className="link-primary text-decoration-none">Reinitialiser mot de passe?</a>
                          </div>
                        </div> */}

                        <div className="col-12">
                          <div className="d-grid my-2">
                            <button type="submit" className="btn btn-primary btn-lg w-100" onClick={handleLogin}>Se Connecter</button>
                          </div>
                        </div>
                        {/* <div className="col-12">
                          <p className="m-0 text-secondary text-center">Don't have an account? <a href="#!" className="link-primary text-decoration-none">Sign up</a></p>
                        </div> */}
                        <div className="row">
                          <div className="col-12">
                            <hr className="mt-2 mb-4 border-secondary-subtle" />
                            <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end">
                              <Link to={"/inscription"} className="text-center link-secondary text-decoration-none">Creer un compte</Link>
                              <Link to={"/resetpassword"} className="link-secondary text-decoration-none">Reinitialiser votre mot de passe</Link>
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
