import React, { useState ,useEffect} from 'react'
import {Link,Outlet} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaEdit ,FaTrash} from 'react-icons/fa'
import axios from 'axios'
import {format} from 'date-fns'
const GetMe = () => {
  const { user } = useSelector((state) => state.auth);
   const myServer = process.env.NODE_ENV === 'production' 
  ? 'https://job-3f5h.onrender.com' 
  : 'http://localhost:8000'
   const headers={            
            Authorization:`Bearer ${user.token}`
        }
  const [task,setTask]=useState('')
  const [careerData,setCareerData]=useState({
    start:null,
    end:null,
    companyName:'',
    description:'',
    tasks:[]
  })
  const [education,setEducation]=useState({
    start:null,
    end:null,
    institute:'',
    description:'',
  })
  const [profile,setProfile]=useState(null)
  const Style={
    backgroundColor:{
      backgroundColor:'#122335',
      color:'white'
    }
  }
 
  const handleAddTask=(e)=>{
    e.preventDefault()
    setCareerData((prev)=>({
      ...prev,
      tasks: task.trim()!=='' ? [...prev.tasks, task]:[...prev.tasks],
    }))
    setTask('')
   
  }
  const handleEnterDown=(e)=>{
    if(e.key==='Enter')
    {
      handleAddTask(e)
    }
  }
  const updateProfile=async(e)=>{
   
    
     e.preventDefault()
    try {
     
      
        const response=await axios.put(`${myServer}/api/profile/careerhistory/${profile._id}`,careerData,{headers})
        if(!response){console.log('error')}
        else{
          setProfile(response.data.profile)
        }
          

    } catch (error) {
      console.log(error)
      
    }


  }
  const deleteOneCareer=async(index)=>{
   
    const response=await axios.delete(`${myServer}/api/profile/careerhistory/${profile._id}/${index}`,{headers})
    if(!response)
    {
      console.log('Error')
    }
    else{
      console.log(response.data)
      getprofile()
    }

  }
   
   const getprofile=async()=>{
    try {
      const response=await axios.get(`${myServer}/api/profile/${user._id}`,{headers})
      if(!response)
      {
        console.log('Error in get Profil')
      }
      setProfile(response.data.profile)

      
    } catch (error) {
      
    }

   }
   const updateEduction=async(e)=>{
     e.preventDefault()
    try {
     
      
        const response=await axios.put(`${myServer}/api/profile/education/${profile._id}`,education,{headers})
        if(!response){console.log('error')}
        else{
         // setEducation(response.data.profile)
        }
          

    } catch (error) {
      console.log(error)
      
    }

   }
   useEffect(()=>{
   console.log('user in use Effect',user)
   getprofile()

  },[])
  return (
    <div className='bg-light'>
            <div className="container ">
              
            <div className="row p-0 m-0">
              <div className="col-3 m-0  text-center" style={{backgroundColor:'#122335'}}>
                <div className='py-2'>
                     <img src='/images/Bild1.jpg' className='img-fluid m-auto rounded' style={{height:'250px',width:'200px'}} />
                     <p className='my-1 text-white '><strong>Ahmad Al Asaf</strong></p>
                </div>
                <div className='py-3 text-white'>
                 
                  <p className='m-0'>eng.ahmad.alassaf@gmail.com</p>
                  <p className='m-0'>Tel: +4915175614666</p>
                   <p className='m-0'>WhatsApp: +4915175614666</p>
                </div>
                <div className='text-white py-3'>
                  <h3>Persönliche Daten</h3>
                  <p  className='m-0'>25.02.1984 in Aleppo/Syrien</p>
                  <p className='m-0'>verheiratet </p>
                  <p className='m-0'> Syrisch/Deutsch</p>
                </div>
                <div className='text-white py-3'>
                  <h3>Sprachkenntnisse</h3>
                  <p  className='m-0'>Deutsch( gut in Wort und Schrift</p>
                  <p className='m-0'>Englisch (gut)</p>
                  <p className='m-0'> Arabisch (Mutter Sprache)</p>
                </div>
                <div>
                  <button className='btn btn-primary w-100'><FaEdit /></button>
                </div>
                

              </div>
              <div className="col-8 p-0 m-0 ">
                <h3 className=' ' style={Style.backgroundColor}>Full-Stack Webentwickler</h3>
                <h3 className='px-1 text-center' style={Style.backgroundColor}>Beruflicher Werdegang</h3>
                <div>
                     {profile?.careerHistory?.length >0 &&(profile?.careerHistory?.map((item,index)=>
                     <div key={index} className=' px-1 d-flex  align-items-center border mb-1 rounded shadow'>
                      <div className="  w-100 px-1">
                          
                            <p className='text-muted p-0 m-0'> {format(item.start,'MMMM yyyy')} - {format(item.end,'MMMM yyyy')}</p>
                             <h4 className=' border rounded text-center bg-secondary text-white' >{item.companyName}</h4>
                            <ul className=''>
                              {item.tasks?.length>0 &&(item.tasks?.map((item,index)=>(<li key={index} className=''>{item}</li>)))}
                            </ul>
                            description
                            <p>{item.description}</p>
                      </div>
                      <div>
                        <button className='btn btn-danger' onClick={(e)=>deleteOneCareer(index)}> <FaTrash /> </button>
                      </div>
                           
                     </div>))}
                </div>
                <form  className='form w-50 m-auto' onSubmit={updateProfile}>
                  <div className=''>
                    <label for="startdate" className="form-label ">Start</label>
                    <input type="date" name="startdate"  id='startdate'  className='form-control '
                    value={careerData.start}
                      onChange={(e) =>
                        setCareerData((prev) => ({ ...prev, start: e.target.value }))
                      }
                      min="1980-01-01"  max="2025-12-31" />
                  </div>
                   <div className=''>
                        <label for="endtdate" className="form-label">End</label>
                        <input type="date" name="endtdate"  id='endtdate' className='form-control '
                            value={careerData.end}
                          onChange={(e) =>
                            setCareerData((prev) => ({ ...prev, end: e.target.value }))
                          }
                          min="1980-01-01"    max="2025-12-31" />
                  </div>
                  <div className='input-group my-1'>
                     <input type="text" name='companyName' value={careerData.companyName} className='form-control' placeholder='company name...' 
                     onChange={(e)=>setCareerData((prev)=>({...prev,companyName:e.target.value}))}
                     />

                  </div>
                   <div className='input-group my-1'>
                     <input type="text" name='task' value={task} className='form-control' onChange={(e)=>setTask(e.target.value)} onKeyDown={(e)=>handleEnterDown} placeholder='Aufgaben...' />
                     
                     <button className='btn btn-primary' onClick={handleAddTask}>+</button>
                  </div>
                  
                  <ol>
                     {careerData?.tasks?.length>0 && ( careerData.tasks.map((task,index)=>(<li key={index}>{task}</li>))) }
                  </ol>
                  <div>
                    <textarea className='form-control' name='description' value={careerData.description} onChange={(e)=>setCareerData((prev)=>({...prev,description:e.target.value}))} />
                  </div>
                  <button className='btn btn-primary w-100' type='submit'>Speichern</button>
                </form>
                  <h3 className='px-1 text-center' style={Style.backgroundColor}>Ausbildung</h3>
                  {profile.education?.length>0 &&(profile.education.map((item,index)=>(
                       <div key={index}>
                           <h4>{item.inistute}</h4>
                           <p>{format()}</p>
                       </div>)))}
                  <form  className='form w-50 m-auto' onSubmit={updateEduction}>
                  <div className=''>
                    <label for="startdate" className="form-label ">Start</label>
                    <input type="date" name="startdate"  id='startdate'  className='form-control '
                    value={education.start}
                      onChange={(e) =>
                        setEducation((prev) => ({ ...prev, start: e.target.value }))
                      }
                      min="1980-01-01"  max="2025-12-31" />
                  </div>
                   <div className=''>
                        <label for="endtdate" className="form-label">End</label>
                        <input type="date" name="endtdate"  id='endtdate' className='form-control '
                            value={education.end}
                          onChange={(e) =>
                            setEducation((prev) => ({ ...prev, end: e.target.value }))
                          }
                          min="1980-01-01"    max="2025-12-31" />
                  </div>
                  <div className='input-group my-1'>
                     <input type="text" name='companyName' value={education.institute} className='form-control' placeholder='institute...' 
                     onChange={(e)=>setEducation((prev)=>({...prev,institute:e.target.value}))}
                     />

                  </div>
                
                  <div>
                    <textarea className='form-control' name='description' value={education.description} onChange={(e)=>setEducation((prev)=>({...prev,description:e.target.value}))} />
                  </div>
                  <button className='btn btn-primary w-100' type='submit'>Speichern</button>
                </form>
              </div>
            </div>
              
            </div>
    </div>
  )
}

export default GetMe
