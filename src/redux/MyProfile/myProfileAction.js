import axios from 'axios';
import decode from 'jwt-decode';
import {
  MY_PROFILE_REQUEST,
  MY_PROFILE_SUCCESS,
  MY_PROFILE_FAILED,
} from './myProfileType';

const myProfileRequest = () => {
  return {
    type: MY_PROFILE_REQUEST,
  };
};

const myProfileSuccess = (data) => {
  return {
    type: MY_PROFILE_SUCCESS,
    payload: data,
  };
};

const myProfileFailure = (error) => {
  return {
    type: MY_PROFILE_FAILED,
    payload: error,
  };
};

export const myProfileAction = () => {
  const token = localStorage.getItem('access_token');
  const currentUser = localStorage.getItem('access_token')
    ? decode(localStorage.getItem('access_token')).user.email
    : ' ';
  //   console.log(currentUser);
  return (dispatch) => {
    dispatch(myProfileRequest());
    axios
      .post(
        `http://localhost:3000/market/myProfile`,
        {
          email: currentUser,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // Authorization: 'Bearer' + ' ' + token,
          },
        }
      )
      .then((response) => {
        if (response.data) {
          dispatch(myProfileSuccess(response.data));
          // browserHistory.push('/register');
        }
      })
      .catch((err) => {
        dispatch(myProfileFailure('error'));
      });
  };
};
