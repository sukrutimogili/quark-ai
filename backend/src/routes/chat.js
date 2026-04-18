const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { question } = req.body;

  if (!question || question.trim() === "") {
    return res.status(400).json({ error: "Question is missing or empty" });
  }

  res.status(200).json({ answer: "Placeholder answer" });
});

module.exports = router;