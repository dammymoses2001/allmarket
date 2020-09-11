import {
  MY_PRODUCT_REQUEST,
  MY_PRODUCT_SUCCESS,
  MY_PRODUCT_FAILED,
  MY_PRODUCT_DELETE,
} from './myProductTypes';

const initialState = {
  loading: false,
  myProduct: [],
  error: '',
};

const myProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case MY_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MY_PRODUCT_SUCCESS:
      return {
        loading: false,
        myProduct: action.payload,
        error: '',
      };
    case MY_PRODUCT_FAILED:
      return {
        loading: false,
        myProduct: '',
        error: action.payload,
      };
    case MY_PRODUCT_DELETE:
      return {
        loading: false,
        myProduct: state.myProduct.filter(
          (myproduct) => myproduct.id !== action.payload
        ),
        error: action.payload,
      };
    default:
      return state;
  }
};

export default myProductReducer;
