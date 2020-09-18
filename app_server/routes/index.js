const express = require('express');
const router = express.Router();

const ctrlLocations = require('../controllers/locations');
const ctrlOthers = require('../controllers/others');
const lessonsController = require('../controllers/lessons');
const dialoguesController = require('../controllers/dialogues');

/* GET home page. */
//router.get('/', ctrlLocations.homelist);
router.get('/location', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview);
router.get('/about', ctrlOthers.about);

// Lessons & Dialoges

router.get('/', lessonsController.allLessons);

router
  //.route()'/dialogues/new')
  .route('/lessons/:lessonid/dialogue')
  .get(dialoguesController.createDialogue)
  .post(dialoguesController.addDialogue);

router.get('/dialogues/:dialogueid', dialoguesController.showDialogue);

router
  .route('/lessons/new')
  .get(lessonsController.createLesson)

router
  .route('/lessons/:lessonid')
  .get(lessonsController.showLesson);

router
  .route('/lessons/:lessonid/edit')
  .get(lessonsController.editLesson)
  .post(lessonsController.updateLesson);

module.exports = router;
