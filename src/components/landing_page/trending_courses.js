import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Baseurl } from '../baseurl'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'


const TrendingCourses = () => {
    const [course, setCourse] = useState([])
    useEffect(() => {
        axios.get(`${Baseurl}trendingcourses`, {
        }).then((res) => {
            if (res.data) {
                setCourse(res.data)
            }
        })
    }, [])
    return (
        <>
            <div class="container mb-4">
                <div class="row">
                    <small style={{ color: '#071B4D' }}><strong>Trending Courses</strong></small>
                    {course.length ? course.filter((item, index) => index < 3).map((item, index) => {
                        return (
                            <>
                                <div class="col-md-4 mt-2" data-aos="fade-in" data-aos-delay="100">
                                    <div class="card p-4 mb-2 shadow" style={{ borderRadius: '20px' }} >
                                        <div class="d-flex justify-content-between">
                                            <div class="d-flex flex-row align-items-center">
                                                <img src={item.category === 'IT and Software' ? 'https://img.icons8.com/external-flatart-icons-flat-flatarticons/64/000000/external-software-hacking-flatart-icons-flat-flatarticons.png' :
                                                    item.category === 'Design' ? 'https://img.icons8.com/external-kiranshastry-flat-kiranshastry/64/000000/external-design-industry-kiranshastry-flat-kiranshastry.png' :
                                                        item.category === 'Agriculture' ? 'https://img.icons8.com/external-wanicon-flat-wanicon/64/000000/external-agriculture-university-courses-wanicon-flat-wanicon.png' :
                                                            item.category === 'Marketing' ? "https://img.icons8.com/external-itim2101-flat-itim2101/64/000000/external-marketing-business-strategy-itim2101-flat-itim2101.png" :
                                                                item.category === 'Photography' ? "https://img.icons8.com/external-wanicon-flat-wanicon/64/000000/external-photography-art-and-design-wanicon-flat-wanicon.png" :
                                                                    item.category === 'Engineering' ? "https://img.icons8.com/external-wanicon-flat-wanicon/64/000000/external-engineering-university-courses-wanicon-flat-wanicon.png" :
                                                                        item.category === 'Cryptocurrency' ? "https://img.icons8.com/external-itim2101-flat-itim2101/64/000000/external-cryptocurrency-mobile-payment-itim2101-flat-itim2101.png" : ''} alt='' style={{ width: '50%' }} />
                                            </div>
                                            <div class="badge"> <span style={{ color: '#FFFFFF', backgroundColor: '#A800D4' }}>Trends</span> </div>
                                        </div>
                                        <div class="mt-2">
                                            <Link to={`/course-details/${item.course_code}`}> <small class="heading text-capitalize"><strong>{item.course_title}</strong></small></Link>
                                            <div class="mt-2">
                                                <small><strong>₦{item.course_cost}</strong></small> <small className='text-decoration-line-through'>₦{parseInt(item.course_cost)+parseInt(1500)}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }).reverse() : <div className='row mx-auto'>
                        <div class="col-md-4 mt-2">
                            <div class="card p-3 mb-2 shadow" style={{ borderRadius: '20px' }} >
                                <Skeleton count={5} />
                            </div>
                        </div>
                        <div class="col-md-4 mt-2">
                            <div class="card p-3 mb-2 shadow" style={{ borderRadius: '20px' }} >
                                <Skeleton count={5} />
                            </div>
                        </div>
                        <div class="col-md-4 mt-2">
                            <div class="card p-3 mb-2 shadow" style={{ borderRadius: '20px' }} >
                                <Skeleton count={5} />
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </>
    )
}

export default TrendingCourses
