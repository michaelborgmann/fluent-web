
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

router
  .route('/lessons/:lessonid')
  .get(lessonsController.getLessonById)
  .post(lessonsController.updateLesson)

router
  .route('/lessons/:lessonid/imageURL')
  .get(lessonsController.getLessonImageUrl)
  .put(lessonsController.updateLessonImageUrl);

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
