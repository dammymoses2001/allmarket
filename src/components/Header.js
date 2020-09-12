import React, { useEffect, useState } from 'react';
import decode from 'jwt-decode';
import model from '../Picture/model_3.png';
import { Link, withRouter } from 'react-router-dom';

export const Header = ({ title, description, button, history }) => {
  useEffect(() => {
    try {
      const user = decode(localStorage.getItem('access_token')).user;
      setUser(user);
    } catch (error) { }
  }, []);
  const [user, setUser] = useState();

  return (
    <div className='Header'>
      {/* <div className='message'>
        <p>Heleleleo</p>
      </div> */}
      <div className='top-section '>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6 ml-auto order-md-2 align-self-center top'>
              <h3>{title}</h3>
              <h1>{description}</h1>

              {user ? (
                <Link to='/market/addproduct'>{button}</Link>
              ) : (
                  <button
                    className='btn btn-dark'
                    to='/login'
                    onClick={(e) => {
                      // console.log('click');
                      e.preventDefault();
                      setUser('');
                      history.replace({
                        pathname: '/login',
                      });
                      localStorage.clear();
                      //window.location.reload();
                      // localStorage.setItem('access_token', '');
                    }}
                  >
                    {button}
                  </button>
                )}
              {/* <Link to='/market/addproduct'>{button}</Link> */}
            </div>

            <div className='col-md-6 order-1 align-self-end'>
              <div className='image'>
                <img src={model} alt='model_3' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   product: state.product,
//   deleteProduct: state.deleteProduct,
// });

export default withRouter(Header);
