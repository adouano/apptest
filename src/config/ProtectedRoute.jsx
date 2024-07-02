import React from 'react';
import { Route } from 'react-router-dom';
// import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './userContext';

const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
  const { user } = useAuth();

  return (
    <Route {...rest} render={(props) => {
      if (!user) {
        // return <Redirect to='/login' />;
      }

      if (roles && !roles.includes(user.role)) {
        // return <Redirect to='/' />;
      }

      return <Component {...props} />;
    }} />
  );
};

export default ProtectedRoute;