
const login = (req, res) => {
  res.render('login',{
    title: 'Prijavna stran',
    navbar_button_selected_login: true,
    stylesheets_load: ["/stylesheets/style.css", "/stylesheets/style-profil.css"],
    scripts_load: ["/javascripts/checkLogin.js"]
  });
};

var userIdCurrent = null;
var userGroups = null;
var user = null;
const loginServer = (req, res) => {
  userIdCurrent = req.body.user_id;
  userGroups = req.body.groupIds;
  user = req.body.user;
  console.log(userGroups);
  if (userIdCurrent)
    res.status(200);
  else
    res.status(404);
};

function getUserId() {
  return userIdCurrent;
}
function getUserGroups(){
  return userGroups;
}
function getUser(){
  return user;
}


module.exports = {
  login,
  loginServer,
  getUserId,
  getUserGroups,
  getUser,
};