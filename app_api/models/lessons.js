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
  messages: [messageSchema]
});

const imageSchema = new mongoose.Schema({
  cloudinary: String,
  s3: String
},{ _id : false });

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  translation: {
    type: String,
    required: true
  },
  imageURL: imageSchema,
  dialogue: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dialogue"}]
});

mongoose.model('Dialogue', dialogueSchema);
mongoose.model('Lesson', lessonSchema);
