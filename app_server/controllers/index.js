// vrni prvo stran
const index = (req, res) => {
  res.render('index',{
    title: 'Pregled',
    stylesheets_load: [],
    scripts_load: ["https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js",
                   "/javascripts/pregled_chart.js"]
  });
};

const add_expenses = (req, res) => {
  res.render('add_expenses',{
    title: 'Dodaj',
    stylesheets_load: ["https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css"],
    scripts_load: []
  });
};
const analysis = (req, res) => {
  res.render('analysis',{
    title: 'Analiza',
    stylesheets_load: ["https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css"],
    scripts_load: ["https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js",
      "/javascripts/first-page-chart.js", "/javascripts/analysis_script.js"]
  });
};
const graphs = (req, res) => {
  res.render('graphs',{
    title: 'Grafično',
    stylesheets_load: ["https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css"],
    scripts_load: ["https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js",
      "/javascripts/first-page-chart.js", "/javascripts/graphs_script.js"]
  });
};

module.exports = {
  index,
  add_expenses,
  analysis,
  graphs,
};