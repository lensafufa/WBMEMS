import React, { useEffect, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import { GrOverview } from "react-icons/gr";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaSort } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { FaRegCalendarAlt } from 'react-icons/fa';
import { BsCheckAll } from "react-icons/bs";
import axios from "axios";

import { Link } from "react-router-dom";
import AdminstratorHome from "./SidebarAdmin";
import AnalyticalData from "../Piecharts/AnalyticalData/AnalyticalData";
import PieDepartment from "../Piecharts/Department/pieDepartment";
import EquipmentByCost from "../Piecharts/EquipmentByCost/EquipmentByCost";
import RequestType from "../Piecharts/RequestType/RequestType";
import Staff from "../Piecharts/Staff/Staff";
import Piechart from "../Piecharts/Status/Piechart";
import WorkOrderStatus from "../Piecharts/workorderstatus/WorkOrderStatus";
import Clock from "../Clock/Clock";


const DashboardAdmin = () => {
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
    <div className="main-classs">
      <div className="the-title-navigation-main-class"><AdminstratorHome/><div className="title-and-date"><h2 className="the-navigation-title">Adminstrator Dashboard</h2><Clock/></div></div>
      <div className="main-right-part">
          <div className="analytical-data-and-buttons"> 
            <div className="analytical-device-data"><div className="doooooo"></div><AnalyticalData/></div> 
            <div className="the-two-doughnuts">
              <div className="admin-piechart-holder-status"><Piechart/></div>
              <div className="admin-piechart-holder-department-cost"><EquipmentByCost/></div>
              <div className="admin-piechart-holder-department"><PieDepartment/></div> 
          </div>
          </div>
        <div className="biomed-admin-sub-class">
          <div className="navigation-section1">
            <Link to='/DeviceOverview' className='main-my-link'><div className="admin-dashboard-device-overview"> <div className="bell-and-notification-count"><GrOverview className="dashboard-icons-bell"/>
            <span className={NewDeviceNotificationCount !== 0 ? "main-notification-count-display" : 'notification-null-count'}>
              {NewDeviceNotificationCount !== null ? NewDeviceNotificationCount : ''}
              </span></div>Device Overview</div></Link>

            <Link to='/AnnouncementDisplay' className='main-my-link'><div className="alert-and-notification-show">
            <div className="bell-and-notification-count"> <IoNotifications className="dashboard-icons-bell"/> 
            </div>Announcement Board<span className={NotificationCount !== 0 ? "main-notification-count-display" : ''}>
            {NotificationCount !== 0 ? NotificationCount : <BsCheckAll className="tick"/>}
            </span></div></Link>

            <Link className="main-my-link" to='/Calendar'> <div className="dashboard-schedule-maintenance"> <FaRegCalendarAlt className="main-dashboard-icons"/>Calendar</div></Link>
          </div>
          <div className="navigation-section2">
            <div className="dashboard-schedule-maintenance"><MdOutlinePendingActions className="main-dashboard-icons"/>Pending Requests</div>
            <Link to ='/SortByDepartment' className='main-my-link'><div className="dashboard-schedule-maintenance"><FaSort className="main-dashboard-icons"/>Sort By Department</div></Link>
            <Link to='/Report' className="main-my-link"><div className="dashboard-schedule-maintenance"> <TbReportAnalytics className="main-dashboard-icons"/>Reports</div></Link>
          </div>
          
          </div>
      </div>
      <div className="admin-piechart-in-the-dashboardd">
          <div className="admin-piechart-holder-department"><WorkOrderStatus/></div>
          <div className="admin-piechart-holder-department"><Staff/></div>           
          <div className="admin-piechart-holder-department"><RequestType/></div> 
        </div>

        <div className="head-dashboard-bottom-bar">

        </div>
    </div>
   );
}
 
export default DashboardAdmin;