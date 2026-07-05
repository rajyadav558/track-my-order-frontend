import React from 'react'
import Button from '@mui/material/Button'
import { GrCart } from "react-icons/gr";
import {useNavigate} from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
const Navbar = () => {
  const {user, logoutUser}= useContext(AuthContext)
  var navigate = useNavigate();
  return (
   
  <div style={{}} className='h-15 w-[95%] m-6 px-2 md:px-8 flex justify-between items-center bg-white rounded-4xl'>
   <div className='flex items-center h-15'>
    <img src='MINIlogo.png' className='h-45 w-45 md:h-30 md:w-30 object-cover mb-3'/>
   </div>
   <div className='flex items-center justify-around w-xl '>
    <span>Home</span>
    <span>Store</span>
    <div className='flex items-center justify-around w-40'>
      <span className='h-10 w-10 flex items-center justify-center rounded-4xl' style={{border:"solid 2px #e3e3e3"}}><GrCart fontSize={20} /></span>
    <Button onClick={()=>navigate('/login')} style={{backgroundColor:"#597662"}} className='h-8 w-20 text-white' variant='contained'>Log in</Button>
    </div>
   </div>
  </div>
   
  )
}

export default Navbar
