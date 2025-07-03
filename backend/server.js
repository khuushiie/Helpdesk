const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/tickets');
const userRoutes = require('./routes/users');

dotenv.config();
const app = express();

connectDB();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://helpdesk-virid-zeta.vercel.app',
  ],
  credentials: true,
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Helpdesk Backend Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));