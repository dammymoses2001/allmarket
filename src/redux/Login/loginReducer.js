import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
} from './loginType';

const initialState = {
  loading: false,
  token: '',
  error: '',
  isLoggedIn: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_USER_SUCCESS:
      return {
        loading: false,
        token: action.payload,
        isLoggedIn: true,
        error: '',
      };
    case LOGIN_USER_FAILURE:
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
