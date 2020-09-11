import {
  ADDPRODUCT_REQUEST,
  ADDPRODUCT_SUCCESS,
  ADDPRODUCT_FAILURE,
} from './addProductType';

const initialState = {
  loading: false,
  productAdded: false,
  productDetails: '',
  error: '',
};

const addProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDPRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADDPRODUCT_SUCCESS:
      return {
        loading: false,
        productDetails: action.payload,
        productAdded: true,
        error: '',
      };
    case ADDPRODUCT_FAILURE:
      return {
        loading: false,
        productDetails: '',
        productAdded: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default addProductReducer;
