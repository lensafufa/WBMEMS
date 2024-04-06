import React, { useState } from "react";
import './Procurement.css';
import axios from "axios";
import EngineerSidebar from "../../EngineerSidebar";


const ProcurementFormEngineer = () => {
  const [equipmentName, setEquipmentName] = useState('');
  const [equipmentType, setEquipmentType] = useState('');
  const [department, setDepartment] = useState('');
  const [specification, setSpecification] = useState('');
  const [procurementReason, setProcurementReason] = useState('');
  const [user, setUser] = useState(() => {
    // Retrieve user data from local storage on component mount
    const storedUserData = localStorage.getItem('userData');
    return storedUserData ? JSON.parse(storedUserData) : null;
  });

  const equipmentOptions = [
    'X-ray Machine',
    'Magnetic Resonance Imaging (MRI) Scanner',
    'Computed Tomography (CT) Scanner',
    'Ultrasound Machine',
    'Electrocardiogram (ECG or EKG) Machine',
    'Blood Pressure Monitor',
    'Ventilator',
    'Defibrillator',
    'Infusion Pump',
    'Anesthesia Machine',
    'Patient Monitor',
    'Pulse Oximeter',
    'Electroencephalogram (EEG) Machine',
    'Holter Monitor',
    'Surgical Light',
    'Operating Room Table',
    'Surgical Microscope',
    'Electrosurgical Unit',
    'Centrifuge',
    'Microscope',
    'Autoclave',
    'Blood Analyzer',
    'Wheelchair',
    'Crutches',
    'Walker',
    'Dental Chair',
    'Dental X-ray Machine',
    'Dental Drill',
    'Linear Accelerator (used in Radiation Therapy)',
    'Radiation Therapy Planning System',
    'Blood Glucose Meter',
    'Spirometer',
    'Ambulance Stretcher',
    'Patient Transfer Board',
    'Hospital Bed',
  ];

  const equipmentCategories = [
    'Diagnostic Equipment',
    'Life Support Equipment',
    'Surgical Equipment',
    'Laboratory Equipment',
    'Rehabilitation Equipment',
    'Dental Equipment',
    'Diagnostic Testing Equipment',
    'Patient Transport Equipment',
  ];

  const departments = [
    'Emergency Department (ED)',
    'Medical-Surgical Units',
    'Intensive Care Unit (ICU)',
    'Operating Room (OR)',
    'Labor and Delivery (L&D)',
    'Maternity Ward',
    'Pediatrics ',
    'Radiology Department',
    'Laboratory',
    'Pharmacy',
    'Physical Therapy Department',
    'Occupational Therapy Department',
    'Respiratory Therapy Department',
    'Cardiology Department',
    'Neurology Department',
    'Gastroenterology Department',
    'Endocrinology Department',
  ];
  

  const handleEquipmentName = (e) => {
    setEquipmentName(e.target.value);
  };

  const handleEquipmentType = (e) => {
    setEquipmentType(e.target.value);
  };
  
  const handleDepartment = (e) => {
    setDepartment(e.target.value);
  };


  const handleSpecification = (e) => {
    setSpecification(e.target.value);
  };

  const handleProcurementReason = (e) => {
    setProcurementReason(e.target.value);
  };

  const handleFormSubmit = async () => {
    try {
      if (!equipmentName || !procurementReason||
          !equipmentType||
          !department||
          !specification) {
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
          equipmentType,
          department,
          specification,
          procurementReason,
          requestDate: formattedDate,
          requestedBy:`${user.name} ${user.lastName}`,
        
        };

        await axios.post('http://localhost:7000/api/requestOptions/procurement', formData);
        alert('Procurement request submitted successfully');

        setEquipmentName('');
        setEquipmentType('');
        setDepartment('');
        setSpecification('');
        setProcurementReason('');
      }
    } catch (error) {
      console.error('Error submitting procurement request:', error);
    }
  };

  return (
    
      <div className="main-procurement-requestt">
        <div className="procurement-title"><EngineerSidebar /><h2 className="Procurement-Page">Procurement Request Form</h2></div>
        <div className="procurement-formmm">
        <div className="individuallll">
          <label className="procurement-form-labell">Equipment Name*</label>
          <select
            className="procurement-inputt"
            required
            value={equipmentName}
            onChange={handleEquipmentName}
          >
            <option value="">Select Equipment</option>
        {equipmentOptions.map((equipment, index) => (
          <option key={index} value={equipment}>
            {equipment}
          </option>
        ))}
          </select>
        </div>
              
        <div className="individuallll">
          <label className="procurement-form-labell">Equipment Type*</label>
          <select
            className="procurement-inputt"
            required
            value={equipmentType}
            onChange={handleEquipmentType}
          >
             <option value="">Select Equipment Type</option>
            {equipmentCategories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
          </select>
        </div>
          
          <div className="individuallll">
          <label className="procurement-form-labell">Department*</label>
          <select
            className="procurement-inputt"
            required
            value={department}
            onChange={handleDepartment}
          >
            <option value="">Select department</option>
        {departments.map((department, index) => (
          <option key={index} value={department}>
            {department}
          </option>
        ))}
          </select>
        </div>
        <div className="individuallll">
            <label className="procurement-form-labell">Specification</label>
            <textarea
              className="procurement-description-inputt"
              value={specification}
              onChange={handleSpecification}
            />
          </div>  
        <div className="individuallll">
            <label className="procurement-form-labell">Procurement Reason*</label>
            <textarea
              className="procurement-description-inputt"
              required
              value={procurementReason}
              onChange={handleProcurementReason}
            />
          </div>

          
        </div>
    
        <button className="submit-buttonProcurement" onClick={handleFormSubmit}>
          Submit Request
        </button>
    
      </div>
    
    
  );
};

export default ProcurementFormEngineer;