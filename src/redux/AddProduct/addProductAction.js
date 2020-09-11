import axios from 'axios';
import decode from 'jwt-decode';
import {
  ADDPRODUCT_REQUEST,
  ADDPRODUCT_SUCCESS,
  ADDPRODUCT_FAILURE,
} from './addProductType';

try {
} catch (error) {}
//not using this yet as the contact can change
// const contact = token.user.contact;
// console.log(email);
export const addProductRequest = () => {
  return {
    type: ADDPRODUCT_REQUEST,
  };
};

const addProductSuccess = (productDetails) => {
  return {
    type: ADDPRODUCT_SUCCESS,
    payload: productDetails,
  };
};

const addProductFailure = (error) => {
  return {
    type: ADDPRODUCT_FAILURE,
    payload: error,
  };
};

export const addProductDetails = (data) => {
  // console.log(data, email);
  const token = localStorage.getItem('access_token');
  const currentUser = localStorage.getItem('access_token')
    ? decode(localStorage.getItem('access_token')).user.email
    : ' ';

  return (dispatch) => {
    dispatch(addProductRequest());
    try {
      axios
        .post(
          'http://localhost:3000/market/add',
          {
            productName: data.product_name,
            email: currentUser,
            userContact: data.userContact,
            productPrice: data.product_price,
            imageurl: data.imageurl,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          // console.log(response.data);
          if (response.data) {
            dispatch(addProductSuccess('Product Added '));
          }
        })
        .catch((err) => {
          console.log(err.response.data);
          dispatch(addProductFailure(err.response.data));
        });
    } catch (error) {
      console.log(error);
    }
  };
};
