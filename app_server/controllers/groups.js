var apiParametri = {
  streznik: 'http://localhost:' + (process.env.PORT || 3000)
};
if (process.env.NODE_ENV === 'production') {
  apiParametri.streznik = 'https://sp-spendy.herokuapp.com';
}
const axios = require('axios').create({
  baseURL: apiParametri.streznik,
  timeout: 5000
});

const login = require("./login");

const groups = (req, res) => {
  console.log("Sem v skupinah");
  const userId = login.getUserId();

  axios.get(`/api/v1/users/${userId}/groups`)
      .then((odgovor) => {
        console.log("To je odgovor v skupinah " + odgovor.data);
        izpisiSkupine(req, res, odgovor.data);
      })
      .catch((err) => {
        console.log(err);
        izpisiSkupine(req, res, "VELIKA NAPAKA");
      });
};


const izpisiSkupine = (req, res, grupe) => {
  res.render('groups',{
    title: 'Skupine',
    navbar_button_selected_groups: true,
    skupine: grupe,
    stylesheets_load: ["/stylesheets/styleGroups.css"],
    scripts_load: [
      "/javascripts/jquery-3.5.1.min.js",
      "/javascripts/popper.min.js", "/javascripts/bootstrap/bootstrap.min.js",
      "https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js"
    ]
  });
};



/*const groups = (req, res) => {
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
    ]
  });
};*/

module.exports = {
  groups,
  izpisiSkupine,
};