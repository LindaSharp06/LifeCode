require('./config/loadEnv');

const express = require('express');
const cors = require('cors');
const sessionMiddleware = require('./middlewares/sessionMiddleware');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(sessionMiddleware);

app.get('/', (req, res) => {
  res.send('QR backend — POST /api/qr-codes with { username, dateOfBirth }');
});

app.use('/api', userRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;
