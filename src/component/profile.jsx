import React, {useState, useEffect} from 'react';
import supabase from '../config/dbConfig';
import { useAuth } from '../config/userContext';
import {Form, Button, Row, Col} from 'react-bootstrap';
import { Link, useParams, useNavigate } from "react-router-dom";
import Header from '../header';
import Footer from '../footer';

const Profile = () => {
    const { user } = useAuth();
    const {userId} = useParams();
    const [profile, setProfile] = useState([]);
    const [firstName, setFirstName] = useState();
    const [prenoms, setPrenoms] = useState();
    const [numPhone, setNumePhone] = useState();
    const [newEmail, setNewEmail] = useState();
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [comfirmPass, setConfirmPass] = useState();
    const [deletAccount, setDeletAccount] = useState();
    const [profilePhoto, setProfilePhoto] = useState();

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

    // const handleOnChange = (e) => {
    //     const {name,value,files} = e.target;
    //     setPersoData({...persoData, [name]:value});
    //     if(files){
    //         setProfilePhoto(URL.createObjectURL(files[0]));
    //     }
    // }

    const majInfoPerso = async(e) => {
        e.preventDefault(); 
        console.log(firstName);
        console.log(prenoms);
        console.log(numPhone);
        console.log(newEmail);
        // const { data, error } = await supabase
        //     .from('associates')
        //     .update({
        //         name: name,
        //         prep_time: time,
        //         instructions: instructions,
        //         image_url: imageurl,
        //     })
        //     .eq("id", recipeid);
    }

    const handlEmailUpdate = () => {
        const emailUpdate = async () => {
            const { data, error } = await supabase.auth.updateUser({
                email: 'new@email.com'
            })
        }
    }

    const handlePassUpdate = () => {
        e.preventDefault(); 
        const passUpdate = async () => {
            const { data, error } = await supabase.auth.updateUser({
                password: 'new password'
            })
        }
    }

    const deleteAccount = () => {}


    return (
    <>
    <Header />
        <div className='content p-5 bg-secondary-soft'>

            <div className="rounded-top text-white d-flex flex-row" style={{backgroundColor: "#000", height: "200px", marginBottom: "125px"}}>
                <div className="ms-4 mt-3 mb-5 d-flex flex-column" style={{width: "150px"}}>
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" alt="Generic placeholder image" className="img-fluid img-thumbnail mt-4 mb-2" style={{width: "150px", zIndex: "1"}} />
                    <button type="button" data-mdb-button-init="" data-mdb-ripple-init="" className="btn btn-outline-warning text-body" data-mdb-ripple-color="dark" style={{zIndex: 1}} data-mdb-button-initialized="true"> Modifier Photo </button>
                </div>
                <div className="ms-4" style={{marginTop: "90px"}}>
                    <h4>{profile.nomdefamille}</h4>
                    <h5>{profile.prenoms}</h5>
                    <p className=""><i> {profile.role === "agent" ? ("Agent Commercial"):(profile.role === "admin" ? ("Administrateur"):(profile.role === "finance" ? ("Gestion financiere"):(profile.role === "supervisor" ? ("Superviseur"):("Informaticien"))))} </i></p>
                </div>
            </div>

            <div className="col-md-12">
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
                
                <Form onSubmit={deleteAccount}>
                    <h2>Supprimer mon compte </h2>
                    <Form.Text className="text-muted"> Si vous souhaitez annuler votre compte, vous pouvez le faire dès maintenant. <span variant='danger'>Veuillez noter qu'il s'agit d'une action permanente et irréversible.</span> Cela supprimera toutes vos données et projets. Pour terminer cette action, veuillez saisir le numéro exactement comme vous le voyez ci-dessous. </Form.Text>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label> Code de Confirmation : 18934 </Form.Label>
                        <Form.Control type="ext" placeholder="Entrer le code pour confirmer" onChange={(e) => setDeletAccount(e.target.value)} />
                    </Form.Group>
                    <Button variant="danger" type="submit" onClick={deleteAccount}>Supprimer</Button>
                </Form>
            </div>
        </div>
    <Footer />
    </>
  )
}

export default Profile;
