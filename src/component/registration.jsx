import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { Alert } from 'react-bootstrap';

const AccountCreation = () => {
    const [userData, setUserData] = useState({
        nomfamille:"",
        prenoms:"",
        lieumission:"",
        role:"",
        telephone:"",
        email:"",
        password:"",
        confirmpassword:"",
        profilephoto:""
    });
    const [userError, setUserError] = useState();
    const [profilePhoto, setProfilePhoto] = useState();

    // const handleFileChange = (e) => {
    //     const imgURL = URL.createObjectURL(e.target.files[0]);
    //     setProfilePhoto(imgURL);
    // }

    const handleOnChange = (e) => {
        const {name,value,files} = e.target;
        setUserData({...userData, [name]:value});
        if(files){
            setProfilePhoto(URL.createObjectURL(files[0]));
        }        
    }

        const handleSubmit = (e) => {
        console.log(userData);
        e.preventDefault();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!userData.nomfamille || !userData.prenoms || !userData.lieumission || !userData.role || !userData.telephone || !userData.email || !userData.password || !userData.confirmpassword || !userData.profilephoto){
            setUserError("Tous les champs sont obligatoires.");
            return;
        }
        if(userData.password.length < 8){
            setUserError("Le mot de passe doit contenir 8 caracteres au moins.");
            return;
        }
        if(userData.password !== userData.confirmpassword){
            setUserError("Les mots de passe doivent etre identique.");
            return;
        }
        if(!regex.test(userData.email)){
            setUserError("Veuillez verifier le format de l'adresse email.");
            return;
        }

        // Create user auth account
        // Create user profile account with userAuthId
    }
    console.log(userError);

  return (
    <>
    <section className="p-3 p-md-4 p-xl-5 bg-light m-auto">
        <div className="container">
            <div className="card border-light-subtle shadow-sm">
                <div className="row g-0">
                    <div className="col-12 col-md-6 text-bg-primary">
                        <div className="d-flex align-items-center justify-content-center h-100">
                            <div className="col-10 col-xl-8 py-3">
                            <img src='https://png.pngtree.com/png-clipart/20190611/original/pngtree-wolf-logo-png-image_2306634.jpg' alt='logo' className="img-fluid rounded mb-4" loading="lazy" width="132" height="242" />
                            <hr className="border-primary-subtle mb-4" />
                            <h2 className="h1 mb-4">Merci de rejoindre notre groupe.</h2>
                            <p className="lead m-0">Nous valorisons les compétences et les talents de tous et souhaitons aider à installer nos compatriotes et à réussir dans leur vie aux États-Unis.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="card-body p-3 p-md-4 p-xl-5">
                            <div className="row">
                                <div className="col-12">
                                    <div className="mb-5"><h3>Creation de votre compte</h3></div>
                                </div>
                            </div>
                            {userError && <Alert className="alert alert-danger">{userError}</Alert>}
                            <form onSubmit={handleSubmit}>
                                <div className="row gy-3 gy-md-4 overflow-hidden">
                                    <div className="input-group mb-3">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" name="nomfamille" placeholder='' onChange={handleOnChange} required />
                                            <label>Nom</label>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" name="prenoms" placeholder='' onChange={handleOnChange} required />
                                            <label>Prenoms</label>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="form-floating">
                                            <select className="form-control form-select" name="lieumission" placeholder='' onChange={handleOnChange} required>
                                                <option value=''>Choisez une ville</option>
                                                <option value={'#'}>Daloa</option>
                                                <option value={'#'}>Vavoua</option>
                                            </select>
                                            <label>Localisation</label>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="form-floating">
                                            <select className="form-control form-select" name="role" placeholder='' onChange={handleOnChange} required>
                                                <option value="">Groupe de travail</option>
                                                <option value="agent">Commercial</option>
                                                <option value="admin">Administrateur</option>
                                                <option value="supervisor">Superviseur</option>
                                                <option value="finance">Finance</option>
                                            </select>
                                            <label>Groupe de travail</label>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" name="telephone" placeholder='' onChange={handleOnChange} required />
                                            <label>Telephone</label>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="form-floating">
                                            <input type="email" className="form-control" name="email" placeholder='' onChange={handleOnChange} required />
                                            <label>Votre adresse email</label>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="form-floating">
                                            <input type="password" className="form-control" name="password" minLength="8" placeholder='' onChange={handleOnChange} required />
                                            <label>Mot de passe</label>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="form-floating">
                                            <input type="password" className="form-control" name="confirmpassword" minLength="8" placeholder='' onChange={handleOnChange} required />
                                            <label>Confirmer mot de passe</label>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="form-floating">
                                            <input type="file" className="form-control" name="profilephoto" placeholder='' onChange={handleOnChange} required />
                                            <label>Photo de profil</label>
                                        </div>
                                        <div className="col-md-12 mt-2 d-flex justify-content-center">
                                            {profilePhoto &&
                                                <div className="pprofile"><img src={profilePhoto} alt='' className='preview' /></div>
                                            }
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-8"></div>
                                        <div className="col-4">
                                            <button type="submit" className="btn btn-primary w-100" onClick={handleSubmit}>S'inscrire</button>
                                        </div>
                                    </div>
                                </div>
                            </form>


                            <div className="row">
                                <div className="col-12">
                                    <hr className="mt-5 mb-4 border-secondary-subtle"/>
                                    <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end">
                                        <Link to={'/'} className="text-center link-secondary text-decoration-none">Connectez-vous si vous avez deja un compte</Link>
                                    </div>
                                </div>
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

export default AccountCreation;














