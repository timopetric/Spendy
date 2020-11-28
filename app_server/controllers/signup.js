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


//const login = require("./login"); // server-login

const registrirajUporabnika = (req, res) => {
  //const userId = login.getUserId(); //server-login
  // username = req
  //console.log(req);
  axios({
    method: 'post',
    url: '/api/v1/users/',
    data: {
      username: req.body.username,
      name: req.body.name,
      surname: req.body.surname,
      mail: req.body.email,
      pass: req.body.password,
      /*username: "ŠeStaticno",
      name: "ŠeStaticno",
      surname: "ŠeStaticno",
      mail: "ŠeStaticno",
      pass: "ŠeStaticno",*/
    }
  }).then((response) => {
    //console.log(response);
    res.redirect('/login');
  }).catch((napaka) => {
    console.log(napaka);
  });
};
/*function registrirajUporabnika() {
  axios.post('/api/v1/users', {
    username: 'uporabnik',
    name: 'izmisljen',
    surname: 'tudiizmisljen',
    mail: 'ti@gmail.com',
    pass: 'geslo'
  })
  .then(function (res) {
    console.log(res);
  })
  .catch(function (err) {
    console.log(err);
  })
}*/

/*axios.post('/api/v1/users', {
  username: 'uporabnik',
  name: 'izmisljen',
  surname: 'tudiizmisljen',
  mail: 'ti@gmail.com',
  pass: 'geslo'
})
    .then(function (res) {
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    })*/



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
    registrirajUporabnika,

  };