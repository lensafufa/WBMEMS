import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const EquipmentByCost = () => {
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/reportOptions/EquipmentWithCost');
        setPieChartData(response.data);
        console.log('the couple data', response.data);
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
    const labels = pieChartData.map((data) => data.reportType);
    const costs = pieChartData.map((data) => data.cost);
    const ctx = document.getElementById('myPieChart5').getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: costs,
          backgroundColor: [
            'rgba(12, 89, 130)',
            'rgb(190, 228, 21)',
            'rgb(195, 139, 197)',
            'rgb(77, 6, 99)',
            'rgb(94, 1, 44)',
            'rgb(89, 163, 108)',
            'rgb(145, 15, 155)'
          ],
          borderColor: [
            'rgba(12, 89, 130)',
            'rgb(190, 228, 21)',
            'rgb(195, 139, 197)',
            'rgb(77, 6, 99)',
            'rgb(94, 1, 44)',
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
              color: 'white',
            },
            tooltip: {
              
            },
            legend: {
              display:true,
              align: 'bottom',
              position: 'bottom', 
              labels: {
                color:'black',
                font:{
                  size: 17,
                  color: 'black',
                  weight: 'bold',
                  family: '-apple-system'
                }
              },
              
            },
            title: {
              display:true,
              text: 'Respective Costs',
              position:'bottom',
              color: 'black',
              font:{
                weight: 'bold',
                size: 20,
                family: '-apple-system'
              }   
            }
        }}
    });
  };

  return (
    <div className='charter'>
      <canvas className='pieDepartment' id="myPieChart5" width="200" height="200"></canvas>
    </div>
  );
};

export default EquipmentByCost;
