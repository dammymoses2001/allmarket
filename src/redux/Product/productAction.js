import axios from 'axios';
import decode from 'jwt-decode';
import {
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
} from './productType';

const fetchProductRequest = () => {
  return {
    type: FETCH_PRODUCT_REQUEST,
  };
};

const fetchProductSuccess = (token) => {
  return {
    type: FETCH_PRODUCT_SUCCESS,
    payload: token,
  };
};

const fetchProductFailure = (error) => {
  return {
    type: FETCH_PRODUCT_FAILURE,
    payload: error,
  };
};

//---------------------------------------------
const deleteProductRequest = () => {
  return {
    type: DELETE_PRODUCT_REQUEST,
  };
};

const deleteProductSuccess = (token) => {
  return {
    type: DELETE_PRODUCT_SUCCESS,
    payload: token,
  };
};

const deleteProductFailure = (error) => {
  return {
    type: DELETE_PRODUCT_FAILURE,
    paylod: error,
  };
};

export const fetchProduct = (props) => {
  // console.log(props);

  return (dispatch) => {
    dispatch(fetchProductRequest());
    axios
      .get('http://localhost:3000/market')
      .then((response) => {
        if (response.data) {
          dispatch(fetchProductSuccess(response.data));
          // browserHistory.push('/register');
        }
      })

      .catch((err) => {
        dispatch(fetchProductFailure('error'));
      });
  };
};

//----------------delete-------------------------
export const deleteProductDetails = (id) => {
  const token = localStorage.getItem('access_token');
  const currentUser = localStorage.getItem('access_token')
    ? decode(localStorage.getItem('access_token')).user.email
    : ' ';

  //  `http://localhost:3000/market/delete/${id}`,
  return (dispatch) => {
    dispatch(deleteProductRequest());
    try {
      axios
        .delete(`http://localhost:3000/market/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },

          data: {
            email: currentUser,
          },
        })
        .then((response) => {
          // console.log(response.data);
          if (response.data) {
            dispatch(deleteProductSuccess(id));
            alert('product deleted');
            //window.location.reload();
          }
        })
        .catch((err) => {
          // console.log(err.response.data);
          dispatch(deleteProductFailure(err.response.data));
        });
    } catch (error) {
      // console.log(error);
    }
  };
};
