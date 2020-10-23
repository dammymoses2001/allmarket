import {userProfile} from '../constant';
  
  const initialState = {
    loading: false,
    myProfile: [],
    error: '',
  };
  
  const myProfileReducer = (state = initialState, action) => {
    switch (action.type) {
      case userProfile.MY_PROFILE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case userProfile.MY_PROFILE_SUCCESS:
        return {
          loading: false,
          myProfile: action.payload,
          error: '',
        };
      case userProfile.MY_PROFILE_FAILED:
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
  