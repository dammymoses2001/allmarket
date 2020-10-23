import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { myProfileAction } from '../redux/Actions';
export const MyProfile = ({ myProfileAction, userProfile }) => {
  useEffect(() => {
    myProfileAction();
  }, [myProfileAction]);
//console.log(userProfile)
  return (
    <div>
      {userProfile.myProfile.map((user) => (
        <div className='limiter' key={user.id}>
          <div className='container-login100'>
            <div className='wrap-login100'>
              <form className='login100-form validate-form'>
                <div className='header-nav'>
                  <Link to='/' className='path'>
                    <FaArrowLeft />
                  </Link>
                  <span className='login100-form-title '>My Profile</span>
                </div>
                <div className='login-input'>
                  <div className='input '>
                    <label className='h5'>Full Name:</label>
                    <input
                      type='text'
                      className='profile'
                      name='fullname'
                      defaultValue={user.fullname.toUpperCase()}
                      //onChange={handleChange}
                      disabled
                      placeholder='Enter Full Name e.g John Doe'
                    />
                  </div>

                  <div className='input'>
                    <label className='h5'>Email:</label>
                    <input
                      className='profile'
                      type='text'
                      name='email'
                      defaultValue={user.email.toUpperCase()}
                      // onChange={handleChange}
                      placeholder='Enter Email e.g JohnDoe@gmail.com'
                      disabled
                    />
                  </div>

                  <div className='input'>
                    <label className='h5'>Contact:</label>
                    <input
                    className='profile'
                      type='text'
                      name='contact'
                      defaultValue={user.contact.toUpperCase()}
                      // onChange={handleChange}
                      placeholder='Enter Contact e.g 081289XXXXX'
                    />
                  </div>
                  <div className='input'>
                    <label className='h5'>Date Joined</label>
                    <textarea
                      className='profile '
                      type='text'
                      name='dateJoined'
                      defaultValue={user.datejoined.toUpperCase()}
                      // onChange={handleChange}
                      placeholder='Enter Password'
                      disabled
                    />
                  </div>
                </div>

                <div className='container-login100-form-btn'>
                  <Link to='/'>
                    <button className='login100-form-btn'>Back</button>
                  </Link>
                </div>
              </form>

              <div className='login101-more'></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  userProfile: state.userProfile,
});

const mapDispatchToProps = (dispatch) => {
  return {
    myProfileAction: () => dispatch(myProfileAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
