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

// Create Note

const renderNotesAddForm = (req, res) => {
  res.render('notes-add-form', {
    title: 'Add Note to Message',
    pageHeader: { title: 'Add Note' }
  });
};

const createNote = (req, res) => {
    renderNotesAddForm(req, res);
};

const addNote = (req, res) => {

  const path = `/api/dialogues/${req.params.dialogueid}/message/${req.params.messageid}`;

  const postData = { "notes": req.body.note };

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

// Edit Notes

const renderNotesEditForm = (req, res, body) => {

  res.render('notes-edit-form', {
    title: 'Update Notes to Message',
    pageHeader: { title: 'Edit Note' },
    notes: body
  });
};

const editNotes = (req, res) => {

  const path = `/api/dialogues/${req.params.dialogueid}/message/${req.params.messageid}`;

  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {}
  }

  request(requestOptions, (err, response, body) => {
    renderNotesEditForm(req, res, body);
  });

};

const updateNotes = (req,res) => {

  const path = `/api/dialogues/${req.params.dialogueid}/message/${req.params.messageid}`;

  const postData = req.body;

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
}

module.exports = {
  createNote,
  addNote,
  editNotes,
  updateNotes
}
