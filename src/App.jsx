import React, { useState, useEffect } from 'react';
import {useNavigate, Routes, Route, Link} from 'react-router-dom';
import { AuthProvider, useAuth } from './config/userContext';
import ProtectedRoute from './config/ProtectedRoute';

// import './App.css';
import LoginForm from './component/login';
import AccountCreation from './component/registration';
import Profile from './component/profile';
import Configuration from './component/configuration';
import ErrorPage from './component/error_page';
import Administrator from './component/admin';
import Superviseur from './component/superviseur';
import Caissiere from './component/caissiere';
import Commercial from './component/commercial';
import AjoutAdherent from './pages/adherents/ajouter';
import InfoAdherent from './pages/adherents/detail';
import EditAdherent from './pages/adherents/modifier';
import AjoutRelative from './pages/relatives/ajouter';
import InfoRelative from './pages/relatives/detail';
import EditRelative from './pages/relatives/modifier';
import Dashboard from './component/dashboard';
import Header from './header';
import Footer from './footer';
import RegistrationSuccess from './component/reg_success';
import ResetPassword from './component/resetpassword';

import TestUpload from './component/testfileupload';
import Associates from './component/associates';


function App() {
  // const { user } = useAuth();
  // console.log(user);
  const navigate = useNavigate();
 
  return (
    
    <AuthProvider>
      {/* <Header /> */}
      <Routes>                
        <Route path="connexion" element={<LoginForm />} />
        <Route path="inscription" element={<AccountCreation />} />
        <Route index element={<Dashboard />} />
        <Route ProtectedRoute path="admin" element={<Administrator />} roles={['admin']} />
        <Route ProtectedRoute path="superviseur" element={<Superviseur />} roles={['supervisor']} />
        <Route ProtectedRoute path="finance" element={<Caissiere />} roles={['finance']} />
        <Route ProtectedRoute path="agent" element={<Commercial />} roles={['agent']} />
        <Route path="adherent/ajouter" element={<AjoutAdherent />} />
        <Route path="adherent/:personId/info" element={<InfoAdherent />} />
        <Route path="adherent/:personId/modifier" element={<EditAdherent />} />
        <Route path="relative/ajouter" element={<AjoutRelative />} />
        <Route path="relative/:personId/info" element={<InfoRelative />} />
        <Route path="relative/:personId/modifier" element={<EditRelative />} />
        <Route path=":userId/profile" element={<Profile />} />
        <Route path=":userId/configuration" element={<Configuration />} />
        <Route path="reg_success" element={<RegistrationSuccess />} />
        <Route path="resetpassword" element={<ResetPassword />} />
        <Route path="associates" element={<Associates />} />
        <Route path="*" element={<ErrorPage />} />

        {/* <Route path="uploadimg" element={<TestUpload />} /> */}
      </Routes>
      {/* <Footer /> */}
    </AuthProvider>
  );

  // return (
  //   <AuthProvider>
  //     {user === null ? <Login /> : <Dashboard user={user} />}
  //   </AuthProvider>
  // );
}

export default App;
