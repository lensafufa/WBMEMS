import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const Staff = () => {
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/registration/staff');
        setPieChartData(response.data);
      } catch (error) {
        console.error('Error fetching pie chart data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (pieChartData.length > 0) {
      drawPieChart();
    }
  }, [pieChartData]);

  const drawPieChart = () => {
    const labels = pieChartData.map((data) => data.occupation);
    const costs = pieChartData.map((data) => data.count);
    const ctx = document.getElementById('myPieChart6').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: costs,          
          backgroundColor: [
            'rgb(112, 112, 112)',
            'rgb(85, 79, 79)',
            'rgb(195, 139, 197)',
            'rgb(41, 41, 41)',
            'rgb(34, 34, 34)',
            'rgb(89, 163, 108)',
            'rgb(145, 15, 155)'
          ],
          borderColor: [
            'rgb(34, 34, 34)',
            'rgb(85, 79, 79)',
            'rgb(195, 139, 197)',
            'rgb(41, 41, 41)',
            'rgb(34, 34, 34)',
            'rgb(89, 163, 108)',
            'rgb(145, 15, 155)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        // Add your options here
        plugins: {
            customCanvasBackgroundColor: {
              color: 'black',
            },
            tooltip: {
              
            },
            legend: {
              display:true,
              color: 'white',
              align: 'bottom',
              position: 'bottom', 
              labels: {
                color: 'black',
                font:{
                  size: 20,
                  color: 'black',
                  weight: 'bold',
                  family: '-apple-system'
                }
              },
              
            },
            title: {
              display:true,
              text: 'Staff Information',
              position:'bottom',
              color: 'black',
              font:{
                weight: 'bold',
                size: 25,
                family: '-apple-system'
              }   
            }
        }}
    });
  };

  return (
    <div className='charter'>
      <canvas className='pieDepartment' id="myPieChart6" width="240" height="240"></canvas>
    </div>
  );
};

export default Staff;
