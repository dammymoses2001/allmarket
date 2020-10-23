import React, { useEffect } from 'react';
import { publicRoute, protectedRoute } from './route/index';
import Protected from './AuthRoute/protectedRoute';
import {connect} from 'react-redux'
import './App.css';
//import Model from './components/Loading'
import { Switch, Route } from 'react-router-dom';
import { getAllProductAction, UserIsLoggedIn } from './redux/Actions';

function App({token,UserIsLoggedIn,getAllProductAction}) {

///console.log(token)
  useEffect(() => {
    if (!token.isLoggedIn) {
        UserIsLoggedIn();
        getAllProductAction();
    }
    //
  }, [UserIsLoggedIn,getAllProductAction,token]);
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


const mapStateToProps = (state) => ({
  token:state.token
})

const mapDispatchToProps = (dispatch)=>({
  UserIsLoggedIn:()=>dispatch(UserIsLoggedIn()),
  getAllProductAction:()=>dispatch(getAllProductAction())
})


export default connect(mapStateToProps, mapDispatchToProps)(App)
