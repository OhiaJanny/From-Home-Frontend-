import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Baseurl } from '../baseurl';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router';


const Withdraw = ({ profile }) => {
    const history = useHistory();
    const path = useLocation();
    return (
        <>
            <div class="page-content page-container mx-auto mb-5" id="page-content" style={{ marginTop: '100px' }}>
                <small><ToastContainer /></small>
                <div class="row container d-flex justify-content-center mx-auto">
                    <div class="col-md">
                        <div class="profile-card user-card-full">
                            <div class="row m-l-0 m-r-0">
                                <div class="col-sm-4 bg-c-lite-green user-profile">
                                    <div class="card-block text-center text-white">
                                        <div class="m-b-25"> <img src="https://img.icons8.com/bubbles/100/000000/user.png" class="img-radius" alt="User" /> </div>
                                        <h6><strong>{`Balance: ₦${profile.earnings ? profile.earnings : 0}`}</strong></h6>
                                        <Link to='/dashboard/withdraw-history' class="badge p-2 text-light" style={{ cursor: 'pointer', backgroundColor: '#294E51' }}>History</Link>
                                    </div>
                                </div>
                                <div class="col-sm-8">
                                    <div class="card-block">
                                        <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Earnings Withdrawal</h6>
                                        <Formik
                                            initialValues={{ amount: '', pin: '' }}
                                            validate={values => {
                                                const errors = {};
                                                if (!values.amount) {
                                                    errors.amount = '*Amount Required';
                                                } else if (!values.pin) {
                                                    errors.pin = '*Transaction Pin Required';
                                                }

                                                return errors;
                                            }}
                                            onSubmit={(values, { setSubmitting }) => {
                                                setTimeout(() => {
                                                    let token = sessionStorage.Token
                                                    axios.post(`${Baseurl}withdraw`, values, {
                                                        headers: {
                                                            'Authorization': 'Bearer' + token
                                                        }
                                                    }).then((res) => {
                                                        setSubmitting(false)
                                                        if(res.data){
                                                            if(res.data === 'noBankDetails'){
                                                            toast("✋ You have no bank details!", {
                                                                    autoClose: 2000,
                                                                }) 
                                                            setTimeout(()=>history.push('/dashboard/settings'), 2000)  
                                                            }else if(res.data === 'wrongPin'){
                                                                toast("✋ Wrong PIN!", {
                                                                    autoClose: 2000,
                                                                }) 
                                                            }else if(res.data === 'insufficientFunds'){
                                                                toast("✋ Insufficient Funds!", {
                                                                    autoClose: 2000,
                                                                }) 
                                                            }else if(res.data === 'withdrawSuccesful'){
                                                                toast("👍 Fund has been automatically sent to your bank account!", {
                                                                    autoClose: 2000,
                                                                })
                                                            }
                                                        }
                                                    }).catch((error)=>{
                                                        if (error.response.status === 500) {
                                                            setSubmitting(false)
                                                            sessionStorage.setItem('Path', path.pathname)
                                                            history.push('/login')
                                                        }
                                                    })
                                                }, 400);
                                            }}
                                        >
                                            {({ isSubmitting }) => (

                                                <Form>
                                                    <div class="row-1">
                                                        <div class="row row-2"> <span id="login-card-inner">Amount</span> </div>
                                                        <div class="row row-2"> <Field type="number" placeholder="Enter Amount" name="amount" />
                                                            <ErrorMessage name="amount" component="small" className='text-danger' /> </div>
                                                    </div>


                                                    <div class="row-1">
                                                        <div class="row row-2"> <span id="login-card-inner">Transaction Pin</span> </div>
                                                        <div class="row row-2"> <Field type="number" placeholder="4-digit Pin" name="pin" />
                                                            <ErrorMessage name="pin" component="small" className='text-danger' /> </div>

                                                    </div>
                                                    <button class="btn d-flex mx-auto mb-2" type="submit" disabled={isSubmitting}><b>{isSubmitting ? <i class="fas fa-spinner fa-spin"></i> : ''} Withdraw</b></button>
                                                </Form>
                                            )}
                                        </Formik>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Withdraw
