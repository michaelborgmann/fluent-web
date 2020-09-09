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

  request(requestOptions, (err, response, body) => {
    renderWebsite(req, res, body);
  });
}

module.exports = {
  showDialogue
}
