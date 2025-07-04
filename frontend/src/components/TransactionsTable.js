import React, { useEffect, useState } from 'react';
import API from '../api';
import './TransactionsTable.css'; 

const TransactionsTable = ({ selectedMonth }) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const perPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = {
          search,
          page,
          perPage,
        };

        if (selectedMonth !== 'Show All Transactions') {
          params.month = selectedMonth;
        }

        const res = await API.get('/transactions', { params });

        setTransactions(res.data.transactions);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error('Error fetching transactions:', err);
      }
    };

    fetchData();
  }, [selectedMonth, search, page]);

  return (
    <div className="transaction-container">
      <h3 className="transaction-title">📋 Transactions</h3>

      <input
        type="text"
        placeholder="🔍 Search by title, description, or price"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="transaction-search"
      />

      <div className="table-wrapper">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Description</th>
              <th>Category</th>
              <th>Sold</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{tx.title}</td>
                  <td>₹{tx.price}</td>
                  <td>{tx.description}</td>
                  <td>{tx.category}</td>
                  <td className={tx.sold ? 'sold-yes' : 'sold-no'}>
                    {tx.sold ? 'Yes' : 'No'}
                  </td>
                  <td>{new Date(tx.dateOfSale).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">No transactions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div><br></br>

      <div className="pagination">
  <button className="prev-button">⬅ Previous</button>

  <span className="page-info">
    Page {page} of {totalPages}
  </span>

  <button className="next-button">Next ➡</button>
</div>

    </div>
  );
};

export default TransactionsTable;
