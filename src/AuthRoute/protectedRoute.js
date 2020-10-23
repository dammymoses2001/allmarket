import React from 'react';
import decode from 'jwt-decode';
import { Route, Redirect } from 'react-router-dom';
// import Auth from './auth';
export default function protectedRoute({ component: Component, ...rest }) {
  
  function isAuthenticated(props) {
    const token = localStorage.getItem('access_token');
    try {
      decode(token);
      const { exp } = decode(token);
     // console.log(Date.now(),exp * 1000);
      if (Date.now() >= exp * 1000) {
        localStorage.clear();
        window.location.reload();
        //console.log(Date.now() >= exp * 1000)
        return false;
      }
    } catch (err) {
     // console.log(err)
      return false;
    }
    
    return true;
  }
 
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated()) {
          // console.log('goo');
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
}
