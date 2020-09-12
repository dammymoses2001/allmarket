import React from 'react';

import { withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';

function Products(props) {
  return (
    <div>
      <div className=' '>
        <div className=' my-4 topcard   '>
          <figure className='figure mb-3 '>
            <img
              className='figure-img img-fluid'
              src={props.imagelink}
              alt=''
            />
            <div className='figure-caption'>
              <p className=' text-center product-name '>{props.name}</p>
            </div>
            <p className='see more d-flex justify-content-center'>
              <a
                href={`https://api.whatsapp.com/send?phone=234${props.contact}`}
                rel='noopener noreferrer'
                target='_blank'
                className='btn btn-dark text-center text-white btn-sm mb-4'
              >
                Contact me
              </a>
            </p>
          </figure>
        </div>
      </div>
    </div>
  );
}
// const mapStateToProps = (state) => ({
//   product: state.product,
//   deleteProduct: state.deleteProduct,
// });

// const mapDispatchToProps = (dispatch) => {
//   return {
//     //selectProduct: (id) => dispatch(selectProduct(id)),
//     deleteProductDetails: (id) => dispatch(deleteProductDetails(id)),
//   };
// };

export default withRouter(Products);
