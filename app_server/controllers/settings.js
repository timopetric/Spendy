const settings = (req, res) => {
    res.render('settings',{
      title: 'Nastavitve profila',
      stylesheets_load: ["/stylesheets/style-profil.css"],
      scripts_load: []
    });
  };
  
module.exports = {
    settings,
};