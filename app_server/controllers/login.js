// vrni stran za prijavo
const page = (req, res) => {
    res.render('login',{
        title: 'Prijavna stran',
        stylesheets_load: ["/stylesheets/style.css", "/stylesheets/style-prifle.css"],
        scripts_load: []
    });
};

module.exports = {
    page
};