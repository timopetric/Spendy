

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
  

const seznamAktivnosti = (req, res) => {
    console.log("jou")
    axios
      .get('/api/v1/expenses')
      .then((odgovor) => {
        let sporocilo =
          odgovor.data.length ? null : "Ni aktivnosti.";
        odgovor.data.map(lokacija => {
          return lokacija;
        });
        console.log(odgovor.data);
        search(req, res, odgovor.data, sporocilo);
      })
      .catch((err) => {
        console.log(err);
        search(req, res, [], "Napaka API-ja pri iskanju expensov.");
      });
  };


const search = (req, res, aktivnosti, sporocilo) => {
  res.render('search',{
    title: 'Poišči aktivnosti',
    navbar_button_selected_search: true,
    subtitle: "Poglej si svoje aktivnosti in jih urejaj ",
    stylesheets_load: ["https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css"],
    scripts_load: ["https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js", "https://kit.fontawesome.com/a076d05399.js", "/javascripts/modal_script.js"],
    aktivnosti: aktivnosti,
    sporocilo: sporocilo
  });
};

module.exports = {
  search,
  seznamAktivnosti,
  
};