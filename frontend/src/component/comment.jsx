import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import CommentsModal from './commentsModal'

const Comment = ({job}) => {
      const {user}=useSelector((state)=>state.auth)
      const [comments,setComments]=useState([])
    const [commentForm,setCommentForm]=useState({
        text:'',
       
    })
    const handleOnChange=(e)=>{
        e.preventDefault()
        setCommentForm({
            ...commentForm,
            [e.target.name]:e.target.value

        })
    }
    const handleSubmit=async(e)=>{
       
        e.preventDefault()
        const headers={
            "Content-Type":"application/json",
            Authorization:`Bearer ${user.token}`
        }
        try {
            const response=await axios.post(`https://job-3f5h.onrender.com/api/comments/${job._id}`,commentForm,{headers})
            if(response.data){
                getComments()
                
                
            }
            
        } catch (error) {
            console.log(error)
            
        }

    }
    const getComments=async()=>{    
        try {
            const response=await axios.get(`https://job-3f5h.onrender.com/api/comments/${job._id}`)           
            if(response){
                setComments( response.data)
            }
            
        } catch (error) {
            console.log(error)            
        }
    }
    useEffect(()=>{
        getComments()       
       
    },[job._id])
  return (
    <div>
        <form onSubmit={handleSubmit} className='d-flex'>
            <div className='input-group my-1'>
            <input type='text' name='text' value={commentForm.text} onChange={handleOnChange}  className='form-control' placeholder='send comment...'/>
            <button type='submit' className='btn btn-primary' >send</button>

            </div>
            
        </form>
        
        <span className='text-primary text-decoration-underline' style={{cursor: 'pointer'}} data-bs-toggle="modal" data-bs-target="#staticBackdrop">{comments.length} comments</span>

        <CommentsModal comments={comments} />
        
    </div>
  )
}

export default Comment
