import React, { useEffect, useState } from "react";
import './DoctorDashboard.css';
import DoctorSidebar from "./DoctorSidebar";
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

const DoctorDashboard = () => {

  const [NotificationCount, setNotificationCount] = useState(null);
  const [NewDeviceNotificationCount, setNewDeviceNotificationCount] = useState(null);

  useEffect(() => {
    NotificationNumber();
    NotificationNumberNewDevice();
  }, [NotificationCount, NewDeviceNotificationCount]);


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
  const NotificationNumberNewDevice = async()=>{
    try{
      const response = await axios.get(`http://localhost:7000/api/alertAndNotification/getByType?notificationType=${'NewDevice'}`);
      console.log('The response data:', response.data);
      const counter1 = response.data.length;
      setNewDeviceNotificationCount(counter1);
    }catch(error){
      console.error('error fetching the notifications', error);
    }
  };


    return ( 
      <div className="doctor-main-class">
      <div className="doctor-dashboard-home"></div>
      <div className="doctor-right-part">
        <div className="the-navigation-main-class"><DoctorSidebar/><h2 className="the-navigation-title">Navigation</h2></div>
        <div className="doctor-sub-class">
            
            <Link to='/DoctorDeviceShow' className='my-link'><div className="alert-and-notification-show"><div className="bell-and-notification-count"> <GrOverview className="doctor-dashboard-icons-bell"/> 
            <span className={NewDeviceNotificationCount !== 0 ? "notification-count-display" : 'notification-null-count'}>
            {NewDeviceNotificationCount !== null ? NewDeviceNotificationCount : ''}
            </span></div>Device Overview</div></Link>  

            <Link to='/DoctorAnnouncement' className='my-link'><div className="alert-and-notification-show"><div className="bell-and-notification-count"> <IoNotifications className="doctor-dashboard-icons-bell"/> 
            <span className={NotificationCount !== 0 ? "notification-count-display" : 'notification-null-count'}>
            {NotificationCount !== null ? NotificationCount : ''}
            </span></div>Announcement Board</div></Link>  


            <Link to ='/DoctorSortByDep' className='my-link'><div className="doctor-sort-by-dep"><FaSort className="doctor-dashboard-icons"/>Sort By Department</div></Link>
        </div>

        <div className="piechart-in-the-dashboard">
            <div className="piechart-holder-status"><Piechart/></div>
            <div className="piechart-holder-department"><PieDepartment/></div>            
         </div>
         <div className="piechart-holder-department"><BarChart/></div>
      </div>
     
    </div>
   );
}
 
export default DoctorDashboard;