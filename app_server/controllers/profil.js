const profil = (req, res) => {
    res.render('profil',{
      title: 'Profil',
      uporabnik: {
        ime: 'Janez',
        priimek: 'Novak',
        telefon: '++38631000000',
        email: 'janeznovak@gmail.com'
      },
      stylesheets_load: ["/stylesheets/style-profil.css"],
      scripts_load: [],
    });
  };
  
  module.exports = {
    profil,
  };