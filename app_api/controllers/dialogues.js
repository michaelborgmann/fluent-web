const mongoose = require('mongoose');
const LessonModel = mongoose.model('Lesson');
const DialogueModel = mongoose.model('Dialogue');

const createDialogue = async (req, res) => {
  const lessonid = req.params.lessonid;

  if (lessonid) {

    LessonModel
      .findById(lessonid)
      .select('dialogue')
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

const addDialogue = async (req, res, lesson) => {

  if (!lesson) {
    res
      .status(404)
      .json({ "message": "lesson not found" });

  } else {

    const dialogue = DialogueModel.create({
      targetLanguage: req.body[0].targetLanguage,
      sourceLanguage: req.body[0].sourceLanguage,
      messages: req.body[0].messages

    } , (err, dialogue) => {
      if (err) {
        res
          .status(400)
          .json(err)

      } else {

        lesson.dialogue.push(dialogue._id);
        lesson.save((err, lesson) => {

          if (err) {
            res
              .status(400)
              .json(err)

          } else {
            res
              .status(201)
              .json(dialogue)

          }

        });

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
