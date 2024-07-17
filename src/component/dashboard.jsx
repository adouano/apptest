import React, {useState, useEffect} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import supabase from '../config/dbConfig';
import { useAuth } from '../config/userContext';


import Commercial from './commercial';
import Administrator from './admin';
import Superviseur from './superviseur';
import Caissiere from './caissiere';
import LoginForm from './login';
import Footer from '/src/footer';
import Header from '/src/header';
import Informaticien from './informaticien';
import LoadingPage from './loading';


const Dashboard = () => {
  // const {permission} = useParams();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  // const userId = user["id"];
  let userId = user?.id;

  useEffect(() => {
    const userProfile = async () => {
      try{
        const { data, error } = await supabase.from('associates').select().eq('associate_id', userId).single();
        // const { data, error } = await supabase.from('associates').select();
        
        if(error){
          throw new Error(error.message);
        }
        setProfile(data);
        setLoading(false);
      }
      catch(error){
        console.log("Error: ", error);
      }
    }
    userProfile();
  }, [userId]);


  return (
    user===null ? (
      <LoginForm />
    ):(
      <>
        <Header userProfile={profile} />
          {profile?.role === "admin" && <Administrator key={profile.associate_id} profile={profile} />}
          {profile?.role === "supervisor" && <Superviseur key={profile.associate_id} profile={profile} />}
          {profile?.role === "finance" && <Caissiere key={profile.associate_id} profile={profile} />}
          {profile?.role === "agent" && <Commercial key={profile.associate_id} profile={profile} />}
          {profile?.role === "informatic" && <Informaticien key={profile.associate_id} profile={profile} />}
        <Footer />
      </>
    )
  )
}

export default Dashboard;
