import React from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap';

const Profile = () => {
  return (
    <>
    <div className='content p-5'>
        <div className="img-user">
            <a href="#" className=""><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" name="" className="img-circle" /></a>
            <h2 className="">Hey <em>Judith Assoumou</em></h2>
            <p className=""> Agent Commercial </p>
        </div>
        <div className="col-md-12">

            <Form>
                <h2>Infos Personnelles</h2>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2"> Nom de famille </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" defaultValue="Kouame" />
                    </Col>
                </Form.Group>                
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2"> Prenoms </Form.Label>
                    <Col sm="10">
                        <Form.Control type="email" defaultValue="Kouakou Franck" />
                    </Col>
                </Form.Group>                
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2"> Telephone </Form.Label>
                    <Col sm="10">
                        <Form.Control type="email" defaultValue="0709000001" />
                    </Col>
                </Form.Group>                
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2"> Email </Form.Label>
                    <Col sm="10">
                        <Form.Control type="email" defaultValue="assoumoujudth@gmail.com" />
                    </Col>
                </Form.Group>
                <Button variant="primary" type="submit">Enregistrer</Button>
            </Form>
            
            <hr/>
            
            <Form>
                <h2>Modifier mot de passe</h2>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2"> Mot de passe actuel </Form.Label>
                    <Col sm="10">
                        <Form.Control type="password" placeholder=" Ancient mot de passe" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2"> Nouveau mot de passe </Form.Label>
                    <Col sm="10">
                        <Form.Control type="password" placeholder="Mot de passe souhaite" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2"> Confirmation du mot de passe </Form.Label>
                    <Col sm="10">
                        <Form.Control type="password" placeholder="Confirmer nouveau mot de passe" />
                    </Col>
                </Form.Group>

                <Button variant="primary" type="submit">Enregistrer</Button>
            </Form>

            <hr/>
            
            <Form>
                <h2>Supprimer mon compte </h2>
                <Form.Text className="text-muted"> Si vous souhaitez annuler votre compte, vous pouvez le faire dès maintenant. <span variant='danger'>Veuillez noter qu'il s'agit d'une action permanente et irréversible.</span> Cela supprimera toutes vos données et projets. Pour terminer cette action, veuillez saisir le numéro exactement comme vous le voyez ci-dessous. </Form.Text>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label> Code de Confirmation : 18934 </Form.Label>
                    <Form.Control type="ext" placeholder="Entrer le code pour confirmer" />
                </Form.Group>
                <Button variant="danger" type="submit">Supprimer</Button>
            </Form>
        </div>

    </div>
    </>
  )
}

export default Profile;
