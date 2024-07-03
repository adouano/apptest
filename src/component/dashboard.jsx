import React from 'react';
import { useState } from 'react';

import Commercial from './commercial';
import Footer from '/src/footer';
import Header from '/src/header';
import InfoAdherent from '/src/pages/adherents/detail';
import InfoRelative from '/src/pages/relatives/detail';
import LoginForm from './login';
import Administrator from './admin';
import Superviseur from './superviseur';
import Caissiere from './caissiere';

const Dashboard = () => {
  const [userPermission, setUserPermission] = useState("");

  return (
    <>
    {/* <Header /> */}
        {/* {!userPermission && <LoginForm />} */}
        {userPermission === "admin" && <Administrator /> }
        {userPermission === "superviseur" && <Superviseur />}
        {userPermission === "finance" && <Caissiere />}
        {userPermission === "agent" && <Commercial />}
    {/* <Footer /> */}
    </>
  )
}

export default Dashboard;
