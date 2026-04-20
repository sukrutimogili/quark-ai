const express = require('express');
const router = express.Router();
const { askGroq } = require('../services/groq');
const Chat = require('../models/Chat'); 

router.post('/', async (req, res) => {
  return res.json({ message: "Quick response working" });
});

router.get('/history', async (req, res) => {
  try {
    const history = await Chat.find().sort({ timestamp: -1 }).limit(10);
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch chat history" });
  }
});

module.exports = router;