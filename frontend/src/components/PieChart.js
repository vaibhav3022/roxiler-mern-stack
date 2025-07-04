import React, { useEffect, useState } from 'react';
import API from '../api';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

import './PieChart.css'; 

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ selectedMonth }) => {
  const [dataSet, setDataSet] = useState({ labels: [], counts: [] });

  useEffect(() => { 
    const fetchPieData = async () => {
      try {
        const res = await API.get('/pie-chart', {
          params: { month: selectedMonth },
        });
        setDataSet({
          labels: Object.keys(res.data),
          counts: Object.values(res.data),
        });
      } catch (err) {
        console.error('Error fetching pie chart:', err);
      }
    };

    fetchPieData();
  }, [selectedMonth]);

  const data = {
    labels: dataSet.labels,
    datasets: [
      {
        label: 'Category Count',
        data: dataSet.counts,
        backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#3b82f6'],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            weight: 'bold',
            size: 14,
          },
          color: '#1f2937',
        },
      },
      title: {
        display: true,
        text: `Category Distribution - ${selectedMonth}`,
        font: {
          weight: 'bold',
          size: 16,
        },
        color: '#1f2937',
        padding: {
          top: 10,
          bottom: 20,
        },
      },
    },
  };

  return (
    <div className="chart-card">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
