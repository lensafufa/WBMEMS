import axios from "axios";
import React, { useEffect, useState } from "react";
import './TrackChanges.css';
import DoctorSidebar from "../DoctorSidebar";

const TrackChanges = () => {
    const [handleRequest, setHandlerequest] = useState([]);
    const [idHolder, setIdHolder] = useState(false);
    const [user, setUser] = useState(() => {
        // Retrieve user data from local storage on component mount
        const storedUserData = localStorage.getItem('userData');
        return storedUserData ? JSON.parse(storedUserData) : null;
    });
    const [detailed, setDetailed] = useState(null);

    useEffect(() => {
        defaultRequestList();
    }, [idHolder]);

    const defaultRequestList = async () => {
        try {
            const response = await axios.get(`http://localhost:7000/api/requestOptions/trackchanges?fullName=${user.name} ${user.lastName}`);
            setHandlerequest(response.data.reverse());
        } catch (error) {
            console.error('Error fetching the requests:', error);
        }
    }
    
    const getById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:7000/api/requestOptions/getById?id=${id}`);
            setDetailed(response.data.find(request => request.id === id));
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    const handleClose = () => {
        setDetailed(null);
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'red';
            case 'Accepted':
                return 'yellow';
            case 'Completed':
                return 'green';
            default:
                return '';
        }
    };

    return (
        <div className='show-request-body-trackChanges'>
            <div className="home-and-sort-title-trackChanges"><DoctorSidebar/><h2>Track Requests</h2></div>
            <table className="request-table">
                <thead>
                    <tr>
                        <th>Request Type</th>
                        <th>Request Date</th>
                        <th>Equipment Name</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th>Assigned</th>
                        <th>Requested By</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {handleRequest.map((RequestByType) => (
                        <tr key={RequestByType.id}>
                            <td>{RequestByType.requestType}</td>
                            <td>{RequestByType.requestDate}</td>
                            <td>{RequestByType.equipmentName}</td>
                            <td>{RequestByType.department}</td>
                            <td style={{ backgroundColor: getStatusColor(RequestByType.status) }}>{RequestByType.status}</td>
                            <td>{RequestByType.action}</td>
                            <td>{RequestByType.requestedBy}</td>
                            <td>
                                <button onClick={() => getById(RequestByType.id)}>Detail</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {detailed && (
                <div className='detailed-view-1-trackchanges'>
                    <div className='detail-description-trackChanges'>
                      Request Detail
                        <div className='device-description-trackChanges'>
                            {Object.entries(detailed).map(([columnName, value]) => {
                                if (columnName !== 'id' && columnName !== 'createdAt' && columnName !== 'updatedAt') {
                                    if (value != null) {
                                        const formattedColumnName = columnName.charAt(0).toUpperCase() + columnName.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2');
                                        return (
                                            <div className="sort-by-request-trackChanges" key={columnName}>
                                                <div className="columnName-trackChanges">{formattedColumnName}</div>
                                                <div className='columnValue-trackChanges'>{value}</div>
                                            </div>
                                        );
                                    }
                                }
                                return null;
                            })}
                        </div>
                        <button onClick={handleClose} className='detail-close-button-trackChanges'>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TrackChanges;
