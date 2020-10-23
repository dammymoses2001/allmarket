import axios from 'axios';
import { api } from '../../urlconfig';
const token = localStorage.getItem('token');
// console.log(token);
export const axiosInstance = axios.create({
  baseURL: api,

  headers: {
    Authorization: token ? `Bearer ${token}` : '',
  },
});

// export const setAuthToken = (token) => {
//   return (headers: {});
// };
// export const option = {
//   header: { Authorization: token },
// };

// export const setAuthToken = token => {
//   export const setAuthToken = (token) => {
//     if (token) {
//       //apply token

//       return (axiosInstance.defaults.headers.common['Authorization'] = token);
//     } else {
//       //deleting the token from header
//       return axiosInstance.defaults.headers.common['Authorization'];
//     }
//   };
export default axiosInstance;
