const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

const reviewsCreate = function (req, res) {
  const locationid = req.params.locationid;
  if (locationid) {
    Loc
      .findById(locationid)
      .select('reviews')
      .exec((err, location) => {
        if (err) {
          res
            .status(400)
            .json(err);
        } else {
          _doAddReview(req, res, location);
        }
      }
    );
  } else {
    res
      .status(404)
      .json({
        "message": "Not found, locationid required"
      });
  }
};

const reviewsReadOne = (req, res) => {
  Loc
    .findById(req.params.locationid)
    .select('name reviews')
    .exec((err, location) => {
      if (!location) {
        return res
          .status(404)
          .json({
            "message": "location not found"
          });
      } else if (err) {
        return res
          .status(404)
          .json(err);
      }
      if (location.reviews && location.reviews.length > 0) {
        const review = location.reviews.id(req.params.reviewid);
        if (!review) {
          return res
            .status(400)
            .json({
              "message": "review not found"
            });
        } else {
          response = {
            location : {
              name : location.name,
              id : req.params.locationid
            },
            review
          };
          return res
            .status(200)
            .json(response);
        }
      } else {
        return res
          .status(404)
          .json({
            "message": "No reviews found"
          });
      }
    }
  );
};

const reviewsUpdateOne = function (req, res) {
  if (!req.params.locationid || !req.params.reviewid) {
    res
      .status(404)
      .json({
        "message": "Not found, locationid and reviewid are both required"
      });
    return;
  }
  Loc
    .findById(req.params.locationid)
    .select('reviews')
    .exec((err, location) => {
      if (!location) {
        res
          .status(404)
          .json({
            "message": "locationid not found"
          });
        return;
      } else if (err) {
        res
          .status(400)
          .json(err);
        return;
      }
      if (location.reviews && location.reviews.length > 0) {
        let thisReview = location.reviews.id(req.params.reviewid);
        if (!thisReview) {
          res
            .status(404)
            .json({
              "message": "reviewid not found"
            });
        } else {
          thisReview.author = req.body.author;
          thisReview.rating = req.body.rating;
          thisReview.reviewText = req.body.reviewText;
          location.save((err, location) => {
            if (err) {
              res
                .status(404)
                .json(err);
            } else {
              _updateAverageRating(location._id);
              res
                .status(200)
                .json(thisReview);
            }
          });
        }
      } else {
        res
          .status(404)
          json({
            "message": "No review to update"
          });
      }
    }
  );
};


const reviewsDeleteOne = function (req, res) {
  if (!req.params.locationid || !req.params.reviewid) {
    res
      .status(404)
      .json({
        "message": "Not found, locationid and reviewid are both required"
      });
    return;
  }
  Loc
    .findById(req.params.locationid)
    .select('reviews')
    .exec((err, location) => {
      if (!location) {
        res
          .status(404)
          .json({
            "message": "locationid not found"
          });
        return;
      } else if (err) {
        res
          .status(400)
          .json(err);
        return;
      }
      if (location.reviews && location.reviews.length > 0) {
        if (!location.reviews.id(req.params.reviewid)) {
          res
            .status(404)
            .json({
              "message": "reviewid not found"
            });
        } else {
          location.reviews.id(req.params.reviewid).remove();
          location.save((err) => {
            if (err) {
              res
                .status(404)
                .json(err);
            } else {
              _updateAverageRating(location._id);
              res
                .status(204)
                .json(null);
            }
          });
        }
      } else {
        res
          .status(404)
          .json({
            "message": "No review to delete"
          });
      }
    }
  );
};

const _doAddReview = function(req, res, location) {
  if (!location) {
    res
      .status(404)
      .json({ "message": "locationid not found" });
  } else {
    location.reviews.push({
      author: req.body.author,
      rating: req.body.rating,
      reviewText: req.body.reviewText
    });
    location.save((err, location) => {
      if (err) {
        res
          .status(400)
          .json(err);
      } else {
        _updateAverageRating(location._id);
        const thisReview = location.reviews.slice(-1).pop();
         res
           .status(201)
           .json(thisReview);
      }
    });
  }
};

const _updateAverageRating = function(locationid) {
  Loc
    .findById(locationid)
    .select('rating reviews')
    .exec((err, location) => {
      if (!err) {
        _doSetAverageRating(location);
      }
    });
};

const _doSetAverageRating = function(location) {
  if (location.reviews && location.reviews.length > 0) {
    const reviewCount = location.reviews.length;
    let ratingTotal = 0;
    for (let i = 0; i < reviewCount; i++) {
      ratingTotal = ratingTotal + location.reviews[i].rating;
    }
    let ratingAverage = parseInt(ratingTotal / reviewCount, 10);
    location.rating = ratingAverage;
    location.save((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Average rating updated to", ratingAverage);
      }
    });
  }
};

module.exports = {
  reviewsCreate,
  reviewsReadOne,
  reviewsUpdateOne,
  reviewsDeleteOne
};
