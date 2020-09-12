import React, { useState } from 'react';
// import decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateProductAction } from '../redux/index';
import { FaArrowLeft } from 'react-icons/fa';

// const userCon = localStorage.getItem('access_token');
const initial = {
  product_name: '',
  user_contact: '',
  product_price: '',
  imageurl: '',
};

const Edit_UpdateProduct = (props) => {
  // console.log();
  //console.log(props.location);
  // console.log(props);
  const [productDetails, setProductDetails] = useState(
    props.location.state ? props.location.state : initial
  );
  // const [productAdded, setProductAdded] = useState(false);
  // const [productDetails, setProductDetails] = useState({
  //   ...defaultState,
  // });

  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const vaildate = () => {
    const {
      product_name,
      user_contact,
      product_price,
      imageurl,
    } = productDetails;
    let errorMessage = '';
    // console.log(product_name.length);
    if (
      product_name.length < 1 ||
      user_contact.length < 1 ||
      product_price.length < 1 ||
      imageurl < 1
    ) {
      errorMessage = 'All field are mandatory';

      console.log(errorMessage);
      setError(errorMessage);
      setInterval(() => {
        setError('');
      }, 3000);

      return false;
    }

    return true;
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const isVaild = vaildate();
    if (isVaild) {
      props.updateProductAction(productDetails);
    } else {
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
                <span className='login100-form-title '>
                  Edit/Update Your Product
                </span>
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
                    name='user_contact'
                    onChange={handleChange}
                    value={productDetails.user_contact}
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
                  props.updateProduct.isUpdated ? 'alert alert-success' : null
                }
              >
                {props.updateProduct.isUpdated}
              </p>
              <p
                className={
                  props.updateProduct.error || error
                    ? 'alert alert-danger'
                    : null
                }
              >
                {error ? error : props.updateProduct.error}
              </p>
              <div className='container-login100-form-btn'>
                <button className='login100-form-btn' onClick={handleUpdate}>
                  Update/Edit Product
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
  updateProduct: state.updateProduct,
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateProductAction: (data) => dispatch(updateProductAction(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Edit_UpdateProduct);
