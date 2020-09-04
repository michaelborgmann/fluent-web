const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  translation: {
    type: String,
    required: true
  },
  imageURL: String
});

mongoose.model('Lesson', lessonSchema);
