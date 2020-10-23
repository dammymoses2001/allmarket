import axiosInstance from '../helper/axios';
import decode from 'jwt-decode';
import {userProfile} from '../constant'

const myProfileRequest = () => {
  return {
    type: userProfile.MY_PROFILE_REQUEST,
  };
};

const myProfileSuccess = (data) => {
  return {
    type: userProfile.MY_PROFILE_SUCCESS,
    payload: data,
  };
};

const myProfileFailure = (error) => {
  return {
    type: userProfile.MY_PROFILE_FAILED,
    payload: error,
  };
};

export const myProfileAction = () => {
  const currentUser = localStorage.getItem('access_token')
    ? decode(localStorage.getItem('access_token')).user.email
    : ' ';
  //console.log(currentUser);
  return (dispatch) => {
    dispatch(myProfileRequest());
    axiosInstance
    .post('market/myProfile', { email: currentUser }, {})
      .then((response) => {
        if (response.data) {
          //console.log(response)
          dispatch(myProfileSuccess(response.data));
          // browserHistory.push('/register');
        }
      })
      .catch((err) => {
        dispatch(myProfileFailure('error'));
      });
  };
};
