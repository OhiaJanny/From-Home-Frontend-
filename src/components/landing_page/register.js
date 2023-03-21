import React from 'react'
import { Link } from 'react-router-dom';
import { Baseurl } from '../baseurl';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useLocation } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router';
import Navbar from './navbar';
import Footer from './footer';

const Register = () => {
    document.title = 'Fromhome | Register Page'
    const path = useLocation()
    const history = useHistory();

    return (
        <>
            <Navbar register={path.pathname} />
            <section className="about container-fluid mt-3" id="about">
                <small><ToastContainer /></small>
                <div className="row">
                    <small className='px-3 py-2'><strong>🧑🏽‍🎓 Take a step today, The world is yours!</strong></small>
                    <div className="col-lg-5  d-lg-block order-2 order-lg-1 d-none d-lg-block" data-aos="fade-in" data-aos-delay="100">
                        <img src="assets/img/student3.jpg" className="img-fluid login-img" alt="" style={{ borderRadius: '10px' }} />
                    </div>
                    <div className="col-lg-6 order-1 order-lg-2 mb-4" data-aos="fade-in" data-aos-delay="100">
                        <div class="login-card" style={{ borderRadius: '10px' }}>
                            <img src="assets/img/logo.png" alt="" /> <br />

                            <small><strong>Register and Start Learning</strong></small>

                            <Formik
                                initialValues={{ firstname: '', lastname: '', email: '', password: '', passwordRepeat: '' }}
                                validate={values => {
                                    const errors = {};
                                    if (!values.firstname) {
                                        errors.firstname = '*Firstname Required';
                                    }
                                    else if (!values.lastname) {
                                        errors.lastname = '*Lastname Required';
                                    }
                                    else if (!values.email) {
                                        errors.email = '*Email Required';
                                    } else if (
                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                    ) {
                                        errors.email = 'Invalid email address';
                                    } else if (!values.password) {
                                        errors.password = '*Password Required';
                                    }
                                    else if (values.password.length < 8) {
                                        errors.password = '*Password Should be 8 characters';
                                    }
                                    else if (values.password !== values.passwordRepeat) {
                                        errors.passwordRepeat = '*Password not the same';
                                    }

                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    setTimeout(() => {
                                        axios.post(`${Baseurl}register`, values).then((res) => {
                                            if (res.data.email) {
                                                setSubmitting(false);
                                                let response = res.data.email
                                                history.push(`/account-verification/${response}`)
                                            } else if (res.data.error) {
                                                toast("✋ Cannot send code right now!", {
                                                    autoClose: 2000,
                                                })
                                                setSubmitting(false);
                                            }
                                        }).catch((error) => {
                                            if (error.response.status === 422) {
                                                setSubmitting(false);
                                                toast("✋ Email already taken!", {
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
                                            <div class="row row-2"> <span id="login-card-inner">Firstname</span> </div>
                                            <div class="row row-2"> <Field type="text" placeholder="Firstname" name="firstname" />
                                                <ErrorMessage name="firstname" component="small" className='text-danger' /> </div>
                                        </div>

                                        <div class="row-1">
                                            <div class="row row-2"> <span id="login-card-inner">Lastname</span> </div>
                                            <div class="row row-2"> <Field type="text" placeholder="Lastname" name="lastname" />
                                                <ErrorMessage name="lastname" component="small" className='text-danger' /> </div>
                                        </div>


                                        <div class="row-1">
                                            <div class="row row-2"> <span id="login-card-inner">Email</span> </div>
                                            <div class="row row-2"> <Field type="email" placeholder="Email" name="email" />
                                                <ErrorMessage name="email" component="small" className='text-danger' />
                                            </div>
                                        </div>

                                        <div class="row-1">
                                            <div class="row row-2"> <span id="login-card-inner">Password</span> </div>
                                            <div class="row row-2"> <Field type="password" placeholder="Password" name="password" />
                                                <ErrorMessage name="password" component="small" className='text-danger' />
                                            </div>
                                        </div>

                                        <div class="row-1">
                                            <div class="row row-2"> <span id="login-card-inner">Password</span> </div>
                                            <div class="row row-2"> <Field type="password" placeholder="Password Repeat" name="passwordRepeat" />
                                                <ErrorMessage name="passwordRepeat" component="small" className='text-danger' />
                                            </div>
                                        </div>

                                        <button class="btn d-flex mx-auto mb-2" type="submit" disabled={isSubmitting}><b>{isSubmitting ? <i class="fas fa-spinner fa-spin"></i> : ''} <small>Register</small></b></button>
                                    </Form>
                                )}
                            </Formik>
                            <Link to='/login'><small style={{ cursor: 'pointer' }}><strong>Login Instead</strong></small>
                            </Link>
                        </div>
                    </div>

                </div>
            </section>


            <Footer />

        </>
    );
};

export default Register;

