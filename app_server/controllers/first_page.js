// vrni prvo stran
const page = (req, res) => {
  res.render('first_page',{
    title: 'Uvodna stran',
    stylesheets_load: ["/stylesheets/first-pages.css"],
    scripts_load: ["https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js",
                   "/javascripts/first-page-chart.js"]
  });
};

module.exports = {
  page
};