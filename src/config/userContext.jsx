import React, { createContext, useContext, useState, useEffect } from 'react';
import supabase from "./dbConfig.jsx";
import {useNavigate} from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [userError, setUserError] = useState('');
  const [getUId, setGetUId] = useState('');
  const [profile, setProfile] = useState(null);
  const [session, setSession] = useState(null);  
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const navigate = useNavigate();

  const register = (email, password) => {
    const { data, error } = supabase.auth.signUp({
      email: email,
      password: password
    });
  }

  const login = async (email, password) => {
    const { data,error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    if(!error){
      await supabase
      .from('dvenrollogs')
      .insert({
        action:'Connexion',
        note:`${email} s'est connecté avec success...`
      });
    }

    // try{
    //   const { data,error } = await supabase
    //     .from('dvenrollogs')
    //     .insert({
    //       action:'Connexion',
    //       note:`${email} s'est connecté avec success...`
    //     });

    //   // const { data,error } = await supabase.from('associates').select().eq('email', email).single();
    //   // const { data: { user } } = await supabase.auth.getUser();
    //   // setProfile(user);
    // }
    // catch(error){
    //   console.log('Error: ', error);
    // }
  }

  const logout = async () => {
    const {error} = await supabase.auth.signOut();

    if(!error){
      await supabase
        .from('dvenrollogs')
        .insert({
          action:'Déconnexion',
          note:`${user.email} s'est déconnecté avec success...`
        });

      setUser(null);
      // navigate("/connexion");
      window.location.reload();
    }
  }

  // const getUserId = async () => {
  //   const { data: { user } } = await supabase.auth.getUser();
  //   setGetUId(user.id);
  //   // console.log(data);
  // }

  const getUserData = () => {
    const subscription = supabase.auth.onAuthStateChange(
      (event, session) => {
        if(event === 'SIGNED_OUT'){
          setSession(null);
          setisLoggedIn(false);
          navigate("/connexion");
        }else if(session){
          setSession(session);
          setUser(session.user);
          setisLoggedIn(true);
          // navigate("/");
        }
      }
    );     
  }

  useEffect(() => {
    getUserData();
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, isLoggedIn, handleGoBack, userError, getUId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);