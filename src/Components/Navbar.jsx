import React from 'react'
import { navLinks } from '../../Constants/index.js'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'

const Navbar = () => {
  useGSAP(()=>{
   const navTween=gsap.timeline({
    scrollTrigger:{
      trigger:'nav',
      start:'bottom top',//when the bottom of the nav hits the top of the viewport
    }
   })//This defines when will the animation start

   navTween.fromTo('nav',{
   backgroundColor:'transparent',
   },{
   backgroundcolor:"#00000050",
   backgroundFilter:'blur(10px)',
   duration:1,
   ease:'power1.inOut',
   })
  },[])
  return (
    <nav>
        <div>
            <a href="#home" className="flex items-center gap-2">
              <img src="../../public/images/logo.png" alt="logo" />
                <p>Velvet Pour</p>
            </a>

            <ul>
               {navLinks.map((link)=>(
                 <li key={link.id}>
                    <a href={`#${link.id}`}>{link.title}</a>
                 </li>
               ))}
            </ul>
        </div>
    </nav>
  )
}

export default Navbar
