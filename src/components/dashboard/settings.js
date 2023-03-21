import React, {useState} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { Baseurl } from '../baseurl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { codes } from './bank_codes';

const Settings = () => {
    const [accName, setAccName] = useState('')
    return (
        <>
            <div class="page-content page-container mx-auto mb-5" id="page-content" style={{ marginTop: '80px' }}>
                <small><ToastContainer /></small>
                <div class="row container d-flex justify-content-center mx-auto">
                    <div class="profile-card user-card-full">
                        <div class="col-md-8 mx-auto">
                            <div class="card-block">
                                <h6 class="m-b-20 p-b-5 b-b-default f-w-600"><i class="fad fa-info-square" style={{color:'#071B4D'}}></i> Basic Information</h6>
                                <div class="row">
                                    {/* Phone number update */}
                                    <Formik
                                        initialValues={{phone: '' }}
                                        validate={values => {
                                            const errors = {};
                                            if (!values.phone) {
                                                errors.phone = '*Phone Number Required';
                                            } else if (values.phone.length < 11) {
                                                errors.phone = '*Phone Number Should be 11 digits';
                                            } else if (values.phone.length > 11) {
                                                errors.phone = '*Phone Number Should be 11 digits';
                                            }

                                            return errors;
                                        }}
                                        onSubmit={(values, { setSubmitting }) => {
                                            setTimeout(() => {
                                                let token = sessionStorage.Token
                                                axios.post(`${Baseurl}updateprofile`, values, {
                                                    headers: {
                                                        'Authorization': 'Bearer' + token
                                                    }
                                                }).then((res) => {
                                                    setSubmitting(false)
                                                    if (res.data === 'phoneexists') {
                                                        toast(`✋ You have a number already`, {
                                                            autoClose: 2000,
                                                        })
                                                    } else if (res.data === 'updated') {
                                                        toast(`👍 Successfully Updated`, {
                                                            autoClose: 2000,
                                                        })
                                                    }
                                                }).catch((error) => {
                                                    if (error.response.status === 422) {
                                                        setSubmitting(false);
                                                        toast("✋ Phone Number already taken!", {
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
                                                    <div class="row row-2"> <span id="login-card-inner">Phone Number</span> </div>
                                                    <div class="row row-2"> <Field type="text" placeholder="Phone Number" name="phone" />
                                                        <ErrorMessage name="phone" component="small" className='text-danger' /> </div>
                                                </div>
                                                <button class="btn d-flex mx-auto mb-2" type="submit" disabled={isSubmitting}><b>{isSubmitting ? <i class="fas fa-spinner fa-spin"></i> : ''} Update</b></button>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                                <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600"><i class="fas fa-university" style={{color:'#071B4D'}}></i> Bank Details</h6>
                                <div class="row">
                                    
                                    {/* Bank Details Update */}
                                    <Formik
                                        initialValues={{acc_no: '', bankCode: '', pin:''}}
                                        validate={values => {
                                            const errors = {};
                                            if (!values.bankCode) {
                                                errors.bankCode = '*Bank Name Required';
                                            }
                                            else if (!values.acc_no) {
                                                errors.acc_no = '*Account Number Required';
                                            } else if(Math.ceil(Math.log10(values.pin + 1)) < 4){
                                                errors.pin = '*Code is 4-digit';
                                            }else if(Math.ceil(Math.log10(values.pin + 1)) > 4){
                                                errors.pin = '*Code is 4-digit';
                                            }else if (!values.pin) {
                                                errors.pin = '*PIN Required';
                                            }
                                            
                                            return errors;
                                        }}
                                        onSubmit={(values, { setSubmitting }) => {
                                            setTimeout(() => {
                                                let token = sessionStorage.Token
                                                axios.post(`${Baseurl}updatebank`, values, {
                                                    headers: {
                                                        'Authorization': 'Bearer' + token
                                                    }
                                                }).then((res) => {
                                                    setSubmitting(false)
                                                    if(res.data){
                                                        if(res.data.exists){
                                                            toast(`✋ You have a bank info already`, {
                                                                autoClose: 2000,
                                                            })
                                                        }else if(res.data.name){
                                                            setAccName(res.data.name)
                                                            toast(`👍 Account Number Added`, {
                                                                autoClose: 2000,
                                                            })
                                                        }else if(res.data.invalid){
                                                            toast(`✋ Account Number Invalid`, {
                                                                autoClose: 2000,
                                                            })
                                                        }else if(res.data.error){
                                                            toast(`✋ Network Error. Try Again!`, {
                                                                autoClose: 2000,
                                                            })
                                                        }
                                                    }
                                                  
                                                }).catch((error) => {
                                                    if (error.response.status === 422) {
                                                        setSubmitting(false);
                                                        toast("✋ Account Number already used!", {
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
                                                    <div class="row row-2"> <span id="login-card-inner">Bank Name</span> </div>
                                                    <div class="row row-2"> 
                                                    <Field as="select" name="bankCode" class="form-select form-select-sm mt-1" aria-label=".form-select-sm example">
                                                    <option selected>Choose your bank</option>
                                                    {codes.map((item, index)=>{
                                                        return(
                                                            <>
                                                        <option value={item.code} key={index}>{item.name}</option>
                                                            </>
                                                        )
                                                    })}
                                                
                                                </Field>
                                                    <ErrorMessage name="bankCode" component="small" className='text-danger' /> </div>
                                                </div>

                                                <div class="row-1">
                                                    <div class="row row-2"> <span id="login-card-inner">Account Number</span> </div>
                                                    <div class="row row-2"> <Field type="text" placeholder="Your Account Number" name="acc_no" />
                                                        <ErrorMessage name="acc_no" component="small" className='text-danger' /> </div>
                                                        <small style={{color:'#071B4D'}}><strong>{accName}</strong></small>
                                                </div>
                                                <div class="row-1">
                                                    <div class="row row-2"> <span id="login-card-inner">Transaction Pin</span> </div>
                                                    <div class="row row-2"> <Field type="number" placeholder="4-digit Pin" name="pin" />
                                                        <ErrorMessage name="pin" component="small" className='text-danger' /> </div>
                                                        
                                                </div>
                                                <button class="btn d-flex mx-auto mb-2" type="submit" disabled={isSubmitting}><b>{isSubmitting ? <i class="fas fa-spinner fa-spin"></i> : ''} Add Bank</b></button>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Settings
