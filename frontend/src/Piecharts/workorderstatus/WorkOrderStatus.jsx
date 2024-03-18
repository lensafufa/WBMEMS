import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
const WorkOrderStatus = () => {
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/requestOptions/byStatus');
        setPieChartData(response.data);
        console.log('the request chart',response.data);
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
    const labels = pieChartData.map((data) => data.status);
    console.log('the mapped data',labels)
    const counts = pieChartData.map((data) => data.count);
    console.log('the mapped count data',counts)
    
    const ctx = document.getElementById('myPieChart3').getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: counts,
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
        plugins: {
          customCanvasBackgroundColor: {
            color: 'white',
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = labels[context.dataIndex] + ': ';
                label += counts[context.dataIndex] + ' Requests'; // Append number of items
                return label;
              }
            }
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
            text: 'Request Status',
            position:'bottom',
            color: 'black',
            font:{
              weight: 'bold',
              size: 20,
              family: '-apple-system'
            }   
          }
        },   
      }
      
    });
  };
  
  return (
    <div className='charter'>
      <canvas className='pieDepartment' id="myPieChart3" width="300" height="300"></canvas>
    </div>
  );
};

export default WorkOrderStatus;
