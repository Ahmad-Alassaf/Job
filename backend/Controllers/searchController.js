const Job=require('../Models/jobModel')
const asyncHandler =require('express-async-handler')
const search=asyncHandler(async(req,res)=>{
    console.log('test')
    const {title,city}=req.params
    console.log(title)
    console.log(city)
    try {
        if(city ==='')
        {
            const searchResult=await Job.find({
                title: { $regex: title, $options: "i" },
             //  location: { $regex: city, $options: "i" }
            })// Case-insensitive search

         res.status(200).json(searchResult)

        }
        else{
            const searchResult=await Job.find({
                title: { $regex: title, $options: "i" },
               location: { $regex: city, $options: "i" }
            })// Case-insensitive search

         res.status(200).json(searchResult)

        }
       
      }  catch (error)
           {console.log(error)}
})
module.exports ={
    search
}