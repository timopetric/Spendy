// vrni stran za prijavo
const page = (req, res) => {
    res.render('signup',{
        title: 'Registracijska stran',
        stylesheets_load: ["/stylesheets/style.css", "/stylesheets/style-prifle.css"],
        scripts_load: []
    });
};

module.exports = {
    page
};