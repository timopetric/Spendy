// vrni prvo stran
const page = (req, res) => {
    res.render("first_page", {
        title: "Napaka",
        stylesheets_load: ["/stylesheets/first-pages.css"],
        scripts_load: [],
    });
};

module.exports = {
    page,
};
