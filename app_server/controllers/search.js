const search = (req, res) => {
  res.render('search',{
    title: 'Poišči aktivnosti',
    navbar_button_selected_search: true,
    subtitle: "Poglej si svoje aktivnosti in jih urejaj ",
    stylesheets_load: ["https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css"],
    scripts_load: ["https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"]
  });
};

module.exports = {
  search,
};