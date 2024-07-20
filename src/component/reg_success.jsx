import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';


const RegistrationSuccess = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/connexion');
      // location = location.href;
    }, 5000);
  })

  return (
    <>
      <section className="account-connect bg-light m-auto">
        <div className="account-acces bg-success py-3 py-md-5">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
              <div className="card border border-light-subtle rounded-3 shadow-sm">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <div className="text-center mb-3">
                    <h2>Votre compte a bien ete creer</h2>
                    <p>Contactez votre superviseur afin de l'activer</p>
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

export default RegistrationSuccess;
