import axios from "axios";
import React, { useEffect, useState } from "react";
import './Training.css';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { IoSearchSharp } from "react-icons/io5";
import AdminstratorHome from "../SidebarAdmin";


const AdminTrainingManagement = () => {
    const [handleTraining, setHandleTraining] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [showAllColumns, setShowAllColumns] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTraining, setSelectedTraining] = useState(null);
    const [showTrainingForm, setShowTrainingForm] = useState(false);
    
    const [formData, setFormData] = useState({
      trainingName: '',
      equipmentName: '',
      model: '',
      department: '',
      length: '',
      startDate: '',
      endDate: '',
      trainingType: '',
      trainingLevel: '',
      location: '',
      trainer: '',
      trainee: '',
    });
    

    useEffect(() => {
      fetchInventory();
      defaultTrainingList();
      console.log('the inventory schema',inventory)
  }, []);

  const fetchInventory = async () => {
    try {
        const response = await axios.get('http://localhost:7000/api/contract/inventory');
        setInventory(response.data);
        console.log('inventory data',response.data)
    } catch (error) {
        console.error('Error fetching inventory:', error);
    }
  };
  const handleEquipmentName = (e) => {
    const selectedEquipment = inventory.find(item => item.equipmentName === e.target.value);
    if (selectedEquipment) {
      setFormData({
        ...formData,
        equipmentName: selectedEquipment.equipmentName,
        model: selectedEquipment.model,
        department: selectedEquipment.equipmentDepartment
      });
    }
  };
  

    const handleAddTrainingClick = () => {
      setShowTrainingForm(true);
  };

  const handleCloseTrainingForm = () => {
      setShowTrainingForm(false);
  };
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const equipments = [...formData.equipments];
    equipments[index][name] = value;
    setFormData({ ...formData, equipments });
  };

  

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format start date and end date
    const formattedStartDate = new Date(formData.startDate).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    });

    const formattedEndDate = new Date(formData.endDate).toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    });

    // Update formData with formatted dates
    const updatedFormData = {
        ...formData,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
    };
    const validateForm = () => {
        // Check if any required fields are empty
        if (
          !formData.trainingName ||
          !formData.equipmentName ||
          !formData.length ||
          !formData.startDate ||
          !formData.endDate ||
          !formData.trainingType ||
          !formData.trainingLevel ||
          !formData.location ||
          !formData.trainer ||
          !formData.trainee
        ) {
          // If any required field is empty, return false
          console.log('Please fill in all required fields.');
          return false;
        }
        
        // If all required fields are filled, return true
        return true;
      };
      
    // Perform training-form validation
    if (!validateForm()) {
        return;
    }

    try {
        // Call the API endpoint to submit the training-form data with updated formData
        const response = await axios.post('http://localhost:7000/api/contract/training', updatedFormData);

        // Handle the response
        console.log('Form submitted successfully:', response.data);

        // Reset the form data after successful submission
        setFormData({
            trainingName: '',
            equipmentName: '',
            model: '',
            department: '',
            length: '',
            startDate: '',
            endDate: '',
            trainingType: '',
            trainingLevel: '',
            location: '',
            trainer: '',
            trainee: '',
        });

        // Close the training form after submission
        setShowTrainingForm(false);

        // Refresh the training list
        defaultTrainingList();
    } catch (error) {
        console.error('Error submitting form:', error);
    }
};


const defaultTrainingList = async () => {
  try {
    const response = await axios.get('http://localhost:7000/api/contract/training');
    
    // Reverse the response data array
    const reversedTrainings = response.data.reverse();
    
    // Update state with the formatted data
    setHandleTraining(reversedTrainings);
    console.log('received:',reversedTrainings );
  } catch (error) {
    console.error('error fetching the training', error);
  }
}




    const formatColumnName = (columnName) => {
        return columnName.replace(/([a-z])([A-Z])/g, '$1 $2').charAt(0).toUpperCase() + columnName.slice(1);
    };

    const handleExportCSV = () => {
      const dataToExport = searchQuery ? filteredTraining : handleTraining;
  
      // Extract column names
      const columnsToExport = Object.keys(dataToExport[0]);
  
      // Prepare CSV data
      const csvData = dataToExport.map((row) => columnsToExport.map((col) => row[col] !== null ? row[col] : 'null'));
  
      // Prepare CSV headers
      const csvHeaders = columnsToExport.map((col) => formatColumnName(col));
  
      // Combine headers and data
      const csvArray = [csvHeaders, ...csvData];
  
      // Convert CSV array to CSV content
      const csvContent = csvArray.map((row) => row.join(',')).join('\n');
  
      // Create a Blob with CSV content
      const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
      // Create a URL for the Blob
      const csvUrl = URL.createObjectURL(csvBlob);
  
      // Create a link element to trigger download
      const link = document.createElement('a');
      link.href = csvUrl;
      link.setAttribute('download', 'training_data.csv');
  
      // Append link to document and trigger click event
      document.body.appendChild(link);
      link.click();
  
      // Clean up
      document.body.removeChild(link);
  };
  
  const desiredColumns = ['equipmentName', 'model', 'startDate', 'endDate', 'trainingType', 'location'];

  const handleExportPDF = () => {
    const pdf = new jsPDF();
    const dataToExport = searchQuery ? filteredTraining : handleTraining;

    const tableData = dataToExport.map((row) =>
        Object.values(row).map((value) => (value !== null ? value.toString() : 'null'))
    );

    pdf.autoTable({
        head: [Object.keys(dataToExport[0]).map(col => formatColumnName(col))],
        body: tableData,
    });

    pdf.save('training_data.pdf');
};


    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleDetailClick = (training) => {
        setSelectedTraining(training);
    };

    const filteredTraining = handleTraining.filter((training) => {
        const searchString = searchQuery.toLowerCase();
        return Object.values(training).some((value) =>
            value !== null && value.toString().toLowerCase().includes(searchString)
        );
    });

    const handleClose = () => {
      setSelectedTraining(null);
  };


  return (
    <div className="training-container">
      <div className="training-home-and-sort-title">
        <AdminstratorHome />
        <h2>Training Management</h2>
      </div>
      <div className="training-search-and-export">
        <div className="training-export-buttons">
          <button className="export-btn-csv" onClick={handleExportCSV}>Export to CSV</button>
          <button className="export-btn-pdf" onClick={handleExportPDF}>Export to PDF</button>
        </div>
        <div className="search-container">
          <IoSearchSharp className="search-icon1" />
          <input
            id="searchInput"
            className="training-search-input"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>
      <button className="add-training-btn" onClick={handleAddTrainingClick}>Add New Training</button>
      
      {showTrainingForm ? (
        <div className="training-form-container">
        <div className="training-form-title">Training Event Form</div>
        <div className="training-form-group-main" >
            <div className="training-form-group">
                <label className="training-training-form-label">Training Name:</label>
                <input
                    type="text"
                    id="trainingName"
                    name="trainingName"
                    value={formData.trainingName}
                    onChange={(e) => setFormData({ ...formData, trainingName: e.target.value })}
                    required
                    className="training-form-input"
                />
            </div>
            <div className="training-form-group">
            <label className="training-training-form-label">Equipment Name*</label>
                <select
                    className="training-form-input"
                    required
                    value={formData.equipmentName}
                    onChange={ handleEquipmentName}
                    
                >
            <option value="">Select Equipment</option>
            {inventory.map((item, index) => (
              <option key={index} value={item.equipmentName}>
                {item.equipmentName}
              </option>
            ))}
          </select>
            </div>
            <div className="training-form-group">
            <label className="training-training-form-label">Equipment Model*</label>
                <input
                    className="training-form-input"
                    type="text"
                    value={formData.model}
                    onChange={() => {}} // Equipment model is populated based on selected equipment
                    readOnly // Assuming equipment model is not editable
                />    
            </div>
            <div className="training-form-group">
                    <label>Department*</label>
                        <input
                            className="training-form-input"
                            type="text"
                            value={formData.department}
                            onChange={() => {}} // Department is populated based on selected equipment
                            readOnly // Assuming department is not editable
                        />
            </div>
            <div className="training-form-group">
                <label htmlFor="length">Length:</label>
                <input
                    className="training-form-input"
                    type="text"
                    id="length"
                    name="length"
                    value={formData.length}
                    onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                    required

                />
            </div>
            <div className="training-form-group">
            <label htmlFor="startDate">Start Date:</label>
                <input
                    className="training-form-input"
                    type="date" 
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                />
            </div>
            <div className="training-form-group">
            <label htmlFor="endDate">End Date:</label>
                <input
                    className="training-form-input"
                    type="date" 
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    required
                />
            </div>
            <div className="training-form-group">
                <label htmlFor="trainingType">Training Type:</label>
                <select
                    className="training-form-input"
                    id="trainingType"
                    name="trainingType"
                    value={formData.trainingType}
                    onChange={(e) => setFormData({ ...formData, trainingType: e.target.value })}
                    required
                >
                    <option value="">Select Training Type</option>
                    <option value="End user training">End User Training</option>
                    <option value="Technical personnel training">Technical Personnel Training</option>
                </select>
            </div>
            <div className="training-form-group">
                <label htmlFor="trainingLevel">Training Level:</label>
                <select
                    className="training-form-input"
                    id="trainingLevel"
                    name="trainingLevel"
                    value={formData.trainingLevel}
                    onChange={(e) => setFormData({ ...formData, trainingLevel: e.target.value })}
                    required
                >
                    <option value="">Select Training Level</option>
                    <option value="Basic">Basic</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Refreshment">Refreshment</option>
                </select>
            </div>
            <div className="training-form-group">
                
                <label htmlFor="location">Location:</label>
                <input
                    className="training-form-input"
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                />
            </div>
            <div className="training-form-group">
                <label htmlFor="trainer">Trainer:</label>
                <input
                    className="training-form-input"
                    type="text"
                    id="trainer"
                    name="trainer"
                    value={formData.trainer}
                    onChange={(e) => setFormData({ ...formData, trainer: e.target.value })}
                    required
                />
            </div>
            <div className="training-form-group">
                <label htmlFor="trainee">Trainee:</label>
                <input
                    className="training-form-input"
                    type="text"
                    id="trainee"
                    name="trainee"
                    value={formData.trainee}
                    onChange={(e) => setFormData({ ...formData, trainee: e.target.value })}
                    required
                />
            </div>
        </div>
        <button type="button" className="add-btn" onClick={handleSubmit}>Add Training</button>
        <button type="button" className="cancel-btn" onClick={handleCloseTrainingForm}>Cancel</button>
    </div>
    
      ) : null}
      <div className="training-table-container">
      <table className="main-training-management-table">
                <thead>
                    <tr>
                        <th className="training-management-thead">Training </th>
                        <th className="training-management-thead">Equipment </th>
                        <th className="training-management-thead">Location</th>
                        <th className="training-management-thead">Department</th>
                        <th className="training-management-thead">Length</th>
                        <th className="training-management-thead">Start Date</th>
                        <th className="training-management-thead">End Date</th>
                        <th className="training-management-thead">Training Type</th>
                        <th className="training-management-thead">Training Level</th>
                        <th className="training-management-thead">Details</th>

                    </tr>
                </thead>
                <tbody>
                    {filteredTraining.map((training) => (
                        <tr key={training.id}>
                            <td className="training-management-table-fields">{training.trainingName}</td>
                            <td className="training-management-table-fields">{training.equipmentName}</td>
                            <td className="training-management-table-fields">{training.location}</td>
                            <td className="training-management-table-fields">{training.department}</td>
                            <td className="training-management-table-fields">{training.length}</td>
                            <td className="training-management-table-fields">{new Date(training.startDate).toLocaleString('en-US', {
                                                  year: 'numeric',
                                                  month: '2-digit',
                                                  day: '2-digit',
                                                  hour: '2-digit',
                                                  minute: '2-digit',
                                                  second: '2-digit',
                                                  hour12: true,
                            })}
                            
                            </td>
                            <td className="training-management-table-fields">{new Date(training.endDate).toLocaleString('en-US', {
                                                  year: 'numeric',
                                                  month: '2-digit',
                                                  day: '2-digit',
                                                  hour: '2-digit',
                                                  minute: '2-digit',
                                                  second: '2-digit',
                                                  hour12: true,
                            })}
                            
                            
                            
                            </td>
                            <td className="training-management-table-fields">{training.trainingType}</td>
                            <td className="training-management-table-fields">{training.trainingLevel}</td>
                            <td className="training-management-table-fields"><button className="training-detail-button" onClick={() => handleDetailClick(training)}>Detail</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedTraining && (
                <div className='detailed-view-1-Training-detail'>
                    <div className='detail-description-detailed-Training-detail'>
                      <div className="Training-agreement-detail">Training Agreement Detail</div>
                        <div className='device-description-detailed-Training-detail'>
                            
                                {Object.entries(selectedTraining).map(([columnName, value]) => {
                                    if (columnName !== 'id' && columnName !== 'createdAt' && columnName !== 'updatedAt') {
                                        if (value != null) {
                                            const formattedColumnName = columnName.charAt(0).toUpperCase() + columnName.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2');


                                                return (
                                                <div className="sort-by-Training-detail" key={columnName}>
                                                    <div className="columnName-Training-detail">{formattedColumnName}</div>
                                                    <div className='columnValue-Training-detail'>{value}</div>
                                                </div>
                                                );
                                        }
                                    }
                                    return null;
                                })}

                                                            
                                           </div>
                                        <button onClick={handleClose} className='detail-close-button-Training-detail'>Close</button>
                                      </div>
                                   </div>
            )}
      </div>
    </div>
  );
      };
  export default AdminTrainingManagement; 