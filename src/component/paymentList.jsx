import React, { useEffect, useState } from 'react'
import Versements from './versements';
import { Link } from 'react-router-dom';
import supabase from '../config/dbConfig';

const PaymentList = ({adherent}) => {
    const [config, setConfig] = useState('');
    const [depots, setDepots] = useState([]);
    const [fetchError, setFetchError] = useState(null);

    const parametres = async () => {
        const {data, error} = await supabase.from('configurations').select().eq('id', 1).single();
        setConfig(data);
    }

    const versements = async () => {
        try{
            const { data,error } = await supabase.from('dvtransaction').select();

            if(error){
                throw new Error(error.message);
            }
            setDepots(data);
        }
        catch(error){
            setFetchError(error.message);
        }
    };

    let depoTotal = 0;
    const netApayer = Number(config.montant_adherent) + Number(adherent.dvrelatives.length * config.montant_relative);
    depots.map((calculDepot) => {
        calculDepot.adherent_id === adherent.id ?
        (depoTotal += Number(calculDepot.depots)):('0')
        return depoTotal;
    });
    const restApayer = Number(netApayer) - Number(depoTotal);

    useEffect(() => {
        versements();
        parametres();
    }, []);

  return (
    <>
        <tr key={adherent.id}>
            <th scope="row"> {adherent.numerodossier} </th>
            <td> {adherent.nomdefamille} </td>
            <td> {adherent.prenomdefamille} </td>
            <td> {adherent.dvrelatives.length !== 0 ? (adherent.dvrelatives.length):('Aucun')} </td>
            <td> {netApayer} </td>
            <td> {depoTotal} </td>
            <td> {restApayer} </td>
            <td className="d-flex gap-2">
                <Link to={`/adherent/${adherent.id}/info`}>
                    <button className="btn btn-info bg-gradient">Infos</button>
                </Link>
                <Versements adherent={adherent} config={config} restApayer={restApayer} />
            </td>
        </tr>
    </>
  )
}

export default PaymentList;
