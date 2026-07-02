import React from 'react'
import {TextField,Button,Grid} from '@mui/material'
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [email,setEmail] = React.useState("")
  const [password,setPassword] = React.useState("")
  const [error,setError]= React.useState({email:""})

  

  const handleError = (field,value)=>{
      setError((prev)=>{return({...prev,[field]:value})})
      console.log("Error",error)
  }

  return (
    <div className='h-screen w-screen flex md:flex-row flex-col'>
        <div style={{backgroundColor:"#FAFAFA"}} className='h-full w-full flex flex-col  md:w-[40%]'>
        <img src="MINIlogo.png" className='h-[10vh] float-left w-[20vw] ml-5 md:h-[15vh] md:w-[10vw] object-cover'/>
        <div className='flex-1 w-full md:flex-1 md:w-[40vw] flex flex-col items-center justify-around  '>
             <div className='flex flex-col gap-2 items-center justify-around '>
                <span className='text-4xl font-semibold ' style={{color:"#1C252E",fontFamily:"Montserrat"}}>Hi, Welcome back</span>
                <span className='text-sm font-semibold' style={{fontFamily:"Inter"}}>Login To Your account to place you order Now</span>
             </div>
             <div className='w-[60vw] h-[40vh] md:w-[30vw] md:h-[70%] flex items-center justify-center '>
              <img src='loginimg.png' className='h-[30vh] w-full md:h-[70%] md:w-full object-cover'/>
             </div>
        </div>
        </div>
         {/* Log In Form */}
        <div className='h-full w-full md:w-[60%] flex flex-col items-center justify-center bg-white'>
           <div className='flex  md:flex-col gap-2 items-center justify-around  w-full h-full md:w-[50%] md:h-[50%]'>
            
            <Grid container spacing={1} className='flex flex-col items-center  h-[80%] w-[75%] md:w-[80%] '>
               <div className='flex flex-col  gap-2  justify-around md:w-[90%] '>
              <span className='text-xl font-semibold ' style={{color:"#1C252E",fontFamily:"Montserrat"}}>Login in to your account</span>
              <span className='text-sm  flex' style={{fontFamily:"Inter",color:"grey"}}>Don't have an account? <p style={{color:"#00A76F",cursor:"pointer"}} onClick={()=>navigate('/signup')}>Get started</p></span>
            </div>
              <Grid size={12}>
                <TextField onFocus={()=>handleError("email","")} helperText={error.email} error={error.email} fullWidth label="Email" variant="outlined" value={email} onChange={(e)=>setEmail(e.target.value)} />
              </Grid>
              <Grid size={12}>
                <TextField onFocus={()=>handleError("password","")} helperText={error.password} error={error.password} fullWidth label="Password" variant="outlined" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
              </Grid>
              <Grid size={12}>
                <Button fullWidth variant='contained' style={{backgroundColor:"#00A76F"}}>Login</Button>
              </Grid>
            </Grid>
           </div>
        </div>
      
    </div>
  )
}

export default Login
