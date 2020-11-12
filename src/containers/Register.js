import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../redux/Actions';
import { FaArrowLeft } from 'react-icons/fa';
const initialState = {
  fullname: '',
  email: '',
  password: '',
  contact: '',
};
function Register(props) {
  //console.log(props.register);
  const [register, setRegister] = useState(initialState);
  const [redirect, setRedirect] = useState(false);
  // console.log(register, props, redirect);
  const [message, setMessage] = useState({});
  const handleChange = (e) => {
    e.preventDefault();
    const { target } = e;
    setRegister({ ...register, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRedirect(!redirect);
    const { fullname, email, password, contact } = register;
    //console.log(email, password);
    if (
      fullname.length > 1 &&
      email.length > 1 &&
      password.length > 1 &&
      contact.length > 1
    ) {
      props.registerUser(register).then((response) => {
        console.log(response);
        setMessage(response)
        setRegister(initialState);
        setTimeout(() => {
          setMessage({});
        }, 3000);
      });

      // console.log(props.register);
    } else {
      setMessage({ data: 'All fields are required' });
      setTimeout(() => {
        setMessage({});
      }, 3000);
      // console.log('Adios');
    }
  };
  //console.log(message);
  return (
    <div>
      <div className='limiter'>
        <div className='container-login100'>
          <div className='wrap-login100'>
            <form className='login100-form validate-form'>
              <div className='header-nav'>
                <Link to='/login' className='path'>
                  <FaArrowLeft />
                </Link>
                <span className='login100-form-title '>Register new User</span>
              </div>
              <div className='login-input'>
                <div className='input'>
                  <input
                    type='text'
                    name='fullname'
                    value={register.fullname}
                    onChange={handleChange}
                    placeholder='Enter Full Name e.g John Doe'
                  />
                </div>

                <div className='input'>
                  <input
                    type='text'
                    name='email'
                    value={register.email}
                    onChange={handleChange}
                    placeholder='Enter Email e.g JohnDoe@gmail.com'
                  />
                </div>

                <div className='input'>
                  <input
                    type='number'
                    name='contact'
                    value={register.contact}
                    onChange={handleChange}
                    placeholder='Enter Contact e.g 081289XXXXX'
                  />
                </div>
                <div className='input'>
                  <input
                    type='password'
                    name='password'
                    value={register.password}
                    onChange={handleChange}
                    placeholder='Enter Password'
                  />
                </div>
              </div>
              <p
                className={
                  message && message.message === 'success'
                    ? 'alert alert-success text-center '
                    : message && message.message === 'failed' ? 'alert alert-danger  text-center ' :
                      message && message.data ? 'alert alert-danger  text-center ' : null
                }
              >
                {message && message.data}
              </p>

              <div className='container-login100-form-btn'>
                {/* <Link to='/login'> */}
                <button className='login100-form-btn' onClick={handleSubmit}>
                  Register
                </button>
                {/* </Link> */}
              </div>
              <div className='text-center p-t-46 p-b-20'>
                <span className='txt2'>
                  Click here to
                  <Link to='/login'>
                    &nbsp;<span>Sign</span>
                  </Link>
                </span>
              </div>
            </form>

            <div className='login101-more'></div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  register: state.register,
});

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (userLogin) => dispatch(registerUser(userLogin)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
