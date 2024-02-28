import React, { useState, useEffect } from 'react';
import './WorkOrder.css';
import { colors } from '@mui/material';
import Home from '../pages/home/Home';


const DynamicTableWithMultipleDateTime = () => {
  const [data, setData] = useState([
    { id: 1, number: '', deviceName: '', serialNumber: '', department: '', problemStatement: '', assignEngineer: '' },
  ]);

  const [submissionInfo, setSubmissionInfo] = useState([{ id: 1, submissionDateTime: null }]);

  const handleInputChange = (e, id, field) => {
    const newData = data.map((row) => {
      if (row.id === id) {
        return { ...row, [field]: e.target.value };
      }
      return row;
    });
    setData(newData);
  };

  const handleAddRow = () => {
    const newRow = {
      id: data.length + 1,
      number: '',
      deviceName: '',
      serialNumber: '',
      department: '',
      problemStatement: '',
      assignEngineer: '',
    };
    setData([...data, newRow]);
    setSubmissionInfo([...submissionInfo, { id: newRow.id, submissionDateTime: null }]);
  };

  const isFormValid = (rowData) => {
  // Check if any required field is empty
  return (
    rowData.deviceName !== '' &&
    rowData.serialNumber !== '' &&
    rowData.department !== '' &&
    rowData.problemStatement !== '' &&
    rowData.assignEngineer !== ''
  );
};


  const handleSubmit = (id) => {
    // Handle the submitted data for the specific row with id
    const rowData = data.find((row) => row.id === id);

    // Check if all required fields are filled
    if (isFormValid(rowData)) {
      // Continue with submission logic

      // Check if submissionDateTime is not already set
      const submissionInfoIndex = submissionInfo.findIndex((info) => info.id === id);

      if (submissionInfoIndex !== -1 && !submissionInfo[submissionInfoIndex].submissionDateTime) {
        // Get current date and time
        const submissionDateTime = new Date().toLocaleString();

        // Update submission info for the specific row
        const newSubmissionInfo = [...submissionInfo];
        newSubmissionInfo[submissionInfoIndex] = { id, submissionDateTime };

        // Update state with the new submission info
        setSubmissionInfo(newSubmissionInfo);
      }
    } else {
      // Display a warning if any required field is empty
      alert('Please provide all the necessary information before sending the order.');
    }
  };

  const handleDeleteRow = (id) => {
    if (data.length === 1) {
      // If there is only one row, clear the information but keep the row
      const newData = [{ ...data[0], deviceName: '', serialNumber: '', department: '', problemStatement: '', assignEngineer: '' }];
      setData(newData);
      setSubmissionInfo([{ id: newData[0].id, submissionDateTime: null }]);
    } else {
      // If there are multiple rows, remove the entire row
      const newData = data.filter((row) => row.id !== id);
      const newSubmissionInfo = submissionInfo.filter((info) => info.id !== id);
      setData(newData);
      setSubmissionInfo(newSubmissionInfo);
    }
  };

  useEffect(() => {
    // Ensure there is an entry for the first row in submissionInfo
    if (data.length > 0 && submissionInfo.length === 0) {
      setSubmissionInfo([{ id: data[0].id, submissionDateTime: null }]);
    }
  }, [data, submissionInfo]);

  return (
    <div className='main-order'>
      <div className='table-content'>
      <div  className='workorderform'><Home/> <h1>Work Order Form</h1></div>
      <table className='main-table'>
        <thead>
          <tr>
            <th>N0</th>
            <th>Name of the Device</th>
            <th >Serial Number</th>
            <th >Department</th>
            <th >Problem Statement</th>
            <th >Assign Engineer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>
                <input
                  className='cell'
                  type="text"
                  value={row.deviceName}
                  onChange={(e) => handleInputChange(e, row.id, 'deviceName')}
                />
              </td>
              <td>
                <input
                  className='cell'
                  type="text"
                  value={row.serialNumber}
                  onChange={(e) => handleInputChange(e, row.id, 'serialNumber')}
                />
              </td>
              <td>
                <select
                  className='cell'
                  value={row.department}
                  onChange={(e) => handleInputChange(e, row.id, 'department')}
                >
                  <option value="">Select Department</option>
                  <option value="option1">Emergency</option>
                  <option value="option2">Pediatrics</option>
                  <option value="option3">Obstetrics and Gynecology</option>
                  <option value="option4">Orthopedics</option>
                  <option value="option5">Cardiology</option>
                  <option value="option6">Neurology</option>
                  <option value="option7">Radiology</option>
                  <option value="option8">Laboratory</option>
                  <option value="option9">Pharmacy</option>
                  <option value="option10">Oncology </option>
                  <option value="option11">Dietary/Nutrition</option>
                  <option value="option12">Administration/Management</option>
                  <option value="option13">Physical Therapy </option>
                  <option value="option14">Psychiatry </option>
                </select>
              </td>
              <td>
                <input
                  className='cell'
                  type="text"
                  value={row.problemStatement}
                  onChange={(e) => handleInputChange(e, row.id, 'problemStatement')}
                />
              </td>
              <td>
                <select
                  className='cell'
                  value={row.assignEngineer}
                  onChange={(e) => handleInputChange(e, row.id, 'assignEngineer')}
                >
                  <option value="">Select Engineer</option>
                  <option value="option1">Natenael Abreham</option>
                  <option value="option2">Lewi Tadesse</option>
                  <option value="option3">Bezawit Alem</option>
                  <option value="option4">Kebrom Pawlos</option>
                </select>
              </td>
              <td>
                <button className='workorder-button' onClick={() => handleSubmit(row.id)}>
                  Send Order
                </button>
                <button className='delate-button' onClick={() => handleDeleteRow(row.id)}>
                  Delete
                </button>
                {submissionInfo.map((info) => (
                  info.id === row.id && (
                    <span className='date-and-time' key={info.id}>{` ${info.submissionDateTime}`}</span>
                  )
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className='workorder-button' onClick={handleAddRow}>
        Add New
      </button>
      </div>
    </div>
  );
};

export default DynamicTableWithMultipleDateTime;
