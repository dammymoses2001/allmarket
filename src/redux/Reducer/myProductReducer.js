import { myProducts } from '../constant';

const initialState = {
  loading: false,
  Products: [],
  message:null,
  error: null,
};

const myProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case myProducts.FETCH_MY_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case myProducts.FETCH_MY_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        Products: action.payload,
      };

    case myProducts.DELETE_MYPRODUCT:
      return {
        ...state,
        loading: false,
        Products: state.Products.filter(
          (product) => product.id !== action.payload.data
        ),
        message: action.payload.message,
      };

    case myProducts.FETCH_MY_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default myProductReducer;
