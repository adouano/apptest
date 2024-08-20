import React from 'react';
import {Link} from 'react-router-dom';
import Versements from './versements';
import { useAuth } from '../config/userContext';
import supabase from '../config/dbConfig';

const AdherentList = ({adherents,userprofile,setFetchData}) => {
    const { user } = useAuth();

    const deletAdherent = async (adherentId,adherentName) => {
        try {
          const { error } = await supabase.from('dvenrollment').delete().eq('id', adherentId);
    
        if(!error){
            await supabase
                .from('dvenrollogs')
                .insert({
                    action:`Suppression d'enrollement`,
                    note:`${user.email} a supprimé les informations d'enrollement de ${adherentName}...`
                });
        }else{
            throw new Error("Impossible de supprimer...");
          }         
          setFetchData(adherents.filter((adherent) => adherent.id !== adherentId));
        } catch (error) {
            console.log("Deleting error :", error);
            //   console.log(error.message);
        }
    };

  return (
    <>
    <div className='table-responsive'>
        <table className="table table-hover info_adht">
            <thead className="">
                <tr>
                    <th scope="col"> N˚Dossier </th>
                    <th scope="col"> Nom </th>
                    <th scope="col"> Prénoms </th>
                    <th scope="col"> Sexe </th>
                    <th scope="col"> Ville </th>
                    <th scope="col"> Nationalité </th>
                    <th scope="col"> Contact </th>
                    <th scope="col"> Action </th>
                </tr>
            </thead>
            {userprofile?.role === 'admin' ? (
                <>
                <tbody className="">
                    {adherents.map((adherent) => (
                        <tr key={adherent.id}>
                            <th className={adherent.numerodvlottery !== null ? ('text-bg-success'):('')} scope="row">{adherent.numerodvlottery !== null ? adherent.numerodvlottery:adherent.numerodossier}</th>
                            <td className={adherent.numerodvlottery !== null ? ('text-bg-success'):('')}><img src={adherent.photoidentite} alt={adherent.nomdefamille} className="imgprofile" />{adherent.nomdefamille}</td>
                            <td className={adherent.numerodvlottery !== null ? ('text-bg-success'):('')}> {adherent.prenomdefamille}</td>
                            <td className={adherent.numerodvlottery !== null ? ('text-bg-success'):('')}> {adherent.genresexe}</td>
                            <td className={adherent.numerodvlottery !== null ? ('text-bg-success'):('')}> {adherent.villederesidence} </td>
                            <td className={adherent.numerodvlottery !== null ? ('text-bg-success'):('')}> {adherent.paysdenaissance} </td>
                            <td className={adherent.numerodvlottery !== null ? ('text-bg-success'):('')}> {adherent.telephoneprimaire} </td>
                            <td className={adherent.numerodvlottery !== null ? ('text-bg-success'):('d-flex gap-2')}>
                                <Link to={`/adherent/${adherent.id}/info`}>
                                    <button className="btn btn-success bg-gradient">Infos</button>
                                </Link>
                                {adherent.numerodvlottery === null ? (
                                    <>
                                    <Link to={`/adherent/${adherent.id}/modifier`}>
                                        <button className="btn btn-warning bg-gradient"><i className="bi bi-pencil-square"></i></button>
                                    </Link>
                                    <button type="button" className="btn btn-danger bg-gradient" href="" onClick={() => deletAdherent(adherent.id,adherent.prenomdefamille)}><i className="bi bi-trash3-fill"></i></button>
                                    </>
                                ):(<></>)}
                            </td>
                        </tr>
                    ))}
                </tbody>
                </>
            ):(
                <>
                <tbody className="">
                    {adherents.map((adherent) => (
                    adherent?.centrenroll === userprofile?.lieudemission ? 
                    (
                        <tr key={adherent.id}>
                            <th className={adherent.numerodvlottery !== null ? ('text-bg-success'):('')} scope="row">{adherent.numerodvlottery !== null ? adherent.numerodvlottery:adherent.numerodossier}</th>
                            <td className={adherent.numerodvlottery !== null ? ('text-bg-success'):('')}><img src={adherent.photoidentite} alt={adherent.nomdefamille} className="imgprofile" />{adherent.nomdefamille}</td>
                            <td className={adherent.numerodvlottery !== null ? ('text-bg-success'):('')}> {adherent.prenomdefamille}</td>
                            <td className={adherent.numerodvlottery !== null ? ('text-bg-success'):('')}> {adherent.genresexe}</td>
                            <td className={adherent.numerodvlottery !== null ? ('text-bg-success'):('')}> {adherent.villederesidence} </td>
                            <td className={adherent.numerodvlottery !== null ? ('text-bg-success'):('')}> {adherent.paysdenaissance} </td>
                            <td className={adherent.numerodvlottery !== null ? ('text-bg-success'):('')}> {adherent.telephoneprimaire} </td>
                            <td className={adherent.numerodvlottery !== null ? ('text-bg-success'):('d-flex gap-2')}>
                                <Link to={`/adherent/${adherent.id}/info`}>
                                    <button className="btn btn-success bg-gradient">Infos</button>
                                </Link>
                                {adherent.numerodvlottery === null ? (
                                    userprofile?.role === 'finance' ? (
                                        <Versements adherent={adherent} />
                                        // <Versements adherent={adherent} restApayer={restApayer} />
                                    ):(
                                    <>
                                        <Link to={`/adherent/${adherent.id}/modifier`}>
                                            <button className="btn btn-warning bg-gradient"><i className="bi bi-pencil-square"></i></button>
                                        </Link>
                                        <button type="button" className="btn btn-danger bg-gradient" href="" onClick={() => deletAdherent(adherent.id,adherent.prenomdefamille)}><i className="bi bi-trash3-fill"></i></button>
                                    </>
                                    )
                                ):(<></>)}                        
                            </td>
                        </tr>
                    ):(<></>)                
                    ))}
                </tbody>
                </>
            )}
        </table>
    </div>
    </>
  )
}

export default AdherentList;
