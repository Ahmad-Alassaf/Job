const express=require('express')
const {addeducation,deleteOneeducation, addcareer,addOneCareer,getProfile,deleteOneCareer}=require('../Controllers/profileController')
const protectRoute =require('../Middleware/authMiddleware')
const router=express.Router()
router.get('/:id',protectRoute,getProfile)//:id profile._id
// Career Route
router.post('/careerhistory/addcareer',protectRoute,addcareer)
router.put('/careerhistory/:id',protectRoute,addOneCareer)//:id profile._id
router.delete('/careerhistory/:id/:index',protectRoute,deleteOneCareer)
// Education Route

router.put('/education/:id',protectRoute,addeducation)//:id profile._id
router.delete('/education/:id/:index',protectRoute,deleteOneeducation)
module.exports=router