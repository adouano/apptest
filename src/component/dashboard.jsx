import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
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
import TestUpload from './testfileupload';


const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const [profile, setProfile] = useState('');
  const [loading, setLoading] = useState(true);
  let userId = user?.id;
    // let userId = '1aa70dfb-c770-4f2c-a163-4b567dffec67';
    // console.log(user?.id);
    // console.log(userId);

  useEffect(() => {
    const userProfile = async () => {
      try{
        const { data, error } = await supabase.from('associates').select().eq('associate_id', userId).single();
        
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
    userProfile(userId);
  }, [userId]);

  return (
    user?.id !== undefined && profile?.status !== '0' ? (
      <>
      {/* <TestUpload />
        <Header userprofile={profile} /> */}
        <Header />
          {profile?.role === "admin" && <Administrator key={profile.associate_id} userprofile={profile} />}
          {profile?.role === "supervisor" && <Superviseur key={profile.associate_id} userprofile={profile} />}
          {profile?.role === "finance" && <Caissiere key={profile.associate_id} userprofile={profile} />}
          {profile?.role === "agent" && <Commercial key={profile.associate_id} userprofile={profile} />}
          {profile?.role === "informatic" && <Informaticien key={profile.associate_id} userprofile={profile} />}
        <Footer />
      </>
    ):(
      <LoginForm />
    )
  )
}

export default Dashboard;
