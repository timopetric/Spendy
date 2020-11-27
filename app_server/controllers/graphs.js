const graphs = (req, res) => {
    res.render('graphs',{
      title: 'Grafično',
      stylesheets_load: ["https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css"],
      scripts_load: ["https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js",
        "/javascripts/first-page-chart.js", "/javascripts/graphs_script.js"]
    });
  };
  
  module.exports = {
    graphs,
  };