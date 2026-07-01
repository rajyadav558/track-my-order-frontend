import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Home from './pages/Home'


const App = () => {
  return (
   
      <BrowserRouter>
        <Routes>
          <Route path='/homepage' element={<Home/>} />
        </Routes>
      </BrowserRouter>
      
   
  )
}

export default App
