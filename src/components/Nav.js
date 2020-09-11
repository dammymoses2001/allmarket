import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import decode from 'jwt-decode';
import { FaUserCircle, FaAlignLeft, FaTimes } from 'react-icons/fa';

function Nav(props) {
  useEffect(() => {
    try {
      const user = decode(localStorage.getItem('access_token')).user;
      setUser(user);
    } catch (error) {}
  }, []);
  const [user, setUser] = useState();

  const [toggle, setToggle] = useState(false);

  const toggleSideBar = () => {
    setToggle(!toggle);
  };

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
          {user ? (
            <>
              <li>
                <Link to='/market/myproduct'>My Product</Link>
              </li>
              <li>
                <Link to='/market/myprofile'>
                  <FaUserCircle />
                  {user && user.fullname ? user.fullname : null}
                </Link>
              </li>
              <li
                onClick={(e) => {
                  // console.log('click');
                  e.preventDefault();
                  setUser('');
                  props.history.replace({
                    pathname: '/market',
                  });
                  localStorage.clear();
                  window.location.reload();
                  // localStorage.setItem('access_token', '');
                }}
              >
                <Link to='/market'>Logout</Link>
              </li>
            </>
          ) : (
            <li
              className='home'
              onClick={(e) => {
                e.preventDefault();
                localStorage.clear();
                setUser('');
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
            <Link to='/market'>Home</Link>
          </li>

          {user ? (
            <>
              <li>
                <Link to='/market/myproduct'>My Product</Link>
              </li>
              <li>
                <Link to='/market/myprofile'>
                  <FaUserCircle />
                  {user && user.fullname ? user.fullname : null}
                </Link>
              </li>
              <li
                onClick={(e) => {
                  e.preventDefault();
                  setUser('');
                  props.history.replace({
                    pathname: '/market',
                  });
                  localStorage.clear();
                  window.location.reload();
                  // localStorage.setItem('access_token', '');
                }}
              >
                <Link to='/market'>Logout</Link>
              </li>
            </>
          ) : (
            <li
              className='home'
              onClick={(e) => {
                e.preventDefault();
                localStorage.clear();
                setUser('');
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

export default withRouter(Nav);
