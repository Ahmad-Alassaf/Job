import React from 'react'
import {Link,Outlet} from 'react-router-dom'
const getMe = () => {
  return (
    <div>
         <div className="navbar navbar-expand-lg navbar-light bg-light border-top">
         <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0 ">
                <li className="nav-item">
                <Link className="nav-link text-primary" to ="profile">my Profile</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-primary" to ="jobslist">Jobs</Link>
                </li>
                
            </ul>
            </div>

         </div>
         <div className="content">
            <Outlet />
            
         </div>
      
    </div>
  )
}

export default getMe
