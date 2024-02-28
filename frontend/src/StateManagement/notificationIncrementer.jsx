// NotificationIncrementer.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { incrementNotificationCount } from './actions/notificationActions';

const NotificationIncrementer = () => {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(incrementNotificationCount());
  };

  return (
    <button onClick={handleIncrement}>Increment Notification</button>
  );
};

export default NotificationIncrementer;
