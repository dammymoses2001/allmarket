import axios from '../helper/axios';
import decode from 'jwt-decode';
import { Login } from '../constant';

const loginUserRequest = () => {
  return {
    type: Login.LOGIN_USER_REQUEST,
  };
};

const loginUserSuccess = (payload) => {
  return {
    type: Login.LOGIN_USER_SUCCESS,
    payload,
  };
};

const loginUserFailure = (payload) => {
  return {
    type: Login.LOGIN_USER_FAILURE,
    payload,
  };
};
// .post('https://allmarket1.herokuapp.com/login', {
//   email: userdetails.email,
//   password: userdetails.password,
// })
//axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.state.token
export const LoginAction = (userdetails) => {
  return async (dispatch) => {

    try {
      dispatch(loginUserRequest());
      const response = await axios.post('/login', {
        email: userdetails.email,
        password: userdetails.password,
      })
      if (response.status === 200) {
        console.log(response)
        const token = {
          user: decode(response.data.token).user,
          token: response.data.token
        }
        localStorage.clear();
        localStorage.setItem('access_token', response.data.token);
        dispatch(loginUserSuccess(token));


      }
    } catch (error) {
      console.log(error)
      //dispatch(loginUserFailure(error.response.data ? error.response.data : ''))
      //console.log(error.response)
      return true
    }
  };
};

const Logout = () => {
  return {
    type: Login.LOGOUT,
  };
};

export const LogOut = () => {
  return async (dispatch) => {
    dispatch(Logout());
    localStorage.clear();
  };
};

export const UserIsLoggedIn = () => {
  return async (dispatch) => {
    const localStorageToken = localStorage.getItem('access_token');
    if (localStorageToken) {
      const token = {
        user: decode(localStorageToken).user,
        token: localStorageToken
      }
      if (token) {
        dispatch(loginUserSuccess(token));
      }
    }


  };
};
