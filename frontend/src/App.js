import React, { useState } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/header";
import axios from "axios";
import Login from "./component/login";
import Register from "./component/register";
import Home from "./component/home";
import Me from "./component/getMe";
import Profile from "./component/profile";
import JobsList from "./component/jobsList";
import SearchResults from "./component/searchResult";
import Accessdenied from "./component/accessdenied";
import ProtectedRoute from "./component/protectedRoute";
import Job from "./component/job";
import EditJob from "./component/editJob";
import Search from "./component/search";
import NewJob from "./component/newJob";
import ShowSerachResult from "./component/showsearchresult";
import JobDetailsPage from "./component/jobDetailspage";
import GetJob from "./component/getJob";
import DashBoard from "./component/DashBoard";
import Category from "./component/category";

function App() {
  const [cityInfo,setCityInfo]=useState(null)
  
 
 
  const cityData=(data)=>{
    if(data)
      setCityInfo(data)

  }
  return (
    <Router>
      <Header />
      <Search  getCityData={cityData}/>
     
       
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/accessdenied" element={<Accessdenied />} />
         <Route path="/job" element={<Job />} />
         <Route path="/newjob" element={<NewJob />} />
        <Route path="/job/:id" element={<GetJob />} />
         <Route path="/JobDetailsPage" element={<JobDetailsPage />} />
        <Route path="/showsearchresult" element={<ShowSerachResult />} />
        <Route path="/jobslist" element={<ProtectedRoute allowedRoles={['user','admin']}><JobsList /></ProtectedRoute>} ></Route>
        <Route path="/neweditjob/:id?" element={<ProtectedRoute allowedRoles={['user','admin']}><NewJob /></ProtectedRoute>}></Route>
        <Route path="/myprofile" element={<ProtectedRoute allowedRoles={['user','admin']}><Me /></ProtectedRoute>}></Route>
        <Route path="/dashboard/" element={<ProtectedRoute allowedRoles={['user','admin']}><DashBoard/></ProtectedRoute>}>
             <Route path="category" element={<Category />}></Route>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
