const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  sender: String,
  target: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  audio: String,
  notes: [String]
});

const dialogueSchema = new mongoose.Schema({
  targetLanguage: {
    type: String,
    required: true
  },
  sourceLanguage: {
    type: String,
    required: true
  },
  messages: [messageSchema],
});

mongoose.model('Dialogue', dialogueSchema);
