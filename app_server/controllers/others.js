/* GET home page */
const about = function(req, res){
  res.render('generic-text', {
    title: 'About Fluent',
    content: 'Fluent is a language learning app powered by a language learning platform.'
  });
};

module.exports = {
  about
};
