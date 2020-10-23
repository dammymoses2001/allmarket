import axios from '../helper/axios';
import {Register} from '../constant'

const registerRequest = () => {
  return {
    type: Register.REGISTER_REQUEST,
  };
};

const registerSuccess = (data) => {
  return {
    type: Register.REGISTER_SUCCESS,
    payload: data,
  };
};

const registerFailed = (error) => {
  return {
    type: Register.REGISTER_FAILED,
    payload: error,
  };
};

export const registerUser = (userdetails) => {
  return async (dispatch) => {
    try {
        dispatch(registerRequest())
        const response = await axios.post('/register', {
          fullname: userdetails.fullname,
          email: userdetails.email,
          password: userdetails.password,
          contact: userdetails.contact,
        })
        //console.log(response)
        if(response.status === 201){
           // console.log(response)
           
            const data = {
                data:response.data,
                message:'success'
            }
            dispatch(registerSuccess(response.data));
            return data
        }
      
      } catch (error) {
        dispatch(registerFailed(error.response && error.response.data ?error.response.data : ''));
        //console.log(error.response.data)
        if(error.response && error.response.data){
            const data = {
                data:error.response.data,
                message:'failed'
            }
            return data
        }
       
      }

  };
};
