import axios from "axios";
import React, { useEffect, useState } from "react";
import Home from "../pages/Home/Home";
import { useSelector } from 'react-redux';
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const DeviceMaintenanceHistory = () => {
    const [reportType, setReportType] = useState('');
    const [handleReport, setHandleReport] = useState([]);
    const { user } = useSelector(state => state.user);
    const [showAllColumns, setShowAllColumns] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    

    useEffect(() => {
        if (!reportType) {
            defaultReportList();
        } else if (reportType) {
            handleGetReportsByType();
        }
    }, [reportType]);

   
    const handleGetReportsByType = async () => {
        try {
            const response = await axios.get(`http://localhost:7000/api/reportOptions/getByReportType?reportType=${reportType}`);
            setHandleReport(response.data);
            console.log('received:', response);
        } catch (error) {
            console.error('error fetching the report', error);
        }
    };

    const handleReportType = (e) => {
        setReportType(e.target.value);
    };
   
    const desiredColumns = ['equipmentName', 'Model', 'department', 'reportType', 'doneBy', 'reportDate', 'replacementCostInETB', 'durationInHours'];

    return (
        <div className="sort-by-reportType-main-report">
            <div className="home-and-sort-title-report"><Home /><h2>Maintenance History</h2></div>
            <div className="select-and-body-report">
                <table className="report-table-report">
                    <thead>
                        <tr>
                            {showAllColumns ? Object.keys(filteredReport[0] || {}).map((columnName) => (
                                <th key={columnName}>{formatColumnName(columnName)}</th>
                            )) : desiredColumns.map((columnName) => (
                                <th key={columnName}>{formatColumnName(columnName)}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReport.map((ReportByType) => (
                            <tr key={ReportByType.id}>
                                {showAllColumns ? Object.keys(filteredReport[0] || {}).map((columnName) => (
                                    <td key={columnName}>{ReportByType[columnName] !== null ? ReportByType[columnName] : 'null'}</td>
                                )) : desiredColumns.map((columnName) => (
                                    <td key={columnName}>{ReportByType[columnName] !== null ? ReportByType[columnName] : 'null'}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default DeviceMaintenanceHistory;