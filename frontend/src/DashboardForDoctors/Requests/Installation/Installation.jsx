


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Installation.css';
import DoctorSidebar from '../../DoctorSidebar';

const InstallationForm = () => {
  const [equipmentName, setEquipmentName] = useState('');
  const [equipmentType, setEquipmentType] = useState('');
  const [department, setDepartment] = useState('');
  const [model, setModel] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const[manufacturer,setManufacturer]= useState('');
  const [specification, setSpecification] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  const [user, setUser] = useState(() => {
    const storedUserData = localStorage.getItem('userData');
    return storedUserData ? JSON.parse(storedUserData) : null;
  });
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetchInventory();
  }, []); // Fetch inventory on component mount

  const fetchInventory = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/contract/inventory');
      setInventory(response.data);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const handleEquipmentName = (e) => {
    const selectedEquipment = inventory.find(item => item.equipmentName === e.target.value);
    if (selectedEquipment) {
      setEquipmentName(selectedEquipment.equipmentName);
      setModel(selectedEquipment.model);
      setDepartment(selectedEquipment.equipmentDepartment);
      setSerialNumber(selectedEquipment.serialNumber);
      
      setManufacturer(selectedEquipment.manufacturer);
      
    }
  };

  const handleDueDate = (e) => {
    setDueDate(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSpecification = (e) => {
    setSpecification(e.target.value);
  };


  const handleFormSubmit = async () => {
    try {
      if (!equipmentName || !department || !model || !serialNumber || !description||!dueDate) {
        alert('Please fill all mandatory fields!');
      } else {
        const today = new Date();
        const formattedDate = today.toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });

        const formData = {
          equipmentName,
        
          department,
          model,
          manufacturer,
          serialNumber,
          specification,
          dueDate,
          description,
          requestDate: formattedDate,
          requestedBy: `${user.name} ${user.lastName}`,
        };

        await axios.post('http://localhost:7000/api/requestOptions/installation', formData);
        alert('Installation request submitted successfully');

        // Reset form fields after submission
        setEquipmentName('');
        setEquipmentType('');
        setDepartment('');
        setModel('');
        setSerialNumber('');
        setSpecification('');
        setDueDate('');
        setDescription('');
      }
    } catch (error) {
      console.error('Error submitting installation request:', error);
    }
  };

  return (
    <div className="main-installation">
      <div className="installation-title">
        <DoctorSidebar />
        <h2 className="Installation-Page">Installation Request Form</h2>
      </div>
      <div className="installation-formm">
        <div className="individualll">
          <label>Equipment Name*</label>
          <select
            className="installation-inputt"
            required
            value={equipmentName}
            onChange={handleEquipmentName}
          >
            <option value="">Select Equipment</option>
            {inventory.map((item, index) => (
              <option key={index} value={item.equipmentName}>
                {item.equipmentName}
              </option>
            ))}
          </select>
        </div>
        <div className="individualll">
          <label>Department*</label>
          <input
            className="installation-inputt"
            type="text"
            value={department}
            readOnly // Assuming department is not editable
          />
        </div>
        <div className="individualll">
          <label>Model*</label>
          <input
            className="installation-inputt"
            type="text"
            value={model}
            readOnly // Assuming model is not editable
          />
        </div>
        <div className="individualll">
          <label>Serial Number*</label>
          <input
            className="installation-inputt"
            type="text"
            value={serialNumber}
            readOnly // Assuming serial number is not editable
          />
        </div>
        
        <div className="individualll">
          <label>Due Date*</label>
          <input
            className="installation-inputt"
            type="date"
            required
            value={dueDate}
            onChange={handleDueDate}
          />
        </div>
        <div className="individualll">
          <label>Specification</label>
          <input
            className="installation-inputt"
            type="text"
            required
            value={specification}
            onChange={(e) => setSpecification(e.target.value)}
          />
        </div>
        <div className="individualll">
          <label>Description*</label>
          <textarea
            className="installation-description-inputt"
            value={description}
            onChange={handleDescription}
          />
        </div>
      </div>
      <button className="submit-buttonInstallation" onClick={handleFormSubmit}>
        Submit Request
      </button>
    </div>
  );
};

export default InstallationForm;