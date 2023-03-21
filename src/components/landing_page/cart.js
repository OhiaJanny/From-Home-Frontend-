import React, { useEffect, useState } from 'react'
import Footer from './footer'
import Navbar from './navbar'
import TrendingCourses from './trending_courses'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router'
import { useLocation } from 'react-router'
import axios from 'axios'
import { Baseurl } from '../baseurl'

const Cart = () => {
    document.title = 'Fromhome | Shopping Cart'
    const history = useHistory();
    const path = useLocation()
    const [cart, setCart] = useState([])
    const [show, setSHow] = useState(false)
    useEffect(() => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (cart) {
            setCart(cart)
        }
    }, [])

    const deleteItem = (index) => {
        const newCart = [...cart]
        newCart.splice(index, 1);
        setCart(newCart)
        let localStorageCart = JSON.parse(localStorage.getItem('cart'))
        localStorageCart = newCart
        localStorage.setItem('cart', JSON.stringify(localStorageCart))
    }


    // const decrease = (index) => {
    //     const newCart = [...cart]
    //     for (let i = 0; i < newCart.length; i++) {
    //         if (index === i) {
    //             if (newCart[i].qty > 1) {
    //                 newCart[i].qty--
    //                 let newQty = newCart[i].qty
    //                 newCart[i].newCost = newCart[i].cost * newQty
    //                 setCart(newCart)
    //                 let localStorageCart = JSON.parse(localStorage.getItem('cart'))
    //                 localStorageCart = newCart
    //                 localStorage.setItem('cart', JSON.stringify(localStorageCart))
    //             }
    //         }
    //     }
    // }

    // const increase = (index) => {
    //     const newCart = [...cart]
    //     for (let i = 0; i < newCart.length; i++) {
    //         if (index === i) {
    //             newCart[i].qty++;
    //             let newQty = newCart[i].qty
    //             newCart[i].newCost = newCart[i].cost * newQty
    //             setCart(newCart)
    //             let localStorageCart = JSON.parse(localStorage.getItem('cart'))
    //             localStorageCart = newCart
    //             localStorage.setItem('cart', JSON.stringify(localStorageCart))
    //         }
    //     }


    // }

    const preparePayment = () => {
        setSHow(true)
        let token = sessionStorage.Token
        if (token) {
            let cart = JSON.parse(localStorage.getItem('cart'))
            axios.post(`${Baseurl}preparepayment`, { cart: cart }, {
                headers: {
                    'Authorization': 'Bearer' + token
                }
            }).then((res) => {
                setSHow(false)
                if (res.data.alreadyPurchased) {
                    toast("✋ One or more course in cart already purchased!", {
                        autoClose: 2000,
                    })
                } else if (res.data.payment) {
                    history.push(`/payment/${res.data.payment}`)

                } else if (res.data.notVerified) {
                    toast("✋ Verify your account to make a purchase!", {
                        autoClose: 2000,
                    })
                    setTimeout(() => history.push(`/account-verification/${res.data.notVerified}`), 2000
                    )
                }
            }).catch((error) => {
                if (error.response.status === 500) {
                    setSHow(false)
                    sessionStorage.setItem('Path', path.pathname)
                    history.push('/login')
                }
            })
        } else {
            setSHow(false)
            history.push('/login')
            sessionStorage.setItem('Path', path.pathname)
        }
    }


    return (
        <>
            <Navbar />
            <section className="about container-fluid mt-3" id="about">
                <small><ToastContainer /></small>
                {cart.length ? '' : <div className='row'>
                    <div className='col-md-6 col-sm mx-auto text-center mt-4'>
                        <h5>Your Cart is empty</h5>
                        <i class="fad fa-shopping-cart fa-3x text-danger"></i>
                        <button class="btn d-flex mx-auto" onClick={() => history.push('/available-courses')}><b><small>Keep shopping</small></b></button>
                    </div>
                </div>}
                <div class="container mt-2">
                    <div class="d-flex justify-content-center row">
                        <div class="col-md-8 col-sm mx-auto">
                            {cart.length ? <small><strong><i class="fad fa-shopping-cart" style={{ color: '#071B4D' }}></i> Your Shopping Cart</strong></small> : ''}
                            {cart.map((item, index) => {
                                return (
                                    <>
                                        <div class="d-flex flex-row justify-content-between align-items-center p-2  mt-4 px-3" style={{ backgroundColor: '#F6F7F6', borderRadius: '8px' }}>
                                            <div class="mr-1">
                                                <img src={item.category === 'IT and Software' ? 'https://img.icons8.com/external-flatart-icons-flat-flatarticons/64/000000/external-software-hacking-flatart-icons-flat-flatarticons.png' :
                                                    item.category === 'Design' ? 'https://img.icons8.com/external-kiranshastry-flat-kiranshastry/64/000000/external-design-industry-kiranshastry-flat-kiranshastry.png' :
                                                        item.category === 'Agriculture' ? 'https://img.icons8.com/external-wanicon-flat-wanicon/64/000000/external-agriculture-university-courses-wanicon-flat-wanicon.png' :
                                                            item.category === 'Marketing' ? "https://img.icons8.com/external-itim2101-flat-itim2101/64/000000/external-marketing-business-strategy-itim2101-flat-itim2101.png" :
                                                                item.category === 'Photography' ? "https://img.icons8.com/external-wanicon-flat-wanicon/64/000000/external-photography-art-and-design-wanicon-flat-wanicon.png" :
                                                                    item.category === 'Engineering' ? "https://img.icons8.com/external-wanicon-flat-wanicon/64/000000/external-engineering-university-courses-wanicon-flat-wanicon.png" :
                                                                        item.category === 'Cryptocurrency' ? "https://img.icons8.com/external-itim2101-flat-itim2101/64/000000/external-cryptocurrency-mobile-payment-itim2101-flat-itim2101.png" : ''} alt='' style={{ width: '50%' }} />

                                            </div>
                                            <div class="d-flex flex-column align-items-center product-details"><small class="font-weight-bold">{item.title}</small>
                                                <div class="d-flex flex-row product-desc">
                                                    <div class="color"><span class="text-grey">Tutor:</span><span class="font-weight-bold">&nbsp;<strong>{item.tutor}</strong></span></div>
                                                </div>
                                            </div>
                                            <div>
                                                <p>{item.cost === 0 ? 'Free' : `₦${item.cost}`}</p>
                                            </div>
                                            <div class="d-flex align-items-center" onClick={() => deleteItem(index)}><i class="fa fa-trash mb-1 text-danger"></i></div>
                                        </div>
                                    </>
                                )
                            }).reverse()}
                            {cart.length ? <button to='payment' class="btn d-flex mx-auto" type="button" onClick={preparePayment}><span>{show ? <i class="fas fa-spinner fa-spin"></i> : ''} Checkout</span></button> : ''}
                        </div>
                    </div>
                </div>
            </section>

            <TrendingCourses />

            <Footer />
        </>
    )
}

export default Cart
