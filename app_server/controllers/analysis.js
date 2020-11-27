const analysis = (req, res) => {
    res.render('analysis',{
      title: 'Analiza',
      stylesheets_load: [""],
      scripts_load: ["https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js",
        "/javascripts/first-page-chart.js", "/javascripts/analysis_script.js"]
    });
  };
  
  module.exports = {
    analysis,
  };