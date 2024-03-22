import React, { useEffect, useState } from "react";
import { TiDeviceDesktop } from "react-icons/ti";
import { IoNotifications } from "react-icons/io5";
import { GrOverview } from "react-icons/gr";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaSort } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminstratorHome from "./SidebarAdmin";
import AnalyticalData from "../Piecharts/AnalyticalData/AnalyticalData";
import Piechart from "../Piecharts/Status/Piechart";
import EquipmentByCost from "../Piecharts/EquipmentByCost/EquipmentByCost";
import RequestType from "../Piecharts/RequestType/RequestType";
import WorkOrderStatus from "../Piecharts/workorderstatus/WorkOrderStatus";
import PieDepartment from "../Piecharts/Department/pieDepartment";

const AdminstratorDashboard = () => {
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
    <div className="main-class">
      <div className="right-part">
        <div className="the-navigation-main-class"><AdminstratorHome/><h2 className="the-navigation-title">Navigation</h2></div>
        <div className="analytical-device-data"><AnalyticalData/></div>
        <div className="analytical-data-and-buttons">  
          <div className="the-two-doughnuts">
            <div className="admin-piechart-holder-status"><Piechart/></div>
            <div className="admin-piechart-holder-department"><EquipmentByCost/></div>
            <div className="admin-piechart-holder-department"><RequestType/></div>
          </div>
          <div className="admin-sub-class">
              <Link to='/AdminDeviceOverview' className='main-my-link'><div className="admin-dashboard-device-overview"> <div className="bell-and-notification-count"><GrOverview className="dashboard-icons-bell"/>
              <span className={NewDeviceNotificationCount !== 0 ? "main-notification-count-display" : 'notification-null-count'}>
                {NewDeviceNotificationCount !== null ? NewDeviceNotificationCount : ''}
                </span></div>Device Overview</div></Link>

              <Link to='/AnnouncementDisplay' className='main-my-link'><div className="alert-and-notification-show"><div className="bell-and-notification-count"> <IoNotifications className="dashboard-icons-bell"/> 
              <span className={NotificationCount !== 0 ? "main-notification-count-display" : 'notification-null-count'}>
              {NotificationCount !== null ? NotificationCount : ''}
              </span></div>Announcement Board</div></Link>

              <div className="dashboard-schedule-maintenance"><MdOutlinePendingActions className="main-dashboard-icons"/>Pending Requests</div>
              <Link to='/Report' className="main-my-link"><div className="dashboard-schedule-maintenance"> <TbReportAnalytics className="main-dashboard-icons"/>Reports</div></Link>

          </div>
        </div>
        <div className="admin-piechart-in-the-dashboard">
          <div className="admin-piechart-holder-department"><WorkOrderStatus/></div>           
          <div className="admin-piechart-holder-department"><PieDepartment/></div>   
        </div>
      </div>
      <div className="dashboard-bottom-bar">
          <h1 className="dashboard-computer-and-title">
            <TiDeviceDesktop className="computer-icon" />
            MDMiS for your company</h1>
            <p className="bottombar-description">Comprehensive platform designed to streamline 
              the monitoring, tracking, and maintenance of medical 
              devices within healthcare facilities.
              This system integrates various functionalities, including inventory management, 
              equipment tracking, maintenance scheduling, and regulatory compliance monitoring, 
              into a centralized online platform accessible from any web-enabled device.</p>

      </div>
    </div>
   );
}
 
export default AdminstratorDashboard;