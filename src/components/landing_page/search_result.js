import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'

const SearchResult = ({ result, submit }) => {
    return (
        <>
            <div class="container mb-3" style={{ zIndex: '10' }}>
                <div class="row">
                    <small style={{ color: '#071B4D' }}><strong>Search Results <span class="badge bg-info text-dark">{result.length}</span></strong></small>
                    {submit ? <div className='row mx-auto'>
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
                    </div> : <>
                        {result.length ? result.map((item, index) => {
                            return (
                                <>
                                    <div class="col-md-4 mt-2" data-aos="fade-in" data-aos-delay="100">
                                        <div class="card p-4 mb-2 shadow" style={{ borderRadius: '20px' }} key={index} >
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
                                                <div class="badge"> <span style={{ color: '#FFD43B', backgroundColor: '#001C40' }}>Result</span> </div>
                                            </div>
                                            <div class="mt-2">
                                                <Link to={`/course-details/${item.course_code}`}> <small class="heading text-capitalize"><strong>{item.course_title}</strong></small></Link>
                                                <div class="mt-2">
                                                    <small><strong>₦{item.course_cost}</strong></small> <small className='text-decoration-line-through'>₦{parseInt(item.course_cost) + parseInt(1500)}</small>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </>
                            )
                        }) : ''}
                    </>}
                </div>
            </div>
        </>
    )
}



export default SearchResult
