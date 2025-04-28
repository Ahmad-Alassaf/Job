import React from 'react'
import   { useEffect ,useState} from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import ReadMoreLess from './readMoreLess'
import { FaLocationDot } from "react-icons/fa6"
import { FaTrash     } from 'react-icons/fa'
import {   BiSolidLike } from 'react-icons/bi'
import Comment from './comment'
import useScreenSize from './useScreenSize'
const JobCard = ({job,selectJob}) => {
    const screen=useScreenSize()
    const [shadow, setShadow] = useState("0px 0px 0px rgba(0,0,0,0)");
    const {user}=useSelector((state)=>state.auth)
    const [likeColor,setLikeColor]=useState('btn-secondary')
    const [addComment,setAddComment]=useState('')
    const [showComments,setShowComments]=useState(false)
const givePullLike=async(job)=>{
  try {
      const headers={
          "Content-Type":"application/json",
          Authorization:`Bearer ${user.token}`
      }
      if(job.likes.some(like=>like.userId===user._id))
      {
         
          const unliked=await axios.post(`http://localhost:8000/api/jobs/pulllike/${job._id}`,job,{headers})
          if(unliked)
              setLikeColor('btn btn-secondary')
          
         
      }
      else
      {
         
          const liked=await axios.post(`http://localhost:8000/api/jobs/givelike/${job._id}`,job,{headers})
          if(liked)
              setLikeColor('btn btn-primary')
         


      }
     
    
  } catch (error) {
      console.log(error)
      
  }

}
const toggleComment=(id)=>{
                        setAddComment(id)
                        setShowComments( prev => !prev)
}
const handleOnClick=(job)=>{
    console.log('Clicked Job..')
    console.log(job)
    selectJob(job)

}
const style={
    jobcardstyle:{
        cursor:'pointer',
        boxShadow: shadow,
        transition: "box-shadow 0.3s ease-in-out",
    }
}
  return (
    <div>
        <div className="card mb-1" style={style.jobcardstyle} data-bs-toggle={screen==='sm' || screen==='md'  ? 'modal':null} data-bs-target={screen==='sm' || screen==='md'  ? '#jobDetailModal':null }    
         onClick={()=>handleOnClick(job)} onMouseEnter={() => setShadow("5px 5px 15px rgba(0, 0, 0, 0.3)")} onMouseLeave={() => setShadow("0px 0px 0px rgba(0,0,0,0)")} >
                <div className="card-header  border-0 px-0">
                    <div className=" ">
                        <div className='  '>
                            <h5 className='text-primary  px-1  '> {job.title}</h5>                                                        
                        </div>                    
                    </div>                
                </div>
                <div className="card-body bg-white  pt-0" style={{ whiteSpace: "pre-wrap"}}>  
                    <div className='d-flex m-1'>
                        <p className='m-0 text-center  d-block'><FaLocationDot /></p>
                        <p className='my-0 px-1 text-center d-block'>{job.location}</p>   
                    </div> 
                    <ul className='list-group'>
                      <li className='list-group-item  py-0 rounded border-0 '><span className='text-primary'>&#10004;</span>{job.performances[0]} </li>
                      <li className=' list-group-item py-0  rounded border-0 '><span className='text-primary'>&#10004;</span> {job.type } ({(job.workingdays.map((day,index)=>day+(index+1<job.workingdays.length ? ', ':'')))}) </li>  
                      
                      <li className='list-group-item py-0   rounded border-0 '><span className='text-primary'>&#10004;</span> {job.salary.type==='hourly'? 'Pro Stunde' :'monthly'} ab {job.salary.amount} € </li>
                     
                    </ul>         
                         
                </div>
                <div className="card-footer border-0 ">
                <p className='text-muted fst-italic my-0'> posted by : {job.user.username}</p>    
               </div>
         </div>
        
    </div>
  )
}
export default JobCard
