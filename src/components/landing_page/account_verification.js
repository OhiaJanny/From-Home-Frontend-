import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory, useParams } from 'react-router';
import axios from 'axios';
import { Baseurl } from '../baseurl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './navbar';
import Footer from './footer';


const AccountVerify = () => {
    document.title = 'Fromhome | Account Verification'
    const { email } = useParams();
    const [showResendloader, setResendloader] = useState(false)
    const history = useHistory();

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
                                <img src="/assets/img/logo.png" alt="" /> <br />
                                <small><strong>Account Verification</strong></small>
                                <Formik
                                    initialValues={{ code: '', email: email }}
                                    validate={values => {
                                        const errors = {};
                                        if (!values.code) {
                                            errors.code = '*Code Required';
                                        } else if (Math.ceil(Math.log10(values.code + 1)) > 4) {
                                            errors.code = '*Code is 4-digit';
                                        } else if (Math.ceil(Math.log10(values.code + 1)) < 4) {
                                            errors.code = '*Code is 4-digit';
                                        } else if (
                                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                        ) {
                                            errors.email = 'Invalid email address';
                                        }
                                        return errors;
                                    }}
                                    onSubmit={(values, { setSubmitting }) => {
                                        setTimeout(() => {

                                            axios.post(`${Baseurl}verifycode`, values).then((res) => {
                                                setSubmitting(false);
                                                if (res.data === 'Already Verified') {
                                                    let response = res.data
                                                    toast(`✋ ${response}`, {
                                                        autoClose: 2000,
                                                    })
                                                    setTimeout(() => history.push('/login'), 2000)

                                                } else if (res.data === 'Invalid or Expired Code') {
                                                    let response = res.data
                                                    toast(`✋ ${response}`, {
                                                        autoClose: 3000,
                                                    })
                                                } else if (res.data === 'Verified') {
                                                    let response = res.data
                                                    toast(`👍 Successfully ${response}`, {
                                                        autoClose: 2000,
                                                    })
                                                    setTimeout(() => history.push('/login'), 2000)

                                                } else if (res.data === 'User not Found') {
                                                    let response = res.data
                                                    toast(`✋ ${response}`, {
                                                        autoClose: 3000,
                                                    })
                                                }
                                            })

                                        }, 400);
                                    }}
                                >
                                    {({ isSubmitting }) => (

                                        <Form>

                                            <ErrorMessage name="email" component="small" className='text-danger' />
                                            <div class="row-1">
                                                <div class="row row-2"> <span id="login-card-inner">4-digit Code</span> </div>
                                                <div class="row row-2"> <Field type="number" placeholder="Enter verification code" name="code" />
                                                    <ErrorMessage name="code" component="small" className='text-danger' />
                                                </div>
                                            </div>

                                            <button class="btn d-flex mx-auto mb-3" type="submit" disabled={isSubmitting}><b>{isSubmitting ? <i class="fas fa-spinner fa-spin"></i> : ''} <small>Submit</small></b></button>
                                        </Form>
                                    )}
                                </Formik>
                                <small style={{ cursor: 'pointer', color: '#0D826E' }} onClick={resendCode}><strong>{showResendloader ? <i class="fas fa-spinner fa-spin"></i> : ''} Resend Code</strong>
                                </small>
                            </div>
                        </div>

                    </div>

                </div>
            </section>
            <Footer />
        </>
    )
}

export default AccountVerify
