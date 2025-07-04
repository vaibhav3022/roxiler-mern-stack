const axios = require('axios');
const db = require('../db');

const initializeData = async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const products = response.data;
    await db.query('DELETE FROM transactions');

    for (const p of products) {
      await db.query(`
        INSERT INTO transactions 
        (id, title, price, description, category, image, sold, dateOfSale)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [
        p.id, p.title, p.price, p.description,
        p.category, p.image, p.sold, p.dateOfSale
      ]);
    }

    res.json({ message: 'Data initialized' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to initialize data' });
  }
};

module.exports = { initializeData };
