import React, { useState } from "react";
import './Inventory.css';
import axios from "axios";
import Home from '../Home/Home';
import { TiDeviceDesktop } from "react-icons/ti";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";

const Inventory = () => {
  const [equipmentName, setEquipmentName] = useState('');
  const [model, setModel] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [equipmentDepartment, setEquipmentDepartment] = useState('');
  const [equipmentDescription, setEquipmentDescription] = useState('');
  const [maintenanceHistory, setMaintenanceHistory] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [countryOfOrigin, setCountryOfOrigin] = useState('');
  const [warrantyExpiryDate, setWarrantyExpiryDate] = useState('');
  const [equipmentImage, setEquipmentImage] = useState(null);
  

  const handleEquipmentName = (e) => {
    setEquipmentName(e.target.value);
  };
  const handleModel = (e) => {
    setModel(e.target.value);
  };
  const handleSerialNumber = (e) => {
    setSerialNumber(e.target.value);
  };
  const handleEquipmentDepartment = (e) => {
    setEquipmentDepartment(e.target.value);
  };
  const handleEquipmentDescription = (e) => {
    setEquipmentDescription(e.target.value);
  };
  const handleMaintenanceHistory = (e) => {
    setMaintenanceHistory(e.target.value);
  };
  const handleManufacturer = (e) => {
    setManufacturer(e.target.value);
  };
  const handleCountryOfOrigin = (e) => {
    setCountryOfOrigin(e.target.value);
  };
  const handleWarrantyExpiryDate = (e) => {
    setWarrantyExpiryDate(e.target.value);
  };
  const handleEquipmentImage = (e) => {
    setEquipmentImage(e.target.files[0]);
  };

  const handleFormSubmit = async () => {
    try {
          if(!equipmentName || !model || !serialNumber
            || !equipmentDepartment || !equipmentDescription
            || !manufacturer || !countryOfOrigin || !warrantyExpiryDate || !equipmentImage){
              alert('Please fill all fields!')
            }else{
              const formData = new FormData();
      equipmentName,model,serialNumber,equipmentDepartment, equipmentDescription, manufacturer, countryOfOrigin,warrantyExpiryDate,equipmentImage
      formData.append('equipmentName', equipmentName);
      formData.append('model', model);
      formData.append('serialNumber', serialNumber);
      formData.append('equipmentDepartment', equipmentDepartment);
      formData.append('equipmentDescription', equipmentDescription);
      formData.append('maintenanceHistory', maintenanceHistory);
      formData.append('manufacturer', manufacturer);
      formData.append('countryOfOrigin', countryOfOrigin);
      formData.append('warrantyExpiryDate', warrantyExpiryDate);
      formData.append('equipmentImage', equipmentImage);

      await axios.post('http://localhost:7000/api/deviceRegistration', formData,{
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to multipart form data
        },
      });
      alert('Equipment registered successfully');
      
      setEquipmentName(''),
      setModel(''),
      setSerialNumber(''),
      setEquipmentDepartment(''),
      setEquipmentDescription(''),
      setMaintenanceHistory(''),
      setManufacturer(''),
      setCountryOfOrigin(''),
      setWarrantyExpiryDate(''),
      setWarrantyExpiryDate('')
  }
 
          
    } catch (error) {
      console.error('Error registering equipment:', error);
    }
  };

  return (
    <div className="grand-page">
      <div className="main-inventory">
        <div className="inventory-title"><Home/><h2 className="Inventory-Page">Inventory Page</h2></div>
        <div className="inventory">
          <div className="individual">
            <label className="first-label">Equipment Name*</label>
            <input
              className="inventory-input"
              type="text"
              required
              value={equipmentName}
              onChange={handleEquipmentName}
            />
          </div>
          <div className="individual">
            <label>Model*</label>
            <input
              className="inventory-input"
              type="text"
              required
              value={model}
              onChange={handleModel}
            />
          </div>
          <div className="individual">
            <label>Serial Number*</label>
            <input
              className="inventory-input"
              type="text"
              required
              value={serialNumber}
              onChange={handleSerialNumber}
            />
          </div>
          <div className="individual">
            <label>Equipment Department*</label>
              <select className="inventory-input" required type='text' value={equipmentDepartment} onChange={handleEquipmentDepartment}>
                  <option value="">Select Department</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Obstetrics and Gynecology">Obstetrics and Gynecology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Radiology">Radiology</option>
                  <option value="Laboratory">Laboratory</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Oncology">Oncology</option>
                  <option value="Dietary/Nutrition">Dietary/Nutrition</option>
                  <option value="Administration/Management">Administration/Management</option>
                  <option value="Physical Therapy">Physical Therapy</option>
                  <option value="Psychiatry">Psychiatry</option>
              </select>
          </div>
          <div className="individual">
            <label>Equipment Description*</label>
            <textarea
              className="inventory-description-input"
              value={equipmentDescription}
              required
              onChange={handleEquipmentDescription}
            ></textarea>
          </div>
          <div className="individual">
            <label>Maintenance History*</label>
            <textarea
              className="inventory-description-input"
              value={maintenanceHistory}
              onChange={handleMaintenanceHistory}
            ></textarea>
          </div>
          <div className="individual">
            <label>Manufacturer*</label>
            <input
              className="inventory-input"
              type="text"
              required
              value={manufacturer}
              onChange={handleManufacturer}
            />
          </div>
          <div className="individual">
            <label>Country of Origin*</label>
            <input
              className="inventory-input"
              type="text"
              required
              value={countryOfOrigin}
              onChange={handleCountryOfOrigin}
            />
          </div>
          <div className="individual">
            <label>Warranty Expiry Date*</label>
            <input
              className="inventory-input"
              type="date"
              required
              value={warrantyExpiryDate}
              onChange={handleWarrantyExpiryDate}
            />
          </div>
          <div className="individual">
            <label>Equipment Image*</label>
            <input
              className="inventory-input"
              type="file"
              required
              onChange={handleEquipmentImage}
            />
          </div>
          
        </div>
        <button className="register-button" onClick={handleFormSubmit}>Register</button>
      
      </div>

      <div className="inventory-bottom-bar">
          <h1 className="inventory-computer-and-title">
            <TiDeviceDesktop className="computer-icon" />
            MDMiS for your company</h1>
            <div className="inventory-bottom-bar-icons">
              <div className="adresses"><FaLinkedin className="address-icon"/>Linked In</div>
              <div className="adresses"><FaSquareFacebook className="address-icon"/>Facebook</div>
              <div className="adresses"><FaInstagramSquare className="address-icon"/>Instagram</div>
            </div>
        </div>



    </div>
  );
};

export default Inventory;
