import React, { useState } from 'react';
import ModalInfoAgent from './modal_agent';

const AssociatesList = ({fetchAssoc, userprofile}) => {

    return (
        <>
        <div className='table-responsive'>
            <table className="table table-hover">
                <thead className="">
                    <tr>
                        <th scope="col"> Ordre </th>
                        <th scope="col"> Nom </th>
                        <th scope="col"> Prenoms </th>
                        <th scope="col"> Groupe de travail </th>
                        <th scope="col"> Email </th>
                        <th scope="col"> Contact </th>
                        <th scope="col"> Status </th>
                        <th scope="col"> Actions </th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                {fetchAssoc.map((associate) => (
                    (associate?.id !== userprofile?.id && associate?.supp_intention === false) ? (
                    <tr key={associate.associate_id}>
                        <td scope="row">{associate.id}</td>
                        <td>{associate.nomdefamille}</td>
                        <td>{associate.prenoms}</td>
                        <td>{associate?.role==='admin' ? ("Administrateur"):(associate?.role==='supervisor' ? ("Superviseur"):(associate?.role==='agent' ? ("Commercial"):(associate?.role==='finance' ? ("Caissiere"):("Informaticien"))))}</td>
                        <td> {associate.email} </td>
                        <td> {associate.num_telephone} </td>
                        <td className={associate?.status ? 'text-bg-success':'text-bg-danger'}> {associate?.status ? 'Actif':'Inactif'} </td>
                        <td className="d-flex gap-2">
                            <ModalInfoAgent associate={associate} key={associate.associate_id} />
                        </td>
                    </tr>
                    ):(<></>)
                ))}
                </tbody>                
            </table>
        </div>
        </>
    )
}

export default AssociatesList;
