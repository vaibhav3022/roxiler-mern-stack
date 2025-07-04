const db = require('../db');

const getMonthNumber = (month) => new Date(`${month} 1, 2020`).getMonth() + 1;

const getStatistics = async (req, res) => {
  const { month } = req.query;
  const monthNum = getMonthNumber(month);

  try {
    const [totalSale] = await db.query(
      `SELECT SUM(price) as total FROM transactions WHERE sold = true AND MONTH(dateOfSale) = ?`,
      [monthNum]
    );

    const [sold] = await db.query(
      `SELECT COUNT(*) AS sold FROM transactions WHERE sold = true AND MONTH(dateOfSale) = ?`,
      [monthNum]
    );

    const [unsold] = await db.query(
      `SELECT COUNT(*) AS unsold FROM transactions WHERE sold = false AND MONTH(dateOfSale) = ?`,
      [monthNum]
    );

    res.json({
      totalSaleAmount: parseFloat(totalSale[0].total || 0),
      totalSoldItems: sold[0].sold,
      totalUnsoldItems: unsold[0].unsold,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
};

module.exports = { getStatistics };
