const mongoose = require('mongoose');
const DialogueModel = mongoose.model('Dialogue');

const createDialogue = function (req, res) {

  DialogueModel.create({
    targetLanguage: req.body.targetLanguage,
    sourceLanguage: req.body.sourceLanguage,
    messages: req.body.messages

  }, (err, dialogue) => {
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
};

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
