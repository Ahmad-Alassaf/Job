 import axios from 'axios'

 
 export const getCategories=async(server,headers)=>{
     try {
            const response=await axios.get(`${server}/api/categories`,{headers})
            if(!response)
            {

            }
            else{
                
                return response.data.categoryList
            }
            
        } catch (error) {
            console.log(error)
            
        }

}

