import React from 'react'

const ErrorPage = () => {
  return (
    <>
    <section className="p-3 p-md-4 p-xl-5 bg-light m-auto">
      <div className="container">
        <div className="row g-0">
          <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-5 text-bg-primary">
            <div className="d-flex align-items-center justify-content-center h-100">
              <div className="card border-light-subtle shadow-sm">
                <h1 className='text-danger p-5'>Page d'erreur</h1>
              </div>
             </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default ErrorPage;
