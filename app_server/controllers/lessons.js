const request = require('request');

const apiOptions = {
  server: 'http://localhost:3000'
};

/*
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://lit-tor-33173.herokuapp.com';
}
*/

const renderWebsite = (req, res, responseBody) => {

  let message = null;

  if (!(responseBody instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = "No lessons found";
    }
  }

  res.render('lessons-all', {
    title: 'Fluent - Language Learning',
    pageHeader: {
      title: 'Fluent',
      strapline: 'Lessons'
    },
      lessons: responseBody,
      message
  });
};

const allLessons = (req, res) => {

  const path = '/api/lessons';

  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {},
  };

  request(requestOptions, (err, response, body) => {
    renderWebsite(req, res, body);
  });

}

const renderShowLesson = (req, res, responseBody) => {

  let message = null;

  if (!(responseBody instanceof Object)) {
    message = "API lookup error";
    responseBody = [];
  } else {

    /* NOTE: Deactivated because Object not Array
    if (!responseBody.length) {
      message = "No lessons found";
    }
    */

  }

  const response = {
      title: 'Fluent - Language Learning',
      pageHeader: {
        title: 'Fluent',
        strapline: 'Show Lesson'
      },
      responseBody,
      message
  };

  console.log(responseBody);

  res.render('lesson-info', {
    title: 'Fluent - Language Learning',
    pageHeader: {
      title: 'Fluent',
      strapline: 'Show Lesson'
    },
    lesson: responseBody,
    message
  });

};

const showLesson = (req, res) => {

  const path = `/api/lessons/${req.params.lessonid}`;

  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {}
  }

  request(requestOptions, (err, response, body) => {
    renderShowLesson(req, res, body);
  });

};

const renderLessonForm = (req, res) => {
  res.render('lesson-add-form', {
    title: 'Add new Lesson to Fluent',
    pageHeader: { title: 'Add Lesson' }
  });
};

const createLesson = (req, res) => {
  renderLessonForm(req, res);
}

const addLesson = (req, res) => {

  const path = '/api/lessons';

  const postData = {
    title: req.body.title,
    translation: req.body.translation,
    //cloudinary: req.body.cloudinary
  };

  console.log(postData);

  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'POST',
    json: postData
  };

  request(requestOptions, (err, {statusCode}, body) => {

    if (statusCode === 201) {
      //res.redirect(`/lessons/${locationid}`);
      res.redirect(`/`);

    } else {
      showError(req, res, statusCode);
    }

  });

};

module.exports = {
  allLessons,
  createLesson,
  showLesson,
  addLesson
}
