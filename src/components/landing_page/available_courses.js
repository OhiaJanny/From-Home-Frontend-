import React, { useState, useEffect } from 'react'
import Footer from './footer'
import Navbar from './navbar'
import SearchResult from './search_result'
import TrendingCourses from './trending_courses'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import axios from 'axios'
import { Baseurl } from '../baseurl'
import { categories } from './categories_array'

const AvailableCourses = () => {
  document.title = 'Fromhome | Available Courses'
  useEffect(() => {
    axios.get(`${Baseurl}suggestions`).then((res)=>{
     setItems(res.data)
    })
  }, [])
  
  document.title = 'Fromhome | Available Courses'
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [isSubmitting, setSubmitting] = useState(false)
  const [items, setItems] = useState([])


  const handleOnSelect = (item) => {
    setSearch(item)
  }




  const searchCourse = () => {
    if (search) {
      setSubmitting(true)
      axios.get(`${Baseurl}searchcourse`, {
        params: search
      }).then((res) => {
        if (res.data) {
          setSubmitting(false)
          setSearchResult(res.data)
        }
      })
    }
  }

  const categorySearch = (name) => {
    if (name) {
      setSubmitting(true)
      axios.get(`${Baseurl}searchcategory`, {
        params: { search: name }
      }).then((res) => {
        if (res.data) {
          setSubmitting(false)
          setSearchResult(res.data)
        }
      })

    }

  }
  return (
    <>
      <Navbar />
      <section className="about container-fluid mt-4" id="about">
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-8 col-sm mx-auto'>
              <img src="assets/img/logo.png" alt="" /> <br />
              <small><strong><i class="fad fa-search" style={{ color: '#071B4D'}}></i> Search for a course</strong></small>
              <small>
                <ReactSearchAutocomplete
                  items={items}
                  onSelect={handleOnSelect}
                  autoFocus
                  placeholder='Search for course'
                  styling = {
                    {
                      fontFamily: 'font-family: "Poppins", sans-serif',
                      fontSize:'15px',
                      iconColor: "#0D826E",
                      
                    }
                  }
                  
                />
              </small>
              <button class="btn d-flex mx-auto" type="submit" onClick={searchCourse}><b>{isSubmitting ? <i class="fas fa-spinner fa-spin"></i> : ''} <small>Search</small></b></button>
              <div className='justify-content-center'>
                <small className='p-2'><strong>Search by categories:</strong></small>
                {categories.map((item, index) => {
                  return (
                    <>
                      <span class="badge text-light p-2 mt-2" key={index} style={{ backgroundColor: '#071B4D', cursor: 'pointer' }} onClick={() => categorySearch(item.name)}><small>{item.name}</small></span>&nbsp;
                    </>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <SearchResult result={searchResult} submit={isSubmitting} />
        </div>


        <div className="mt-4">
          <TrendingCourses />
        </div>
      </section>

      <Footer />
    </>
  )
}

export default AvailableCourses
