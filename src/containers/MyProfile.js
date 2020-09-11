import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { myProfileAction } from '../redux/index';
export const MyProfile = ({ myProfileAction, myProfile }) => {
  useEffect(() => {
    myProfileAction();
  }, [myProfileAction]);

  return (
    <div>
      {myProfile.myProfile.map((user) => (
        <div className='limiter' key={user.id}>
          <div className='container-login100'>
            <div className='wrap-login100'>
              <form className='login100-form validate-form'>
                <div className='header-nav'>
                  <Link to='/market' className='path'>
                    <FaArrowLeft />
                  </Link>
                  <span className='login100-form-title '>My Profile</span>
                </div>
                <div className='login-input'>
                  <div className='input'>
                    <label className='h5'>Full Name:</label>
                    <input
                      type='text'
                      name='fullname'
                      defaultValue={user.fullname}
                      //onChange={handleChange}
                      disabled
                      placeholder='Enter Full Name e.g John Doe'
                    />
                  </div>

                  <div className='input'>
                    <label className='h5'>Email:</label>
                    <input
                      type='text'
                      name='email'
                      defaultValue={user.email}
                      // onChange={handleChange}
                      placeholder='Enter Email e.g JohnDoe@gmail.com'
                      disabled
                    />
                  </div>

                  <div className='input'>
                    <label className='h5'>Contact:</label>
                    <input
                      type='number'
                      name='contact'
                      defaultValue={user.contact}
                      // onChange={handleChange}
                      placeholder='Enter Contact e.g 081289XXXXX'
                    />
                  </div>
                  <div className='input'>
                    <label className='h5'>Date Joined</label>
                    <input
                      type='text'
                      name='dateJoined'
                      defaultValue={user.datejoined}
                      // onChange={handleChange}
                      placeholder='Enter Password'
                      disabled
                    />
                  </div>
                </div>

                <div className='container-login100-form-btn'>
                  <Link to='/market'>
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
  myProfile: state.myProfile,
});

const mapDispatchToProps = (dispatch) => {
  return {
    myProfileAction: () => dispatch(myProfileAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
