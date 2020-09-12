import React, { useState } from 'react';
import decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addProductDetails, addProductRequest } from '../redux/index';
import { FaArrowLeft } from 'react-icons/fa';

const userCon = decode(localStorage.getItem('access_token'));
const defaultState = {
  product_name: '',
  userContact: userCon && userCon.user ? userCon.user.contact : '',
  product_price: '',
  imageurl: '',
};

const AddProduct = (props) => {
  // console.log();
  //console.log(props);
  const [productDetails, setProductDetails] = useState({
    ...defaultState,
  });

  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProductDetails({ ...productDetails, [name]: value });
  };

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
      props.addProductDetails(productDetails);
      setProductDetails(defaultState);
      props.addProductRequest();
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
                <Link to='/' className='path'>
                  <FaArrowLeft />
                </Link>
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
                    value={productDetails.userContact}
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
                  props.addProduct.productDetails ? 'alert alert-success' : null
                }
              >
                {props.addProduct.productDetails}
              </p>
              <p
                className={
                  props.addProduct.error || error ? 'alert alert-danger' : null
                }
              >
                {error ? error : props.addProduct.error}
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
  addProduct: state.addProduct,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addProductDetails: (userLogin) => dispatch(addProductDetails(userLogin)),
    addProductRequest: () => dispatch(addProductRequest()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
