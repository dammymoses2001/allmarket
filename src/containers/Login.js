import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link, Redirect } from 'react-router-dom';
//import { FetchToken } from '../redux/index';
import { LoginAction } from '../redux/Actions';
import Loading from '../components/Loading';
export const Login = ({ token, LoginAction }) => {
 // console.log(token)
const [message, setMessage] = useState("");
  if (token.isLoggedIn) {
    return <Redirect to='/' />;
  }
  //console.log(message);
  return (
    <div className='login'>
     
      <div>
     
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              //Enter my actions here
              LoginAction(values).then(data=>{
                if(data){
                  //console.log(data)
                  setMessage('Invalid Credentials')
                  // console.log(token.erro)
                 // setMessage("Invalid Credentials")
                  setTimeout(()=>{
                   setMessage("")
                    //console.log('login error in')
                  },3000)
                 
                  //console.log('login error out')
                }   
              });
              // console.log('Logging in', values);
            });
          }}
          //here define the vaildation
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required('Email Field is required'),
            password: Yup.string()
              .required('Password Field is required')
              .min(2, 'Password to short'),
            // .matches(/(?=.*[0-9])/, 'Password should contain a number'),
          })}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              // isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
            } = props;

            return (
              <>
                <div className='limiter'>
                  <div className='container-login100'>
                    <div className='wrap-login100'>
                      <form
                        className='login100-form validate-form'
                        onSubmit={handleSubmit}
                      >
                        <span className='login100-form-title '>
                          Login to continue
                        </span>
                        <div className='login-input'>
                          <div className='input'>
                            <input
                              type='text'
                              name='email'
                              placeholder='Enter Email Here'
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.email && touched.email && 'error'
                              }
                            />
                            {errors.email && touched.email && (
                              <div className='alert alert-danger mt-1'>
                                {errors.email}
                              </div>
                            )}
                          </div>
                          <div className='input'>
                            <input
                              type='password'
                              name='password'
                              placeholder='Enter Password'
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={
                                errors.password && touched.password && 'error'
                              }
                            />
                            {errors.password && touched.password && (
                              <div className='alert alert-danger mt-1'>
                                {errors.password}
                              </div>
                            )}
                          </div>
                        </div>
                            <div className={message ?'text-center bg-danger text-white my-2 py-2 br-0': null }>{message}</div>
                        {Login.Loading ? <Loading /> : null}

                        <div className='container-login100-form-btn'>
                          <button
                            type='submit'
                            className='login100-form-btn border-0'
                          >
                            Login
                          </button>
                        </div>

                        <div className='text-center p-t-46 p-b-20'>
                          <span className='txt2'>
                            Click here to
                            <Link to='/register'>
                              &nbsp; <span>Sign Up</span>
                            </Link>
                          </span>
                        </div>
                      </form>

                      <div className='login100-more'></div>
                    </div>
                  </div>
                </div>
              </>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => {
  return {
    LoginAction: (data) => dispatch(LoginAction(data)),
   // FetchToken: (userLogin) => dispatch(FetchToken(userLogin)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
