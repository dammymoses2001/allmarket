import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import Auth from './auth';
export default function protectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem('access_token')) {
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
