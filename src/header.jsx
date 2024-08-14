import React, { useEffect, useState } from 'react';
import { useAuth } from './config/userContext';
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import defaultAvatar from '/src/assets/avatar-profile.webp';
import supabase from './config/dbConfig';

// const Header = ({userprofile}) => {
const Header = () => {
    const { logout,user } = useAuth();
    const [userprofile, setUserProfile] = useState('');
    let userId = user?.id;
    // let userId = '1aa70dfb-c770-4f2c-a163-4b567dffec67';
    
    const getUserProfile = async () => {
        try{
            const {data,error} = await supabase.from('associates').select().eq('associate_id', userId).single();

            if(error){
                throw new Error(error.message);
            }
            setUserProfile(data);
        }
        catch(error){
            console.log(error.message);
        }
    }

    useEffect(() => {
        getUserProfile(userId);
    }, [userId]);
    // a revoir
    // console.log(user?.id);
    // console.log(userprofile);

    return (
    <>
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">GC-Enrollement</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/adherent/ajouter">Ajouter Adherent</Nav.Link>
                        {/* <Nav.Link href="/admin">Administrateur</Nav.Link>
                        <Nav.Link href="/superviseur">Superviseur</Nav.Link>
                        <Nav.Link href="/agent">Commercial</Nav.Link>
                        <Nav.Link href="/finance">Finance</Nav.Link>
                        <Nav.Link href="#">Informaticien</Nav.Link> */}
                    </Nav>
                    <Nav className="justify-content-end">
                        <NavDropdown title={
                            !userprofile?.photodeprofil ? (
                                <img src={defaultAvatar} width="32" height="32" className="rounded-circle" />
                                ):(
                                <img src={userprofile?.photodeprofil} alt={userprofile?.nomdefamille} width="31" height="31" className="rounded-circle" />
                            )} id="basic-nav-dropdown">                            
                            <NavDropdown.Item href={`/${userprofile?.associate_id}/profile`}>Profil</NavDropdown.Item>
                            {userprofile?.role==='admin' ? (
                                <>
                                <NavDropdown.Item href={`/${userprofile?.associate_id}/configuration`}>Configuration</NavDropdown.Item>
                                <NavDropdown.Item href={`/${userprofile?.associate_id}/events`}>Rapports</NavDropdown.Item>
                                </>
                            ):(<></>)}
                            <NavDropdown.Item href="/">Accueil</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item  onClick={() => logout()}>Deconnexion</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
  )
}

export default Header;
