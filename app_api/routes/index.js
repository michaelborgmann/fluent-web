
const express = require('express');
const router = express.Router();

const lessonsController = require('../controllers/lessons');
const dialoguesController = require('../controllers/dialogues');
const messagesController = require('../controllers/messages');

const ctrlLocations = require('../controllers/locations');
const ctrlReviews = require('../controllers/reviews');

// dialogues
router
  .route('/dialogues')
  .post(dialoguesController.createDialogue);

router
  .route('/dialogues/:dialogueid')
  .get(dialoguesController.getDialogueById)

// messages
router
  .route('/dialogues/:dialogueid/message')
  .post(messagesController.createMessage);

// lessons
router
  .route('/lessons')
  .get(lessonsController.getAllLessons)
  .post(lessonsController.createLesson);

// locations
router
  .route('/locations')
  .get(ctrlLocations.locationsListByDistance)
  .post(ctrlLocations.locationsCreate);

router
  .route('/locations/:locationid')
  .get(ctrlLocations.locationsReadOne)
  .put(ctrlLocations.locationsUpdateOne)
  .delete(ctrlLocations.locationsDeleteOne);

// reviews
router
  .route('/locations/:locationid/reviews')
  .post(ctrlReviews.reviewsCreate);

router
  .route('/locations/:locationid/reviews/:reviewid')
  .get(ctrlReviews.reviewsReadOne)
  .put(ctrlReviews.reviewsUpdateOne)
  .delete(ctrlReviews.reviewsDeleteOne);

module.exports = router;