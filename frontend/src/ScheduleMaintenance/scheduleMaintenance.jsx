import React, { useState, useEffect } from "react";
import axios from "axios";
import Home from '../pages/Home/Home';
import './ScheduleMaintenance.css';

const ScheduleMaintenanceForm = () => {
  const [equipmentName, setEquipmentName] = useState('');
  const [equipmentModel, setEquipmentModel] = useState('');
  const [department, setDepartment] = useState('');
  const [title, setTitle] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const [eventDate, setEventDate] = useState('');
  const [inventoryData, setInventoryData] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(() => {
    const storedUserData = localStorage.getItem('userData');
    return storedUserData ? JSON.parse(storedUserData) : null;
  });

  useEffect(() => {
    fetchInventoryData();
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/requestOptions/users');
      const modifiedUsers = response.data.map(user => ({
        ...user,
        fullName: `${user.name} ${user.lastName}`
      }));

      setUsers(modifiedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchInventoryData = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/contract/inventory');
      setInventoryData(response.data);
    } catch (error) {
      console.error('Error fetching inventory data:', error);
    }
  };

  const handleEquipmentName = (e) => {
    const selectedEquipment = inventoryData.find(item => item.equipmentName === e.target.value);
    if (selectedEquipment) {
      setEquipmentName(selectedEquipment.equipmentName);
      setEquipmentModel(selectedEquipment.model);
      setDepartment(selectedEquipment.equipmentDepartment);
    }
  };

  const handleEventDate = (e) => {
    setEventDate(e.target.value);
  };

  const handleFormSubmit = async () => {
    try {
      if (!equipmentName || !eventDate || !equipmentModel || !department || !title || !assignedTo) {
        alert('Please fill all mandatory fields!');
      } else {
        const formData = {
          equipmentName,
          equipmentModel,
          department,
          eventDate,
          title,
          assignedTo,
          
        };

        await axios.post('http://localhost:7000/api/requestOptions/calendarEvent', formData);
        alert('Work Schedule submitted successfully');

        setEquipmentName('');
        setEquipmentModel('');
        setDepartment('');
        setEventDate('');
        setTitle('');
        setAssignedTo('');
      }
    } catch (error) {
      console.error('Error submitting calendar request:', error);
    }
  };

  return (
    <div className="main-maintenance-request">
      <div className="maintenance-title">
        <Home />
        <h2 className="Maintenance-Page">Work Scheduler Form</h2>
      </div>
      <div className="maintenance-form-request">
        <div className="individual">
          <label>Title*</label>
          <input
            className="maintenance-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="individual">
          <label>Assigned To*</label>
          <select
            className="maintenance-input"
            required
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          >
            <option value="">Select User</option>
            {users.map((user, index) => (
              <option key={index} value={user.fullName}>
                {user.fullName}
              </option>
            ))}
          </select>
        </div>
        <div className="individual">
          <label>Equipment Name*</label>
          <select
            className="maintenance-input"
            required
            value={equipmentName}
            onChange={handleEquipmentName}
          >
            <option value="">Select Equipment</option>
            {inventoryData.map((equipment, index) => (
              <option key={index} value={equipment.equipmentName}>
                {equipment.equipmentName}
              </option>
            ))}
          </select>
        </div>
        <div className="individual">
          <label>Equipment Model*</label>
          <input
            className="maintenance-input"
            type="text"
            value={equipmentModel}
            onChange={() => {}} // This field is readonly
            readOnly
          />
        </div>
        <div className="individual">
          <label>Department*</label>
          <input
            className="maintenance-input"
            type="text"
            value={department}
            onChange={() => {}} // This field is readonly
            readOnly
          />
        </div>
        <div className="individual">
          <label>Event Date*</label>
          <input
            className="maintenance-input"
            type="date"
            required
            value={eventDate}
            onChange={handleEventDate}
          />
        </div>
      </div>
      <div>
        <button className="submit-buttonMaintenance" onClick={handleFormSubmit}>
          Submit Request
        </button>
      </div>
    </div>
  );
};

export default ScheduleMaintenanceForm;
