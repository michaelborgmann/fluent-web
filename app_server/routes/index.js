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
router.get('/dialogues/:dialogueid', dialoguesController.showDialogue);
// router.get('/dialogue/:dialogueid', dialoguesController.asdf);

router
  .route('/lessons/new')
  .get(lessonsController.createLesson)
  .post(lessonsController.addLesson);

  router.get('/lessons/:lessonid', lessonsController.showLesson);

module.exports = router;
