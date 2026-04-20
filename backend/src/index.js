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

app.post('/api/chat', (req, res) => {
  return res.json({ message: "Instant response working" });
});

// app.use(async (req, res, next) => {
//   await ensureDBConnection();
//   next();
// });

app.use('/api/chat', chatRouter);

module.exports = app;