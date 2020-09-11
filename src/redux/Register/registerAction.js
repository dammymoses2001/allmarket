import axios from 'axios';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from './registerType';

const registerRequest = () => {
  return {
    type: REGISTER_REQUEST,
  };
};

const registerSuccess = (data) => {
  return {
    type: REGISTER_SUCCESS,
    payload: data,
  };
};

const registerFailed = (error) => {
  return {
    type: REGISTER_FAILED,
    payload: error,
  };
};

export const registerUser = (userdetails) => {
  return (dispatch) => {
    dispatch(registerRequest);
    axios
      .post('http://localhost:3000/register', {
        fullname: userdetails.fullname,
        email: userdetails.email,
        password: userdetails.password,
        contact: userdetails.contact,
      })
      .then((response) => {
        if (response.data) {
          // console.log(response.data);
          dispatch(registerSuccess(response.data));
          // localStorage.setItem('access_token', response.data.token);
        }
      })
      .catch((err) => {
        dispatch(registerFailed(err.message));
      });
  };
};
