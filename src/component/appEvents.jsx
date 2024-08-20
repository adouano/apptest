import React, { useEffect, useState } from 'react'
import Header from '../header'
import Footer from '../footer'
import { useParams } from 'react-router-dom'
import { useAuth } from '../config/userContext'
import supabase from '../config/dbConfig'
import LoadingPage from './loading'

const AppEventsLogs = () => {
    const { user,handleGoBack } = useAuth();
    const {userId} = useParams();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const getEventsLogs = async() => {
        try{
            const {data,error} = await supabase.from('dvenrollogs').select().order('id', { ascending: false });
            setEvents(data);
            setLoading(false);
        }
        catch(error){
            console.log(error.message);
        }
    }

    useEffect(() => {
        getEventsLogs();
    },[]);

    if(loading){
        return(<LoadingPage />);
        }else{
  return (
    <>
      <Header />
    <div className="container-xl pb-5 pt-5">
        <div className="container-fluid">
            <div className="d-flex justify-content-between gap-3 mb-2">
                <h2 className="page-title"> Rapports d'activité de l'application </h2>
                <button className='float-end btn btn-dark' onClick={handleGoBack}><i className='bi-arrow-left-square'></i> Retour</button>
            </div>
            <div className="col-md-12 col-lg-12">
                <div className='mt-5'>
                    <table className='table table-hover info_adht'>
                        <tbody>
                            {events.map((appevent) => (
                            <tr key={appevent.id}>
                                <td className="text-body-secondary">{new Date(appevent.created_at).toLocaleString()}</td>
                                <td className="text-body-secondary">{appevent.role}</td>
                                <td className="text-body-secondary">{appevent.action}</td>
                                <td className="text-body-secondary">{appevent.note}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <Footer />
    </>
  )}
}

export default AppEventsLogs;
