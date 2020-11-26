
const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');


const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload',
  algorithms: ['sha512', 'RS256', 'HS256'],
});

const authController = require('../controllers/authentication');
const coursesController = require('../controllers/courses');
const lessonsController = require('../controllers/lessons');
const dialoguesController = require('../controllers/dialogues');
const messagesController = require('../controllers/messages');

// authentication
router.post('/register', authController.register);
router.post('/login', authController.login);

// courses
router
  .route('/courses')
  .get(auth, coursesController.getAllCourses)
  .post(coursesController.createCourse);

// lessons
router
  .route('/lessons')
  .get(auth, lessonsController.getAllLessons)
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
  .post(messagesController.createMessage)
  .put(messagesController.updateMessages);

router
  .route('/dialogues/:dialogueid/message/:index')
  .get(messagesController.getMessageByIndex)
  .post(messagesController.createMessageByIndex)
  .put(messagesController.updateNotesByIndex);

module.exports = router;
