import React, { useEffect, useState } from "react";
import './Dashboard.css'
import { TiDeviceDesktop } from "react-icons/ti";
import { FaLinkedin } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { GrOverview } from "react-icons/gr";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSort } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { GrSchedule } from "react-icons/gr";
import { Link } from "react-router-dom";
import Home from "./Home";
import Piechart from "../../Piecharts/Status/Piechart";
import NotificationIncrementer from "../../StateManagement/notificationIncrementer";
import { useSelector } from 'react-redux';
import PieDepartment from "../../Piecharts/Department/pieDepartment";


const Dashboard = () => {
  const reduxNotificationCount = useSelector(state => state.notification.count);
  const [notificationCount, setNotificationCount] = useState(reduxNotificationCount);

  useEffect(() => {
    // Retrieve notificationCount from localStorage on component mount
    const storedNotificationCount = localStorage.getItem('notificationCount');
    if (storedNotificationCount !== null) {
      setNotificationCount(parseInt(storedNotificationCount));
    }
  }, []);

  useEffect(() => {
    if (reduxNotificationCount !== notificationCount) {
      localStorage.setItem('notificationCount', reduxNotificationCount.toString());
      setNotificationCount(reduxNotificationCount);
    }
  }, [reduxNotificationCount]);

  return ( 
    
    <div className="main-class">
      <div className="dashboard-home"></div>
      <div className="right-part">
        <div className="the-navigation-main-class"><Home/><h2 className="the-navigation-title">Navigation</h2></div>
         <div className="piechart-in-the-dashboard">
            <div className="piechart-holder-status"><Piechart/></div>
            <div className="piechart-holder-department"><PieDepartment/></div>
         </div>
        <div className="sub-class">
            <Link to='/DeviceOverview' className='my-link'><div className="alert-and-notification"> <GrOverview className="dashboard-icons"/>Device Overview</div></Link>
            <Link to='/AnnouncementDisplay' className='my-link'><div className="alert-and-notification"><div className="bell-and-notification-count"> <IoNotifications className="dashboard-icons-bell"/> 
            <span className={notificationCount? "notification-count-display": 'notification-null-count'}>{notificationCount}</span></div>Alert and Notification</div></Link>
            <Link className="my-link" to='/workorder'> <div className="schedule-maintenance"> <GrSchedule className="dashboard-icons"/>Schedule Maintenance</div></Link>
          
            <div className="pending-requests"><MdOutlinePendingActions className="dashboard-icons"/>Pending Requests</div>
            <Link to ='/SortByDepartment' className='my-link'><div className="sorts"><FaSort className="dashboard-icons"/>Sort By Department</div></Link>
            <div className="reports"> <TbReportAnalytics className="dashboard-icons"/>Reports</div>
          <div><NotificationIncrementer/></div>
        </div>
      </div>
      <div className="bottom-bar">
          <h1 className="computer-and-title">
            <TiDeviceDesktop className="computer-icon" />
            MDMiS for your company</h1>
            <div className="bottom-bar-icons">
              <div className="adresses"><FaLinkedin className="address-icon"/>Linked In</div>
              <div className="adresses"><FaSquareFacebook className="address-icon"/>Facebook</div>
              <div className="adresses"><FaInstagramSquare className="address-icon"/>Instagram</div>
            </div>
      </div>
    </div>
   );
}
 
export default Dashboard;