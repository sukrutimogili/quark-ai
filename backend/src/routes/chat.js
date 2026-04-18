const express = require('express');
const router = express.Router();
const { askGroq } = require('../services/groq');
const Chat = require('../models/Chat'); 

router.post('/', async (req, res) => {
  const { question } = req.body;

  if (!question || question.trim() === "") {
    return res.status(400).json({ error: "Question is missing or empty" });
  }

  try {
    const answer = await askGroq(question);

    const newChat = new Chat({ question, answer });
    await newChat.save();

    res.status(200).json({ answer });
  } catch (error) {
    res.status(500).json({ error: "Server error during chat processing" });
  }
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