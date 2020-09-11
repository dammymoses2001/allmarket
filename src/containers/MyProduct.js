import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import decode from 'jwt-decode';
import Nav from '../components/Nav';
import Header from '../components/Header';
import {
  myProductAction,
  deleteProductDetails,
  myProductDelete,
} from '../redux/index';
import Products from '../components/Products';
import { FaEdit, FaTrash } from 'react-icons/fa';
export const MyProduct = ({
  myProductAction,
  history,
  deleteProductDetails,
  myProductDelete,
  myProduct,
}) => {
  useEffect(() => {
    myProductAction();
  }, [myProductAction]);

  const currentUser = localStorage.getItem('access_token')
    ? decode(localStorage.getItem('access_token')).user.email
    : '';
  //after decoding the email
  const [userEmail] = useState(currentUser);

  const handleEdit = (product) => {
    try {
      history.replace({
        pathname: '/market/update',
        state: product,
      });
    } catch (error) {}
  };
  const handleDelete = (id) => {
    console.log(id);
    deleteProductDetails(id);
    myProductDelete(id);
  };
  return (
    <div>
      <Nav />
      <Header
        title='#Add more product here'
        description='My Product'
        button='Add More Product'
      />
      <div className='container'>
        {myProduct.loading ? (
          <div className='text-center alert alert-success'>
            Loading............
          </div>
        ) : (
          <div className='row'>
            {myProduct.myProduct.map((product) => (
              <div className='col-md-4' key={product.id}>
                <Products
                  key={product.id}
                  id={product.id}
                  imagelink={product.imageurl}
                  price={product.product_price}
                  name={product.product_name}
                  contact={product.user_contact}
                  email={product.email}
                  currentUserEmail={userEmail}
                />
                <div className='absolute d-flex justify-content-between'>
                  <div className='text-muted text-center price '>
                    ${product.product_price}
                  </div>
                  <div className='delete'>
                    <div>
                      <FaEdit
                        className='product-icon'
                        color='white'
                        onClick={() => handleEdit(product)}
                      />

                      <FaTrash
                        className='product-icon'
                        color='white'
                        onClick={() => handleDelete(product.id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  myProduct: state.myProduct,
  product: state.product,
});

const mapDispatchToProps = (dispatch) => {
  return {
    myProductAction: () => dispatch(myProductAction()),
    deleteProductDetails: (id) => dispatch(deleteProductDetails(id)),
    myProductDelete: (id) => dispatch(myProductDelete(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProduct);
