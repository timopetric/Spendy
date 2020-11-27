
const login = (req, res) => {
  res.render('login',{
    title: 'Prijavna stran',
    navbar_button_selected_login: true,
    stylesheets_load: ["/stylesheets/style.css", "/stylesheets/style-profil.css"],
    scripts_load: ["/javascripts/checkLogin.js"]
  });
};

module.exports = {
  login,
};