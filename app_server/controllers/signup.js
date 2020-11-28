const signup = (req, res) => {
  res.render('signup',{
    title: 'Registracijska stran',
    navbar_button_selected_signup: true,
    stylesheets_load: ["/stylesheets/style.css", "/stylesheets/style-profil.css"],
    scripts_load: []
  });
};
  module.exports = {
    signup,
  };