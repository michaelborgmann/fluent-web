const mongoose = require('mongoose');
const CourseModel = mongoose.model('Course');
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

// All courses

const getAllCourses = function (req, res) {

  getAuthor(req, res, (req, res, username) => {

    CourseModel.find({}, function(err, courses) {

      if(!courses) {
        res
          .json(404)
          .status({"message": "no courses found"})

      } else if (err) {
        res
          .status(404)
          .json(err)
      }

      res
        .status(200)
        .json(courses)

    });

  });
};

// Create course

const createCourse = function (req, res) {

  console.log(req.body);

  CourseModel.create({
    title: req.body.title,
    lessons: req.body.lessons
  }, (err, course) => {

    if (err) {
      res
        .status(400)
        .json(err)

    } else {
      res
        .status(201)
        .json(course)
    }

  });
};

module.exports = {
  getAllCourses,
  createCourse
}
