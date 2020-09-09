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

  const path = '/api/lessons';;

  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {},
  };

  request(requestOptions, (err, response, body) => {
    renderWebsite(req, res, body);
  });

}

module.exports = {
  allLessons
}
