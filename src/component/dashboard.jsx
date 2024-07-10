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


const Dashboard = () => {
  // const {permission} = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userPermission, setUserPermission] = useState('');
  let userId = user?.id;

  useEffect(() => {
    const userProfile = async () => {
      try{
        // const { data, error } = await supabase.from('associates').select().eq('associate_id', userId);
        const { data, error } = await supabase.from('associates').select();

        if(error){
          throw new Error("Could not fetch.");
        }
        setProfiles(data); 
      }
      catch(error){
        console.log("Error: ", error);
      }
    }
    userProfile();
  }, []);


  // let currentUser;
  let permission;
  profiles?.map((profile) => {
    if(user?.id === profile.associate_id){
      // currentUser = profile;
      permission = profile.role;
    }
  });
  console.log(permission);
  console.log(profiles);

  if(!loading){
      return(<div className="container-xl p-5">Loading...</div>);
    }else{
      return (
        !user?.id ? (
          !permission && <LoginForm />
        ):(
        <>
          <Header />
          {profiles?.map((profile) => (
            <>
              permission === "admin" && <Administrator key={profile.associate_id} profile={profile} />
              permission === "superviseur" && <Superviseur key={profile.associate_id} />
              permission === "finance" && <Caissiere key={profile.associate_id} />
              permission === "agent" && <Commercial key={profile.associate_id} />
              permission === "informatic" && <Informaticien key={profile.associate_id} />
            </>
          ))}
          <Footer />
        </>
        )
      )
    }
}

export default Dashboard;
