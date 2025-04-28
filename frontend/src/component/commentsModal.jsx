import React from 'react'
import TimeAgo from './timeAgo'

const CommentsModal = ({comments}) => {
  return (
    <div>
       
       
      
        <div className="modal fade" id="staticBackdrop"  data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable modal-lg">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">Comments</h1>
               
            </div>
            <div className="modal-body">
                        {comments.map((item)=>(
                        <div key={item.id} className='px-2 text-dark  rounded-5 my-1'>
                            <p className='my-0 text-primary'>{item.user.username}:</p>
                            <p className='fs-6 p-0 m-0 text-muted'><TimeAgo timestamp={item.createdAt} /></p> 
                            <p className='my-0 bg-light px-5'>{item.text}</p>
                            
                        </div>))} 
                       
                
            </div>
           
            </div>
        </div>
        </div>
      
    </div>
  )
}

export default CommentsModal
