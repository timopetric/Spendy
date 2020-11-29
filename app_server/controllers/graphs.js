const login = require("./login");

const graphs = (req, res) => {
  const user = login.getUser();
  res.render('graphs',{
    title: 'Grafično',
    navbar_button_selected_graphs: true,
    stylesheets_load: ["https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css"],
    scripts_load: ["https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js",
      "/javascripts/first-page-chart.js", "/javascripts/graphs_script.js"],
    skupine: user.groupIds,
    uporabnik: user,
  });
};
  
module.exports = {
  graphs,
};