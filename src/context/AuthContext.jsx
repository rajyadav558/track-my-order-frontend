import React from 'react'
import {createContext} from 'react'
import { useState, useEffect } from 'react'
export const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [user, setUser] = useState(null)
    const [loading, setLoading]= useState(true)

    // sabse pehle apan check krege ki localStorage me user aur token hai ya nahi, agar hai to user ko set kardo aur loading false kar do.

    useEffect(()=>{
        var chekuser = localStorage.getItem('user')
        var token = localStorage.getItem('token')
        if(chekuser && token){
            setUser(JSON.parse(chekuser))
        }
        setLoading(false)
    },[])

    const loginUser= (userData, token)=>{
        localStorage.setItem('user',JSON.stringify(userData))
        localStorage.setItem('token',token)
        setUser(userData)
    }

    const logoutUser = ()=>{
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        setUser(null)
    }


    return(
        <AuthContext.Provider value = {{user, loading, loginUser, logoutUser}}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
