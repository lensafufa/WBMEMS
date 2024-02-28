import React from "react";
import './DoctorDashboard.css';
import DoctorSidebar from "./DoctorSidebar";
const DoctorDashboard = () => {

    return ( 
        <div className="main-class">
          <div className="right-part">
            <div className="navigation-main-class"><DoctorSidebar/><h1 className="navigation-title">Doctor's Navigation</h1></div>
          </div>
        </div>
       );
}
 
export default DoctorDashboard;