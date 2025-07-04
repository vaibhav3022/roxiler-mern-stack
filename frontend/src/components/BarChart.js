import React, { useEffect, useState } from 'react';
import API from '../api';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import './BarChart.css'; 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const BarChart = ({ selectedMonth }) => {
  const [dataSet, setDataSet] = useState({ labels: [], counts: [] });

  useEffect(() => {
    const fetchBarData = async () => {
      try {
        const res = await API.get('/bar-chart', {
          params: { month: selectedMonth },
        });
        setDataSet({
          labels: Object.keys(res.data),
          counts: Object.values(res.data),
        });
      } catch (err) {
        console.error('Error fetching bar chart:', err);
      }
    };

    fetchBarData();
  }, [selectedMonth]);

  const data = {
    labels: dataSet.labels,
    datasets: [
      {
        label: 'Items Count',
        data: dataSet.counts,
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: `Price Range Distribution - ${selectedMonth}` },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="bar-chart-card">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
