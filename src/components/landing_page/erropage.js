import React from 'react'
import { useHistory } from 'react-router'
import Footer from './footer'
import Navbar from './navbar'

const Erropage = () => {
    document.title = 'Fromhome | Page Not Found'
    const history = useHistory()
    return (
        <>
            <Navbar />
            <div className='container mb-5' style={{ marginTop: '80px' }}>
                <div className='row'>
                    <div className='col-md-6 col-sm mx-auto text-center mt-4'>
                        <small><strong>Page Not Found</strong></small><br />
                        <img src="/assets/img/error.svg" className='mt-2' style={{ width: '50%' }} alt='' />
                        <button class="btn d-flex mx-auto" onClick={() => history.push('/')}><b><small>Go to Homepage</small></b></button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Erropage
