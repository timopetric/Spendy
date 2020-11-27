// vrni prvo stran
const index = (req, res) => {
  res.render('index',{
    title: 'Pregled',
    navbar_button_selected_index: true,
    stylesheets_load: [],
    scripts_load: ["https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js",
                   "/javascripts/pregled_chart.js"]
  });
};

const add_expenses = (req, res) => {
  res.render('add_expenses',{
    title: 'Dodaj',
    stylesheets_load: ["https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css"],
    scripts_load: ["https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"],
    naslov: 'Dodajanje prihodkov/odhodkov',
    opis: 'Tukaj dodate prihodke/odhodke'
  });
};
const analysis = (req, res) => {
  res.render('analysis',{
    title: 'Analiza',
    navbar_button_selected_analysis: true,
    stylesheets_load: [""],
    scripts_load: ["https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js",
      "/javascripts/first-page-chart.js", "/javascripts/analysis_script.js"]
  });
};
const graphs = (req, res) => {
  res.render('graphs',{
    title: 'Grafično',
    navbar_button_selected_graphs: true,
    stylesheets_load: ["https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css"],
    scripts_load: ["https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js",
      "/javascripts/first-page-chart.js", "/javascripts/graphs_script.js"],
    naslov: 'Grafično',
    opis: 'Grafični prikazi prihodkov, odhodkov in stanja'
  });
};

const login = (req, res) => {
  res.render('login',{
    title: 'Prijavna stran',
    stylesheets_load: ["/stylesheets/style.css", "/stylesheets/style-profil.css"],
    scripts_load: []
  });
};

const signup = (req, res) => {
  res.render('signup',{
    title: 'Registracijska stran',
    stylesheets_load: ["/stylesheets/style.css", "/stylesheets/style-profil.css"],
    scripts_load: []
  });
};

const profil = (req, res) => {
  res.render('profil',{
    title: 'Profil',
    uporabnik: {
      ime: 'Janez',
      priimek: 'Novak',
      telefon: '++38631000000',
      email: 'janeznovak@gmail.com'
    },
    stylesheets_load: ["/stylesheets/style-profil.css"],
    scripts_load: [],
  });
};

const settings = (req, res) => {
  res.render('settings',{
    title: 'Nastavitve profila',
    stylesheets_load: ["/stylesheets/style-profil.css"],
    scripts_load: []
  });
};

const groups = (req, res) => {
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
    scripts_load: ["/javascripts/jquery-3.5.1.min.js",
      "/javascripts/popper.min.js", "/javascripts/bootstrap/bootstrap.min.js",
    "https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js"]
  });
};

module.exports = {
  index,
  add_expenses,
  analysis,
  graphs,
  login,
  signup,
  profil,
  settings,
  groups,
};