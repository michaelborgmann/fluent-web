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

// Get Dialogue

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

  if (!req.params.dialogueid) {
    console.log('dialogueid not found');

    createDialogue()
  } else {
    console.log('dialogueid is ' + req.params.dialogueid);
  }

  const path = `/api/dialogues/${req.params.dialogueid}`;

  console.log(path)

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

// Create New Dialogue

const renderDialogeAddForm = (req, res) => {
  res.render('dialogue-add-form', {
    title: 'Add Dialogue to Lesson',
    pageHeader: { title: 'Add Dialogue' }
  });
};

const createDialogue = (req, res) => {
    renderDialogeAddForm(req, res);
};

const addDialogue = (req, res) => {

  const path = `/api/dialogues/${req.params.lessonid}`;

  const postData = [{
    targetLanguage: req.body.targetLanguage,
    sourceLanguage: req.body.sourceLanguage
  }];

  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'POST',
    json: postData
  };

  request(requestOptions, (err, {statusCode}, body) => {

    console.log(err);

    if (statusCode === 201) {
      //res.redirect(`/lessons/${locationid}`);
      res.redirect(`/`);

    } else {
      showError(req, res, statusCode);
    }

  });

};

module.exports = {
  showDialogue,
  createDialogue,
  addDialogue
}
