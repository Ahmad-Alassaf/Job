import React, { useState , useEffect} from 'react'
import  { Country, State, City } from 'country-state-city'
import { FaLocationDot } from "react-icons/fa6"

const CitySearch = ({sendCity}) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [enteredIndex, setEnteredIndex] = useState(null);
    const [showCities,setShowCities]=useState(false)
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const germany = Country.getCountryByCode('DE');
   
     const germanCities = City.getCitiesOfCountry(germany.isoCode);
     const [selectedCity, setSelectedCity] = useState(null);
   
      const handleMouseOver=(index)=>{
        setHoveredIndex(index)
     
      }
      useEffect((e)=>{ 
        console.log('ues Effect selectedCity.....') 
        console.log(selectedCity)                            
                        if(searchTerm==='' )
                        {
                            setFilteredCities([])                            
                            return
                        }
                          const results = germanCities.filter(
                                (city) =>
                                    city?.name.toLowerCase().startsWith(searchTerm?.toLowerCase())                 
                                )               
                                setFilteredCities(results) 
                            if(selectedCity)
                            {
                                sendCity(selectedCity)
                                setSearchTerm(selectedCity.name)
                                setFilteredCities([])
                            }
                              
                                
                        
                    },[searchTerm,selectedCity]
                )                
     const handleSearchTermChange=(e)=>{
        console.log('1')
        setSelectedCity(null)
        console.log('2')
        sendCity(selectedCity)
        console.log('3')
        console.log(selectedCity)
        console.log('4')
        setSearchTerm(e.target.value)
        console.log('5')
        console.log('e.target.value')
        console.log(e.target.value)

     }
  const   style={
        locationinputstyle:{
            borderRadius:'0px 10px 10px 0px',
            height:'100%'
       
         }
     }
  return (
    <div className='position-relative '>
       
         <input type="text" className='form-control  ' 
                style={style.locationinputstyle}   
                placeholder='Ort...' 
                value={searchTerm} 
                name='searchTerm' 
                onChange={(e)=>{handleSearchTermChange(e)}}  />
         <ul  className='list-group position-absolute bg-light w-100 z-3'>
          {filteredCities.map((city, index) => (
            <li
                key={index}
                style={{
                padding: "10px",
                borderBottom: "1px solid #ccc",
                cursor: "pointer",
                color: selectedCity === city ? "white" : "black",
                backgroundColor: hoveredIndex === index ? "#007bff" : "white",
                color: hoveredIndex === index ? "white" : "black",
                transition: "background-color 0.3s ease",
                
                }}
                className='list-group-item'
                onClick={() =>{setSelectedCity(city)}}
                onMouseOver={()=>handleMouseOver(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              
            >
                {city.name}
               
            </li>))}
        </ul>
        
    </div>
  )
}

export default CitySearch
