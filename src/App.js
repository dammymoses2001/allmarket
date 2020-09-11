import React from 'react';
import { publicRoute, protectedRoute } from './route/index';
import Protected from './AuthRoute/protectedRoute';
import './App.css';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Switch>
        {publicRoute.map(({ component, path }, index) => (
          <Route key={index} exact path={path} component={component} />
        ))}
        {protectedRoute.map(({ component, path }, index) => (
          <Protected key={index} exact path={path} component={component} />
        ))}
      </Switch>
    </div>
  );
}

export default App;
