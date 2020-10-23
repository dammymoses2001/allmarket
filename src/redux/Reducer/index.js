import { combineReducers } from 'redux';
import getAllProduct from './allProductReducer';
import userProducts from './myProductReducer';
import token from './LoginReducer';
import userProfile from './userProfileReducer';
import register from './registerReducer'

const rootReducer = combineReducers({
  getAllProduct: getAllProduct,
  userProducts: userProducts,
  token: token,
  userProfile:userProfile,
  register:register,
});

export default rootReducer;
