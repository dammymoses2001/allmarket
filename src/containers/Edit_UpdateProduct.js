import React, { useState,useEffect } from 'react';
// import decode from 'jwt-decode';
import { connect } from 'react-redux';
import { editProductAction,getAllProductAction } from '../redux/Actions';
import { FaArrowLeft } from 'react-icons/fa';

// const userCon = localStorage.getItem('access_token');
const initial = {
  product_name: '',
  user_contact: '',
  product_price: '',
  imageurl: '',
};

const Edit_UpdateProduct = ({location,getAllProductAction,editProductAction,getAllProduct,history}) => {

  useEffect(() => {
    getAllProductAction();
    //setContact(token.user.contact)
  }, [getAllProductAction])
  const [productDetails, setProductDetails] = useState(
    location.state.product ? location.state.product : initial
  );
  const [message, setMessage] = useState('');

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
    
    // console.log(product_name.length);
    if (
      product_name.length < 1 ||
      user_contact.length < 1 ||
      product_price.length < 1 ||
      imageurl < 1
    ) {
      const message = 'All field are mandatory';

      // console.log(errorMessage);
      setMessage(message);
      setInterval(() => {
        setMessage('');
      }, 3000);

      return false;
    }

    return true;
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const isVaild = vaildate();
    if (isVaild) {
      editProductAction(productDetails);
     
    } else {
     
    }
  };
  const handleBack = () => {
    history.push(location.state.url ? location.state.url : '/');
  };

  // console.log(productDetails);
  return (
    <div>
      <div className='limiter'>
        <div className='container-login100'>
          <div className='wrap-login100'>
            <form className='login100-form validate-form'>
              <div className='header-nav'>
                <span className='path' onClick={handleBack}>
                  <FaArrowLeft />
                </span>
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
                  message
                    ? 'text-center bg-danger text-white my-4 py-2 br-0'
                    : getAllProduct && getAllProduct.message
                    ? 'text-center bg-success text-white my-4 py-2 br-0'
                    : null
                }
              >
                {message ||   getAllProduct.message}
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
  getAllProduct: state.getAllProduct,
});

const mapDispatchToProps = (dispatch) => {
  return {
    editProductAction: (data) => dispatch(editProductAction(data)),
    getAllProductAction: () => dispatch(getAllProductAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Edit_UpdateProduct);
