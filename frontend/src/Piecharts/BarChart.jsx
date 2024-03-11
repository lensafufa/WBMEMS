import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import './BarChart.css';

const BarChart = () => {

  const [BarChartData, setBarChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/deviceRegistration/byDepartment');
        setBarChartData(response.data);
      } catch (error) {
        console.error('Error fetching pie chart data:', error);
      }
    };

    fetchData();
  }, []);



    
  const data = {
    labels: BarChartData.map((data) => data.equipmentDepartment),
    datasets: [
      {
        label: 'Number of Equipment in respective Department',
        backgroundColor: 'rgba(12, 89, 130)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(12, 89, 130, 0.8)',
        hoverBorderColor: 'rgba(12, 89, 130)',
        data: BarChartData.map((data) => data.count)
      }
    ]
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    },
    legend: {
      display: true,
      labels: {
        fontWeight: 'bold',
        fontSize: 40
      }
    },
    title: {
      display: true,
      text: 'Bar Chart Example',
      fontSize: 30,
      fontFamily: 'Arial',
      fontWeight: 'bold'
    },
    layout: {
      padding: {
        left: 50,
        right: 50,
        top: 0,
        bottom: 0
      }
      
    }
  };

  return (
    <div className='main-barchart'>
      <div style={{width: '600px', height: '400px'}} className='barchart'>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
