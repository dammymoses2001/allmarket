import React, { useEffect, useState } from 'react';
import Products from './Products';
import Loading from './Loading';
import decode from 'jwt-decode';
import { connect } from 'react-redux';
import { fetchProduct, deleteProductDetails } from '../redux/index';
import { withRouter } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

function AllProducts({ history, fetchProduct, deleteProductDetails, product }) {
  useEffect(() => {
    try {
      //dont delete this code

      const user = localStorage.getItem('access_token')
        ? decode(localStorage.getItem('access_token')).user.email
        : '';
      setUserEmail(user);
    } catch (error) { }
  }, []);

  //after decoding the email
  const [userEmail, setUserEmail] = useState();

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleEdit = (product) => {
    try {
      history.replace({
        pathname: '/market/update',
        state: product,
      });
    } catch (error) { }
  };
  const handleDelete = (id) => {
    deleteProductDetails(id);
  };
  return (
    <div className='container'>

      {product.loading ? (
        <div>
          <Loading />
        </div>
      ) : (
          <>
            {/* {console.log(product.product.length)} */}
            {product.product.length === 0 ?
              <div className='border-2 text-center my-5'> No Product Currently</div> :
              <div className='row'>
                {product.product.map((product) => (
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
                        {userEmail === product.email ? (
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
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            }

          </>
        )}
    </div>
  );
}
const mapStateToProps = (state) => ({
  product: state.product,
  deleteProduct: state.deleteProduct,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProduct: () => dispatch(fetchProduct()),
    deleteProductDetails: (id) => dispatch(deleteProductDetails(id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllProducts)
);
