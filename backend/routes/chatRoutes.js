const express = require('express');
const Message = require('../models/Message');

const router = express.Router();

// Get messages for a specific room
router.get('/:room', async (req, res) => {
  const messages = await Message.find({ room: req.params.room }).sort({ timestamp: 1 });
  res.json(messages);
});

module.exports = router;
