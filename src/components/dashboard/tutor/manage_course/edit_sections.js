import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Baseurl } from '../../../baseurl';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { useRef } from 'react';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router';




const ManageSections = () => {
    const history = useHistory()
    const path = useLocation()
    const { code } = useParams();
    const [section, setSection] = useState([])
    const [showloader, setShowloader] = useState(false)
    const [sectionVideo, setSectionVideo] = useState([])
    const [sectionFiles, setSectionFiles] = useState([])
    const [isFecthing, setIsFecthing] = useState(false)
    const [sectionName, setSectionName] = useState('')
    const [sectionId, setSectionId] = useState('')
    const newSectionName = useRef();
    const videoName = useRef();
    const [isAddingVideo, setAddingVideo] = useState(false)
    const [isAddingFile, setAddingFile] = useState(false)
    const [video, setVideo] = useState('')
    const [file, setFile] = useState('')
    const [publish, setPublish] = useState('')


    useEffect(() => {
        let section = JSON.parse(localStorage.getItem('sections'))
        setSection(section)
    }, [])

   

    const deletevideo = (id, index) => {
        axios.post(`${Baseurl}deletevideo`, { id: id, section:sectionId}).then((res) => {
            if (res.data === 'videodeleted') {
                const newSection = [...sectionVideo]
                newSection.splice(index, 1);
                setSectionVideo(newSection)
                toast("👍 Video Deleted!", {
                    autoClose: 2000,
                })
            }
        })
    }

    const deleteFile = (id, index) => {
        axios.post(`${Baseurl}deletefile`, { id: id, section:sectionId}).then((res) => {
            if (res.data === 'filedeleted') {
                const newSection = [...sectionFiles]
                newSection.splice(index, 1);
                setSectionFiles(newSection)
                toast("👍 File Deleted!", {
                    autoClose: 2000,
                })
            }
        })
    }

    const editSection = (id, name, index) => {
        setIsFecthing(true)
        setSectionName(name)
        setSectionId(id)
        newSectionName.current.value = name
        axios.get(`${Baseurl}sectiondetails`, {
            params: { id: id }
        }).then((res) => {
            setIsFecthing(false)
            setSectionVideo(res.data.videos)
            setSectionFiles(res.data.files)
        })
    }



    const editSectionName = (e) => {
        e.preventDefault();
        let newName = newSectionName.current.value;
        if (newName) {
            setShowloader(true)
            axios.post(`${Baseurl}editsectionname`, { id: sectionId, newName: newName }).then((res) => {
                if (res.data) {
                    setShowloader(false)
                    let sect = section.find(data => data.id === sectionId)
                    if (sect) {
                        setSectionName(res.data)
                        sect.section_name = res.data
                        localStorage.setItem('sections', JSON.stringify(section))
                        let newsection = JSON.parse(localStorage.getItem('sections'))
                        setSection(newsection)
                    }
                    toast("👍Section Name Updated!", {
                        autoClose: 2000,
                    })
                }
            })
        } else {
            toast("✋ Enter New Name!", {
                autoClose: 2000,
            })
        }
    }

    const deleteSection = (i, index) => {
        axios.post(`${Baseurl}deletesection`, { id: i }).then((res) => {
            if (res.data === 'sectionDeleted') {
                const newSection = [...section]
                newSection.splice(index, 1);
                setSection(newSection)
                localStorage.setItem('sections', JSON.stringify(newSection))
                toast("👍Section Deleted!", {
                    autoClose: 2000,
                })
            }
        })
    }

    const uploadSections = () => {
        setPublish(true)
        let token = sessionStorage.Token
        if (token) {
            axios.post(`${Baseurl}savevideos`, { token: token, code: code }).then((res) => {
                setPublish(false)
                if (res.data === 'videoIncomplete') {
                    toast("✋ One or more section has no video!", {
                        autoClose: 2000,
                    })
                } else if (res.data === 'videocomplete') {
                    toast("👍 Course Succesfully published", {
                        autoClose: 2000,
                    })
                }

            })
        }
    }

    const handleFile = (e) => {
        setFile(e.target.files[0])
    }

    const handleVideo = (e) => {
        setVideo(e.target.files[0])
    }

    const addVideo = (e) => {
        e.preventDefault();
        setAddingVideo(true)
        if (videoName.current.value && video) {
            let token = sessionStorage.Token
            if (token) {
                let formData = new FormData();
                formData.append('video', video)
                formData.append('videoName', videoName.current.value)
                formData.append('token', token)
                formData.append('section', sectionId)
                axios.post(`${Baseurl}addnewvideo`, formData).then((res) => {
                    setAddingVideo(false)
                    if (res.data === 'added') {
                        toast("👍 Video added!", {
                            autoClose: 2000,
                        })
                    } else if (res.data === 'videoFormatNotSUpported') {
                        toast("✋ Video format not supported!", {
                            autoClose: 2000,
                        })
                    } else if (res.data === 'novideo') {
                        toast("✋ No Video!", {
                            autoClose: 2000,
                        })
                    }
                }).catch((error) => {
                    setShowloader(false)
                    if (error.response.status === 500) {
                        sessionStorage.setItem('Path', path.pathname)
                        history.push('/login')
                    } else if (error.response.status === 413) {
                        toast("✋ Video too large!", {
                            autoClose: 2000,
                        })
                    }
                })
            }

        } else {
            setAddingVideo(false)
            toast("✋ Choose a Video and Video Name!", {
                autoClose: 2000,
            })
        }
    }

    const addFile = (e) => {
        e.preventDefault();
        setAddingFile(true)
        if (file) {
            let token = sessionStorage.Token
            if (token) {
                let formData = new FormData();
                formData.append('File', file)
                formData.append('token', token)
                formData.append('section', sectionId)
                axios.post(`${Baseurl}addnewfile`, formData).then((res) => {
                    setAddingFile(false)
                    if (res.data === 'added') {
                        toast("👍 File added!", {
                            autoClose: 2000,
                        })
                    } else if (res.data === 'fileFormatNotSUpported') {
                        toast("✋ File format not supported!", {
                            autoClose: 2000,
                        })
                    } else if (res.data === 'nofile') {
                        toast("✋ No File!", {
                            autoClose: 2000,
                        })
                    }
                }).catch((error) => {
                    setShowloader(false)
                    if (error.response.status === 500) {
                        sessionStorage.setItem('Path', path.pathname)
                        history.push('/login')
                    } else if (error.response.status === 413) {
                        toast("✋ File too large!", {
                            autoClose: 2000,
                        })
                    }
                })
            }

        } else {
            setAddingFile(false)
            toast("✋ Choose a File and File Name!", {
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
                        <Link to={`/dashboard/tutor-preview/${code}`} style={{color: '#0D826E', cursor:'pointer'}}><strong><small>Preview Course</small></strong></Link>
                            <p>📚 Course Manager</p>
                            <small><strong><i class="fad fa-edit" style={{ color: '#071B4D' }}></i>*Edit Course sections</strong></small>
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
                                    axios.post(`${Baseurl}addsection`, { code: code, sectionName: values.section }).then((res) => {
                                        if (res.data) {
                                            section.push(res.data)
                                            setSection(section)
                                            localStorage.setItem('sections', JSON.stringify(section))
                                            setSubmitting(false);
                                        }
                                    })

                                }}
                            >
                                {({ isSubmitting }) => (

                                    <Form>
                                        {section.length ? <div class="row-1">
                                            <div className='row'>

                                                {section.map((item, index) => {
                                                    return (

                                                        <div className='col-md-6 col-sm-5 mx-auto py-2 text-center' key={index}>
                                                            <small><strong><i class="fas fa-edit text-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => editSection(item.id, item.section_name)}></i> Edit Section {index + 1}</strong></small>
                                                            <div className='mb-2 py-1 text-light section-loop'>
                                                                <i class="fad fa-trash text-danger" onClick={() => deleteSection(item.id, index)}></i><small className='text-capitalize'> {item.section_name} </small>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div> : ''}
                                        <div class="row-1">
                                            <div class="row row-2"> <span id="login-card-inner">Add New Section</span> </div>
                                            <div class="row row-2"> <Field type="text" placeholder="Type in section names" name="section" />
                                                <ErrorMessage name="section" component="small" className='text-danger' />
                                            </div>
                                        </div>
                                        <button className='border-0 bg-transparent outline-0' style={{ color: '#0D826E', cursor: 'pointer' }} type="submit" >{isSubmitting ? <i class="fas fa-spinner fa-spin"></i> : <i class="fad fa-plus-square" style={{ color: '#071B4D' }}></i>}<small><strong> Click to Add New Section</strong></small></button>
                                    </Form>
                                )}
                            </Formik>

                            <button class="btn d-flex mx-auto" type="submit" onClick={uploadSections} disabled={publish}><b>{publish ? <i class="fas fa-spinner fa-spin"></i> : ''} <small>Update Sections and Publish</small></b></button>
                            <Link to={`/dashboard/created-courses/manage/edit-basic-details/${code}`} style={{ cursor: 'pointer' }}><strong><small><i class="fal fa-long-arrow-left" style={{ color: '#0D826E' }}></i> Edit Basic Details </small></strong></Link>

                        </div>
                    </div>

                </div>
            </section>

            {/* Modal */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <p class="modal-title text-capitalize" id="exampleModalLabel"><strong>{sectionName}</strong></p>
                            <i class="fad fa-times-square" style={{ color: '#0D826E', fontSize: '25px' }} data-bs-dismiss="modal" aria-label="Close"></i>
                        </div>
                        <div class="modal-body">
                            {/* section name */}
                            <small><strong>Edit Section Name</strong></small>
                            <form onSubmit={editSectionName}>
                                <div class="row-1">
                                    <div class="row row-2"> <span id="login-card-inner">Edit Section Name</span> </div>
                                    <div class="row row-2"> <input type="text" placeholder="Type new section name" ref={newSectionName} defaultValue={sectionName} />
                                    </div>
                                </div>
                                <button className='border-0 bg-transparent outline-0' style={{ color: '#0D826E', cursor: 'pointer' }} type="submit" >{showloader ? <i class="fas fa-spinner fa-spin"></i> : <i class="fad fa-plus-square" style={{ color: '#071B4D' }}></i>}<small><strong> Click to Save</strong></small></button>
                            </form>
                            {/* //section videos */}
                            <div className='mt-4'>
                                <small><strong>Edit Section Videos</strong></small>
                                <div className='mb-2 py-1 text-light section-loop text-center'>
                                    <small className='text-capitalize'>
                                        {isFecthing ? <i class="fas fa-spinner fa-spin"></i> : <>
                                            {sectionVideo.length ? sectionVideo.map((item, index) => {
                                                return (
                                                    <>
                                                        <small className='text-capitalize' key={index}><i class="fad fa-trash text-danger" onClick={() => deletevideo(item.id, index)}></i> {item.video_name}</small><br />
                                                    </>
                                                )
                                            }) : <small>No Course Video</small>}</>}
                                    </small>
                                </div>
                                <form onSubmit={addVideo}>
                                    <div class="row-1">
                                        <div class="row row-2"> <span id="login-card-inner">New Video Name</span> </div>
                                        <div class="row row-2"> <input type="text" placeholder="Type in video name" name="video" ref={videoName} />
                                        </div>
                                    </div>
                                    <div class="row-1">
                                        <div class="row row-2"> <span id="login-card-inner">Add New Section Video</span> </div>
                                        <div class="row row-2">
                                            <input class="form-control form-control-sm mt-2" id="formFileSm" type="file" onChange={handleVideo}
                                            />
                                        </div>
                                        <small className='text-danger'><strong>*Supported formats (mp4,  mov) <br />*Size should be 40MB or less.</strong></small>
                                    </div>
                                    <button className='border-0 bg-transparent outline-0' style={{ color: '#0D826E', cursor: 'pointer' }} type="submit">{isAddingVideo ? <i class="fas fa-spinner fa-spin"></i> : <i class="fad fa-plus-square" style={{ color: '#071B4D' }}></i>}<small><strong> Click to Add Video</strong></small></button>
                                </form>

                                {/* section files */}
                                <div className='mt-4'>
                                    <small><strong>Edit Section Files</strong></small>
                                    <div className='mb-2 py-1 text-light section-loop text-center'>
                                        {isFecthing ? <i class="fas fa-spinner fa-spin"></i> : <>
                                            {sectionFiles.length ? sectionFiles.map((item, index) => {
                                                return (
                                                    <>
                                                        <small className='text-capitalize' key={index}><i class="fad fa-trash text-danger" onClick={() => deleteFile(item.id, index)}></i> Attachment {index + 1}</small><br />
                                                    </>
                                                )
                                            }) : <small>No Course File</small>}</>}
                                    </div>
                                </div>
                                <form onSubmit={addFile}>
                                    <div class="row-1">
                                        <div class="row row-2"> <span id="login-card-inner">Add New Section File</span> </div>
                                        <div class="row row-2">
                                            <input class="form-control form-control-sm mt-2" id="formFileSm" type="file"
                                                onChange={handleFile}
                                            />
                                        </div>
                                        <small><strong>*File attachment is not compulsory</strong></small><br />
                                        <small className='text-danger'><strong>*Supported formats (pdf,  zip, txt)<br />*Size should be 40MB or less.</strong></small>

                                    </div>
                                    <button className='border-0 bg-transparent outline-0' style={{ color: '#0D826E', cursor: 'pointer' }} type="submit" >{isAddingFile ? <i class="fas fa-spinner fa-spin"></i> : <i class="fad fa-plus-square" style={{ color: '#071B4D' }}></i>}<small><strong> Click to Add File</strong></small></button>
                                </form>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn" data-bs-dismiss="modal" aria-label="Close"><small>Close</small></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManageSections