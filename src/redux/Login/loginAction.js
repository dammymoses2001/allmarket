import axios from 'axios';

import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
} from './loginType';

const loginUserRequest = () => {
  return {
    type: LOGIN_USER_REQUEST,
  };
};

const loginUserSuccess = (token) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: token,
  };
};

const loginUserFailure = (error) => {
  return {
    type: LOGIN_USER_FAILURE,
    payload: error,
  };
};

export const FetchToken = (userdetails) => {
  return (dispatch) => {
    try {
      dispatch(loginUserRequest());
      axios
        .post('http://localhost:3000/login', {
          email: userdetails.email,
          password: userdetails.password,
        })
        .then((response) => {
          // console.log(response.data);
          if (response.data.token) {
            dispatch(loginUserSuccess(response.data));
            localStorage.clear();
            localStorage.setItem('access_token', response.data.token);
            // alert(`Welcome Back ${userdetails.email}`);
          }
        })

        .catch((err) => {
          // console.log(err.response.data);
          dispatch(loginUserFailure('Invaild credential'));
        });
    } catch (error) {
      // console.log(error);
    }
  };
};
