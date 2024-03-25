import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
const RequestType = () => {
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/requestOptions/RequestType');
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
    const labels = pieChartData.map((data) => data.requestType.replace(/^\w/, c => c.toUpperCase()));
    const counts = pieChartData.map((data) => data.count);
    
    const ctx = document.getElementById('myPieChart4').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: counts,
          backgroundColor: [
            'rgba(12, 89, 130)',
            'rgb(195, 139, 197)',
            'rgb(77, 6, 200)',
          
            'rgb(89, 163, 108)',
            'rgb(145, 15, 155)'
 
          ],
          borderColor: [
            'rgba(12, 89, 130)',
            'rgb(195, 139, 197)',
            'rgb(77, 6, 99)',
      
            'rgb(89, 163, 108)',
            'rgb(145, 15, 155)'
          ],
          borderWidth: 2
        }]
      },
      options: {
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
            text: 'Request Type',
            position:'bottom',
            color: 'black',
            font:{
              weight: 'bold',
              size: 25,
              color: 'black',
              family: '-apple-system'
            }   
          }
        },   
      }
      
    });
  };
  
  return (
    <div className='charter'>
      <canvas className='pieDepartment' id="myPieChart4" width="250" height="250"></canvas>
    </div>
  );
};

export default RequestType;
