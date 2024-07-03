import React from 'react';
import {Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';

const Header = () => {
  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand href="#home">GC-Enrollement</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Accueil</Nav.Link>
                    <Nav.Link href="/admin">Administrateur</Nav.Link>
                    <Nav.Link href="/superviseur">Superviseur</Nav.Link>
                    <Nav.Link href="/agent">Commercial</Nav.Link>
                    <Nav.Link href="/finance">Finance</Nav.Link>
                    <Nav.Link href="#">Informaticien</Nav.Link>
                </Nav>
                <Nav className="justify-content-end">
                    <NavDropdown title={<img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />} id="basic-nav-dropdown">
                        <NavDropdown.Item href="/profile">Profil</NavDropdown.Item>
                        <NavDropdown.Item href="/configuration">Configuration</NavDropdown.Item>
                        <NavDropdown.Item href="#">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#">Deconnexion</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    </>
  )
}

export default Header;
