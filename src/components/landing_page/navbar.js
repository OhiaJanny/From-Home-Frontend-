import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Link as Scroll } from 'react-scroll'

const Navbar = ({ home, login, register, dashboard }) => {
    const [toggler, setToggler] = useState(false)

    const toggle = () => {
        setToggler(!toggler)
    }
    return (
        <>
            {/* <!-- ======= Header ======= --> */}
            <header id="header" class="fixed-top">
                <div class="container d-flex align-items-center">
                    <h1 class="logo me-auto"><Link to='/'>Fromhome<span style={{ color: '#05A081', fontSize: '25px' }}>.</span></Link></h1>
                    <nav id="navbar" class={toggler ? 'navbar navbar-mobile dropdown-active' : 'navbar order-last order-lg-0'}>
                        <ul style={{ borderRadius: '18px' }} onClick={() => setToggler(false)}>
                            <Link to='/' style={{ cursor: 'pointer' }}>Home</Link>
                            {sessionStorage.Token ? <Link to='/dashboard'>Dashboard</Link> : ''}
                            {dashboard ? <Link to='/dashboard/create-a-course'>Create a Course</Link> : ''}
                            {dashboard ? <Link to='/dashboard/created-courses'>Created Courses</Link> : ''}
                            {home ? <Scroll to='about' style={{ cursor: 'pointer' }}>About</Scroll> : ''}
                            {dashboard ? '' : <Link to='/available-courses'>Available Courses</Link>}
                            {dashboard ? <Link to='/dashboard/purchases'>Purchases</Link> : ''}
                            {dashboard ? <Link to='/dashboard/wishlists'>Wishlists</Link> : ''}
                            {dashboard ? <Link to='/dashboard/profile'>Profile</Link> : ''}
                            {home || register ? <Link to='/login'>Login</Link> : ''}
                            {home || login ? <Link to='/register'>Register</Link> : ''}
                            <Scroll to='footer' style={{ cursor: 'pointer' }} onClick={() => setToggler(false)}>Contact</Scroll>
                        </ul>
                        <i class={toggler ? 'bi bi-x mobile-nav-toggle' : 'bi bi-list mobile-nav-toggle'} onClick={toggle}></i>
                    </nav>
                    {/* <!-- .navbar --> */}

                    <Link to='/dashboard/create-a-course' href="courses.html" class="get-started-btn">Be a Tutor <i class="fal fa-long-arrow-right"></i></Link>
                    <Link to='/cart' className='ml-2 chart'><strong><i class="fad fa-shopping-cart"></i></strong></Link>
                </div>
            </header>
            {/* <!-- End Header --> */}


        </>
    )
}

export default Navbar
