import axios from 'axios';
import decode from 'jwt-decode';
import {
  MY_PRODUCT_REQUEST,
  MY_PRODUCT_SUCCESS,
  MY_PRODUCT_FAILED,
  MY_PRODUCT_DELETE,
} from './myProductTypes';

const myProductRequest = () => {
  return {
    type: MY_PRODUCT_REQUEST,
  };
};

const myProductSuccess = (data) => {
  return {
    type: MY_PRODUCT_SUCCESS,
    payload: data,
  };
};

const myProductFailure = (error) => {
  return {
    type: MY_PRODUCT_FAILED,
    payload: error,
  };
};

export const myProductDelete = (id) => {
  return {
    type: MY_PRODUCT_DELETE,
    payload: id,
  };
};

export const myProductAction = () => {
  const token = localStorage.getItem('access_token');
  const currentUser = localStorage.getItem('access_token')
    ? decode(localStorage.getItem('access_token')).user.email
    : ' ';
  // console.log(currentUser);
  return (dispatch) => {
    dispatch(myProductRequest());
    axios
      .post(
        `https://allmarket1.herokuapp.com/myproduct`,
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
          dispatch(myProductSuccess(response.data));
          // browserHistory.push('/register');
        }
      })
      .catch((err) => {
        dispatch(myProductFailure('error'));
      });
  };
};
