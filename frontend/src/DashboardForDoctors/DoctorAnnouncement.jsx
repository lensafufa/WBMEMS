import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DoctorAnnouncement.css';
import { DateTime } from 'luxon';
import { useDispatch } from 'react-redux';
import { decrementNotificationCount } from '../StateManagement/actions/notificationActions';
import DoctorSidebar from './DoctorSidebar';

const DisplayAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const dispatch = useDispatch();
  const handleIncrement = () => {
    dispatch(decrementNotificationCount());
    localStorage.removeItem('notificationCount');

  };
  useEffect(() => {
    fetchAnnouncements();
    EraseNotifications();
  }, []);

 const EraseNotifications = async()=>{
  try{
    await axios.delete(`http://localhost:7000/api/alertAndNotification/notification?notificationType=${'Announcement'}`);
  }catch(error){
    console.error(error)
  }

 }


  const fetchAnnouncements = async () => {
    try {
      handleIncrement()
      const response = await axios.get('http://localhost:7000/api/announcements');
      if (response.status === 200) {
        const announcementsWithLocalTime = response.data.map(announcement => ({
          ...announcement,
          announcement_time: DateTime.fromISO(announcement.announcement_time).toLocaleString(DateTime.DATETIME_MED),
        }));
        setAnnouncements(announcementsWithLocalTime.reverse());
      } else {
        throw new Error('Failed to fetch announcements');
      }
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };
  

  return (
    <div className='announcement-table'>
      <div className='announcement-main'> <DoctorSidebar/> <h2 className='announcements-main-title'>Announcements</h2></div>
      <div className='main-individual'>
      {announcements.map((announcement) => (
        
          <div className='individual-announcement-display' key={announcement.id}>
            <h3 className='announcement-heading'>{announcement.title} <p className='announcememnt-moment'>{announcement.announcement_time}</p></h3>
            <p className='announcement-description'>{announcement.description}</p>
          </div>
       
      ))}
       </div>
    </div>
  );
};

export default DisplayAnnouncement;
