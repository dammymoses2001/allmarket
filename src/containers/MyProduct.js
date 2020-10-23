import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Nav from '../components/Nav';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Modal from '../components/UI/modal';
import { getMyProductsAction, deleteProductDetails } from '../redux/Actions';

import Products from '../components/Products';
import { FaEdit, FaTrash } from 'react-icons/fa';
export const MyProduct = ({
  history,
  deleteProductDetails,
  userProducts,
  getMyProductsAction,
  match,
  token,
}) => {
  //console.log(userProducts);
  //modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [productId, setProductId] = useState('');
  //console.log(userProducts);
  const [message, setMessage] = useState({});
  useEffect(() => {
    getMyProductsAction();
  }, [getMyProductsAction]);

  const currentUser = token.user.email ? token.user.email : '';
  //after decoding the email
  const [userEmail] = useState(currentUser);

  const handleEdit = (product) => {
    try {
      history.replace({
        pathname: '/market/update',
        state: {
          product: product,
          url: match.url,
        },
      });
    } catch (error) {}
  };
  const handleDelete = () => {
    //console.log(id);
    handleClose();
    deleteProductDetails(productId).then((data) => {
      setMessage(data);
      setTimeout(()=>{
        setMessage({})
      },5000)
    });
    //myProductDelete(id);
  };
  const handleToogle = (id) => {
    handleShow();
    setProductId(id);
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
        <Modal
          show={show}
          onHide={handleClose}
          handleClose={handleClose}
          title={'Delete Product'}
          cancel={'Cancel'}
          action={'Delete'}
          body={"This action can't be undone."}
          handleAction={handleDelete}
        />
        {userProducts.loading ? (
          <div>
            <Loading />
          </div>
        ) : (
          <>
            {userProducts.Products && userProducts.Products.length === 0 ? (
              <div className='border-2 text-center my-5'>
                You don't have any product Currently
              </div>
            ) : (
              <div className='row'>
                <div className={message.type === 'success' ? 'delete-product m-2' : null}>
                  <span
                    className={
                      message.type === 'success'
                        ? 'alert alert-success '
                        : message.type === 'failed'
                        ? 'alert alert-danger'
                        : null
                    }
                  >
                    {message.message}
                  </span>
                </div>
                {userProducts.Products &&
                  userProducts.Products.map((product) => (
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
                              onClick={() => handleToogle(product.id)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  // myProduct: state.myProduct,
  //product: state.product,
  userProducts: state.userProducts,
  token: state.token,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getMyProductsAction: () => dispatch(getMyProductsAction()),
    deleteProductDetails: (id) => dispatch(deleteProductDetails(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProduct);
