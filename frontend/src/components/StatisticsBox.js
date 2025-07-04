import React, { useEffect, useState } from 'react';
import API from '../api';
import './StatisticsBox.css';

const StatisticsBox = ({ selectedMonth }) => {
  const [stats, setStats] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalUnsoldItems: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get('/statistics', {
          params: { month: selectedMonth },
        });
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching statistics:', err);
      }
    };

    fetchStats();
  }, [selectedMonth]);

  return (
    <div className="stats-container">
  <div className="stat-card sale-card">
    <h4>Total Sale Amount</h4>
    <p className="stat-value">₹{stats.totalSaleAmount}</p>
  </div>
  <div className="stat-card sold-card">
    <h4>Total Sold Items</h4>
    <p className="stat-value">{stats.totalSoldItems}</p>
  </div>
  <div className="stat-card unsold-card">
    <h4>Total Unsold Items</h4>
    <p className="stat-value">{stats.totalUnsoldItems}</p>
  </div>
</div>

  );
};

export default StatisticsBox;
