import React from 'react';
import { useState } from 'react';

import Commercial from './component/commercial';
import Footer from './footer';
import Header from './header';
import InfoAdherent from './pages/adherents/detail';
import InfoRelative from './pages/relatives/detail';

const Dashboard = () => {
  const [userPermission, setUserPermission] = useState("");

  return (
    <>
    <Header />
        {!userPermission && <LoginForm />}
        {userPermission === "admin" && <Administrator /> }
        {userPermission === "superviseur" && <Superviseur />}
        {userPermission === "finance" && <Caissiere />}
        {userPermission === "agent" && <Commercial />}
    <Footer />
    </>
  )
}

export default Dashboard;
