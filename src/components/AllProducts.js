import React, {  useState } from 'react';
import Products from './Products';
import Loading from './Loading';
import Modal from '../components/UI/modal';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { getAllProductAction, deleteProductDetails } from '../redux/Actions';

function AllProducts({ history, deleteProductDetails, getAllProduct, token,match }) {
  //modal 
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [productId,setProductId]= useState("")
  //console.log(history, location);
  //console.log();
  const [message, setMessage] = useState({});
  //after decoding the email
 
  
  
  // useEffect(() => {
  //   fetchProduct();
  // }, [fetchProduct]);

  const handleEdit = (product) => {
    try {
      history.replace({
        pathname: '/market/update',
        state: {
          product:product,
          url:match.url
        },
      });
    } catch (error) {}
  };
  const handleDelete = () => {
    handleClose()
   deleteProductDetails(productId).then((data) => {
    setMessage(data);
    setTimeout(()=>{
      setMessage({})
    },5000)
  });
  };
  const handleToogle = (id) =>{
    handleShow()
    setProductId(id)
  }
  return (
    <div className='container'>
      <Modal  show={show} 
      onHide={handleClose}
      handleClose={handleClose}
       title={"Delete Product"}
       cancel={"Cancel"}
       action={"Delete"}
       body={"This action can't be undone."}
       handleAction={handleDelete}
       />
      
      {getAllProduct.loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <>
          {/* {console.log(product.product.length)} */}
          {getAllProduct.allProduct && getAllProduct.allProduct.length === 0 ? (
            <div className='border-2 text-center my-5'>
              No Product Currently
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

              {getAllProduct.allProduct &&
                getAllProduct.allProduct.map((product) => (
                  <div className='col-md-4' key={product.id}>
                    <Products
                      key={product.id}
                      id={product.id}
                      imagelink={product.imageurl}
                      price={product.product_price}
                      name={product.product_name}
                      contact={product.user_contact}
                      email={product.email}
                      currentUserEmail={token.user.email}
                    />
                    <div className='absolute d-flex justify-content-between'>
                      <div className='text-muted text-center price '>
                        ${product.product_price}
                      </div>
                     
                      <div className='delete'>
                        {token.user.email === product.email ? (
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
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
const mapStateToProps = (state) => ({
  //product: state.product,
  getAllProduct: state.getAllProduct,
  userProducts: state.userProducts,
  token: state.token,
});

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchProduct: () => dispatch(fetchProduct()),
    getAllProductAction: () => dispatch(getAllProductAction()),
    deleteProductDetails: (id) => dispatch(deleteProductDetails(id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllProducts)
);
