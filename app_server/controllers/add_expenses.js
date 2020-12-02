var apiParametri = {
    streznik: "http://localhost:" + (process.env.PORT || 3000),
};
if (process.env.NODE_ENV === "production") {
    apiParametri.streznik = "https://sp-spendy.herokuapp.com";
}
const axios = require("axios").create({
    baseURL: apiParametri.streznik,
    timeout: 5000,
});

const login = require("./login");

const add_expenses = (req, res) => {
    if (login.getUser() == null) return res.redirect("/login");

    let uspelo = req.query.uspelo;
    uspelo = uspelo ? "visible" : "hidden";

    ///api/v1/users/5fc2be754b842a045038d5ca
    //console.log('/api/v1/users/'+ userid);
    // let groups = [];

    const user = login.getUser();
    res.render("add_expenses", {
        title: "Dodaj",
        stylesheets_load: [
            "https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css",
        ],
        scripts_load: [
            "https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js",
        ],
        skupine: user.groupIds,
        uporabnikId: user._id,
        uporabnik: user,
        uspesno: uspelo,
    });
};

module.exports = {
    add_expenses,
};
