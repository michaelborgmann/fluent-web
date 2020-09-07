const mongoose = require('mongoose');
const DialogueModel = mongoose.model('Dialogue');

// NOTE: This has no effect on saving a full document

const createMessage = function (req, res) {
  const dialogueid = req.params.dialogueid;
  if (dialogueid) {
    DialogueModel
      .findById(dialogueid)
      .select('messages')
      .exec((err, dialogue) => {
        if (err) {
          res
            .status(400)
            .json(err);
        } else {
          addMessage(req, res, dialogue);
        }
      }
    );
  } else {
    res
      .status(404)
      .json({
        "message": "Not found, dialogueid required"
      });
  }
};

const addMessage = function(req, res, dialogue) {

  if (!dialogue) {
    res
      .status(404)
      .json({ "message": "dialogueid not found" });
  } else {

    dialogue.messages.push({
      $each: req.body
    });

    dialogue.save((err, dialogue) => {
      if (err) {
        res
          .status(400)
          .json(err);
      } else {
        const thisMessage = dialogue.messages.slice(-req.body.length);//.pop();
        console.log(thisMessage);
        res
          .status(201)
          .json(thisMessage);
      }
    });

  }
};

module.exports = {
  createMessage
};