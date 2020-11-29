// vrni prvo stran
const login = require("./login");
const index = (req, res) => {
  const user = login.getUser();
  res.render('index',{
    title: 'Pregled',
    navbar_button_selected_index: true,
    stylesheets_load: [],
    scripts_load: ["https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js",
                   "/javascripts/pregled_chart.js"],
    uporabnik: user,
    skupine: user.groupIds,
  });
};

module.exports = {
  index,
};
