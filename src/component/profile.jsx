import React, {useState, useEffect} from 'react';
import supabase from '../config/dbConfig';
import { useAuth } from '../config/userContext';
import {Form, Button, Row, Col} from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";
import Header from '../header';
import Footer from '../footer';
import ProfileModal from './profile_modal';
import background from '/src/assets/profilebg.jpg';
import defaultAvatar from '/src/assets/avatar-profile.webp';

const Profile = () => {
    const { user } = useAuth();
    const {userId} = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState([]);
    const [firstName, setFirstName] = useState();
    const [prenoms, setPrenoms] = useState();
    const [numPhone, setNumePhone] = useState();
    const [newEmail, setNewEmail] = useState();
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmPass, setConfirmPass] = useState();
    const [deletAccount, setDeletAccount] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState();
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const userProfile = async () => {
          try{
            const { data, error } = await supabase.from('associates').select().eq('associate_id', userId).single();
            
            if(error){
              throw new Error(error.message);
            }
            setProfile(data);
            // setLoading(false);
          }
          catch(error){
            console.log("Error: ", error);
          }
        }
        userProfile();
    }, [userId]);

    const [numCode, setNumCode] = useState(0);
    useEffect(() => {
        const NumAleatoire = () => {
            return Math.floor(Math.random() * (99999 - 1 + 1)) + 1;
        }
        setNumCode(NumAleatoire());
    }, []);

    const majInfoPerso = async(e) => {
        e.preventDefault();
        try{
            const { data, error } = await supabase
            .from('associates')
            .update({
                nomdefamille: firstName,
                prenoms: prenoms,
                num_telephone: numPhone,
                photodeprofil: profilePhoto,
                email: newEmail,
                supp_code:numCode
            })
            .eq("associate_id", userId)
            .select();

            if(!error){
                const { data, error } = await supabase.auth.updateUser({
                    email: newEmail
                })
            }

            window.location.reload();
        }
        catch(error){
            console.log(error.message);
        }
    }

    // a revoir
    const handlePassUpdate = async(e) => {
        e.preventDefault();
        // console.log(encrypted_password);
        if(await bcrypt.compare(oldPassword,user?.password)){
            return;
        }else{
            setErrorMsg("Le mot de passe entre ne correspond pas a l'ancien.");
        }
        if(await bcrypt.compare(newPassword,user?.password)){
            setErrorMsg("Le mot de passe est identique a l'ancien.");
            return;
        }
        if(newPassword !== confirmPass){
            setErrorMsg("Les mots de passes doivent etre identique.");
            return;
        }

        try{
            const { data,error } = await supabase.auth.updateUser({
                password: newPassword
            })
        }
        catch(error){
            console.log(error.message);
        }
    }    

    const delectUserAccount = async(e) => {
        e.preventDefault();
        try{
            const {dat,error} = await supabase
            .from('associates')
            .update({
                status:0,
                supp_intention:'TRUE'
            })
            .eq('supp_code',deletAccount)
            .select();
        navigate('/');
        }
        catch(error){
            console.log(error.message);
        }
    }


    return (
    <>
    <Header userprofile={profile} />
        <div className='content bg-secondary-soft'>

            <div className="rounded-top text-white d-flex flex-row" style={{backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundColor: "#000", height: "200px", marginBottom: "25px"}}>
                <div className="ms-4 mt-3 mb-5 d-flex flex-column" style={{width: "150px"}}>
                    {!profile.photodeprofil ? (
                        <img src={defaultAvatar} className="img-fluid img-thumbnail mt-5 mb-2" />
                    ):(
                        <img src={profile.photodeprofil} alt={profile.nomdefamille} className="img-fluid img-thumbnail mt-5 mb-2" style={{width: "150px", zIndex: "1"}} />
                    )}
                    
                    <ProfileModal profile={profile} />
                </div>
                <div className="ms-4" style={{marginTop: "90px"}}>
                    <h4>{profile.nomdefamille}</h4>
                    <h5>{profile.prenoms}</h5>
                    <p className=""><i> {profile.role === "agent" ? ("Agent Commercial"):(profile.role === "admin" ? ("Administrateur"):(profile.role === "finance" ? ("Gestion financiere"):(profile.role === "supervisor" ? ("Superviseur"):("Informaticien"))))} </i></p>
                </div>
            </div>
            
            <div className="col-md-12 p-5">
                <Form className='mt-5' onSubmit={majInfoPerso}>
                    <h2>Infos Personnelles</h2>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2"> Nom de famille </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" defaultValue={profile.nomdefamille} onChange={(e) => setFirstName(e.target.value)} />
                        </Col>
                    </Form.Group>                
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2"> Prenoms </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" defaultValue={profile.prenoms} onChange={(e) => setPrenoms(e.target.value)} />
                        </Col>
                    </Form.Group>                
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2"> Telephone </Form.Label>
                        <Col sm="10">
                            <Form.Control type="text" defaultValue={profile.num_telephone} onChange={(e) => setNumePhone(e.target.value)} />
                        </Col>
                    </Form.Group>                
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2"> Email </Form.Label>
                        <Col sm="10">
                            <Form.Control type="email" defaultValue={user?.email} onChange={(e) => setNewEmail(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={majInfoPerso}>Enregistrer</Button>
                </Form>
                
                <hr/>
                
                <Form onSubmit={handlePassUpdate}>
                    <h2>Modifier mot de passe</h2>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2"> Mot de passe actuel </Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" placeholder="Ancient mot de passe" onChange={(e) => setOldPassword(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2"> Nouveau mot de passe </Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" placeholder="Mot de passe souhaite" onChange={(e) => setNewPassword(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2"> Confirmation du mot de passe </Form.Label>
                        <Col sm="10">
                            <Form.Control type="password" placeholder="Confirmer nouveau mot de passe" onChange={(e) => setConfirmPass(e.target.value)} />
                        </Col>
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={handlePassUpdate}>Enregistrer</Button>
                </Form>

                <hr/>
                
                <Form onSubmit={delectUserAccount}>
                    <h2>Supprimer mon compte </h2>
                    <Form.Text className="text-muted"> Si vous souhaitez annuler votre compte, vous pouvez le faire dès maintenant. <span variant='danger'>Veuillez noter qu'il s'agit d'une action permanente et irréversible.</span> Cela supprimera toutes vos données et projets. Pour terminer cette action, veuillez saisir le numéro exactement comme vous le voyez ci-dessous. </Form.Text>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label> Code de Confirmation : {profile.supp_code} </Form.Label>
                        <Form.Control type="ext" placeholder="Entrer le code pour confirmer" onChange={(e) => setDeletAccount(e.target.value)} />
                    </Form.Group>
                    <Button variant="danger" type="submit" onClick={delectUserAccount}>Supprimer</Button>
                </Form>
            </div>
        </div>
    <Footer />
    </>
  )
}

export default Profile;
