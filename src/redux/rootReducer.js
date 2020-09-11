import { combineReducers } from 'redux';
import loginReducer from './Login/loginReducer';
import registerReducer from './Register/registerReducer';
import productReducer from './Product/productReducer';
import addProductReducer from './AddProduct/addProductReducer';
import myProductReducer from './MyProduct/my ProductReducer';
import updateProductReducer from './UpdateProduct/updateProductReducer';
import myProfileReducer from './MyProfile/myProfileReducer';

const rootReducer = combineReducers({
  token: loginReducer,
  register: registerReducer,
  product: productReducer,
  addProduct: addProductReducer,
  updateProduct: updateProductReducer,
  myProduct: myProductReducer,
  myProfile: myProfileReducer,
});

export default rootReducer;
