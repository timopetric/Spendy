
const login = (req, res) => {
  res.render('login',{
    title: 'Prijavna stran',
    navbar_button_selected_login: true,
    stylesheets_load: ["/stylesheets/style.css", "/stylesheets/style-profil.css"],
    scripts_load: ["/javascripts/checkLogin.js"]
  });
};

var userIdCurrent = null;
const loginServer = (req, res) => {
  // todo
  userIdCurrent = req.body.user_id;
  if (userIdCurrent)
    res.status(200);
  else
    res.status(404);
};

function getUserId() {
  return userIdCurrent;
}


module.exports = {
  login,
  loginServer,
  getUserId
};