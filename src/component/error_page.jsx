import React from 'react';
import { useAuth } from '../config/userContext';

const ErrorPage = () => {
  const { handleGoBack } = useAuth();

  return (
    <>
      <section className="account-connect bg-light m-auto">
        <div className="account-acces py-3 py-md-5">
          <div className="row justify-content-center">
            <div className="d-flex align-items-center justify-content-center h-100">
              <h1 className='text-danger p-5'>Page d'erreur</h1>
              <div className="vr" style={{margin: '0 40px'}} />
              <button className='btn btn-warning' onClick={handleGoBack}>Retourner</button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ErrorPage;
