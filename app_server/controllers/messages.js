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

// Create New Message

const renderMessageAddForm = (req, res) => {
  res.render('message-add-form', {
    title: 'Add Message to Dialogue',
    pageHeader: { title: 'Add Message' }
  });
};

const createMessage = (req, res) => {
    renderMessageAddForm(req, res);
};

const addMessage = (req, res) => {

  const path = `/api/dialogues/${req.params.dialogueid}/message`;

  const postData = [{
    type: req.body.type,
    sender: req.body.sender,
    target: req.body.target,
    source: req.body.source,
    audio: req.body.audio,
  }];

  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'POST',
    json: postData
  };

  request(requestOptions, (err, {statusCode}, body) => {

    if (statusCode === 201) {
      res.redirect(`/dialogues/${req.params.dialogueid}`);

    } else {
      showError(req, res, statusCode);
    }

  });

};

// Edit Message

const renderMessageEditForm = (req, res, responseBody) => {

  let message = null;

  if (!(responseBody.messages instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if (!responseBody.messages.length) {
      message = "No messages found";
    }
  }

  res.render('message-edit-form', {
    title: 'Edit Messages',
    pageHeader: { title: 'Edit Messages' },
    messages: responseBody.messages,
    message
  });
};

const editMessage = (req, res) => {

  const path = `/api/dialogues/${req.params.dialogueid}`;

  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {}
  }

  request(requestOptions, (err, response, body) => {
    renderMessageEditForm(req, res, body);
  });

};

const updateMessage = (req, res) => {

  const path = `/api/dialogues/${req.params.dialogueid}/message`;

  const postData = req.body.type.map((type, index) => {
    return {
      type: req.body.type[index],
      sender: req.body.sender[index],
      target: req.body.target[index],
      source: req.body.source[index],
      audio: req.body.audio[index],
    }
  });

  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'PUT',
    json: postData
  };

  request(requestOptions, (err, {statusCode}, body) => {

    if (statusCode === 201) {
      res.redirect(`/dialogues/${req.params.dialogueid}`);

    } else {
      showError(req, res, statusCode);
    }

  });

};

module.exports = {
  createMessage,
  addMessage,
  editMessage,
  updateMessage
}
