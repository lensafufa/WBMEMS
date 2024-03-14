import React, { useEffect, useState } from "react";
import './EngineerDashboard.css';
import EngineerSidebar from "./EngineerSidebar";
import Home from "../pages/Home/Home";
import Piechart from "../Piecharts/Status/Piechart";
import PieDepartment from "../Piecharts/Department/pieDepartment";
import BarChart from "../Piecharts/BarChart";
import { Link } from "react-router-dom";
import { MdOutlinePendingActions } from "react-icons/md";
import { GrOverview, GrSchedule } from "react-icons/gr";
import { FaSort } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { IoNotifications } from "react-icons/io5";
import axios from "axios";

const EngineerDashboard = () => {

  const [NotificationCount, setNotificationCount] = useState(null);
  useEffect(() => {
    NotificationNumber();
  }, [NotificationCount]);

  useEffect(() => {
   
  }, []);
  const NotificationNumber = async()=>{
    try{
      const response = await axios.get(`http://localhost:7000/api/alertAndNotification/getByType?notificationType=${'Announcement'}`);
      console.log('The response data:', response.data);
      const counter = response.data.length;
      setNotificationCount(counter);
    }catch(error){
      console.error('error fetching the notifications', error);
    }
  };

    return ( 
      <div className="main-class-engineer">
      <div className="dashboard-home-engineer"></div>
      <div className="right-part-engineer">
        <div className="engineer-the-navigation-main-class"><EngineerSidebar/><h2 className="the-navigation-title-engineer">Navigation</h2></div>
        <div className="sub-class-engineer">
            <Link to='/EngineerDeviceShow' className='my-link'><div className="dashboard-device-overview-engineer"> <GrOverview className="engineer-dashboard-icons"/>Device Overview</div></Link>      
            <Link to='/EngineerAnnouncement' className='my-link'><div className="alert-and-notification-show-engineer"><div className="bell-and-notification-count"> <IoNotifications className="engineer-dashboard-icons-bell"/> 
            <span className={NotificationCount !== 0 ? "engineer-notification-count-display" : 'engineer-notification-null-count'}>
            {NotificationCount !== null ? NotificationCount : ''}
            </span></div>Announcement Board</div></Link>          
            <Link to ='/EngineerSortByDep' className='my-link'><div className="doctor-sort-by-dep"><FaSort className="engineer-dashboard-icons"/>Sort By Department</div></Link>
        
        </div>

        <div className="piechart-in-the-dashboard-engineer">
            <div className="piechart-holder-status-engineer"><Piechart/></div>
            <div className="piechart-holder-department-engineer"><PieDepartment/></div>            
         </div>
         <div className="piechart-holder-department"><BarChart/></div>
      </div>
     
    </div>
   );
}
 
export default EngineerDashboard;