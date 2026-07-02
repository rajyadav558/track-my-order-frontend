import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Home from './pages/Home'
import Login from './components/loginSignup/Login'
import Signup from './components/loginSignup/Signup'


const App = () => {
  return (
   
      <BrowserRouter>
        <Routes>
          <Route path='/homepage' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
        </Routes>
      </BrowserRouter>
      
   
  )
}

export default App
