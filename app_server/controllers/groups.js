const login = require("./login");
const groups = (req, res) => {
  if (login.getUser() == null) return res.redirect("/login");

  const user = login.getUser();
  res.render('groups',{
    title: 'Skupine',
    navbar_button_selected_groups: true,
    skupina1:{
      imeSkupine: 'Družina',
      admin: 'Oče',
      clani: ['Mati', 'Sin', 'Hči'],

    },
    skupina2:{
      imeSkupine: 'Košarka',
      admin: 'Janez Novak',
      clani: ['Matic Bregar', 'Kristjan Sever', 'Timotej Petrič', 'Aljaž Grdadolnik']

    },
    stylesheets_load: ["/stylesheets/styleGroups.css"],
    scripts_load: [
        "/javascripts/jquery-3.5.1.min.js",
        "/javascripts/popper.min.js", "/javascripts/bootstrap/bootstrap.min.js",
        "https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js"
    ],
    uporabnik:user,
    skupine: user.groupIds
  });
};

module.exports = {
  groups,
};