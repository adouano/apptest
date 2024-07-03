import React, { createContext, useContext, useState } from 'react';
// import supabase from "./dbConfig.jsx";
import {useNavigate} from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // const register = (email, password) => {
  //   const { data, error } = supabase.auth.signUp({
  //     email: email,
  //     password: password
  //   });
  // }

  // const login = (email, password) => {
  //   const { data, error } = supabase.auth.signInWithPassword({
  //     email: email,
  //     password: password
  //   });
  //   setUser(userData);
  // }

  // const logout = async () => {
  //   const {error} = await supabase.auth.signOut();
  //   navigate("/");
  //   window.location.reload();
  // }

  const login = (userData) => {
    // Implement login logic here (e.g., API call)
    setUser(userData);
  };

  const logout = () => {
    // Implement logout logic here
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);