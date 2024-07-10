import React, { useState } from 'react';
import {useNavigate, Routes, Route, Link} from 'react-router-dom';
import { AuthProvider } from './config/userContext';
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


function App() {
  const [user, setUser] = useState(null);

  return (
          <AuthProvider>
            {/* <Header /> */}
              <Routes>
                
                <Route index element={<LoginForm />} />
                <Route path="inscription" element={<AccountCreation />} />
                
                <Route path="dashboard" element={<Dashboard />} />
                <Route ProtectedRoute path="admin" element={<Administrator />} roles={['admin']} />
                <Route ProtectedRoute path="superviseur" element={<Superviseur />} roles={['supervisor']} />
                <Route ProtectedRoute path="finance" element={<Caissiere />} roles={['finance']} />
                <Route ProtectedRoute path="agent" element={<Commercial />} roles={['agent']} />
                <Route path="ajout_adherent" element={<AjoutAdherent />} />
                <Route path="info_adherent" element={<InfoAdherent />} />
                <Route path="edit_adherent" element={<EditAdherent />} />
                <Route path="ajout_relative" element={<AjoutRelative />} />
                <Route path="info_relative" element={<InfoRelative />} />
                <Route path="edit_relative" element={<EditRelative />} />
                <Route path="profile" element={<Profile />} />
                <Route path="configuration" element={<Configuration />} />
                <Route path="./reg_success" element={<RegistrationSuccess />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            {/* <Footer /> */}
          </AuthProvider>
        );

  // return (
  //   <AuthProvider>
  //     {user === null ? <Login /> : <Home user={user} />}
  //   </AuthProvider>
  // );
}

export default App;
