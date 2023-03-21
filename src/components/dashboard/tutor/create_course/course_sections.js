import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Baseurl } from '../../../baseurl';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';




const Sections = () => {
    document.title = 'Fromhome | Course Sections'
    const path = useLocation();
    const history = useHistory()
    const [formikPersist, setFormikPersist] = useState({})
    const [sectionArray, setSectionArray] = useState([])
    const [showloader, setShowloader] = useState(false)

    useEffect(() => {
        let getCourse = JSON.parse(localStorage.getItem('course'))
        if (getCourse) {
            setFormikPersist(getCourse)

            let section = getCourse.values.sections
            if (section) {
                setSectionArray(section)
            } else {
                setSectionArray([])
            }

        } else {
            setFormikPersist({})

        }

    }, [])


    const deleteSection = (i) => {
        const newSection = [...sectionArray]
        newSection.splice(i, 1);
        setSectionArray(newSection)
        let newForm = formikPersist
        newForm.values.sections = newSection
        localStorage.setItem('course', JSON.stringify(newForm))
        toast("👍 Section Deleted!", {
            autoClose: 2000,
        })

    }

    const uploadCourse = () => {
        setShowloader(true)
        let values = formikPersist.values
        if (values) {
            if (values.category && values.desc && values.title && values.sections.length) {
                let token = sessionStorage.Token
                values.token = token
                axios.post(`${Baseurl}postcourse`, values).then((res) => {
                    if (res.data) {
                        if (res.data === 'pending') {
                            setShowloader(false)
                            toast("✋  You have a Pending Course, Please Add Files!", {
                                autoClose: 2000,
                            })
                            setTimeout(() => history.push('/dashboard/create-a-course/videos'), 2000)
                        } else {
                            setShowloader(false)
                            toast("👍 Succesfully Uploaded, Add Course Videos!", {
                                autoClose: 2000,
                            })
                            localStorage.setItem('code', res.data)
                            localStorage.removeItem('course')
                            setTimeout(() => history.push('/dashboard/create-a-course/videos'), 2000)
                        }
                    }
                }).catch((error) => {
                    if (error) {
                        if (error.response.status === 500) {
                            setShowloader(false)
                            toast("✋  Please Login to continue!", {
                                autoClose: 2000,
                            })
                            history.push('/login')
                            sessionStorage.setItem('Path', path.pathname)
                        }
                    }
                })

            } else {
                setShowloader(false)
                toast("✋  Please fill all basic course details!", {
                    autoClose: 2000,
                })
                setTimeout(() => history.goBack(), 2000)
            }
        } else {
            setShowloader(false)
            toast("✋  No course found!", {
                autoClose: 2000,
            })
        }
    }

    return (
        <>
            <section className="about container-fluid mt-3" id="about">
                <small><ToastContainer /></small>
                <div className="row">
                    <div className="col-lg-9 col-sm mx-auto" data-aos="fade-in" data-aos-delay="100">
                        <div class="login-card" style={{ borderRadius: '10px' }}>

                            <p>📚<strong>Stage 2:</strong> Course Sections</p>
                            <small><strong>*Add all course sections</strong></small>
                            <Formik
                                initialValues={{ section: '' }}
                                validate={values => {
                                    const errors = {};
                                    if (!values.section) {
                                        errors.section = '*Section name is required';
                                    }
                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    if (formikPersist) {
                                        if (formikPersist.values.category && formikPersist.values.desc && formikPersist.values.title) {
                                            sectionArray.push(values)
                                            setSectionArray(sectionArray)
                                            localStorage.setItem('course', JSON.stringify(formikPersist))
                                            toast("👍 Section Added!", {
                                                autoClose: 2000,
                                            })
                                        } else {
                                            toast("✋  Please fill in course basic details!", {
                                                autoClose: 2000,
                                            })
                                            setTimeout(() => history.goBack(), 2000)
                                        }
                                    }
                                    setSubmitting(false);
                                }}
                            >
                                {({ isSubmitting }) => (

                                    <Form>

                                        {sectionArray.length ? <div class="row-1">
                                            <div className='row'>

                                                {sectionArray.map((item, index) => {
                                                    return (

                                                        <div className='col-md-6 col-sm-5 mx-auto py-2 text-center'>
                                                            <small><strong><i class="fad fa-trash-alt text-danger" onClick={() => deleteSection(index)}></i> Section {index + 1}</strong></small>
                                                            <div className='mb-2 py-1 text-light section-loop'>
                                                                <small className='text-capitalize'>{item.section}</small>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div> : ''}
                                        <div class="row-1">
                                            <div class="row row-2"> <span id="login-card-inner">Section Names</span> </div>
                                            <div class="row row-2"> <Field type="text" placeholder="Type in section names" name="section" />
                                                <ErrorMessage name="section" component="small" className='text-danger' />
                                            </div>
                                        </div>
                                        <button className='border-0 bg-transparent outline-0' style={{ color: '#0D826E', cursor: 'pointer' }} type="submit" ><i class="fad fa-plus-square" style={{ color: '#071B4D' }}></i><small><strong> Click to Add Section</strong></small></button>
                                    </Form>
                                )}
                            </Formik>

                            <button class="btn d-flex mx-auto" type="submit" onClick={uploadCourse}><b>{showloader ? <i class="fas fa-spinner fa-spin"></i> : ''} <small>Upload Course and Proceed</small></b></button>
                            <small className='text-danger'>*Cross-check before you upload course</small><br />

                            <Link to='/dashboard/create-a-course/basic-details' style={{ cursor: 'pointer' }}><strong><small><i class="fal fa-long-arrow-left" style={{ color: '#0D826E' }}></i> Edit Previous Stage </small></strong></Link>

                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Sections