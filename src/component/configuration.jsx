import React from 'react';
import {Form, Stack, Button} from 'react-bootstrap';

const Configuration = () => {
  return (
    <>
    <div className='content p-5'>
        <h1 className='mb-5'>Configuration</h1>

        <h3 className=''>Montant Adherent</h3>
        <Stack direction="horizontal" gap={3} className='pb-5'>
            <Form.Control className="me-auto" placeholder="Add your item here..." />
            <Button variant="secondary">Enregistrer</Button>
            <div className="vr" />
            <Button variant="outline-danger">Reinitialiser</Button>
        </Stack>
        <hr/>
        <h3 className='mt-5'>Montant Relative</h3>
        <Stack direction="horizontal" gap={3} className='pb-5'>
            <Form.Control className="me-auto" placeholder="Add your item here..." />
            <Button variant="secondary">Enregistrer</Button>
            <div className="vr" />
            <Button variant="outline-danger">Reinitialiser</Button>
        </Stack>
        <hr/>
        <h3 className='mt-5'>Commision/Pourcentage commercial</h3>
        <Stack direction="horizontal" gap={3} className='pb-5'>
            <Form.Control className="me-auto" placeholder="Add your item here..." />
            <Button variant="secondary">Enregistrer</Button>
            <div className="vr" />
            <Button variant="outline-danger">Reinitialiser</Button>
        </Stack>
        <hr/>
        <h3 className='mt-5'>Ajout de location/ville</h3>
        <Stack direction="horizontal" gap={3} className='pb-5'>
            <Form.Control className="me-auto" placeholder="Add your item here..." />
            <Button variant="secondary">Enregistrer</Button>
            <div className="vr" />
            <Button variant="outline-danger">Reinitialiser</Button>
        </Stack>



        {/* <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Example textarea</Form.Label>
                <Form.Control as="textarea" rows={3} />
            </Form.Group>
        </Form> */}

        
    </div>
    </>
  )
}

export default Configuration;
