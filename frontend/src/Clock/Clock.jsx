import React, { useState, useEffect } from 'react';
import './Clock.css';
import { MdAccessTime } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";



const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (time) => {
    return time.toLocaleTimeString();
  };

  return (
    <div>
      <h2 className='current-time'><MdAccessTime className='the-clock'/>{formatTime(currentTime)}</h2>
      <h2 className='current-date'><CiCalendarDate className='the-clock'/>{formatDate(currentTime)}</h2>
    </div>
  );
};

export default Clock;
