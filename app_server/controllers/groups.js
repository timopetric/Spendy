const groups = (req, res) => {
    res.render('groups',{
      title: 'Skupine',
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
    groups,
  };