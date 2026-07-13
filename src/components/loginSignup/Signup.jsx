import React from 'react'
import {TextField,Button,Grid} from '@mui/material'
import {FormControl,FormControlLabel,FormLabel,RadioGroup,Radio} from '@mui/material'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { postDATA } from '../../FetchBackend'


const Signup = () => {

  const {loginUser}= useContext(AuthContext)
  const navigate = useNavigate()

  const [Name,setName] = React.useState("")
  const [email,setEmail] = React.useState("")
  const [password,setPassword] = React.useState("")
  const [role,setRole] = React.useState("customer")
  const [error,setError]= React.useState({email:""})

  

  const handleError = (field,value)=>{
      setError((prev)=>{return({...prev,[field]:value})})
      console.log("Error",error)
  }

  const handleSubmit = async()=>{
    if(!Name){
      handleError("Name","Name is required")
      return
    }
    else if(!email){
      handleError("email","Email is required")
      return
    }
    else if(!password || password.length<6){ 
      handleError("password","Password must have 6 characters")
      return
    }

    try{
      const data = {name:Name,email,password,role}
      const response = await postDATA('api/register',data)
      if(response.user){
        loginUser(response.user, response.token);
        // Role ke mutabik user ko direct dhakka diya sahi page par
        if (response.user.role === 'admin') {
          navigate('/admin-dashboard');
        } else if (response.user.role === 'driver') {
          navigate('/driver-dashboard');
        } else {
          navigate('/homepage'); // Normal customer store par jayega
        }
      } else {
        // Agar backend error error response de (jaise email exists)
        setError((prev) => ({ ...prev, email: response?.error || "Kuch gadbad hui!" }));
      }
      }
      catch(err){
           console.error("Signup frontend crash error:", err);
      }
      
    }


  

  return (
    <div className='h-screen w-screen flex md:flex-row flex-col'>
        <div style={{backgroundColor:"#FAFAFA"}} className='h-full w-full flex flex-col  md:w-[40%]'>
        <img src="MINIlogo.png" className='h-[10vh] float-left w-[20vw] ml-5 md:h-[15vh] md:w-[10vw] object-cover'/>
        <div className='flex-1 w-full md:flex-1 md:w-[40vw] flex flex-col items-center justify-around  '>
             <div className='flex flex-col gap-2 items-center justify-around '>
                <span className='text-4xl font-semibold ' style={{color:"#1C252E",fontFamily:"Montserrat"}}>Hi, Welcome back</span>
                <span className='text-sm font-semibold' style={{fontFamily:"Inter"}}>Sign up Your account to place you order Now</span>
             </div>
             <div className='w-[60vw] h-[40vh] md:w-[30vw] md:h-[70%] flex items-center justify-center '>
              <img src='signupimg.png' className='h-[30vh] w-full md:h-[70%] md:w-full object-cover'/>
             </div>
        </div>
        </div>
         {/* Log In Form */}
        <div className='h-full w-full md:w-[60%] flex flex-col items-center justify-center bg-white'>
           <div className='flex flex-col gap-2 items-center justify-around  w-[80%] h-full md:w-[50%] md:h-[50%]'>
            
            <Grid container spacing={1} className='flex flex-col items-center  h-[80%] w-[75%] md:w-[80%] '>
               <div className='flex flex-col  gap-2  justify-around md:w-[90%] '>
              <span className='text-xl font-semibold ' style={{color:"#1C252E",fontFamily:"Montserrat"}}>Sign up your account</span>
              
            </div>
              <Grid size={12}>
                <TextField onFocus={()=>handleError("Name","")} helperText={error.Name} error={error.Name} fullWidth label="Name" variant="outlined" value={Name} onChange={(e)=>setName(e.target.value)} />
              </Grid>
              <Grid size={12}>
                <FormControl>
                  <FormLabel >Choose Role</FormLabel>
                  <RadioGroup defaultValue="customer" onChange={(e)=>setRole(e.target.value)} value={role}  name="radio-buttons-group" row>
                    <FormControlLabel value="customer" control={<Radio/>} label="customer"/>
                    <FormControlLabel value="driver" control={<Radio/>} label="Delivery Man"/>
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid size={12}>
              </Grid>
              <Grid size={12}>
                <TextField onFocus={()=>handleError("email","")} helperText={error.email} error={error.email} fullWidth label="Email" variant="outlined" value={email} onChange={(e)=>setEmail(e.target.value)} />
              </Grid>
              <Grid size={12}>
                <TextField onFocus={()=>handleError("password","")} helperText={error.password} error={error.password} fullWidth label="Password" variant="outlined" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
              </Grid>
              <Grid size={12}>
                <Button onClick={handleSubmit} fullWidth variant='contained' style={{backgroundColor:"#00A76F"}}>Sign UP</Button>
              </Grid>
            </Grid>
           </div>
        </div>
      
    </div>
  )
}

export default Signup
