const mongoose = require('mongoose');
const DialogueModel = mongoose.model('Dialogue');

// Create Message

const createMessage = async (req, res) => {
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
      });

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
        res
          .status(201)
          .json(thisMessage);
      }
    });

  }
};

// Update All Messages

const updateMessages = async (req, res) => {
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
          doUpdateMessages(req, res, dialogue);

        }
      });

  } else {
    res
      .status(404)
      .json({
        "message": "Not found, dialogueid required"
      });
  }
};

const doUpdateMessages = function(req, res, dialogue) {

  if (!dialogue) {
    res
      .status(404)
      .json({ "message": "dialogueid not found" });

  } else {

    req.body.forEach((message, index) => {
      dialogue.messages[index].type = message.type;
      dialogue.messages[index].sender = message.sender;
      dialogue.messages[index].target = message.target;
      dialogue.messages[index].source = message.source;
      dialogue.messages[index].audio = message.audio;
      dialogue.messages[index].notes = message.notes;
    });

    dialogue.save((err, dialogue) => {
      if (err) {
        res
          .status(400)
          .json(err);
      } else {
        const thisMessage = dialogue.messages.slice(-req.body.length);//.pop();
        res
          .status(201)
          .json(thisMessage);
      }
    });

  }
};

// Get Message by Index

const getMessageByIndex = function (req, res) {

  DialogueModel
    .findById(req.params.dialogueid)
    .select('messages.notes')
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

      const notes = dialogue.messages[req.params.index].notes;

      res
        .status(200)
        .json(notes)
    });

};

// Create Message by Index

const addNotes = function(req, res, dialogue) {

  if (!dialogue) {
    res
      .status(404)
      .json({ "message": "dialogueid not found" });

  } else {

    dialogue.messages[req.params.index].notes.push(req.body.notes);

    dialogue.save((err, dialogue) => {
      if (err) {
        res
          .status(400)
          .json(err);
      } else {
        const thisMessage = dialogue.messages.slice(-req.body.length);//.pop();
        res
          .status(201)
          .json(thisMessage);
      }
    });

  }
};

const createMessageByIndex = async (req, res) => {

  const dialogueid = req.params.dialogueid;

  if (dialogueid) {

    DialogueModel
      .findById(dialogueid)
      .select('messages.notes')
      .exec((err, dialogue) => {

        if (err) {
          res
            .status(400)
            .json(err);

        } else {
          addNotes(req, res, dialogue);
        }
      });

  } else {
    res
      .status(404)
      .json({
        "message": "Not found, dialogueid required"
      });
  }

};

// Update Message notes by Index

const doUpdateNotes = function(req, res, dialogue) {

  if (!dialogue) {
    res
      .status(404)
      .json({ "message": "dialogueid not found" });

  } else {

    dialogue.save((err, dialogue) => {

      if (err) {
        res
          .status(400)
          .json(err);
      } else {
        const thisMessage = dialogue.messages.slice(-req.body.length);//.pop();

        res
          .status(201)
          .json(thisMessage);
      }
    });

  }
};

const updateNotesByIndex = async (req, res) => {

  const dialogueid = req.params.dialogueid;

  if (dialogueid) {

    DialogueModel
      .findById(dialogueid)
      .select('messages.notes')
      .exec((err, dialogue) => {

        if (err) {
          res
            .status(400)
            .json(err);

        } else {
          dialogue.messages[req.params.index].notes = req.body.note;
          doUpdateNotes(req, res, dialogue);
        }
      });

  } else {
    res
      .status(404)
      .json({
        "message": "Not found, dialogueid required"
      });
  }
}

module.exports = {
  createMessage,
  updateMessages,
  getMessageByIndex,
  createMessageByIndex,
  updateNotesByIndex
};
