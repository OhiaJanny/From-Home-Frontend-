import React from 'react'
import { Link } from 'react-router-dom';
import { Baseurl } from '../baseurl';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useLocation } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { isLogged } from '../redux/actions';
import Navbar from './navbar';
import Footer from './footer';



const Login = () => {
  document.title = 'Fromhome | Login Page'
  let path = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <>
      <Navbar login={path.pathname} />
      <section className="about container-fluid mt-4" id="about">
        <small><ToastContainer /></small>
        <div className="row">
          <small className='px-3 pb-2'><strong>📚 Learn a skill today, Be smart!</strong></small>
          <div className="col-lg-5  d-lg-block order-2 order-lg-1 d-none d-lg-block" data-aos="fade-in" data-aos-delay="100">
            <img src="assets/img/student2.jpg" className="img-fluid login-img mt-2" alt="" style={{ borderRadius: '10px' }} />
          </div>
          <div className="col-lg-6 order-1 order-lg-2 mb-4" data-aos="fade-in" data-aos-delay="100">
            <div class="login-card" style={{ borderRadius: '10px' }}>
              <img src="assets/img/logo.png" alt="" /> <br />
              <small><strong>Log in to Your Account</strong></small>
              <Formik
                initialValues={{ email: '', password: '' }}
                validate={values => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = '*Email Required';
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                  ) {
                    errors.email = 'Invalid email address';
                  } else if (!values.password) {
                    errors.password = '*Password Required';
                  }

                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    axios.post(`${Baseurl}auth/login`, values).then((res) => {
                      if (res.data) {
                        setSubmitting(false);
                        let token = res.data.access_token
                        sessionStorage.setItem('Token', token)
                        dispatch(isLogged(true));
                        if (sessionStorage.Path) {
                          history.push(sessionStorage.Path)
                          sessionStorage.removeItem('Path')
                        } else {
                          history.push('/dashboard')
                        }
                      }
                    }).catch((error) => {
                      if (error.response.status === 401) {
                        setSubmitting(false);
                        toast("✋ Login details incorrect!", {
                          autoClose: 2000,
                        })
                      } else if (error.response.status === 500) {
                        setSubmitting(false);
                        sessionStorage.removeItem('Token')
                        toast("✋ Server is down!", {
                          autoClose: 2000,
                        })
                      }
                    })

                  }, 400);
                }}
              >
                {({ isSubmitting }) => (

                  <Form>
                    <div class="row-1">
                      <div class="row row-2"> <span id="login-card-inner">Email</span> </div>
                      <div class="row row-2"> <Field type="email" placeholder="Registered Email" name="email" />
                        <ErrorMessage name="email" component="small" className='text-danger' /> </div>
                    </div>


                    <div class="row-1">
                      <div class="row row-2"> <span id="login-card-inner">Password</span> </div>
                      <div class="row row-2"> <Field type="password" placeholder="Password" name="password" />
                        <ErrorMessage name="password" component="small" className='text-danger' />
                      </div>
                    </div>
                    <button class="btn d-flex mx-auto mb-2" type="submit" disabled={isSubmitting}><b>{isSubmitting ? <i class="fas fa-spinner fa-spin"></i> : ''} <small>Login</small></b></button>
                  </Form>
                )}
              </Formik>
              <Link to='/password-reset'> <small style={{ cursor: 'pointer' }}><strong>Forgot Password?</strong></small>
              </Link>
            </div>
          </div>

        </div>


      </section>

      <Footer />

    </>
  );
};

export default Login;

