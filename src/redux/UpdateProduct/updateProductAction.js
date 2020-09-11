import axios from 'axios';
import decode from 'jwt-decode';

import {
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
} from './updateProducerType';

const updateProductRequest = () => {
  return {
    type: UPDATE_PRODUCT_REQUEST,
  };
};

const updateProductSuccess = (data) => {
  return {
    type: UPDATE_PRODUCT_SUCCESS,
    payload: data,
  };
};

const updateProductFailure = (error) => {
  return {
    type: UPDATE_PRODUCT_FAILURE,
    payload: error,
  };
};
//  // console.log(data, email);
//  const token = localStorage.getItem('access_token');
//  const user = decode(localStorage.getItem('access_token')).user;
//  //console.log(data, token, user);
//  const email = user.email;

export const updateProductAction = (data) => {
  const token = localStorage.getItem('access_token');
  const user = decode(localStorage.getItem('access_token')).user;
  console.log(data);
  const email = user.email;

  return (dispatch) => {
    try {
      // if()
      dispatch(updateProductRequest());
      axios
        .put(
          'http://localhost:3000/market/update',
          {
            id: data.id,
            email,
            productName: data.product_name,
            productPrice: data.product_price,
            userContact: data.user_contact,
            imageurl: data.imageurl,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data.message);
          dispatch(updateProductSuccess(response.data.message));
        })
        .catch((err) => {
          console.log(err.response.data);
          dispatch(updateProductFailure(err.response.data));
        });
    } catch (error) {
      console.log(error);
    }
  };
};
