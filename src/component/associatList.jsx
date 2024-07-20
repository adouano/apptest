import React, { useState } from 'react';
import ModalInfoAgent from './modal_agent';

const AssociatesList = ({fetchAssoc, userprofile}) => {

    return (
        <>
            <table className="table table-hover">
                <thead className="">
                    <tr>
                        <th scope="col"> Ordre </th>
                        <th scope="col"> Nom </th>
                        <th scope="col"> Prenoms </th>
                        <th scope="col"> Groupe de travail </th>
                        <th scope="col"> Ville </th>
                        <th scope="col"> Contact </th>
                        <th scope="col"> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    {fetchAssoc.map((associate) => (
                        <tr key={associate.id}>
                            <th scope="row">{associate.id}</th>
                            <td>{associate.nomdefamille}</td>
                            <td>{associate.prenoms}</td>
                            <td>{associate?.role==='admin' ? ("Administrateur"):(associate?.role==='supervisor' ? ("Superviseur"):(associate?.role==='agent' ? ("Commercial"):(associate?.role==='finance' ? ("Caissiere"):("Informaticien"))))}</td>
                            <td> {associate.lieudemission} </td>
                            <td> {associate.num_telephone} </td>
                            <td className="d-flex gap-2">
                                <ModalInfoAgent associate={associate} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default AssociatesList;
