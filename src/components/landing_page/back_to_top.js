import React, {useState} from 'react'
import { Link as Scroll } from 'react-scroll'
const BackTotop = () => {

const [active, setActive] = useState(false)
  
window.onscroll = function() {scrollFunction()};
    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
         setActive(true)
        } else {
            setActive(false)
        }
      }

    return (
       
        <>
            <Scroll  to='hero' class={active ? 'back-to-top d-flex align-items-center justify-content-center active' : 'back-to-top d-flex align-items-center justify-content-center'}><i class="bi bi-arrow-up-short"></i>
            </Scroll> 
        </>
    )
}

export default BackTotop 
