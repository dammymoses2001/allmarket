import {
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
} from './productType';

const initialState = {
  loading: false,
  product: [],
  selectedProduct: [],
  isDeleted: '',
  isUpdated: '',
  error: '',
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
        isDeleted: '',
        isUpdated: '',
        error: '',
      };
    case FETCH_PRODUCT_FAILURE:
      return {
        loading: false,
        product: '',
        isDeleted: '',
        isUpdated: '',
        error: action.payload,
      };
    ////////////////////////////////////////////////////////////////
    case DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload
          ? state.product.filter((product) => product.id !== action.payload)
          : state.product,
        isDeleted: 'Product deleted',
        isUpdated: '',
        error: '',
      };
    case DELETE_PRODUCT_FAILURE:
      return {
        loading: false,
        product: state.product,
        isDeleted: '',
        isUpdated: '',
        error: action.payload,
      };
    //----------------------update Product---------------------------
    // case UPDATE_PRODUCT_REQUEST:
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    // case UPDATE_PRODUCT_SUCCESS:
    //   return {
    //     loading: false,
    //     product: [],
    //     isUpdated: action.payload,
    //     error: '',
    //   };
    // case UPDATE_PRODUCT_FAILURE:
    //   return {
    //     loading: false,
    //     product: '',
    //     isUpdated: '',
    //     error: action.payload,
    //   };

    default:
      return state;
  }
};

export default productReducer;
