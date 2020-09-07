
const express = require('express');
const router = express.Router();

const lessonsController = require('../controllers/lessons');
const dialoguesController = require('../controllers/dialogues');
const messagesController = require('../controllers/messages');

// lessons
router
  .route('/lessons')
  .get(lessonsController.getAllLessons)
  .post(lessonsController.createLesson);

// dialogues
router
  .route('/dialogues/:lessonid')
  .post(dialoguesController.createDialogue);

router
  .route('/dialogues/:dialogueid')
  .get(dialoguesController.getDialogueById)

// messages
router
  .route('/dialogues/:dialogueid/message')
  .post(messagesController.createMessage);

module.exports = router;
