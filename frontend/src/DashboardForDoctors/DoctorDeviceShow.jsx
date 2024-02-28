import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DoctorDeviceShow.css';
import DoctorSidebar from './DoctorSidebar';

const DoctorDeviceShow = () => {
  const [deviceOverview, setdeviceOverview] = useState([]);

  useEffect(() => {
    fetchDeviceOverview();
  }, []);

  const fetchDeviceOverview = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/deviceRegistration');
      if (response.status === 200) {
        const deviceInformation = response.data.map(device => ({
          id: device.id,
          equipmentName: device.equipmentName,
          model: device.model,
          manufacturer: device.manufacturer,
          equipmentImage: device.equipmentImage, // Assuming you have a field named 'profilePicture' in your user object
        }));
        setdeviceOverview(deviceInformation.reverse());
      } else {
        throw new Error('Failed to fetch devices');
      }
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  };

  return ( 
  <div className='grand-device'>
    <div className='device-main'><div><DoctorSidebar/></div><h2 >Device Information</h2></div>
      <div className='device-table'>
        {deviceOverview.map((device) => (
          <div className='individual-device' key={device.id}>
            <div className='device-profile-picture'>
              <img className='device-image' src={`http://localhost:7000/${device.equipmentImage}`} alt='Profile' />
            </div>
            <div className='device-description'>
              <p className='device-name'>{device.equipmentName} </p>
              <p className='device-model'>{device.model}</p>
              <p className='device-manufacturer'>{device.manufacturer}</p>
              <button className='dispose-button'>Dispose</button>
            </div> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorDeviceShow;
