import React, { useEffect, useState } from 'react';
import supabase from '../config/dbConfig';

const AdherentData = () => {
    
    const [adherents, setAdhernts] = useState([]);
    const fetchAdhernts = async () => {
        try{
            const {data,error} = await supabase.from('dvenrollment').select(`*, dvrelatives(*), dvtransaction(*)`).order('created_at', { ascending: true });
    
            if(error){
                throw new Error("Could not fetch data.");
            }
            setAdhernts(data);
        }
        catch(error){
            console.log(error.message);
        }
    };
    useEffect(() => {
        fetchAdhernts();
    }, []);


  return (
    <>
      
    </>
  )
}
export default AdherentData;
