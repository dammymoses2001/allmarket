import {
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
} from './updateProducerType';

const initialState = {
  loading: false,
  isUpdated: '',
  error: '',
};

const updateReducer = (state = initialState, action) => {
  switch (action.type) {
    //----------------------update Product---------------------------
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload,
        error: '',
      };
    case UPDATE_PRODUCT_FAILURE:
      return {
        loading: false,
        isUpdated: '',
        error: action.payload,
      };

    default:
      return state;
  }
};

export default updateReducer;
