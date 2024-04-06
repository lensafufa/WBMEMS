
import axios from "axios";
import React, { useEffect, useState } from "react";
import './Contract.css';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { IoSearchSharp } from "react-icons/io5";
import AdminstratorHome from "../SidebarAdmin";


const Contract = () => {
    const [handleContract, setHandleContract] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [showAllColumns, setShowAllColumns] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedContract, setSelectedContract] = useState(null);
    const [showContractForm, setShowContractForm] = useState(false);
    const [formData, setFormData] = useState({
      healthcareFacility: '',
      supplierManufacturer: '',
      supplierManufacturerAddress: '',
      supplierManufacturerPhone: '',
      supplierManufacturerEmail: '',
      agreementDate: '',
      supplierContact: '',
      equipmentName: "",
      equipmentModel: "",
      contractDuration: '',
      terminationConditions: '',
      serviceLevelExpectations: '',
      performanceMetrics: '',
      costBreakdown: '',
      paymentSchedule: '',
      paymentTerms: '',
      warrantyTerms: '',
      liabilityLimitations: '',
      defectHandlingProcedures: '',
      contractExpiryDate: '', // New field for contract expiration date
    });
    

    useEffect(() => {
      fetchInventory();
      defaultContractList();
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


    const handleAddContractClick = () => {
      setShowContractForm(true);
  };

  const handleCloseContractForm = () => {
      setShowContractForm(false);
  };
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const equipments = [...formData.equipments];
    equipments[index][name] = value;
    setFormData({ ...formData, equipments });
  };

  

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform contract-form validation
    if (!validateForm()) {
        return;
    }
    
       

    try {
        // Call the API endpoint to submit the contract-form data
        const response = await axios.post('http://localhost:7000/api/contract', formData);

        // Handle the response
        console.log('Form submitted successfully:', response.data);
        
        // Reset the form data after successful submission
        setFormData({
            healthcareFacility: '',
            supplierManufacturer: '',
            supplierManufacturerAddress: '',
            supplierManufacturerPhone: '',
            supplierManufacturerEmail: '',
            agreementDate: '',
            supplierContact: '',
            equipmentsName:'',
            equipmentModel:'',
            contractDuration: '',
            terminationConditions: '',
            serviceLevelExpectations: '',
            performanceMetrics: '',
            costBreakdown: '',
            paymentSchedule: '',
            paymentTerms: '',
            warrantyTerms: '',
            liabilityLimitations: '',
            defectHandlingProcedures: '',
            contractExpiryDate:'',
        });

        // Close the contract form after submission
        setShowContractForm(false);

        // Refresh the contract list
        defaultContractList();
    } catch (error) {
        console.error('Error submitting form:', error);
    }
};

const validateForm = () => {
    // Perform form validation here
    // Return true if form is valid, false otherwise
    // Example: Check if required fields are filled
    if (!formData.healthcareFacility || !formData.supplierManufacturer || !formData.agreementDate) {
        alert('Please fill in all required fields.');
        return false;
    }

    // Add more validation rules as needed

    return true;
};


const defaultContractList = async () => {
  try {
    const response = await axios.get('http://localhost:7000/api/contract');
    
    // Reverse the response data array
    const reversedContracts = response.data.reverse();
    
    // Format the equipments array for display
    
    
    // Update state with the formatted data
    setHandleContract(reversedContracts);
    console.log('received:',reversedContracts );
  } catch (error) {
    console.error('error fetching the contract', error);
  }
}




    const formatColumnName = (columnName) => {
        return columnName.replace(/([a-z])([A-Z])/g, '$1 $2').charAt(0).toUpperCase() + columnName.slice(1);
    };

    const handleExportCSV = () => {
      const dataToExport = searchQuery ? filteredContract : handleContract;
  
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
      link.setAttribute('download', 'contract_data.csv');
  
      // Append link to document and trigger click event
      document.body.appendChild(link);
      link.click();
  
      // Clean up
      document.body.removeChild(link);
  };
  
  const desiredColumns = ['supplierManufacturer', 'equipmentName', 'equipmentModel', 'agreementDate', 'contractDuration', 'contractExpiryDate'];

  const handleExportPDF = () => {
    const pdf = new jsPDF();
    const dataToExport = searchQuery ? filteredContract : handleContract;

    const tableData = dataToExport.map((row) =>
        Object.values(row).map((value) => (value !== null ? value.toString() : 'null'))
    );

    pdf.autoTable({
        head: [Object.keys(dataToExport[0]).map(col => formatColumnName(col))],
        body: tableData,
    });

    pdf.save('contract_data.pdf');
};


    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleDetailClick = (contract) => {
        setSelectedContract(contract);
    };

    const filteredContract = handleContract.filter((contract) => {
        const searchString = searchQuery.toLowerCase();
        return Object.values(contract).some((value) =>
            value !== null && value.toString().toLowerCase().includes(searchString)
        );
    });

    const handleClose = () => {
      setSelectedContract(null);
  };


return (
        <div className="contract-container">
          <div className="contract-home-and-sort-title">
            <AdminstratorHome />
            <h2 className="contract-heading">Contract Management</h2>
          </div>
          <div className="contract-search-and-export">
            <div className="contract-export-buttons">
                <button className="export-btn-csv-admin" onClick={handleExportCSV}>Export to CSV</button>
                <button className="export-btn-pdf-admin" onClick={handleExportPDF}>Export to PDF</button>
            </div>
            <div className="search-container">
              <IoSearchSharp  className="search-icon"/>
              <input
                id="searchInput"
                className="contract-search-input"
                type="text"
                value={searchQuery}
                onChange={handleSearch}
              />

            </div>
          </div>
            <table className="main-contract-table">
              <thead >
                <tr >
                  <React.Fragment >
                    <th className="contract-thead">Supplier/Manufacturer</th>
                    <th className="contract-thead">EquipmentName</th>
                    <th className="contract-thead">Model</th>
                    <th className="contract-thead">Agreement Date</th>
                    <th className="contract-thead">Contract Duration</th>
                    <th className="contract-thead">Expire Date</th>
                    <th className="contract-thead">See detail</th>
                  </React.Fragment>
                </tr>
              </thead>
                <tbody>
                    {filteredContract.map((contract) => (
                        <tr key={contract.id}>
                            <td className="contract-table-fields">{contract.supplierManufacturer}</td>
                            <td className="contract-table-fields">{contract.equipmentName}</td>
                            <td className="contract-table-fields">{contract.equipmentModel}</td>
                            <td className="contract-table-fields">{new Date(contract.agreementDate).toLocaleString('en-US', {
                                                  year: 'numeric',
                                                  month: '2-digit',
                                                  day: '2-digit',
                                                  hour: '2-digit',
                                                  minute: '2-digit',
                                                  second: '2-digit',
                                                  hour12: true,
                            })}</td>
                            <td className="contract-table-fields">{contract.contractDuration}</td>
                            <td className="contract-table-fields">{new Date(contract.contractExpiryDate).toLocaleString('en-US', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit',
                              hour12: true,
                            })}</td>
                            
                            <td className="contract-table-fields">
                                <button className="contract-detail-button" onClick={() => handleDetailClick(contract)}>Details</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedContract && (
                <div className='detailed-view-1-contract-detail'>
                    <div className='detail-description-detailed-contract-detail'>
                      <div className="contract-agreement-detail">Contract Agreement Detail</div>
                        <div className='device-description-detailed-contract-detail'>
                            
                                {Object.entries(selectedContract).map(([columnName, value]) => {
                                    if (columnName !== 'id' && columnName !== 'createdAt' && columnName !== 'updatedAt') {
                                        if (value != null) {
                                            const formattedColumnName = columnName.charAt(0).toUpperCase() + columnName.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2');


return (
  <div className="sort-by-contract-detail" key={columnName}>
      <div className="columnName-contract-detail">{formattedColumnName}</div>
      <div className='columnValue-contract-detail'>{value}</div>
  </div>
);
          }
      }
      return null;
  })}

                            
          </div>
          <button onClick={handleClose} className='detail-close-button-contract-detail'>Close</button>
      </div>
  </div>
  )}
            {showContractForm && (
                <div className='detailed-view-contract-form'>
                    <div className='detail-description-detailed-contract-formm'>
                    <div className='medical-contract-form-title' >Contract Agreement Form</div>
                        
                        <div  className="medical-contract-form">
                          
                      <label className="contract-contract-form-label">
                      <div className='contractlabel'>Healthcare Facility/Organization</div> 
                        <input type="text" name="healthcareFacility" value={formData.healthcareFacility} onChange={(e) => setFormData({ ...formData, healthcareFacility: e.target.value })} className="contract-form-input" />
                      </label>
                      <label className="contract-contract-form-label">
                      <div className='contractlabel'>Supplier/Manufacturer</div>
                        <input type="text" name="supplierManufacturer" value={formData.supplierManufacturer} onChange={(e) => setFormData({ ...formData, supplierManufacturer: e.target.value })} className="contract-form-input" />
                      </label>
                      <label className="contract-contract-form-label">
                      <div className='contractlabel'>Supplier/Manufacturer Address</div>
                        <input type="text" name="supplierManufacturerAddress" value={formData.supplierManufacturerAddress} onChange={(e) => setFormData({ ...formData, supplierManufacturerAddress: e.target.value })} className="contract-form-input" />
                      </label>
                      <label className="contract-contract-form-label">
                      <div className='contractlabel'>Supplier/Manufacturer Phone</div>
                        <input type="text" name="supplierManufacturerPhone" value={formData.supplierManufacturerPhone} onChange={(e) => setFormData({ ...formData, supplierManufacturerPhone: e.target.value })} className="contract-form-input" />
                      </label>
                      <label className="contract-contract-form-label">
                      <div className='contractlabel'>Supplier/Manufacturer Email</div>
                        <input type="text" name="supplierManufacturerEmail" value={formData.supplierManufacturerEmail} onChange={(e) => setFormData({ ...formData, supplierManufacturerEmail: e.target.value })} className="contract-form-input" />
                      </label>
                      <label className="contract-contract-form-label">
                      <div className='contractlabel'>Agreement Date</div>
                        <input type="date" name="agreementDate" value={formData.agreementDate} onChange={(e) => setFormData({ ...formData, agreementDate: e.target.value })} className="contract-form-input" />
                      </label>
                      <label className="contract-contract-form-label">
                      <div className='contractlabel'>Supplier Contact</div>


<input type="text" name="supplierContact" value={formData.supplierContact} onChange={(e) => setFormData({ ...formData, supplierContact: e.target.value })} className="contract-form-input" />
                      </label>
                      <label className="contract-contract-form-label">
                      <div className='contractlabel'>Contract Duration</div>
                        <input type="text" name="contractDuration" value={formData.contractDuration} onChange={(e) => setFormData({ ...formData, contractDuration: e.target.value })} className="contract-form-input" />
                      </label>
                      <label className="contract-contract-form-label">
                      <div className='contractlabel'>Termination Conditions</div>
                        <input type="text" name="terminationConditions" value={formData.terminationConditions} onChange={(e) => setFormData({ ...formData, terminationConditions: e.target.value })} className="contract-form-input" />
                      </label>
                      <label className="contract-contract-form-label">
                      <div className='contractlabel'>Service Level Expectations</div>
                        <input type="text" name="serviceLevelExpectations" value={formData.serviceLevelExpectations} onChange={(e) => setFormData({ ...formData, serviceLevelExpectations: e.target.value })} className="contract-form-input" />
                      </label>
                      <label className="contract-contract-form-label">
                      <div className='contractlabel'>Performance Metrics</div>
                        <input type="text" name="performanceMetrics" value={formData.performanceMetrics} onChange={(e) => setFormData({ ...formData, performanceMetrics: e.target.value })} className="contract-form-input" />
                      </label>
                      <label className="contract-contract-form-label">
                      <div className='contractlabel'>Cost Breakdown</div>
                        <input type="text" name="costBreakdown" value={formData.costBreakdown} onChange={(e) => setFormData({ ...formData, costBreakdown: e.target.value })} className="contract-form-input" />
                      </label>
                      <label className="contract-contract-form-label">
                      <div className='contractlabel'>Payment Schedule</div>
                        <input type="text" name="paymentSchedule" value={formData.paymentSchedule} onChange={(e) => setFormData({ ...formData, paymentSchedule: e.target.value })} className="contract-form-input" />
                      </label>
                      <label className="contract-contract-form-label">
                      <div className='contractlabel'>Payment Terms</div>
                        <input type="text" name="paymentTerms" value={formData.paymentTerms} onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })} className="contract-form-input" />
                      </label>
                      <label className="contract-contract-form-label">
                      <div className='contractlabel'>Warranty Terms</div>
                        <input type="text" name="warrantyTerms" value={formData.warrantyTerms} onChange={(e) => setFormData({ ...formData, warrantyTerms: e.target.value })} className="contract-form-input" />
                      </label>
                      <label className="contract-contract-form-label">
                      <div className='contractlabel'>Liability Limitations</div>
                        <input type="text" name="liabilityLimitations" value={formData.liabilityLimitations} onChange={(e) => setFormData({ ...formData, liabilityLimitations: e.target.value })} className="contract-form-input" />
                      </label>
                      <label className="contract-contract-form-label">
                      <div className='contractlabel'>Defect Handling Procedures</div>
                      <input type="text" name="defectHandlingProcedures" value={formData.defectHandlingProcedures} onChange={(e) => setFormData({ ...formData, defectHandlingProcedures: e.target.value })} className="contract-form-input" />
                      </label>
                      <label className="contract-contract-form-label">
                      <div className='contractlabel'>Equipment Name</div>
                                    <select name="equipmentName" value={formData.equipmentName} onChange={(e) => setFormData({ ...formData, equipmentName: e.target.value })} className="contract-form-input">
                                        <option value="">Select Equipment</option>
                                        {inventory.map(item => (
                                            <option key={item.id} value={item.equipmentName}>{item.equipmentName}</option>
                                        ))}
                                    </select>
                                </label>
                                <label className="contract-contract-form-label">
                                <div className='contractlabel'>Model</div>
                                    <select name="model" value={formData.equipmentModel} onChange={(e) => setFormData({ ...formData, equipmentModel: e.target.value })} className="contract-form-input">
                                        <option value="">Select Model</option>
                                        {inventory.map(item => (
                                            <option key={item.id} value={item.model}>{item.model}</option>
                                        ))}
                                    </select>
                                 </label>
                                 <label className="contract-contract-form-label">
                      <div className='contractlabel'>Contract Expiry Date</div>
                      <input type="date" name="contractExpiryDate" value={formData.contractExpiryDate} onChange={(e) => setFormData({ ...formData, contractExpiryDate: e.target.value })} className="contract-form-input" />
                    </label>

                    </div>
                    <button type="button" onClick={handleSubmit}className="contract-form-submit-btn">Submit</button>
                    <button onClick={handleCloseContractForm} className='contarct-form-detail-close-button2'>Close</button>
                    </div>
                </div>
            )}

             <button className="add-contract-button" onClick={handleAddContractClick}>Add Contract</button>



        </div>
    );
}

export default Contract;