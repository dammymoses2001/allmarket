import React, { useState,useEffect } from 'react';
//import decode from 'jwt-decode';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//import { addProductDetails, addProductRequest } from '../redux/index';
import { addProductDetails,getAllProductAction } from '../redux/Actions';
import { FaArrowLeft } from 'react-icons/fa';

const AddProduct = ({getAllProductAction,addProductDetails,token,location,getAllProduct,history}) => {
 //const [contact,setContact] =useState("");
 //console.log(contact)
  //console.log(token.user.contact)
  useEffect(() => {
    getAllProductAction();
    //setContact(token.user.contact)
  }, [getAllProductAction])
  //console.log(getAllProduct);
  //console.log(contact)
  const defaultState = {
    product_name: '',
    userContact: token.user.contact,
    product_price: '',
    imageurl: '',
  };
  // console.log();
  //console.log(props);
  const [productDetails, setProductDetails] = useState({
    ...defaultState,
  });
  // console.log(productDetails)
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProductDetails({ ...productDetails, userContact:token.user.contact, [name]: value });
  };
  //console.log(productDetails)

  // console.log(error);
  const vaildate = () => {
    
    const {
      product_name,
      userContact,
      product_price,
      imageurl,
    } = productDetails;
    let errorMessage = '';
    // console.log(product_name.length);
    if (
      product_name.length < 1 ||
      userContact.length < 1 ||
      product_price.length < 1 ||
      imageurl < 1
    ) {
      errorMessage = 'All field are manditory';
      setError(errorMessage);
      setInterval(() => {
        setError('');
      }, 5000);

      return false;
    }

    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isVaild = vaildate();

    if (isVaild) {
      addProductDetails(productDetails);
      setProductDetails(defaultState);
    }
  };

  // console.log(productDetails);
  return (
    <div>
      <div className='limiter'>
        <div className='container-login100'>
          <div className='wrap-login100'>
            <form className='login100-form validate-form'>
              <div className='header-nav'>
                <span
                  className='path'
                  onClick={(e) => {
                    history.push(location.state ? location.state : '/');
                  }}
                >
                  <FaArrowLeft />
                </span>
                <span className='login100-form-title '>Add Your Product</span>
              </div>
              <div className='login-input'>
                <div className='input'>
                  <input
                    type='text'
                    name='product_name'
                    value={productDetails.product_name}
                    onChange={handleChange}
                    placeholder='Enter Product name Here e e.g Jbelt, Gucci Bag'
                  />
                </div>

                <div className='input'>
                  <input
                    type='number'
                    name='userContact'
                    onChange={handleChange}
                    value={token.user.contact ? token.user.contact : ""}
                    placeholder='Enter Number e.g 081235XXXXXX'
                    required
                  />
                </div>

                <div className='input'>
                  <input
                    type='number'
                    name='product_price'
                    onChange={handleChange}
                    value={productDetails.product_price}
                    placeholder='Enter Product Price e.g 50 500'
                  />
                </div>
                <div className='input'>
                  <input
                    type='text'
                    name='imageurl'
                    onChange={handleChange}
                    value={productDetails.imageurl}
                    placeholder='Enter Your Image Link Here e.g https:\\'
                    required
                  />
                </div>
              </div>
              <p
                className={
                  getAllProduct.message
                    ? 'text-center bg-success text-white my-2 py-2 br-0':  getAllProduct.error  || error?
                     'text-center bg-danger text-white my-2 py-2 br-0' : null
                }
              >
                {getAllProduct.message
                  ? getAllProduct.message
                  : getAllProduct.error 
                  ? getAllProduct.error
                  : error ? error : null}
              </p>
              <div className='container-login100-form-btn'>
                <button className='login100-form-btn' onClick={handleSubmit}>
                  Add Product
                </button>
              </div>
            </form>

            <div className='login100-more'></div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  getAllProduct: state.getAllProduct,
  token:state.token
});

const mapDispatchToProps = (dispatch) => {
  return {
    addProductDetails: (newProduct) => dispatch(addProductDetails(newProduct)),
    getAllProductAction: () => dispatch(getAllProductAction()),
    
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
