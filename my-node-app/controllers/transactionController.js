const db = require('../db');

const getMonthNumber = (month) => new Date(`${month} 1, 2020`).getMonth() + 1;

const getTransactions = async (req, res) => {
  const { month, search = '', page = 1, perPage = 10 } = req.query;
  const offset = (page - 1) * perPage;
  const monthNum = getMonthNumber(month);

  try {
    const [rows] = await db.query(`
      SELECT * FROM transactions 
      WHERE MONTH(dateOfSale) = ?
      AND (
        title LIKE ? OR
        description LIKE ? OR
        price LIKE ?
      )
      LIMIT ? OFFSET ?`,
      [monthNum, `%${search}%`, `%${search}%`, `%${search}%`, Number(perPage), Number(offset)]
    );

    const [count] = await db.query(`
      SELECT COUNT(*) AS total FROM transactions 
      WHERE MONTH(dateOfSale) = ?
      AND (
        title LIKE ? OR
        description LIKE ? OR
        price LIKE ?
      )`,
      [monthNum, `%${search}%`, `%${search}%`, `%${search}%`]
    );

    const totalPages = Math.ceil(count[0].total / perPage);

    res.json({ transactions: rows, totalPages });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

module.exports = { getTransactions };
