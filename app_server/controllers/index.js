// vrni prvo stran
const login = require("./login");


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
function pridobiPrihodkeSkupine(skupinaId){
  try {
    return axios.get(`/api/v1/groups/${skupinaId}/expenses?isExpenditure=false&date=desc`);
  }catch (error) {
    console.error(error);
  }
}
function pridobiOdhodkeSkupine(skupinaId){
  try {
    return axios.get(`/api/v1/groups/${skupinaId}/expenses?isExpenditure=true&date=desc`);
  }catch (error) {
    console.error(error);
  }
}
function pridobiOboje(skupinaId){
  try {
    return axios.get(`/api/v1/groups/${skupinaId}/expenses?date=desc`);
  }catch (error) {
    console.error(error);
  }
}



let odhodki = [];
let prihodki = [];
let oboje = [];
const index = (req, res) => {
  if (login.getUser() == null) return res.redirect("/login");
  const user = login.getUser();

  let selectedGroup = req.query.groupId;
  if(selectedGroup) {
    pridobiOdhodkeSkupine(selectedGroup).then(response => {
      if (response.data) {

        for (let i = 0; i < response.data.expenses.length; i++) {
          let tmp = [0, 0];
          tmp[0] = new Date(response.data.expenses[i].date).getTime();
          tmp[1] = response.data.expenses[i].cost;
          odhodki.unshift(tmp);
        }
        pridobiPrihodkeSkupine(selectedGroup).then(res1 => {
          if (res1.data) {
            for (let i = 0; i < res1.data.expenses.length; i++) {
              let tmp = [0, 0];
              tmp[0] = new Date(res1.data.expenses[i].date).getTime();
              tmp[1] = res1.data.expenses[i].cost;
              prihodki.unshift(tmp);
            }
          }
          let trenutnaSkupina = null;
          for(let i = 0 ; i < user.groupIds.length ; i++){
            if(user.groupIds[i]._id == selectedGroup){
              trenutnaSkupina = user.groupIds[i];
            }
          }
          pridobiOboje(selectedGroup).then(res2 => {
            if(res2.data){

              for (let i = 0; i < res1.data.expenses.length; i++) {
                let tmp = [0, 0];
                tmp[0] = new Date(res1.data.expenses[i].date).getTime();
                tmp[1] = res1.data.expenses[i].cost;
                oboje.unshift(tmp);
              }
              oboje = oboje.slice(oboje.length-5,oboje.length);
              res.render('index', {
                title: 'Pregled',
                navbar_button_selected_index: true,
                stylesheets_load: [],
                scripts_load: ["https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js",
                  "/javascripts/pregled_chart.js"],
                uporabnik: user,
                skupine: user.groupIds,
                trenutnaSkupina: trenutnaSkupina,
                expenses: {
                  'prihodki': prihodki,
                  'odhodki': odhodki,
                  'oboje' : oboje,
                },
              });
            }
          }).catch(error => {
            console.log(error);
          });

        }).catch(error => {
          console.log(error);
        });
      }
    }).catch(error => {
      console.log(error);
    });
  }else{
    res.render('index', {
      title: 'Pregled',
      navbar_button_selected_index: true,
      stylesheets_load: [],
      scripts_load: ["https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js",
        ],
      uporabnik: user,
      skupine: user.groupIds,
      expenses: {
        'prihodki': prihodki,
        'odhodki': odhodki,
      },});
  }

};

module.exports = {
  index,
};
