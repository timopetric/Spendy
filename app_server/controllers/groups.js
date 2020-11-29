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


const getUserData = (userId) => {
    try {
        return axios.get(`/api/v1/users/${userId}`);
    } catch (error) {
        console.error(error);
    }
};
const getGropData = async (skupina) => {
    try {
        return await axios.get(`/api/v1/groups/${skupina}`)
    } catch (error) {
        console.error(error);
    }
};



const groups = (req, res) => {
  console.log("Sem v skupinah");
  const userId = login.getUserId();
  console.log("sem v groups")
    let skupineList = [];
  getUserData(userId).then((response) =>{


      var skupineId = response.data.groupIds;

      console.log("To je odgovor v skupinah " + skupineId);
      console.log(skupineId);

      for (let i = 0; i < skupineId.length; i++) {
          var skupina = skupineId[i]._id;
          var ime = {};
          getGropData(skupina).then(response =>{
              const skupinaData = response.data;
              skupineList.push(skupinaData)
              console.log(skupinaData);

              if (i === skupineId.length-1) {

                  console.log("################################");
                  console.log(skupineList);
                  console.log(skupineList.length);
                  const user = login.getUser();

                  res.render('groups',{
                      title: 'Skupine',
                      navbar_button_selected_groups: true,
                      uporabnik: user,
                      skupine: skupineList,
                      stylesheets_load: ["/stylesheets/styleGroups.css"],
                      scripts_load: [
                          "/javascripts/jquery-3.5.1.min.js",
                          "/javascripts/popper.min.js",
                          "https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js"
                      ]
                  });

              }
          })
          .catch((err) => {
              console.log(err);
          })

      }

      // izpisiSkupine(req, res, skupineList);
  })
      .catch((err) => {
      console.log(err);
  })





}


const izpisiSkupine = (req, res, grupe) => {


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