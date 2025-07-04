const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', require('./routes/initRoute'));
app.use('/api', require('./routes/transactionRoutes'));
app.use('/api', require('./routes/statisticsRoute'));
app.use('/api', require('./routes/chartRoutes'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
