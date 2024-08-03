import React from 'react';
import { useAuth } from './config/userContext';
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import defaultAvatar from '/src/assets/avatar-profile.webp';

const Header = ({userprofile}) => {
    const { logout,user } = useAuth();

    // a revoir
    // console.log(user);

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
                            {userprofile?.role=='admin' ? (
                                <NavDropdown.Item href={`/${userprofile?.associate_id}/configuration`}>Configuration</NavDropdown.Item>
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
