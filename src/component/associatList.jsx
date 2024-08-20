import React, { useState } from 'react';
import ModalInfoAgent from './modal_agent';

const AssociatesList = ({fetchAssoc, userprofile}) => {

    return (
        <>
        <div className='table-responsive'>
            <table className="table table-hover info_adht">
                <thead className="">
                    <tr>
                        <th scope="col"> Nom </th>
                        <th scope="col"> Prénoms </th>
                        <th scope="col"> Departement </th>
                        <th scope="col"> Email </th>
                        <th scope="col"> Téléphone </th>
                        <th scope="col"> Etat </th>
                        <th scope="col"> Action </th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                {fetchAssoc.map((associate) => (
                    (associate?.id !== userprofile?.id && associate?.supp_intention === false) ? (
                    <tr key={associate.associate_id}>
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
