import {Register} from '../constant'
  
  const initialState = {
    loading: false,
    register: '',
    error: '',
  };
  
  const registerReducer = (state = initialState, action) => {
    switch (action.type) {
      case Register.REGISTER_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case Register.REGISTER_SUCCESS:
        return {
          loading: false,
          register: action.payload,
          error: '',
        };
      case Register.REGISTER_FAILED:
        return {
          loading: false,
          register: '',
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default registerReducer;
  