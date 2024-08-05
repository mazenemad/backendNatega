// routes/messages.js
const express = require('express');
const router = express.Router();

// Mock data for messages
let messages = [];

// Route to get all messages
router.get('/', (req, res) => {
  res.json(messages);
});

// Route to post a new message
router.post('/', (req, res) => {
  const newMessage = req.body;
  messages.push(newMessage);
  res.status(201).json(newMessage);
});

module.exports = router;
