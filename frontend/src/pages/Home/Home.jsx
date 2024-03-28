//Home.jsx
import React, { useState } from 'react';
import './Home.css';
import { IoIosHome } from "react-icons/io";
import { MdAccountBox } from "react-icons/md";
import { MdInventory } from "react-icons/md";
import { MdWorkHistory } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import UserInfo from '../../StateManagement/UserInfo';
import LogOut from '../../components/auth/LogOut';
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import { FaFileContract,FaFileAlt } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa6";


const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return ( 
    <div className='dodo'>
      <FaBars onClick={toggleSidebar}  className='hum-button'/>
      <div className={`main-manu ${sidebarOpen ? 'open' : ''}`}>
        <div className='section-one'>
          <div onClick={toggleSidebar}><CiLogout className='close-button'/></div>
          <div className='profile-picture'>
            <UserInfo/>
          </div>
        </div>
        <nav className='home-nav-barr'>
          <Link className='link' to='/Dashboard'><div className='main-lists'><IoIosHome className='iconss'/><div>Dashboard</div></div></Link>
          <Link className='link' to='/Inventory'><div className='main-lists'><MdInventory className='iconss'/><div>Inventory</div></div></Link> 
          <Link className='link' to='/DeviceOverview'><div className='main-lists'><MdWorkHistory className='iconss'/><div>Devices Overview</div></div></Link> 
          <Link className='link' to='/Schedule'><div className='main-lists'><FaRegCalendarAlt className='iconss'/><div>Schedule Work</div></div></Link> 
          <Link className='link' to='/Requested'><div className='main-lists'><MdMessage className='iconss'/><div>Requested Issues</div></div></Link>
          <Link className='link' to='/DisposedDevices'><div className='main-lists'><RiDeleteBin6Line className='iconss'/><div>Disposed Equipments</div></div></Link>
          <Link className='link' to='/Report'><div className='main-lists'><FaFileAlt className='iconss'/><div>Report</div></div></Link> 
          <Link className='link' to='/Announcement'><div className='main-lists'><FaMicrophone className='iconss'/><div>Announcement</div></div></Link>
          <Link className='link' to='/CreateAccount'><div className='main-lists'><MdAccountBox className='iconss'/><div>Create Account</div></div></Link> 
          <Link className='link' to='/StaffInformation'><div className='main-lists'><GrUserWorker className='iconss'/><div>Staff Information</div></div></Link>
        
        </nav>
         <LogOut/>
        <div>
          
        </div>
      </div>
    </div>
  );
};

export default Home;
