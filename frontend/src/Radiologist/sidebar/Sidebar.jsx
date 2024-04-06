//Home.jsx
import React, { useState } from 'react';
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineBorderColor } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { MdHistoryToggleOff } from "react-icons/md";
import { CiLogout, CiMedicalClipboard } from "react-icons/ci";
import { MdOutlineWorkOutline } from "react-icons/md";
import './sidebar.css';
import { useEffect } from 'react';
import axios from 'axios';
import { FaPeopleGroup } from "react-icons/fa6";
import LogOut from '../../components/auth/LogOut';
import UserInfo from '../../StateManagement/UserInfo';


const RadiologistSidebar = () => {
const [sidebarOpen, setSidebarOpen] = useState(false);
const [NewDeviceNotificationCount,setNewDeviceNotificationCount] = useState(null);
const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    NotificationNumberNewDevice();
  }, [NewDeviceNotificationCount]);

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
    <div className='dodo'>
      <FaBars onClick={toggleSidebar}  className='doctor-hum-button'/>
      <div className={`doctor-main-menu ${sidebarOpen ? 'doctor-open' : ''}`}>
        <div className='section-one'>
          <div onClick={toggleSidebar}><CiLogout className='close-button'/></div>
          <div className='profile-picture'>
            <UserInfo/>
          </div>
        </div>
        <nav className='doctor-nav-barr'>
          <Link className='link' to='/RadiologistDashboard'><div className='doctor-lists'><AiOutlineHome className='icons'/><div>Dashboard</div></div></Link>
          <Link className='link' to='/RadiologistDeviceOverview'><div className='doctor-lists'><MdOutlineWorkOutline className='icons'/><div className='name-and-notification-count'>Devices Overview <span className={NewDeviceNotificationCount !==0 ?'sidebar-notification': 'null-display'}>{NewDeviceNotificationCount}</span></div></div></Link> 
          <Link className='link' to='/Request_options_Radiologist'><div className='doctor-lists'><MdOutlineBorderColor className='icons' /><div>Requests</div></div></Link>
          <Link className='link' to='/RadiologistTrackChanges'><div className='doctor-lists'><MdHistoryToggleOff className='icons' /><div>Request History</div></div></Link>
          <Link className='link' to='/RadiologistTrainingManagement'><div className='doctor-lists'><FaPeopleGroup className='icons' /><div>Training Event</div></div></Link>
          <Link className='link' to='/RadiologistAnnouncement'><div className='doctor-lists'><CiMedicalClipboard className='icons' /><div>Announcement Board</div></div></Link>
        </nav>
        <div><LogOut/></div>
      </div>
    </div>
  );
};

export default RadiologistSidebar;