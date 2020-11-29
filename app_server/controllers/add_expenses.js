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

const add_expenses = (req, res) => {
  const userid = login.getUserId();

  // todo: uncomment in production
  // if(!userid) {
  //   res.redirect("/login");
  // }

  ///api/v1/users/5fc2be754b842a045038d5ca
  //console.log('/api/v1/users/'+ userid);
  // let groups = [];
  axios.get(`/api/v1/users/${userid}`).then(resp => {

     groups = resp.data.groupIds;
     console.log(groups);
    res.render('add_expenses',{
      title: 'Dodaj',
      stylesheets_load: ["https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css"],
      scripts_load: ["https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"],
      skupine: groups,
      uporabnikId:userid,

    });
  }).catch(function (error) {
    res.status(400).json({"message": `Za uporabnika ${userid} ne najdem group. Error ${error}`});
  });



};

module.exports = {
  add_expenses,
};

