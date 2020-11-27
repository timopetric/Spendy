



const signup = (req, res) => {
  res.render('signup',{
    title: 'Registracijska stran',
    stylesheets_load: ["/stylesheets/style.css", "/stylesheets/style-profil.css"],
    scripts_load: []
  });
};
  module.exports = {
    signup,
  };