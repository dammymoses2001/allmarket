import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from '../components/Nav';
import Header from '../components/Header';
import AddProducts from '../components/AllProducts';

function Market() {
  return (
    <div className='market-main'>
      <Nav />
      <Header
        title='#buy and sale for free 2020'
        description='Sell for Free'
        button='Add Product'
      />
      <AddProducts />
    </div>
  );
}

export default Market;
