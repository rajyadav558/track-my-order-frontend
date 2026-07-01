import React from 'react'
import Button from '@mui/material/Button'
import { useRef } from 'react';
import { useEffect } from 'react';
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
const HomeContainer = () => {

    const containerRef = useRef(null)

    useGSAP(() => {
    // ⏳ Ek timeline banayi taaki animations sequence me chalein
    const tl = gsap.timeline();

    // 1. Text elements ko bounce-up aur fade-in karenge
    tl.from('.gsap-hero-text', {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.25, // Ek ke baad ek text aayega
      ease: "back.out(1.7)" // Yeh elastic bounce effect dega jo tumne manga tha!
    });

   // 2. Delivery truck screen ke RIGHT se smoothly chal kar LEFT ki or andar aayega
tl.from('.gsap-truck', {
  x: 500,          // Positive value matlab right side se screen ke bahar se shuru hoga
  opacity: 0,
  duration: 1.5,   // Thoda smooth driving feel dene ke liye duration 1.5s kar diya
  ease: "power2.out"
}, "-=0.6");       // Text chalte-chalte hi truck ki entry ho jayegi

  }, { scope: containerRef }); // Scope dene se sirf is component ke selectors target hote hain
  return (
    <div ref={containerRef} className='min-h-[75vh] md:h-[75vh] w-[95%] flex flex-1 flex-col md:flex-row mb-6 items-center justify-around '>
      <div className='h-[80%]'>
        <img src='MMbgside.png' className='w-full h-[40vh] md:h-[80%] md:w-[95%] object-cover' />
      </div>
      <div className='h-[80%] w-[90%] flex md:flex-col md:w-[40%]'>
       <div className='flex flex-col gap-3 '>
        <span className='gsap-hero-text text-8xl text-black font-light' style={{fontFamily: "Inter",}}>Smart</span>
        <span className='gsap-hero-text text-4xl text-gray-800 font-semibold' style={{fontFamily: "Montserrat"}}>Shopping</span>
        <span className='gsap-hero-text text-4xl  font-semibold' style={{fontFamily: "Inter",color:"#3C6C15"}}>Instant Delivery</span>
        <button className='h-[5vh] w-[30vw] md:w-[10vw] text-white text-xl' style={{backgroundColor:"#5EB47E"}} >Shop Now</button>
       </div>
        <div className='h-[60%] mt-20 md:mt-0'>
           <img src='deliverytruck.png' className='gsap-truck h-30 md:h-60 object-cover' />
        </div>
       
      </div>
    </div>
  )
}

export default HomeContainer
