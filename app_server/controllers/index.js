// vrni prvo stran
const index = (req, res) => {
  res.render('index',{
    title: 'Pregled',
    stylesheets_load: [],
    scripts_load: ["https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js",
                   "/javascripts/pregled_chart.js"]
  });
};

module.exports = {
  index
};