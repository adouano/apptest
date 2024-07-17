import React from 'react';
import {Link} from 'react-router-dom';

const AdherentList = ({fetchData}) => {
  return (
    <>
    <table className="table table-hover">
        <thead className="">
            <tr>
                <th scope="col"> N˚Dossier </th>
                <th scope="col"> Nom </th>
                <th scope="col"> Prenoms </th>
                <th scope="col"> Sexe </th>
                <th scope="col"> Ville </th>
                <th scope="col"> Nationalité </th>
                <th scope="col"> Contact </th>
                <th scope="col"> Actions </th>
            </tr>
        </thead>
        <tbody className="">
            {fetchData.map((person) => (
                <tr key={person.id} className="">
                    <th scope="row">{person.numerodossier}</th>
                    <td><img src={person.photoidentite} alt={person.nomdefamille} className="imgprofile" />{person.nomdefamille}</td>
                    <td> {person.prenomdefamille}</td>
                    <td> {person.genresexe}</td>
                    <td> {person.villederesidence} </td>
                    <td> {person.paysdenaissance} </td>
                    <td> {person.telephoneprimaire} </td>
                    <td className="d-flex gap-2">
                        <Link to={`/adherent/${person.id}/info`}>
                            <button className="btn btn-success bg-gradient">Infos</button>
                        </Link>
                        <Link to={`/adherent/${person.id}/modifier`}>
                            <button className="btn btn-warning bg-gradient">Modifier</button>
                        </Link>
                        <a type="button" className="btn btn-danger bg-gradient" href="">Supprimer</a>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    </>
  )
}

export default AdherentList
