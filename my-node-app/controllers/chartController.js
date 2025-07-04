const db = require('../db');

const getMonthNumber = (month) => new Date(`${month} 1, 2020`).getMonth() + 1;

const getBarChartData = async (req, res) => {
  const { month } = req.query;
  const monthNum = getMonthNumber(month);
  const rangeMap = {
    '0-100': 0, '101-200': 0, '201-300': 0,
    '301-400': 0, '401-500': 0, '501-600': 0,
    '601-700': 0, '701-800': 0, '801-900': 0, '901-above': 0
  };

  const [rows] = await db.query(`SELECT price FROM transactions WHERE MONTH(dateOfSale) = ?`, [monthNum]);

  rows.forEach(({ price }) => {
    if (price <= 100) rangeMap['0-100']++;
    else if (price <= 200) rangeMap['101-200']++;
    else if (price <= 300) rangeMap['201-300']++;
    else if (price <= 400) rangeMap['301-400']++;
    else if (price <= 500) rangeMap['401-500']++;
    else if (price <= 600) rangeMap['501-600']++;
    else if (price <= 700) rangeMap['601-700']++;
    else if (price <= 800) rangeMap['701-800']++;
    else if (price <= 900) rangeMap['801-900']++;
    else rangeMap['901-above']++;
  });

  res.json(rangeMap);
};

const getPieChartData = async (req, res) => {
  const { month } = req.query;
  const monthNum = getMonthNumber(month);

  const [rows] = await db.query(`
    SELECT category, COUNT(*) as count 
    FROM transactions 
    WHERE MONTH(dateOfSale) = ? 
    GROUP BY category
  `, [monthNum]);

  const result = {};
  rows.forEach(r => result[r.category] = r.count);

  res.json(result);
};

module.exports = { getBarChartData, getPieChartData };
