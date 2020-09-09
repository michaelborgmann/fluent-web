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
    imageURL: {
      cloudinary: req.body.cloudinary,
    }
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

const getLessonImageUrl = function (req, res) {

  LessonModel
    .findById(req.params.lessonid)
    .select('imageURL')
    .exec((err, lesson) => {

      if (!lesson) {
        return res
          .status(404)
          .json({
            "message": "lesson not found"
          });

      } else if (err) {
        return res
          .status(404)
          .json(err);
      }

      res
        .status(200)
        .json(lesson.imageURL.cloudinary)

    });
};

const updateLessonImageUrl = function (req, res) {

  if (!req.params.lessonid) {
    res
    .status(404)
    .json({"message": "Not found, lessonid is required"});
  }

  LessonModel
    .findById(req.params.lessonid)
    .exec((err, lesson) => {

      if (!lesson) {
        res
          .json(404)
          .status({"message": "lessonid not found"});
      } else if (err) {
        res
          .status(400)
          .json(err)
      }

      lesson.update({ imageURL: { cloudinary: req.body.cloudinary }}, (err, result) => {
        
      });

      console.log(lesson.imageURL);

      lesson.save((err, lesson) => {

        if (err) {
          res
            .status(404)
            .json(err)

        } else {
          res
            .status(200)
            .json(lesson)
        }

      });

    });

}

module.exports = {
  getAllLessons,
  createLesson,
  getLessonImageUrl,
  updateLessonImageUrl
};
