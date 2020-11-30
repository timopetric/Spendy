// vrni prvo stran
const page = (req, res) => {
  res.render('db',{
    title: 'Manual entry',
    stylesheets_load: ["/stylesheets/first-pages.css"],
    scripts_load: []
  });
};

module.exports = {
  page
};