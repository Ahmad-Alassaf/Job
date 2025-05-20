// eslint-disable-next-line no-unused-vars
import   { useEffect ,useState} from 'react'
import axios from 'axios'
import JobCard from './jobCard'
import JobDetailsComponent from './jobdetailsComponent'
import useScreenSize from './useScreenSize'
import { useSelector } from 'react-redux'
import { getCategories } from '../utilities/CategoryService'
import { FaFilter } from "react-icons/fa"


const Home = () => {
  const {user}=useSelector((state)=>state.auth)
   const headers={
          "Content-Type":"application/json",
          Authorization:`Bearer ${user?.token}`
      }
  const myServer = process.env.NODE_ENV === 'production' 
  ? '`https://job-3f5h.onrender.com' 
  : 'http://localhost:8000';
  const screen=useScreenSize()
    const [categoryList,setCategoriesList]=useState([])
    const [jobs,setJobs]=useState([])
    const [limit,setLimit]=useState(3)
    const [totalPages,setTotalPages]=useState(1)
    const [currentPage,setCurrentPage]=useState(1)
    const [clickedJob,setClickedJob]=useState(null)
    const [filterList,setFilterList]=useState([])
    const [showFilter,setShowFilter]=useState(false)   
  const getAllJobs=async()=>{        
    try {
        const response=await axios.get(`${myServer}/api/jobs/${limit}`, {
                                                                    params: {
                                                                      filters: filterList.join(','),
                                                                    },
                                                                  })
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
 const handleCurrentLocation=(mypath)=>{
                setClickedJob(mypath.job)    
            
        }
  const hanldeShowMore=(e)=>{
    e.preventDefault()
    setLimit(limit+3)
    
    
  }
  const fetchCategories=async()=>{                                
                                  const data=await getCategories(myServer,headers)                                
                                  setCategoriesList(data||[])
                              }
  const filtertoggler=()=>{
    setShowFilter((prev)=>!prev)
  }
  const handleCheckboxChange = (e) => {
  const value = e.target.value;
  if (e.target.checked) {
    setFilterList(prev => [...prev, value]);
  } else {
    setFilterList(prev => prev.filter(id => id !== value));
  }
}
useEffect(()=>{ 
    fetchCategories()    
    getAllJobs()
   
   
},[limit,currentPage,screen,filterList])

  return (
    <div className=' '>
         <section>
           <div className="container">
              
           </div>

         </section>
         <section>
              <div className="container">
                    <div className='py-2 my-1'>
                        <h3 className='text-primary my-0'>Hallo {user?.username}</h3>
                        <p className='my-0 text-muted px-2'>Hier hast du deine Jobsuche im Griff.</p>
                    </div>
                      <div className='d-flex align-items-center py-2 my-1'>
                        <img  src="/images/JOB.png"  className=" rounded border p-1" style={{height:'75px',width:'100px'}}/>
                        <h3 className='px-1'><strong>Unsere neuesten Jobs für Sie</strong></h3>
                      </div>
                      <button className={showFilter? 'btn btn-primary mb-1':'btn btn-secondary mb-1'} onClick={filtertoggler}><FaFilter /> Filter</button>
                     {showFilter &&( <div className="row   p-0 m-0">
                        
                            {categoryList.length>0 && (categoryList.map((item,index)=>(<div key={index} className='col-2  text-left'>
                              <input class="form-check-input " type="checkbox"
                               onChange={handleCheckboxChange} 
                               checked={filterList.includes(item._id)}
                               value={item._id}/>{item.category}
                              
                              </div>))
                            )}
                        </div>)}       
                      <div className="row ">
                                      {jobs?.length>0 ?  (    jobs.map((job)=>(
                                        <div key={job._id} className='bg-none px-1 col-12 col-md-6 col-lg-4 d-flex mb-1'>
                                            <JobCard job={job}   />
                                        </div>
                                  ))):(<></>)
                                  }
                              <div className='d-flex  justify-content-center align-items-center py-1'>
                                {/*  <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} 
                                  disabled={currentPage === 1} className='btn '> &#9665; </button>
                                  <span className=''> Page {currentPage} of {totalPages} </span>
                                  <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} 
                                  disabled={currentPage === totalPages} className='btn '>&#9655; </button> */}
                                  <button type='button ' className='btn btn-primary' onClick={hanldeShowMore}>mehr anzeigen</button>
                              </div>         
                        </div>
             </div>
         </section>
         <section className='py-5 bg-primary'>
            <div className="container" >
              <div className="row ">
              <h3 className='text-white text-center'>Jetzt E-Mail eintragen und keine neuen Jobs mehr verpassen!</h3>
              <form className='col-8 m-auto'>
                   <div className="input-group">
                       <span class="input-group-text" >@</span>
                       <input type="email" className='form-control' placeholder='email...'/>
                       <button className='btn btn-success'>save</button>
                   </div>
              </form>
           </div>
            </div>
         </section>
         {user && <section>
            <div className="container">
              <div className="row">
                    <h3>
                      Gespeicherte Jobs
                    </h3>
                     {jobs?.length>0 ?  (    jobs.map((job)=>(
                                        <div key={job._id} className='bg-none px-1 col-12 col-md-6 col-lg-4 d-flex mb-1'>
                                           { job.savedJobList.map((item)=>(
                                            item.userId===user._id ?<JobCard job={job} />:null
                                           
                                           ))  } 
                                        </div>
                                  ))):(<></>)
                                  }
              </div>
            </div>
         </section>}
         
    </div>
  )
}

export default Home
