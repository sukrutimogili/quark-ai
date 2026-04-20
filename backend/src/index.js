// require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connection');
const chatRouter = require('./routes/chat');

const app = express();

app.use(cors());
app.use(express.json());
connectDB();

let isConnected = false;

// const ensureDBConnection = async () => {
//   if (!isConnected) {
//     await connectDB();
//     isConnected = true;
//   }
// };

const ensureDBConnection = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ error: "Database connection failed" });
  }
};

app.use('/api/chat', ensureDBConnection, chatRouter);

module.exports = app;