import React from 'react'

const RegistrationSuccess = () => {
  return (
    <>
    <section className="p-3 p-md-4 p-xl-5 bg-success m-auto">
        <div className="container">
            <div className="card border-light-subtle shadow-sm">
                <div class="alert alert-success" role="alert">
                    <h2>Votre compte a bien ete creer</h2>
                    <p>Contactez votre superviseur afin d'activer votre compte</p>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default RegistrationSuccess
