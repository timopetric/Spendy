
const login = (req, res) => {
    res.render('login',{
      title: 'Prijavna stran',
      stylesheets_load: ["/stylesheets/style.css", "/stylesheets/style-profil.css"],
      scripts_load: []
    });
  };

  module.exports = {
    login,
  };