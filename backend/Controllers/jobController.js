
const Job = require('../Models/jobModel');
const asyncHandler = require('express-async-handler');
const fs = require('fs');
const { json } = require('stream/consumers');
// Add Job (Fixed)
const addJob = asyncHandler(async (req, res) => { 
    console.log('add job controller called....')
    console.log(req.body)
    try {    
            const { title,companyName, description, type, work,workingdays, salary,tasks,skills,languages,performances, location,adresse } = req.body
            if (!title || !description || !salary || !type || !work || !location  ) 
                {
                if (req.file) {
                                    try {
                                        await fs.promises.unlink(req.file.path); // Delete file asynchronously
                                    
                                    } catch (err) {              
                                        return res.status(500).json({ message: 'File deletion failed' });
                                    }
                            }
                return res.status(400).json({ message: 'Please fill all fields. Photo would not saved...' });  
            }
           
           
          const newJob = await Job.create({
            title,
            companyName,
            description,
            type: JSON.parse(type || "null"), // Handle JSON parsing
            work: JSON.parse(work || "null"), // Handle JSON parsing
            workingdays:JSON.parse(workingdays || "null"),
            tasks:JSON.parse(tasks || "null"),
            skills:JSON.parse(skills|| "null"),
            languages:JSON.parse(languages|| "null"),
            performances:JSON.parse(performances ||'null'),
            salary:JSON.parse(salary ||'null'),
            adresse:JSON.parse(adresse ||'null'),
            location,
            imageUrl: `/uploads/${req.file.filename}`, // Save file path
            likes: [],
            user: req.user.id,
          })
              
          console.log('created Job is')
          console.log(newJob)
          res.status(201).json(newJob);
    } catch (error) {   
        console.log(error)  
      res.status(400).json(error)
    }
})
const getOneJob=asyncHandler(async(req,res)=>{
    try {
        const job=await Job.findOne({_id:req.params.id,user:req.user.id})
        if(!job)
        {
            res.status(401)
            throw new Error(' Job not Found !!!!')
        }
       res.status(200).json(job)
        
    } catch (error) {
        
    }

})
// get all Jobs  for user 
const getMyJobs=asyncHandler(async(req,res)=>{
    console.log(req.params)
    const page = parseInt(req.params.currentPage) || 1;
            const limit = parseInt(req.params.limit) || 10;
            const skip = (page - 1) * limit;
    try {
        const jobs=await Job.find({user:req.user.id}).sort({ createdAt: -1 }).skip(skip).limit(limit).populate('user')
        if(!jobs)
            {
                res.status(401)
                throw new Error(' no Jobs ....')
            }
            const total = await Job.countDocuments();
       res.status(200).json({
        jobs,
        totalPages:Math.ceil(total/limit),
        currentPage:page
       })
        
    } catch (error) {
        console.log(error)
        
    }
   
})
// get all Jobs  for Homepage
const getJobs=asyncHandler(async(req,res)=>{
            const page = parseInt(req.params.currentPage) || 1;
            const limit = parseInt(req.params.limit) || 10;
            const skip = (page - 1) * limit;
    try {
        const jobs=await Job.find().sort({ createdAt: -1 }).skip(skip).limit(limit).populate('user')
        if(!jobs)
            {
                res.status(401)
                throw new Error(' no Jobs ....')
            }
            const total = await Job.countDocuments();
       res.status(200).json({
        jobs,
        totalPages:Math.ceil(total/limit),
        currentPage:page
       })
        
    } catch (error) {
        
    }
   
})
const setJob=asyncHandler(async(req,res)=>{
    try {
        const { title,companyName, description, type, work,workingdays, salary,tasks,skills,languages,performances, location,adresse } = req.body
        const job=await Job.findOne({_id:req.params.id,user:req.user.id})
        console.log('req.body')
        console.log(req.body)
        if(!job)
        {
            res.status(401)
            throw new Error(' Job not Found !!!!')
        }
        const modefiedJob=await Job.findByIdAndUpdate(job._id,{
            title:title,
            companyName:companyName,
            description:description,
            type: JSON.parse(type || "null"), // Handle JSON parsing
            work: JSON.parse(work || "null"), // Handle JSON parsing
            workingdays:JSON.parse(workingdays || "null"),
            tasks:JSON.parse(tasks || "null"),
            skills:JSON.parse(skills|| "null"),
            languages:['test'],
            performances:JSON.parse(performances ||'null'),
            salary:JSON.parse(salary ||'null'),
            adresse:JSON.parse(adresse ||'null'),
            location,
            imageUrl: `/uploads/${req.file.filename}`, // Save file path
            likes: [],
            user: req.user.id,

        })
      
        
        console.log(modefiedJob)
       res.status(200).json(modefiedJob)
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Something went wrong", error: error.message })
        
    }

})
const deleteJob=asyncHandler(async(req,res)=>{
    try {
        const job=await Job.findOne({_id:req.params.id,user:req.user.id})
        if(!job)
        {
            res.status(401)
            throw new Error(' Job not Found !!!!')
        }
        const deletedJob=await Job.findByIdAndDelete(job._id)
       res.status(200).json(deletedJob)
        
    } catch (error) {
        
    }
})
const like=asyncHandler(async(req,res)=>{
    console.log('called...')
    const job=await Job.findOne({_id:req.params.id})
    console.log(job)
    try {
        const userId=req.user.id
        const createdDate=Date.now()
            job.likes.push({userId,createdDate})
        
        const likedJob=await Job.findByIdAndUpdate(job._id,job)
        console.log(likedJob)
        if(!likedJob)
        {
            res.status(401)
            throw new Error(' Job not Found !!!!')
        }
        
    } catch (error) {
        console.log(error)
        
    }
   
   
    
    res.status(200).json(likedJob)

})
const pulllike=asyncHandler(async(req,res)=>{
    console.log('pullLike called...')
    const job=await Job.findById(req.params.id)
    console.log(job)
    if(job){
     
        job.likes= job.likes.filter(like=>like.userId!==req.user.id)
        console.log('job befor save...')       
        await job.save()       
        res.status(200).json(likedJob)
    }
    else{
        res.status(401)
        throw new Error(' Job not Found !!!!')

    }
   
   
    
    

})
module.exports={
    addJob,getMyJobs,getJobs,getOneJob,setJob,deleteJob,like,pulllike
}