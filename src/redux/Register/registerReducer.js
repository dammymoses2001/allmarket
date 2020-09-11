import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from './registerType';

const initialState = {
  loading: false,
  register: '',
  error: '',
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case REGISTER_SUCCESS:
      return {
        loading: false,
        register: action.payload,
        error: '',
      };
    case REGISTER_FAILED:
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
