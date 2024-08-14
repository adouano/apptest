import React, {useState, useEffect} from 'react';
import supabase from '../config/dbConfig';
import { useAuth } from '../config/userContext';
import {Link, useNavigate} from 'react-router-dom';
import { Alert } from 'react-bootstrap';

const AccountCreation = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    // const [userData, setUserData] = useState({
    //     nomfamille:"",
    //     prenoms:"",
    //     lieumission:"",
    //     role:"",
    //     telephone:"",
    //     email:"",
    //     password:"",
    //     confirmpassword:"",
    //     profilephoto:""
    // });

    const [nomfamille, setNomfamille] = useState('');
    const [prenoms, setPrenoms] = useState('');
    const [lieumission, setLieumission] = useState('');
    const [role, setRole] = useState('');
    const [telephone, setTelephone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [profilePhoto, setProfilePhoto] = useState();

    const [userError, setUserError] = useState();
    
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
                const { data, error } = await supabase.from('dvlieumission').select();
                
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

    const fileChange = (e) => {
        const file = e.target.files?.[0];
        const imgType = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if(!imgType.includes(file.type)){
            setUserError("Extension d'image invalide");
            return;
        } 
        if(file){
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                const imageUrl = reader.result?.toString() || '' ;
                setImgSrc(imageUrl);
            });
            reader.readAsDataURL(file);
            setProfilePhoto(URL.createObjectURL(file));
        }        
    }

    // // Verification email
    useEffect(() => {
        const emailVerify = async(email) => {
            try{
                // const { data, error } = await supabase.from('Users').select().eq('email',email).single();
                const { data, error } = await supabase.from('associates').select().eq('email',email).single();
    
                console.log(data);
    
                if(data.email === email){
                    setUserError("Cette adresse email est deja utilise....");
                    return;
                }
                // setProfile(data);
            }
            catch(error){
                console.log(error.message);
                console.log('Erreur: ', error);
            }
        }
        emailVerify();
    }, [email]); 

    const handleSubmit = async(e) => {
        e.preventDefault();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if(!nomfamille || !prenoms || !lieumission || !role || !telephone || !email || !password || !confirmpassword){
            setUserError("Tous les champs sont obligatoires.");
            return;
        }
        if(password.length < 8){
            setUserError("Le mot de passe doit contenir 8 caracteres au moins.");
            // fullNameLabel.classList.add('invalidInput');
            return;
        }
        if(password !== confirmpassword){
            setUserError("Les mots de passe doivent etre identique.");
            return;
        }
        if(!regex.test(email)){
            setUserError("Veuillez verifier le format de l'adresse email.");
            return;
        }
        
        // Create user account
        try{
            // user auth
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password
            });

            //user public account
            if(data && !error){
                const userId = data.user.id;
                // const saveProfileImg = e.target.files[0];
                // await supabase.storage
                // .from('associatesimg')
                // .upload(userId + '/' + getFullYear(), profilephoto)
                // .select();

                // console.log(data.user);
                // console.log(nomfamille);
                // console.log(prenoms);
                // console.log(lieumission);
                // console.log(role);
                // console.log(telephone);
                // console.log(email);
                // console.log(password);
                // console.log(confirmpassword);
                // console.log(profilePhoto);
                // console.log(imgSrc);

                await supabase
                .from("associates")
                .insert({
                    associate_id:data.user.id,
                    nomdefamille:nomfamille,
                    prenoms:prenoms,
                    lieudemission:lieumission,
                    role:role,
                    num_telephone:telephone,
                    photodeprofil:imgSrc,
                    email:data.user.email,
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

    useEffect(() => {
        const interval = setTimeout(() => setUserError(""), 5000);
        return () => clearTimeout(interval);
    }, [userError]);

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
                                            <input type="text" className="form-control" name="nomfamille" id="nomfamille" placeholder='' onChange={(e) => setNomfamille(e.target.value)} required />
                                            <label htmlFor='nomfamille'>Nom</label>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="form-floating">
                                            <input type="text" className="form-control" name="prenoms" id="prenoms" placeholder='' onChange={(e) => setPrenoms(e.target.value)} required />
                                            <label htmlFor='prenoms'>Prenoms</label>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="form-floating">
                                            <select className="form-control form-select" name="lieumission" id="lieumission" placeholder='' onChange={(e) => setLieumission(e.target.value)} required>
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
                                            <select className="form-control form-select" name="role" id="role" placeholder='' onChange={(e) => setRole(e.target.value)} required>
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
                                            <input type="text" className="form-control" name="telephone" id="telephone" placeholder='' maxLength="10" onChange={(e) => setTelephone(e.target.value)} required />
                                            <label htmlFor='telephone'>Telephone</label>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="form-floating">
                                            <input type="email" className="form-control" name="email" id="email" placeholder='' onChange={(e) => setEmail(e.target.value)} autoComplete="off" required />
                                            <label htmlFor='email'>Votre adresse email</label>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="form-floating">
                                            <input type="password" className="form-control" name="password" id="password" minLength="8" placeholder='' onChange={(e) => setPassword(e.target.value)} required />
                                            <label htmlFor='password'>Mot de passe</label>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="form-floating">
                                            <input type="password" className="form-control" name="confirmpassword" id="confirmpassword" minLength="8" placeholder='' onChange={(e) => setConfirmpassword(e.target.value)} required />
                                            <label htmlFor='confirmpassword'>Confirmer mot de passe</label>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="form-floating">
                                            <input type="file" className="form-control" name="saveProfileImg" accept='image/jpg, image/jpeg, image/png, image/webp' id="profilephoto" placeholder='' onChange={fileChange} required />
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














