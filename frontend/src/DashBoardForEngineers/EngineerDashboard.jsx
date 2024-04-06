import React, { useEffect, useState } from "react";
import './EngineerDashboard.css';
import { IoNotifications } from "react-icons/io5";
import { GrOverview } from "react-icons/gr";
import { FaSort } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import EngineerSidebar from "./EngineerSidebar";
import AnalyticalData from "../Piecharts/AnalyticalData/AnalyticalData";
import Piechart from "../Piecharts/Status/Piechart";
import EquipmentByCost from "../Piecharts/EquipmentByCost/EquipmentByCost";
import PieDepartment from "../Piecharts/Department/pieDepartment";

const EngineerDashboard = () => {
  const [NotificationCount, setNotificationCount] = useState(null);
  const [NewDeviceNotificationCount, setNewDeviceNotificationCount] = useState(null);
  useEffect(() => {
    NotificationNumber();
    NotificationNumberNewDevice();
  }, [NotificationCount,NewDeviceNotificationCount]);

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
    <div className="main-classs-engineer">
      <div className="the-title-navigation-main-class-engineer"><EngineerSidebar/><h2 className="the-navigation-title">Engineers Dashboard</h2></div>
      <div className="main-right-part-engineer">
          <div className="analytical-data-and-buttons-engineer"> 
            <div className="analytical-device-data-engineer"><div className="doooooo"></div><AnalyticalData/></div> 
            <div className="the-two-doughnuts">
              <div className="admin-piechart-holder-status-engineer"><Piechart/></div>
              <div className="admin-piechart-holder-department"><EquipmentByCost/></div>
              <div className="admin-piechart-holder-department"><PieDepartment/></div> 
              
          </div>
          </div>
        <div className="doctor-sub">
          <Link to='/EngineerDeviceShow' className='main-my-link'><div className="admin-dashboard-device-overview"> <div className="bell-and-notification-count"><GrOverview className="dashboard-icons-bell"/>
          <span className={NewDeviceNotificationCount !== 0 ? "main-notification-count-display" : 'notification-null-count'}>
            {NewDeviceNotificationCount !== null ? NewDeviceNotificationCount : ''}
            </span></div>Device Overview</div></Link>

          <Link to='/EngineerAnnouncement' className='main-my-link'><div className="alert-and-notification-show">
          <div className="bell-and-notification-count"> <IoNotifications className="dashboard-icons-bell"/> 
          </div>Announcement Board<span className={NotificationCount !== 0 ? "main-notification-count-display" : 'notification-null-count'}>
          {NotificationCount !== null ? NotificationCount : ''}
          </span></div></Link>
          <Link to ='/EngineerSortByDep' className='main-my-link'><div className="dashboard-schedule-maintenance"><FaSort className="main-dashboard-icons"/>Sort By Department</div></Link>
        </div>
      </div>
     
    </div>
   );
}
 
export default EngineerDashboard;