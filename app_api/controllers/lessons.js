const mongoose = require('mongoose');
const LessonModel = mongoose.model('Lesson');

const getAllLessons = function (req, res) {
  LessonModel.find({}, function(err, lessons) {

    if (!lessons) {
      result
        .json(404)
        .status({"message": "no lessons found"})

    } else if (err) {
      res
        .status(404)
        .json(err)
    }

    res
      .status(200)
      .json(lessons)

  });
};

const createLesson = function (req, res) {

  LessonModel.create({
    title: req.body.title,
    translation: req.body.translation,
    imageURL: req.body.imageURL

  }, (err, lesson) => {
    if (err) {
      res
        .status(400)
        .json(err)
        
    } else {
      res
        .status(201)
        .json(lesson)
    }

  });
};

module.exports = {
  getAllLessons,
  createLesson
};
