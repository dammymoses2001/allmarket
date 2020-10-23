import decode from 'jwt-decode';
import { allProduct } from '../constant';
import axiosInstance from '../helper/axios';

const getAllProductRequest = () => ({
  type: allProduct.FETCH_ALL_PRODUCT_REQUEST,
});

const getAllProductSuccess = (payload) => ({
  type: allProduct.FETCH_ALL_PRODUCT_SUCCESS,
  payload,
});

const getAllProductFailure = (payload) => ({
  type: allProduct.FETCH_ALL_PRODUCT_FAILURE,
  payload,
});

export const getAllProductAction = () => {
  return async (dispatch) => {
    dispatch(getAllProductRequest());
    const res = await axiosInstance.get('/market');
    if (res.status === 200) {
     // console.log(res.data);
      dispatch(getAllProductSuccess(res.data));
    }
    if (res.status === 400) {
     // console.log(res.data);
      dispatch(getAllProductFailure(res.data));
    }
  };
};

//ADD PRODUCT
const addProductSuccess = (payload) => ({
  type: allProduct.ADD_PRODUCT_SUCCESS,
  payload,
});

export const addProductDetails = (data) => {
  // console.log(data, email);
  const token = localStorage.getItem('access_token');
  const currentUser = localStorage.getItem('access_token')
    ? decode(localStorage.getItem('access_token')).user.email
    : ' ';

  return async (dispatch) => {
    //axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    try {
      const res = await axiosInstance.post(
        '/market/add',
        {
          productName: data.product_name,
          email: currentUser,
          userContact: data.userContact,
          productPrice: data.product_price,
          imageurl: data.imageurl,
        },
  
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        }
      );
      if (res.status === 201) {
        //console.log(res.data);
        dispatch(addProductSuccess(res.data));
      }
  
    } catch (error) {
      dispatch(getAllProductFailure(error.response.data));
    }
    
  
    // if (res.status === 400) {
    //   dispatch(getAllProductFailure(res.data));
    // }
  };
};

//EDIT PRODUCT

const editProductSuccess = (payload) => ({
  type: allProduct.EDIT_PRODUCT_SUCCESS,
  payload,
});

export const editProductAction = (data) => {
  const token = localStorage.getItem('access_token');
  const user = decode(localStorage.getItem('access_token')).user;
  ///console.log(token);
  const email = user.email;
  //console.log(data);
  return async (dispatch) => {
    try {
      dispatch(getAllProductRequest());
    const res = await axiosInstance.put(
      '/market/update',
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
          Authorization: token ? `Bearer ${token}` : '',
        },
      }
    );
    if (res.status === 201) {
      //console.log(res.data);
      //const token
      dispatch(editProductSuccess(res.data));
     // return res.data
    }
    } catch (error) {
      //console.log(error.response.data)
      dispatch(getAllProductFailure(error.response.data));
      //return false 
    }
  };
};

//DELETE PRODUCT

const deleteProductSuccess = (payload) => ({
  type: allProduct.DELETE_PRODUCT,
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
      dispatch(getAllProductRequest());
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const res = await axiosInstance.delete(`/market/delete/${id}`, {
      data: {
        email: currentUser,
      },
    });
    if (res.status === 200) {
     //alert(res.data.message);
     const data={
      type:"success",
      message:res.data.message
    }
      dispatch(deleteProductSuccess(res.data));
     return data;
    }
    } catch (error) {
      const data={
        type:"failed",
        message:error.response.data
      }
      dispatch(getAllProductFailure(error.response.data));
      return data;
    }
  };
};
