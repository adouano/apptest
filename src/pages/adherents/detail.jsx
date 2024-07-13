import React, { useState, useEffect } from "react";
import supabase from "../../config/dbConfig";
import { Link, useParams, useNavigate } from "react-router-dom";
import Versements from '../../component/versements';

const InfoAdherent = () => {
  const {personId} = useParams();
  const [fetchData, setFetchData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        const fetchPersons= async () => {
          try{
            const {data,error} = await supabase.from('dvenrollment').select().eq('id', personId).single();
    
            if(error){
              throw new Error("Could not fetch data.");
            }
            setFetchData(data);
            setFetchError(null);
            setLoading(false);
          }
          catch(error){
            setFetchError(error.message);
            setFetchData(null);
          }
        };
        fetchPersons();
    }, []);

    console.log(fetchData);

  return (
    <>
    <div className="container-xl p-5">
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                {/* {fetchData.map((person) => ( */}
                    <div className="panel panel-info" key={fetchData.id}>
                        <div className="panel-heading">
                            <h3 className="panel-title"> {fetchData.nomdefamille} {fetchData.prenomdefamille} </h3>
                        </div>
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-md-3 col-lg-3 " align="center"> 
                                    <img alt="Profile Adherent" src="https://cdn.aaihs.org/2016/04/6717549.jpg" className="img-circle img-responsive" />
                                </div>
                                <div className="col-md-9 col-lg-9"> 
                                    <table className="table table-user-information">
                                        <tbody>
                                            <>
                                            <tr>
                                                <td>Pays : </td>
                                                <td> {fetchData.paysdenaissance} </td>
                                            </tr>
                                            <tr>
                                                <td> Date de Naissance : </td>
                                                <td> {fetchData.datedenaissance} </td>
                                            </tr>                            
                                            <tr>
                                                <td> Genre : </td>
                                                <td>  {fetchData.genresexe}  </td>
                                            </tr>
                                            <tr>
                                                <td> Adresse : </td>
                                                <td> {fetchData.adressepostal} </td>
                                            </tr>
                                            <tr>
                                                <td> Email : </td>
                                                <td><a href={fetchData.adresseemail} > {fetchData.adresseemail}  </a></td>
                                            </tr>
                                            <tr>
                                                <td> Contact telephonique :</td>
                                                <td> {fetchData.telephoneprimaire}(Landline)<br/>{fetchData.telephonesecondaire}(Mobile)</td>                                    
                                            </tr>
                                            </>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                {/* ))} */}

                <div className="panel-footer footer-content">
                    <button data-original-title="Broadcast Message" data-toggle="tooltip" type="button" className="btn btn-sm btn-primary"><i className="bi bi-envelope-arrow-up-fill"></i></button>
                    <span className="pull-right">
                        <button href="modifier-adherent.html" data-original-title="Edit this user" data-toggle="tooltip" type="button" className="btn btn-sm btn-warning"><i className="bi bi-pencil-square"></i></button>
                        <button data-original-title="Remove this user" data-toggle="tooltip" type="button" className="btn btn-sm btn-danger"><i className="bi bi-trash3-fill"></i></button>
                    </span>
                    <div className='d-flex gap-2 float-end'>
                        <Versements />
                        <Link to={'/ajout_relative'}>
                            <button className="btn btn-primary" type="button">Ajouter Protégé</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

        {/*Visible par la Caissiere, admin et superviseur*/}
        <div className="">
            <h2 className="panel-heading"> Liste de Versements </h2>
            <table>
                <tbody>
                    <tr>
                        <td>05/01/2024 : </td>
                        <td> 1500 </td>
                    </tr>
                    <tr>
                        <td> 12/03/2024 : </td>
                        <td> 2500 </td>
                    </tr>                            
                    <tr>
                        <td> 17/09/2024 : </td>
                        <td> 1000 </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div className="album py-5 bg-body-tertiary">
            <h1 className="panel-heading"> Liste de protéger </h1>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
                <div className="col">
                    <div className="card shadow-sm">
                        <img className="" src="https://www.freecodecamp.org/news/content/images/2022/01/IMG_1763.jpg" alt="" />
                        <div className="card-body">
                            <table className="table table-user-information">
                                <tbody>
                                    <tr>
                                        <td>Nom & Prenoms : </td>
                                        <td> Doumbia Yves </td>
                                    </tr>
                                    <tr>
                                        <td> Date de Naissance : </td>
                                        <td> 25/04/1988 </td>
                                    </tr>                            
                                    <tr>
                                        <td> Genre : </td>
                                        <td> Homme </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                                <a type="button" className="btn btn-sm btn-outline-primary" href="details-relative.html"> Details </a>
                                <a type="button" className="btn btn-sm btn-outline-warning" href="modifier-relative.html"> Modifier </a>
                                <a type="button" className="btn btn-sm btn-outline-danger" href="#"> Supprimer </a>
                            </div>
                            <small className="text-body-secondary"></small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card shadow-sm">
                        <img className="" src="https://www.freecodecamp.org/news/content/images/2022/01/IMG_1763.jpg" alt="" />
                        <div className="card-body">
                            <table className="table table-user-information">
                                <tbody>
                                    <tr>
                                        <td>Nom & Prenoms : </td>
                                        <td> Kouame Julles </td>
                                    </tr>
                                    <tr>
                                        <td> Date de Naissance : </td>
                                        <td> 25/04/1988 </td>
                                    </tr>                            
                                    <tr>
                                        <td> Genre : </td>
                                        <td> Femme </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                                <a type="button" className="btn btn-sm btn-outline-primary" href="details-relative.html"> Details </a>
                                <a type="button" className="btn btn-sm btn-outline-warning" href="modifier-relative.html"> Modifier </a>
                                <a type="button" className="btn btn-sm btn-outline-danger" href="#"> Supprimer </a>
                            </div>
                            <small className="text-body-secondary"></small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card shadow-sm">
                        <img className="" src="https://www.freecodecamp.org/news/content/images/2022/01/IMG_1763.jpg" alt="" />
                        <div className="card-body">
                            <table className="table table-user-information">
                                <tbody>
                                    <tr>
                                        <td>Nom & Prenoms : </td>
                                        <td> Yoboue Aline </td>
                                    </tr>
                                    <tr>
                                        <td> Date de Naissance : </td>
                                        <td> 25/04/1988 </td>
                                    </tr>                            
                                    <tr>
                                        <td> Genre : </td>
                                        <td> Homme </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                                <a type="button" className="btn btn-sm btn-outline-primary" href="details-relative.html"> Details </a>
                                <a type="button" className="btn btn-sm btn-outline-warning" href="modifier-relative.html"> Modifier </a>
                                <a type="button" className="btn btn-sm btn-outline-danger" href="#"> Supprimer </a>
                            </div>
                            <small className="text-body-secondary"></small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card shadow-sm">
                        <img className="" src="https://www.freecodecamp.org/news/content/images/2022/01/IMG_1763.jpg" alt="" />
                        <div className="card-body">
                            <table className="table table-user-information">
                                <tbody>
                                    <tr>
                                        <td>Nom & Prenoms : </td>
                                        <td> Komenan Joseph </td>
                                    </tr>
                                    <tr>
                                        <td> Date de Naissance : </td>
                                        <td> 25/04/1988 </td>
                                    </tr>                            
                                    <tr>
                                        <td> Genre : </td>
                                        <td> Homme </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                                <a type="button" className="btn btn-sm btn-outline-primary" href="details-relative.html"> Details </a>
                                <a type="button" className="btn btn-sm btn-outline-warning" href="modifier-relative.html"> Modifier </a>
                                <a type="button" className="btn btn-sm btn-outline-danger" href="#"> Supprimer </a>
                            </div>
                            <small className="text-body-secondary"></small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
      
    </>
  )
}

export default InfoAdherent;
