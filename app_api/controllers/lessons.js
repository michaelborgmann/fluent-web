const mongoose = require('mongoose');
const LessonModel = mongoose.model('Lesson');
const User = mongoose.model('User');

// authentication

const getAuthor = (req, res, callback) => {

  if (req.payload && req.payload.email) {
    User
      .findOne({ email : req.payload.email })
      .exec((err, user) => {

        if (!user) {
          return res
            .status(404)
            .json({"message": "User not found"});

        } else if (err) {

          //console.log(err);
          return res
            .status(404)
            .json(err);

        }

        callback(req, res, user.name);
      });

  } else {
    return res
      .status(404)
      .json({"message": "User not found"});
  }

};


// All Lessons

const getAllLessons = function (req, res) {

  console.log(req);

  getAuthor(req, res, (req, res, username) => {

      LessonModel.find({}, function(err, lessons) {

        console.log(lessons);

        if (!lessons) {
          res
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
  });
};

// Create Lesson

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

// Get Lesson by Id

const getLessonById = function (req, res) {

  LessonModel
    .findById(req.params.lessonid)
    .exec((err, lesson) => {

      if (!lesson) {
        return res
          .status(404)
          .json({
            "message": "lesson not found"
          });

      } else if (err) {
        return (res)
          .status(404)
          .json(err);
      }

      res
        .status(200)
        .json(lesson)

    })

};

// Update Lesson

const updateLesson = function (req, res) {

  if (!req.params.lessonid) {
    res
      .status(404)
      .json( {
        "message": "Not found, lessonid is required"
      });
      return;
  }

  LessonModel
    .findById(req.params.lessonid)
    .exec((err, lesson) => {

      if (!lesson) {
        res
          .status(404)
          .json({
            "message": "lessonid not found"
          });
        return

      } else if (err) {
        res
          .status(400)
          .json(err);
        return;
      }

      lesson.title = req.body.title;
      lesson.translation = req.body.translation;
      lesson.imageURL = { cloudinary: req.body.cloudinary };

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
};

const getLessonImageUrl = function (req, res) {

  console.log("");

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
  getLessonById,
  updateLesson,
  getLessonImageUrl,
  updateLessonImageUrl
};
