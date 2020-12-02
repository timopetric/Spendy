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

const login = require("./login"); // server-login

const profil = (req, res) => {
    if (login.getUser() == null) return res.redirect("/login");

    console.log("Sem v uporabniku");
    const userId = login.getUserId(); // server-login
    axios
        .get(`/api/v1/users/${userId}`)
        .then((odgovor) => {
            let stSkupin =
                //odgovor.data.groupIds.length ? null : "0";
                Object.keys(odgovor.data.groupIds).length;

            console.log(odgovor.data + " to je odgovor");
            uporabnik(req, res, odgovor.data, stSkupin);
        })
        .catch((err) => {
            console.log(err);
            uporabnik(req, res, [], "Napaka API-ja pri iskanju expensov.");
        });
};

const uporabnik = (req, res, podatkiUporabnika, stevilo) => {
    console.log("sem v profilu");
    res.render("profil", {
        title: "Profil",
        uporabnik: podatkiUporabnika,
        stevilo: stevilo,
        stylesheets_load: ["/stylesheets/style-profil.css"],
        scripts_load: [],
    });
};

module.exports = {
    profil,
    uporabnik,
};
