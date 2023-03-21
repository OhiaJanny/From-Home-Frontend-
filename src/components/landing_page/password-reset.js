import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Navbar from './navbar';
import Footer from './footer';
import axios from 'axios';
import { Baseurl } from '../baseurl';
import { useHistory } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PasswordReset = () => {
    document.title = 'Fromhome | Password Reset'
    const history = useHistory();
    const [email, setEmail] = useState('')
    const [showCode, setShowCode] = useState(false)
    const [showResendloader, setResendloader] = useState(false)

    const resendCode = () => {
        setResendloader(true)
        axios.post(`${Baseurl}resendcode`, { email: email }).then((res) => {
            setResendloader(false)
            if (res.data.sent) {
                toast(`👍 Code sent, check your email!`, {
                    autoClose: 3000,
                })
            } else if (res.data.error) {
                toast(`✋ Something is wrong`, {
                    autoClose: 2000,
                })
            }
        })
    }

    return (
        <>
            <Navbar />
            <section className="about container-fluid mt-4" id="about">
                <small><ToastContainer /></small>
                <div className='container-fluid'>
                    <div className="row">
                        <div className="col-md-9 col-sm mx-auto">
                            <div class="login-card" style={{ borderRadius: '10px' }}>
                                <img src="assets/img/logo.png" alt="" /> <br />
                                <small><strong>Reset Your Password</strong></small>
                                {/* Check email */}
                                {showCode === false ? <Formik
                                    initialValues={{ email: '' }}
                                    validate={values => {
                                        const errors = {};
                                        if (!values.email) {
                                            errors.email = '*Email Required';
                                        } else if (
                                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                        ) {
                                            errors.email = 'Invalid email address';
                                        }

                                        return errors;
                                    }}
                                    onSubmit={(values, { setSubmitting }) => {
                                        setTimeout(() => {
                                            axios.post(`${Baseurl}checkemail`, values).then((res) => {
                                                if (res.data.notfound) {
                                                    setSubmitting(false);
                                                    toast("✋ Email not Found!", {
                                                        autoClose: 2000,
                                                    })
                                                } else if (res.data.email) {
                                                    setSubmitting(false);
                                                    setShowCode(true);
                                                    setEmail(res.data.email)
                                                    toast("👍 Verification code sent, check email!", {
                                                        autoClose: 2000,
                                                    })
                                                }
                                            })

                                        }, 400);
                                    }} >
                                    {({ isSubmitting }) => (
                                        <Form>
                                            <div class="row-1">
                                                <div class="row row-2"> <span id="login-card-inner">Email</span> </div>
                                                <div class="row row-2"> <Field type="email" placeholder="Registered Email" name="email" />
                                                    <ErrorMessage name="email" component="small" className='text-danger' /> </div>
                                            </div>
                                            <button class="btn d-flex mx-auto" type="submit" disabled={isSubmitting}><b>{isSubmitting ? <i class="fas fa-spinner fa-spin"></i> : ''} <small>Proceed</small></b></button>
                                        </Form>
                                    )}
                                </Formik> : ''}

                                {/* Verification Code */}
                                {showCode ? <Formik
                                    initialValues={{ code: '', password: '' }}
                                    validate={values => {
                                        const errors = {};
                                        if (!values.code) {
                                            errors.code = '*Verification Code Required';
                                        } else if (Math.ceil(Math.log10(values.code + 1)) > 4) {
                                            errors.code = '*Code is 4-digit';
                                        } else if (Math.ceil(Math.log10(values.code + 1)) < 4) {
                                            errors.code = '*Code is 4-digit';
                                        } else if (!values.password) {
                                            errors.password = '*Password Required';
                                        } else if (values.password.length < 8) {
                                            errors.password = '*Password Should be 8 characters';
                                        }

                                        return errors;
                                    }}
                                    onSubmit={(values, { setSubmitting }) => {
                                        setTimeout(() => {
                                            values.email = email
                                            axios.post(`${Baseurl}passwordverifycode`, values).then((res) => {
                                                setSubmitting(false);
                                                if (res.data === 'PasswordChanged') {
                                                    history.push('login')
                                                } else if (res.data === 'Invalid or Expired Code') {
                                                    toast("✋ Incorrect or expired Code!", {
                                                        autoClose: 2000,
                                                    })
                                                }
                                            })

                                        }, 400);
                                    }} >
                                    {({ isSubmitting }) => (
                                        <Form>
                                            <div class="row-1">
                                                <div class="row row-2"> <span id="login-card-inner">4-digit Code</span> </div>
                                                <div class="row row-2"> <Field type="number" placeholder="Enter verification code" name="code" />
                                                    <ErrorMessage name="code" component="small" className='text-danger' />
                                                </div>
                                            </div>
                                            <div class="row-1">
                                                <div class="row row-2"> <span id="login-card-inner">Password</span> </div>
                                                <div class="row row-2"> <Field type="password" placeholder="Password" name="password" />
                                                    <ErrorMessage name="password" component="small" className='text-danger' />
                                                </div>
                                            </div>
                                            <button class="btn d-flex mx-auto" type="submit" disabled={isSubmitting}><b>{isSubmitting ? <i class="fas fa-spinner fa-spin"></i> : ''} <small>Verify</small></b></button>
                                        </Form>
                                    )}
                                </Formik> : ''}
                                {showCode ? <small style={{ cursor: 'pointer', color: '#0D826E' }} onClick={resendCode}><strong>{showResendloader ? <i class="fas fa-spinner fa-spin"></i> : ''} Resend Code</strong></small> : ''}
                            </div>
                        </div>

                    </div>

                </div>
            </section>
            <Footer />
        </>
    )
}

export default PasswordReset
