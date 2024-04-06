import axios from "axios";
import React, { useEffect, useState } from "react";
import './AnalyticalData.css';
import { MdDevices } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { BsFillChatSquareQuoteFill } from "react-icons/bs";
import { MdOutlinePendingActions } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";
import { BiSolidSave } from "react-icons/bi";
import { BiDollar } from "react-icons/bi";

const AnalyticalData = () => {
    const [devicecounter, setDeviceCounter] = useState(null);
    const [Requestcounter, setRequestcounter] = useState(null);
    const [RequestAcceptedcounter, setRequestAcceptedcounter] = useState(null);
    const [RequestPendingcounter, setRequestPendingcounter] = useState(null);
    const [RequestCompletedcounter, setRequestCompletedcounter] = useState(null);
    const [Costcounter, setCostcounter] = useState(null);


    useEffect(()=>{
        FetchTotalNumberOfEquipments();
        FetchTotalNumberOfRequests();
        FetchTotalNumberOfCost();
    }, [devicecounter, RequestAcceptedcounter,
        RequestPendingcounter, RequestCompletedcounter,
        Costcounter])

   const FetchTotalNumberOfEquipments= async()=>{
    try{
        const response = await axios.get('http://localhost:7000/api/deviceRegistration');
        console.log('the analytical data', response.data.length);
        setDeviceCounter(response.data.length);
    }catch(error){
        console.error('the error message', error);
    }

    
   }
   const FetchTotalNumberOfCost= async()=>{
    try{
        const response = await axios.get('http://localhost:7000/api/reportOptions');
        let cost = 0;
        response.data.forEach(item => {
            cost = item.replacementCostInETB + cost;
            }
        );
        setCostcounter(cost) ;

    }catch(error){
        console.error('the error message', error);
    }
   }


   const FetchTotalNumberOfRequests= async()=>{
    try{
        const response = await axios.get('http://localhost:7000/api/requestOptions');
        console.log('the analytical data', response.data.length);
        setRequestcounter(response.data.length);
        console.log('main', response.data)

        let acceptedCount = 0;
        let pendingCount = 0;
        let completedCount = 0;

        // Group data by status
        response.data.forEach(item => {
            switch (item.status) {
                case 'Accepted':
                    acceptedCount++;
                    break;
                case 'Pending':
                    pendingCount++;
                    break;
                case 'Completed':
                    completedCount++;
                    break;
                case 'Arranged':
                    completedCount++;
                    break;
                case 'Purchased':
                    completedCount++;
                    break;
                default:
                    break;
            }
        });

        // Update state with counts
        setRequestAcceptedcounter(acceptedCount);
        setRequestPendingcounter(pendingCount);
        setRequestCompletedcounter(completedCount);
    }catch(error){
        console.error('the error message', error);
    }
   }
    return ( 
        <div className="main-analysis">
            <div  className="analytical-icons1"><div className="icon-and-title"><MdDevices className="di1"/><h4>Total Equipments </h4></div><div className="real-number-data">{devicecounter}</div></div>
            <div  className="analytical-icons2"><div className="icon-and-title"><FaSackDollar className="di1"/><h4>Spent Cost </h4></div><div className="dollar"><div  className="real-number-data">ETB {Costcounter}</div></div></div>
            <div  className="analytical-icons3"><div className="icon-and-title"><BsFillChatSquareQuoteFill className="di1"/><h4>Total Requests </h4></div><div  className="real-number-data">{Requestcounter}</div></div>
            <div  className="analytical-icons4"><div className="icon-and-title"><BiSolidSave className="di1"/><h4>Accepted Requests </h4></div><div  className="real-number-data">{RequestAcceptedcounter}</div></div>
            <div  className="analytical-icons5"><div className="icon-and-title"><MdOutlinePendingActions className="di1"/><h4>Pending Requests </h4></div><div  className="real-number-data">{RequestPendingcounter}</div></div>
            <div  className="analytical-icons6"><div className="icon-and-title"><FaRegCalendarCheck className="di1"/><h4>Completed Requests </h4></div><div  className="real-number-data">{RequestCompletedcounter}</div></div>
        </div>
     );
}
 
export default AnalyticalData;