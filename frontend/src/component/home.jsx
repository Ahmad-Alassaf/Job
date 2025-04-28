// eslint-disable-next-line no-unused-vars
import   { useEffect ,useState} from 'react'
import axios from 'axios'
import JobCard from './jobCard'
import JobDetails from './jobDetails'
import useScreenSize from './useScreenSize'

const Home = () => {
  const screen=useScreenSize()
    const [jobs,setJobs]=useState([])
    const [limit,setLimit]=useState(5)
    const [totalPages,setTotalPages]=useState(1)
    const [currentPage,setCurrentPage]=useState(1)
    const [clickedJob,setClickedJob]=useState(null)
    const [showModal, setShowModal] = useState(false);
  const getAllJobs=async()=>{        
    try {
        const response=await axios.get(`https://job-3f5h.onrender.com/api/jobs/${limit}/${currentPage}`)
        if(response){
           console.log(response.data)
            setJobs( response.data.jobs)
            setCurrentPage(response.data.currentPage)
            setTotalPages(response.data.totalPages)
                  }        
    } catch (error) {
        console.log(error)        
    }
}
const handleClickOnJob=(job)=>{
  setClickedJob(job)

}
useEffect(()=>{ 
  console.log('currentPage'+currentPage)       
    getAllJobs()
    if(screen==='sm' || screen==='md'){
      setShowModal(true)
      console.log(screen)

    }
      
    else{
      setShowModal(false)
      console.log(screen)
    }
  
},[limit,currentPage,screen])
  return (
    <div className='container '>
        <select className='form-select   w-auto    my-1 ' onChange={(e)=>setLimit(e.target.value)}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="50">50</option>
        </select>
          <div className="row overflow-auto">
                <div className=' bg-none px-1 col-12 col-lg-6'>
                          {jobs?.length>0 ?  (    jobs.map((job)=>(
                            <div key={job._id} className=''>
                                <JobCard job={job}  selectJob={(job)=>handleClickOnJob(job)} />
                            </div>
                      ))):(<></>)
                      }
                </div>
                <div className='d-none d-lg-block  col-lg-6 border-2 bg-light'>
                    {clickedJob ?  <JobDetails job={clickedJob}  />:
                      <JobDetails job={jobs[0]}  />
                    }
                </div>
              {showModal && ( <div className={screen ==='sm' || screen==='md' ? ' modal p-0 m-0': ''} id="jobDetailModal" 
                   >
                  <div className="modal-dialog modal-fullscreen modal-md  ">
                    <div className="modal-content ">
                      <div className="modal-header">
                      <button type="button" className="btn-close"  aria-label="Close"></button>

                      </div>
                      <div className="modal-body">
                            <div className=' col-12 col-lg-6 border-2 bg-light'>
                                 {clickedJob ?  <JobDetails job={clickedJob}  />:
                                     <JobDetails job={jobs[0]}  />
                                 }
                            </div>
                      </div>
                   </div>
                 

                  </div>
               </div>)}
          <div className='d-flex  justify-content-center align-items-center py-1'>
          <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} 
          disabled={currentPage === 1} className='btn '> &#9665; </button>
          <span className=''> Page {currentPage} of {totalPages} </span>
          <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} 
          disabled={currentPage === totalPages} className='btn '>&#9655; </button>

          </div>
         
    </div>
    </div>
  )
}

export default Home
