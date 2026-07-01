import React from 'react'
import Navbar from '../components/navbar/Navbar'
import HomeContainer from '../components/Homepage/HomeContainer'


const Home = () => {
  return (
  
<div style={{backgroundColor:"#C6DDBE"}} className='w-screen h-auto items-center flex flex-col'>

  <Navbar/>
<HomeContainer/>

</div>

  )
}

export default Home
