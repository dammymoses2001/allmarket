import Login from '../containers/Login';
import Register from '../containers/Register';
import Market from '../containers/Market';
import Product from '../containers/AddProduct';
import Error from '../containers/Error';
import Index from '../containers/Index';
import Edit_UpdateProduct from '../containers/Edit_UpdateProduct';
import MyProduct from '../containers/MyProduct';
import MyProfile from '../containers/MyProfile';
export const publicRoute = [
  {
    path: '/',
    component: Index,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/market',
    component: Market,
  },
];

export const protectedRoute = [
  {
    path: '/market/addproduct',
    component: Product,
  },
  {
    path: '/market/update',
    component: Edit_UpdateProduct,
  },
  {
    path: '/market/myproduct',
    component: MyProduct,
  },
  {
    path: '/market/myprofile',
    component: MyProfile,
  },
  {
    component: Error,
  },
];
