import React from 'react'
import Button from '@mui/material/Button'
import { GrCart } from "react-icons/gr";
import {useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
const Navbar = () => {
  const {user, logoutUser}= useContext(AuthContext)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  var navigate = useNavigate();
  useEffect(()=>{
   console.log("user name is ",user?.name)
  },[user])
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
    {!user ?(<Button onClick={()=>navigate('/login')} style={{backgroundColor:"#597662"}} className='h-8 w-20 text-white' variant='contained'>Log in</Button>):
    (<div className='relative cursor-pointer'>
    <div onClick={()=>{setDropdownOpen(!dropdownOpen)}} style={{borderRadius:"80%",border:" 4px solid #e3e3e3"}} className=' h-12 w-12  bg-orange-500 flex items-center justify-center'>
      <span className='text-white text-lg ' style={{fontFamily:"Montserrat"}}>{user.name?user.name.charAt(0): 'U'}</span>
      </div>
      {dropdownOpen && (
        <div className='absolute bg-white mt-4  h-[3vh] w-14vw p-3 rounded-2xl md:w-[5vw] transition flex items-center justify-center'>
          <span onClick={()=>{logoutUser();navigate('/login')}} className='text-red-500  text-sm font-semibold cursor-pointer hover:text-red-700 transition ' style={{fontFamily:"Montserrat"}}>Logout</span>
        </div>
      )}
      </div>)}
      
    </div>
   </div>
  </div>
   
  )
}

export default Navbar
