import decode from 'jwt-decode';
import { myProducts } from '../constant';
import axiosInstance from '../helper/axios';

const getMyProductRequest = () => ({
  type: myProducts.FETCH_MY_PRODUCT_REQUEST,
});

const getMyProductSuccess = (payload) => ({
  type: myProducts.FETCH_MY_PRODUCT_SUCCESS,
  payload,
});

const getMyProductFailure = (payload) => ({
  type: myProducts.FETCH_MY_PRODUCT_FAILURE,
  payload,
});

export const getMyProductsAction = () => {
  const token = localStorage.getItem('access_token');
  const currentUser = localStorage.getItem('access_token')
    ? decode(localStorage.getItem('access_token')).user.email
    : ' ';
  return async (dispatch) => {
    dispatch(getMyProductRequest());
    const res = await axiosInstance.post(
      '/market/myproduct',
      { email: currentUser },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      }
    );
    if (res.status === 200) {
     // console.log(res.data);
      dispatch(getMyProductSuccess(res.data));
    }
    if (res.status === 400) {
     // console.log(res.data);
      dispatch(getMyProductFailure(res.data));
    }
  };
};

//DELETE PRODUCT

const deleteMyProductSuccess = (payload) => ({
  type: myProducts.DELETE_MYPRODUCT,
  payload,
});
export const deleteProductDetails = (id) => {
  const token = localStorage.getItem('access_token');
  const currentUser = localStorage.getItem('access_token')
    ? decode(localStorage.getItem('access_token')).user.email
    : ' ';

  //  `http://localhost:3000/market/delete/${id}`,
  //console.log(currentUser, id);
  return async (dispatch) => {
    try {
      dispatch(getMyProductRequest());
    const res = await axiosInstance.delete(`/market/delete/${id}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
      data: {
        email: currentUser,
      },
    });
    if (res.status === 200) {
      //console.log(res.data);
      const data={
        type:"success",
        message:res.data.message
      }
      dispatch(deleteMyProductSuccess(res.data));
      return data;
    }
    } catch (error) {
      const data={
        type:"failed",
        message:error.response.data
      }
      dispatch(getMyProductFailure(error.response.data));
      return data
    }
    
  };
};
