import { allProduct } from '../constant';

const initialState = {
  loading: false,
  allProduct: [],
  message: null,
  error: null,
};

const editProduct = (allProduct, editProduct) => {
  //console.log(allProduct.length);
  const newProduct = [];
  //to remove exisiting product
  const Product = allProduct.filter((product) => product.id !== editProduct.id);
  //putting both exisitng products and new editi product into an array
  newProduct.push(...Product, editProduct);
  //sorting that array using ids
  newProduct.sort((a, b) => a.id - b.id);
  //return the result
  return newProduct;
};

const allProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case allProduct.FETCH_ALL_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case allProduct.FETCH_ALL_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        allProduct: action.payload,
        message:""
      };

    case allProduct.ADD_PRODUCT_SUCCESS:
      const newProduct = [...state.allProduct, action.payload.data];
      //console.log(newProduct, action.payload.data, state.allProduct);
      return {
        ...state,
        loading: false,
        allProduct: newProduct,
        message: action.payload.message,
      };

    case allProduct.EDIT_PRODUCT_SUCCESS:
      const updateProduct = editProduct(state.allProduct, action.payload.data);
      //console.log(updateProduct);
      return {
        ...state,
        loading: false,
        allProduct: updateProduct,
        message: action.payload.message,
      };

    case allProduct.DELETE_PRODUCT:
      return {
        ...state,
        loading: false,
        allProduct: state.allProduct.filter(
          (product) => product.id !== action.payload.data
        ),
        message: action.payload.message,
      };

    case allProduct.FETCH_ALL_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default allProductReducer;
