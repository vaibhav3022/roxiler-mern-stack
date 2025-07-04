const axios = require('axios');

const getCombinedData = async (req, res) => {
  const { month } = req.query;

  try {
    const [stats, bar, pie] = await Promise.all([
      axios.get(`http://localhost:5000/api/statistics?month=${month}`),
      axios.get(`http://localhost:5000/api/bar-chart?month=${month}`),
      axios.get(`http://localhost:5000/api/pie-chart?month=${month}`)
    ]);

    res.json({
      statistics: stats.data,
      barChart: bar.data,
      pieChart: pie.data
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to combine data' });
  }
};

module.exports = { getCombinedData };
