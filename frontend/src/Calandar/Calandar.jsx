import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Home from '../pages/Home/Home';

const localizer = momentLocalizer(moment);

const InventoryCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchInventory();
  }, []);

  const calculateNextMaintenanceDates = (createdAt, preventiveMaintenancePerAnnual) => {
    const creationDate = moment(createdAt);
    const interval = 12 / preventiveMaintenancePerAnnual; // Calculate interval in months
    const nextMaintenanceDates = [];
    const startDate = moment(createdAt).add(interval, 'months'); // Start scheduling from the next maintenance date

    // Schedule maintenance dates starting from the next maintenance date after createdAt
    while (startDate.isBefore(moment().add(5, 'years'))) { // Limit scheduling until the next 5 years
      nextMaintenanceDates.push(startDate.toDate()); // Add next maintenance date
      startDate.add(interval, 'months'); // Increment by interval
    }

    return nextMaintenanceDates;
  };

  const fetchInventory = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/contract/inventory');
      const inventory = response.data;

      const eventsData = inventory.flatMap(item => {
        const nextMaintenanceDates = calculateNextMaintenanceDates(item.createdAt, item.preventiveMaintenancePerAnnual);

        return nextMaintenanceDates.map(date => ({
          id: `${item.id}_${date.getTime()}`, // Using getTime to ensure unique IDs
          title: 'Preventive Maintenance',
          start: date,
          end: date,
          allDay: true,
          equipmentName: item.equipmentName,
          model: item.model,
          department: item.equipmentDepartment,
        }));
      });
      const calendarResponse = await axios.get('http://localhost:7000/api/requestOptions/calendarEvent');
      const calendarEvents = calendarResponse.data.map(event => ({
        id: `calendar_${event.id}`,
        title: event.title,
        start: moment(event.eventDate).add(1,'days'), // Adjusted date creation
        end: moment(event.eventDate).add(1,'days'), // Adjusted date creation
        allDay: true,
        equipmentName: event.equipmentName,
        model: event.equipmentModel,
        department: event.department,
        AssignedTo:event.assignedTo,
      }));

      
      setEvents([...eventsData,...calendarEvents]);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const EventComponent = ({ event }) => (
    <div className="event">
      <div className="event-title">{event.title}</div>
      <div className="event-details">
        <div><strong>Equipment Name:</strong> {event.equipmentName}</div>
        <div><strong>Model:</strong> {event.model}</div>
        <div><strong>Department:</strong> {event.department}</div>
        <div><strong>Assign to</strong> {event.AssignedTo}</div>
      </div>
    </div>
  );

  return (
    <div>
      <div className='device-main'>
            <div><Home/></div>
            <h2>Calendar</h2>
          </div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        components={{ event: EventComponent }}
      />
    </div>
  );
};

export default InventoryCalendar;
