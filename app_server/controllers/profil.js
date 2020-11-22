// vrni stran za prijavo
const page = (req, res) => {
    res.render('profil',{
        title: 'Profil',
        stylesheets_load: ["/stylesheets/style-profil.css"],
        scripts_load: []
    });
};

module.exports = {
    page
};