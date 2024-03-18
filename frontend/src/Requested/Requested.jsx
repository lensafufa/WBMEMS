import React, { useEffect, useState } from "react";
import axios from "axios";
import { DateTime } from 'luxon';
import Home from "../pages/Home/Home";
import './Requested.css'

const Requested = () => { 
    const [requestValue, setRequest] = useState([]);
    const [clickedRequests, setClickedRequests] = useState(() => {
      const storedClickedRequests = localStorage.getItem('clickedRequests');
      return storedClickedRequests ? JSON.parse(storedClickedRequests) : {};
  });


    useEffect(() => {
        handleGetRequest();
    
      }, []);
      const updateStatus = async (id, newStatus) => {
        handleAcceptClick(id);
        try {
          const response = await axios.put(`http://localhost:7000/api/request/${id}`, { stat: newStatus });
          return response.data;
          
        } catch (error) {
          console.error('Error updating request status:', error);
          return null;
        }
        
      };

    const handleGetRequest = async()=>{
      
        try {
            const response = await axios.get('http://localhost:7000/api/request');
            if (response.status === 200) {
              const announcementsWithLocalTime = response.data.map(request => ({
                ...request,
                announcement_time: DateTime.fromISO(request.announcement_time).toLocaleString(DateTime.DATETIME_MED),
              }));
              setRequest(announcementsWithLocalTime.reverse());
            } else {
              throw new Error('Failed to fetch requests');
            }
          } catch (error) {
            console.error('Error fetching request:', error);
          }
        };

        const handleAcceptClick = async (id) => {
          await updateStatus(id, true);
          setClickedRequests(prevState => {
              const newState = { ...prevState, [id]: true };
              // Update localStorage with the new clickedRequests state
              localStorage.setItem('clickedRequests', JSON.stringify(newState));
              return newState;
          });
      };
        
    return ( 
        <div>
            k
        </div>     
     );
  };
export default Requested;