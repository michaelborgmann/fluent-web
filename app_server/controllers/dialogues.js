const request = require('request');

const apiOptions = {
  server: 'http://localhost:3000'
};

if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://lit-tor-33173.herokuapp.com';
}


const showError = (req, res, status) => {
  let title = '';
  let content = '';

  if (status === 404) {
    title = '404, page not found';
    content = 'Oooops. Looks like you can\'t find this page. Sorry.';

  } else {
    title = `${status}, something's gone wrong`;
    content = 'Something, somewhere, has gone just a little bit wrong.';
  }

  res.status(status);

  res.render('generic-text', { title, content });
};

const renderWebsite = (req, res, responseBody) => {

  let message = null;

  if (!(responseBody instanceof Object)) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if (!responseBody.messages.length) {
      message = "No dialogue found";
    }
  }

   res.render('dialogue', {
     title: 'Fluent - Language Learning',
     pageHeader: {
       title: 'Fluent',
       strapline: 'Dialogue'
     },
     dialogue: responseBody,
     message
   });

};


const showDialogue = (req, res) => {

  const path = `/api/dialogues/${req.params.dialogueid}`;

  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {}
  };

  request(requestOptions, (err, {statusCode}, body) => {
    if (statusCode === 200) {
      renderWebsite(req, res, body);

    } else {
      showError(req, res, statusCode);
    }
  });
}

module.exports = {
  showDialogue
}
