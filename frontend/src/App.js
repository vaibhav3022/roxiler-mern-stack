import React, { useState } from 'react';
import TransactionsTable from './components/TransactionsTable';
import StatisticsBox from './components/StatisticsBox';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState('March');

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <div style={{ padding: '20px',
    fontFamily: 'Arial, sans-serif',
    background: 'linear-gradient(to bottom right, #f0f4ff, #e0e7ff)',
    minHeight: '100vh',}}>
  
  <h2
  style={{
    fontSize: '34px',
    fontWeight: '900',
    color: '#ffffff',
    background: 'linear-gradient(to right, #6366f1, #4f46e5)',
    padding: '18px 28px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 6px 20px rgba(79, 70, 229, 0.3)',
    marginBottom: '30px',
    textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
    letterSpacing: '1px',
  }}
>
  📊 Roxiler Systems Transactions Dashboard
</h2>

 
  <div
    style={{
      marginBottom: '30px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      background: '#f0f4ff',
      padding: '14px 20px',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      border: '1px solid #c7d2fe',
      maxWidth: '420px',
    }}
    
  >
    
    <label
      style={{
        fontWeight: '600',
        color: '#1f2937',
        fontSize: '20px', 
      }}
    >
      Select Month:
    </label>

   
   <select
  value={selectedMonth}
  onChange={(e) => setSelectedMonth(e.target.value)}
  style={{
    padding: '10px 14px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '18px',
    fontWeight: '500',
    backgroundColor: '#f0f4ff', 
    color: '#1e293b',
    cursor: 'pointer',
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.2s ease',
  }}
>
      {months.map((month) => (
        <option key={month} value={month}>
          {month}
        </option>
      ))}
    </select>
  </div>



     
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'space-between',
            marginBottom: '30px',
          }}
        >
          <StatisticsBox selectedMonth={selectedMonth} />
          <div style={{ flexGrow: 1 }}>
            <BarChart selectedMonth={selectedMonth} />
          </div>
          <div style={{ flexGrow: 1 }}>
            <PieChart selectedMonth={selectedMonth} />
          </div>
        </div>
      

      Transaction Table for selected Month..
      <TransactionsTable selectedMonth={selectedMonth} />

    </div>
  );
};

export default App;
