import React from 'react'

const Footer = () => {
  return (
    <>
        <footer className="py-4 mt-auto border-top">
            <div className="container-xl px-5">
            <div className="d-flex flex-column flex-sm-row align-items-center justify-content-sm-between small">
                <div className="me-sm-2">Copyright © Your Website 2023</div>
                <div className="d-flex ms-sm-2">
                    <a className="text-decoration-none" href="#!">Privacy Policy</a>
                    <div className="mx-1">·</div>
                    <a className="text-decoration-none" href="#!">Terms &amp; Conditions</a>
                </div>
            </div>
            </div>
        </footer>      
    </>
  )
}

export default Footer;


