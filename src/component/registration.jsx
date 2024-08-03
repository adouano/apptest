import React, {useState, useEffect} from 'react';
import supabase from '../config/dbConfig';
import { useAuth } from '../config/userContext';
import {Link, useNavigate} from 'react-router-dom';
import { Alert } from 'react-bootstrap';

const AccountCreation = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
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
    const [imgSrc, setImgSrc] = useState('');
    const [mlocation, setMlocation] = useState([]);
    const [delCode, setDelCode] = useState(0);
    useEffect(() => {
        const NumAleatoire = () => {
            return Math.floor(Math.random() * (99999 - 1 + 1)) + 1;
        }
        setDelCode(NumAleatoire());
    }, []);

    useEffect(() => {
        const fetchLocation = async() => {
            try{
                const { data, error } = await supabase.from('lieu_mission').select();
                
                if(!error){
                    setMlocation(data);
                }
            }
            catch(error){
                console.log(error.message);
            }
        }
        fetchLocation();
    }, []);

    const [numCode, setNumCode] = useState(0);
    useEffect(() => {
        const NumAleatoire = () => {
            return Math.floor(Math.random() * (999 - 1 + 1)) + 1;
        }
        setNumCode(NumAleatoire());
    }, []);
    const userCode = new Date().getFullYear()+'GC'+numCode;

    const handleOnChange = (e) => {
        const {name,value,files} = e.target;
        setUserData({...userData, [name]:value});

        const file = e.target.files?.[0];
        const imgType = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if(!imgType.includes(file.type)){
            setUserError("Extension d'image invalide");
            return;
        } 
        if(files){
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                const imageUrl = reader.result?.toString() || '' ;
                setImgSrc(imageUrl);
            });
            reader.readAsDataURL(file);
            setProfilePhoto(URL.createObjectURL(files[0]));
        }        
    }

    const handleSubmit = async(e) => {

        console.log(imgSrc);
        console.log(userData.profilephoto);

        e.preventDefault();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!userData.nomfamille || !userData.prenoms || !userData.lieumission || !userData.role || !userData.telephone || !userData.email || !userData.password || !userData.confirmpassword){
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

        // const file = e.target.files?.[0];
        // if(!imgType.includes(file.type)){
        //     setUserError("Extension d'image invalide");
        //     return;
        // } 

        // const reader = new FileReader();
        // reader.addEventListener('load', () => {
        //     const imageUrl = reader.result?.toString() || '' ;
        //     setImgSrc(imageUrl);
        // });
        // reader.readAsDataURL(file);

        // // Verification email
        // useEffect(async () => {
            // const { data, error } = await supabase
            //     .from('Users')
            //     .select('Email');
            // console.log(data);
        // }, []);        
        

        // Create user account
        try{
            // user auth
            const { data, error } = await supabase.auth.signUp({
                email: userData.email,
                password: userData.password
            });

            //user public account
            if(data && !error){
                const userId = data.user.id;
                // const saveProfileImg = e.target.files[0];
                // await supabase.storage
                // .from('associatesimg')
                // .upload(userId + '/' + getFullYear(), userData.profilephoto)
                // .select();

                await supabase
                .from("associates")
                .insert({
                    associate_id: data.user.id,
                    nomdefamille: userData.nomfamille,
                    prenoms: userData.prenoms,
                    lieudemission: userData.lieumission,
                    role: userData.role,
                    num_telephone: userData.telephone,
                    photodeprofil: imgSrc,
                    email:data.email,
                    status:'false',
                    supp_intention:'false',
                    supp_code:delCode
                })
                // .single()
                // .returning('id');
                
            }

            setUserError("");
            navigate('/reg_success');
            // return ("Registration successful.");
        }
        catch(error){
            setUserError(error.message);
        }
    }

  return (
    <>
    <section className="p-3 p-md-4 p-xl-5 bg-light m-auto">
        <div className="container">
            <div className="card border-light-subtle shadow-sm">
                <div className="row g-0">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-5 text-bg-primary">
                        <div className="d-flex align-items-center justify-content-center h-100">
                            <div className="col-10 col-xl-8 py-3">
                            <img src='https://png.pngtree.com/png-clipart/20190611/original/pngtree-wolf-logo-png-image_2306634.jpg' alt='logo' className="img-fluid rounded mb-4" loading="lazy" width="132" height="242" />
                            <hr className="border-primary-subtle mb-4" />
                            <h2 className="h1 mb-4">Bienvenue dans notre equipe.</h2>
                            <p className="lead m-0">Nous valorisons les compétences et les talents de tous et souhaitons aider à installer nos compatriotes et à réussir dans leur vie aux États-Unis.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-8 col-xxl-7">
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
                                            <input type="text" className="form-control" name="nomfamille" id="nomfamille" placeholder='' onChange={handleOnChange} required />
                                            <label htmlFor='nomfamille'>Nom</label>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" name="prenoms" id="prenoms" placeholder='' onChange={handleOnChange} required />
                                            <label htmlFor='prenoms'>Prenoms</label>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="form-floating">
                                            <select className="form-control form-select" name="lieumission" id="lieumission" placeholder='' onChange={handleOnChange} required>
                                                <option value=''>Choisez une ville</option>
                                                {mlocation.map((lelocal, index) => (
                                                    <option key={lelocal.id} value={lelocal.libelle}>{lelocal.libelle}</option>
                                                ))}
                                            </select>
                                            <label htmlFor='lieumission'>Localisation</label>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="form-floating">
                                            <select className="form-control form-select" name="role" id="role" placeholder='' onChange={handleOnChange} required>
                                                <option value="">Groupe de travail</option>
                                                <option value="agent">Commercial</option>
                                                <option value="admin">Administrateur</option>
                                                <option value="supervisor">Superviseur</option>
                                                <option value="finance">Finance</option>
                                            </select>
                                            <label htmlFor='role'>Groupe de travail</label>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" name="telephone" id="telephone" placeholder='' maxLength="10" onChange={handleOnChange} required />
                                            <label htmlFor='telephone'>Telephone</label>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="form-floating">
                                            <input type="email" className="form-control" name="email" id="email" placeholder='' onChange={handleOnChange} autoComplete="off" required />
                                            <label htmlFor='email'>Votre adresse email</label>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="form-floating">
                                            <input type="password" className="form-control" name="password" id="password" minLength="8" placeholder='' onChange={handleOnChange} required />
                                            <label htmlFor='password'>Mot de passe</label>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="form-floating">
                                            <input type="password" className="form-control" name="confirmpassword" id="confirmpassword" minLength="8" placeholder='' onChange={handleOnChange} required />
                                            <label htmlFor='confirmpassword'>Confirmer mot de passe</label>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="form-floating">
                                            <input type="file" className="form-control" name="saveProfileImg" accept='image/jpg, image/jpeg, image/png, image/webp' id="profilephoto" placeholder='' onChange={handleOnChange} required />
                                            <label htmlFor='profilephoto'>Photo de profil</label>
                                        </div>
                                        <div className="col-md-12 mt-2 d-flex justify-content-center">
                                            {profilePhoto &&
                                                <div className="pprofile"><img src={profilePhoto} alt='' className='preview' /></div>
                                            }
                                        </div>
                                    </div>

                                    {/* <div className="input-group mb-3" style={{ display: 'none' }}>
                                        <label className="form-label"> Statut du compte : <br/>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="status" id="actif" value="1" />
                                                <label className="form-check-label" htmlFor="actif"> Actif </label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="status" id="inactif" value="0" defaultChecked />
                                                <label className="form-check-label" htmlFor="inactif"> Inactif </label>
                                            </div>
                                        </label>
                                    </div> */}

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














