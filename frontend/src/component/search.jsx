import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import axios from 'axios'
import CitySearch from './citySearch'
import { BiBorderRadius } from 'react-icons/bi';
import {Link ,Navigate,useNavigate} from 'react-router-dom'
const Search = ({ getCityData}) => {
   const [shadow, setShadow] = useState("7px 7px 10px rgba(0,0,0,0.5)")
   const [result,setResult]=useState([])
   const [city,setCity]=useState(null)
   const [searchText,setSearchText]=useState('')
     const navigate = useNavigate();
 const handleSearchChange =async (e) => {
    setSearchText(e.target.value)
 
}
const runSearch=async (e)=>{
  e.preventDefault()
  console.log(searchText)
  if (searchText !== "") {
    try {
      console.log('city?.name')
      console.log(city?.name)
      const response = await axios.get(`https://job-3f5h.onrender.com/api/search/${searchText}/${city?.name}`);
      if (response) {  
        console.log(response.data)       
        setResult(response.data)         
      }
    } catch (error) {
      console.log('Error in search controller....')
      console.log(error)
    
    }
  } 

}
const getCity=(location)=>{
  
    setCity(location)
   
 
}
const handleOnClick=(item)=>{
  setSearchText(item.title)
  setResult([])
   
 // navigate("/job", { state: { job: item } })  
} 
const style={
  searchstyle:{
    boxShadow: shadow,
    transition: "box-shadow 0.3s ease-in-out",
    height:'60px',
  
    
  },
  titlestyle:{
    borderRadius:'10px 0px 0px 10px',
    borderRight:'none'

  },
  searchresultStyle:{
    padding:'10px 10px 10px 15px',
    boxShadow:'2px 2px  5px rgba(0, 0, 0, 0.3)',
    transition: "box-shadow 0.3s ease-in-out",
    border:'1px solid rgb(182, 179, 179)',
    borderRadius:'5px ',
    position:'absolute',
    zIndex:'10'

  }
} 
useEffect(()=>{
 

},[city,searchText])  
  return (
   
    <div className='container-md-fluid container-lg py-4  ' >
      <div className='row justify-content-center  p-0 m-0'>
         <div className="col-12  col-md-9 justify-content-between d-flex   p-0 rounded " 
                style={style.searchstyle} onMouseEnter={() => setShadow("5px 5px 15px rgba(0, 0, 0, 0.3)")}
                                          onMouseLeave={() => setShadow("0px 0px 0px rgba(0,0,0,0)")}>        
                <div className="d-flex col-10"  >
                  
                  <input
                    type="text"
                    name="searchText"
                    className="form-control  "
                    style={style.titlestyle}
                    value={searchText}
                    placeholder="Jobtitel..."
                    onChange={(e)=>handleSearchChange(e)} // Handle the search input                   
                  />
                  <CitySearch  sendCity={getCity}/>     
                  </div>
                  <div className="col-2 ">
                      <button
                        className="btn btn-primary  w-100 h-100"
                        style={{marginLeft:'5px'}}
                        type="button" // Changed from submit to button
                        onClick={runSearch}
                      > <FaSearch /> </button>                      
                    </div>      
                        
         </div>
       
      </div>
      <div className=" row justify-content-center p-0 ">
        <div className="col-12  col-md-9 position-relative   p-0">
            <ul className='col-9 bg-light mt-2' style={result.length > 0 ?style.searchresultStyle:{}}>
            {result.length > 0 ? (
              result.map((item) => 
              <li key={item._id} className='list-group-item py-2 pointer'>
              <div>
                  <h5 onClick={()=>handleOnClick(item)} className='text-primary  '>{item.title}</h5>           
              </div>
              </li>)
            ) :<></>}
          </ul>
        </div>
      </div> 
           
    </div>
   
  )
}

export default Search
