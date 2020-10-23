import { Login } from '../constant';
//import decode from 'jwt-decode';
const initialState = {
  loading: false,
  token: '',
  user:[],
  message: null,
  error: '',
  isLoggedIn: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case Login.LOGIN_USER_REQUEST:
      //console.log(action.type);
      return {
        ...state,
        loading: true,
      };

    case Login.LOGIN_USER_SUCCESS:
      
      return {
        loading: false,
        token: action.payload.token,
        user:action.payload.user,
        message: action.payload.message,
        isLoggedIn: true,
        error: '',
      };

    case Login.LOGOUT:
      return {
        ...initialState,
      };

    case Login.LOGIN_USER_FAILURE:
      return {
        loading: false,
        token: '',
        isLoggedIn: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
