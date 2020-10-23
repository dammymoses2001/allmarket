import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { LogOut } from '../redux/Actions';
import { FaUserCircle, FaAlignLeft, FaTimes } from 'react-icons/fa';

function Nav(props) {
  const dispatch = new useDispatch();
  //console.log(props.token.user)

  const [toggle, setToggle] = useState(false);

  const toggleSideBar = () => {
    setToggle(!toggle);
  };

  //console.log(user)
  return (
    <header>
      <div className={!toggle ? 'hideSideBar ' : 'mobile-view'}>
        <div>
          <Link to='/' className='Logo'>
            AllMarket
          </Link>
          <span onClick={toggleSideBar}>
            <FaTimes />
          </span>
        </div>

        <ul className='mobile'>
          <li className='home'>
            <Link to='/'>Home</Link>
          </li>
          {props.token.user.fullname ? (
            <>
              <li>
                <Link to='/market/myproduct'>My Product</Link>
              </li>
              <li>
                <Link to='/market/myprofile'>
                  <FaUserCircle />
                  {props.token.user.fullname && props.token.user.fullname
                    ? props.token.user.fullname
                    : null}
                </Link>
              </li>
              <li
                onClick={(e) => {
                  // console.log('click');
                  e.preventDefault();
                  //setUser('');
                  props.history.replace({
                    pathname: '/',
                  });
                  localStorage.clear();
                  window.location.reload();
                  // localStorage.setItem('access_token', '');
                }}
              >
                <Link to='/'>Logout</Link>
              </li>
            </>
          ) : (
            <li
              className='home'
              onClick={(e) => {
                e.preventDefault();
                dispatch(LogOut());
                //setUser('');
                // localStorage.clear();
                // setUser('');
                // props.history.replace({
                //   pathname: '/login',
                // });

                // localStorage.setItem('access_token', '');
              }}
            >
              Sign
            </li>
          )}
        </ul>
      </div>
      {/* {user ? ( */}
      <div className='site-view'>
        <Link to='/' className='Logo'>
          AllMarket
        </Link>
        <span>
          <FaAlignLeft onClick={toggleSideBar} />
        </span>
        <ul className='hide'>
          <li className='home'>
            <Link to='/'>Home</Link>
          </li>

          {props.token.user.fullname ? (
            <>
              <li>
                <Link to='/market/myproduct'>My Product </Link>
              </li>
              <li>
                <Link to='/market/myprofile'>
                  <FaUserCircle />
                  {props.token.user && props.token.user.fullname
                    ? props.token.user.fullname
                    : null}
                </Link>
              </li>
              <li
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(LogOut());
                  //setUser('');
                  // props.history.replace({
                  //   pathname: '/',
                  // });
                  // localStorage.clear();
                  // window.location.reload();
                  // localStorage.setItem('access_token', '');
                }}
              >
                <Link to='/'>Logout</Link>
              </li>
            </>
          ) : (
            <li
              className='home'
              onClick={(e) => {
                e.preventDefault();
                localStorage.clear();
                // setUser('');
                props.history.replace({
                  pathname: '/login',
                });

                // localStorage.setItem('access_token', '');
              }}
            >
              Sign
            </li>
          )}
        </ul>
      </div>
      {/* ) : null} */}
    </header>
  );
}

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = {};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));
