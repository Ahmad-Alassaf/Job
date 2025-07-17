import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const RecomededJobs = () => {
    const {user}=useSelector((state)=>state.auth)
   
    const [recomendedList,setRecomededList]=useState([])
    const getRecomendedJobs=async()=>{
        try{
             const myServer = process.env.NODE_ENV === 'production' 
                ? 'https://mern-app-500349369882.europe-west3.run.app' 
                : 'http://localhost:8000'
                const headers={            
                            Authorization:`Bearer ${user.token}`
                        }
            const response= await axios.get(`${myServer}/api/jobs/recomendedjobs/${user.profile._id}`,{headers})
            if(!response){}
            else{
                console.log('response.data',response.data)
                setRecomededList(response.data)
            }

        }
        catch(erreor){console.log(erreor)}
    }
    useEffect(()=>{
        if(user.token)
        {
           getRecomendedJobs()
        }
          

    },[])
  return recomendedList
}

export default RecomededJobs
