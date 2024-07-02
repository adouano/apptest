import React from 'react'

const InfoRelative = () => {
  return (
    <>
    <div className="container-xl p-5">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <h3 className="panel-title"> Akaffou Oumar Franck </h3>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-md-3 col-lg-3"> 
                                <img alt="Profile Adherent" src="https://www.freecodecamp.org/news/content/images/2022/01/IMG_1763.jpg" className="img-circle img-responsive" />
                            </div>
                            <div className=" col-md-9 col-lg-9 "> 
                                <table className="table table-user-information">
                                    <tbody>
                                        <tr>
                                            <td>Pays : </td>
                                            <td>Cote d'Ivoire</td>
                                        </tr>
                                        <tr>
                                            <td> Date de Naissance : </td>
                                            <td> 25/04/1988 </td>
                                        </tr>
                                        <tr>
                                            <td> Ville de Naissance : </td>
                                            <td> Ouangolo </td>
                                        </tr>
                                        <tr>
                                            <td> Genre : </td>
                                            <td> Homme </td>
                                        </tr>
                                        <tr>
                                            <td> Adresse : </td>
                                            <td> Dioulabougou, Daloa </td>
                                        </tr>
                                        <tr>
                                            <td> Relation : </td>
                                            <td> Enfant de Yao Koffi </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="panel-footer footer-content">
                        <a data-original-title="Broadcast Message" data-toggle="tooltip" type="button" className="btn btn-sm btn-primary"><i className="bi bi-envelope-arrow-up-fill"></i></a>
                        <span className="pull-right">
                            <a href="modifier-relative.html" data-original-title="Edit this user" data-toggle="tooltip" type="button" className="btn btn-sm btn-warning"><i className="bi bi-pencil-square"></i></a>
                            <a data-original-title="Remove this user" data-toggle="tooltip" type="button" className="btn btn-sm btn-danger"><i className="bi bi-trash3-fill"></i></a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default InfoRelative;
