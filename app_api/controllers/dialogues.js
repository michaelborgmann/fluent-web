const mongoose = require('mongoose');
const LessonModel = mongoose.model('Lesson');

const createDialogue = function (req, res) {
  const lessonid = req.params.lessonid;

  if (lessonid) {

    LessonModel
      .findById(lessonid)
      //.select('dialogue')
      .exec((err, lesson) => {
        if (err) {
          res
            .status(400)
            .json(err);
        } else {
          addDialogue(req, res, lesson);
        }

      });

  } else {
    res
      .status(404)
      .json({
        "message": "Not found, lessonid required"
      });
  }
};

const addDialogue = function(req, res, lesson) {
  if (!lesson) {
    res
      .status(404)
      .json({ "message": "lesson not found" });

  } else {
    
    lesson.dialogue.push({
      $each: req.body
    });

    console.log(req.body);

    lesson.save((err, lesson) => {
      if (err) {
        res
          .status(400)
          .json(err);

      } else {

        const addedDialogue = lesson.dialogue.slice(-1).pop();
         res
           .status(201)
           .json(addedDialogue);

         }
    });

  }

}

const getDialogueById = function (req, res) {
  DialogueModel
    .findById(req.params.dialogueid)
    .exec((err, dialogue) => {

      if (!dialogue) {
        return res
          .status(404)
          .json({
            "message": "dialogue not found"
          });

      } else if (err) {
        return res
          .status(404)
          .json(err);
      }

      res
        .status(200)
        .json(dialogue)
    });
};

module.exports = {
  getDialogueById,
  createDialogue
};
