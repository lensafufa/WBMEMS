// NotificationDisplay.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { incrementNotificationCount } from '../StateManagement/actions/notificationActions';

const NotificationDisplay = () => {
  const notificationCount = useSelector(state => state.notification.count);

  return (
    <div>
      Notification Count: {notificationCount}
    </div>
  );
};

export default NotificationDisplay;
