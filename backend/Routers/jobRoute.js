const express=require('express')
const multer = require('multer')
const upload = require("../Middleware/uploadMiddleware"); // Import middleware
const {getMyJobs,getJobs,getOneJob,setJob,deleteJob, addJob,like,pulllike} =require('../Controllers/jobController')
const router=express.Router()

const protectRoute =require('../Middleware/authMiddleware')
router.get('/myjobs/:limit/:currentPage',protectRoute,getMyJobs)
router.get('/:limit/:currentPage',getJobs)
router.get('/:id',protectRoute,getOneJob)
router.post('/',upload.single('file'),protectRoute,addJob)
router.post('/givelike/:id',protectRoute,like)
router.post('/pulllike/:id',protectRoute,pulllike)
router.put('/:id',upload.single('file'),protectRoute,setJob)
router.delete('/:id',protectRoute,deleteJob)

module.exports= router