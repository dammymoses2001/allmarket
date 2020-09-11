import {
  MY_PROFILE_REQUEST,
  MY_PROFILE_SUCCESS,
  MY_PROFILE_FAILED,
} from './myProfileType';

const initialState = {
  loading: false,
  myProfile: [],
  error: '',
};

const myProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case MY_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MY_PROFILE_SUCCESS:
      return {
        loading: false,
        myProfile: action.payload,
        error: '',
      };
    case MY_PROFILE_FAILED:
      return {
        loading: false,
        myProfile: '',
        error: action.payload,
      };
    default:
      return state;
  }
};

export default myProfileReducer;
