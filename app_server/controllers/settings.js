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
// server-login
const settings = (req, res) => {
    if (login.getUser() == null) return res.redirect("/login");

    console.log("Sem v nastavtvah");
    const userId = login.getUserId();
    //req.params. todo: idUporabnika
    //var user = req.params.id;
    axios
        .get(`/api/v1/users/${userId}`)
        .then((odgovor) => {
            let stSkupin =
                //odgovor.data.groupIds.length ? null : "0";
                Object.keys(odgovor.data.groupIds).length;

            console.log(odgovor.data + " to je odgovor");
            pogled(req, res, odgovor.data, stSkupin);
        })
        .catch((err) => {
            console.log(err);
            pogled(req, res, [], "Napaka API-ja pri iskanju expensov.");
        });
};

/*const spremeniUporabnika = (req, res) => {
    const userId = login.getUserId();
    axios({
        method: 'put',
        url: `/v1/users/${userId}`,
        data: {
            username: req.body.username,
            name: req.body.name,
            phone: req.body.phone,
            mail: req.body.mail,
            password: req.body.password,
            //limit in password1
        }
    }).then(() => {
        res.redirect('/profil');
    }).catch((napaka) => {
        console.log(napaka);
    });
};*/

const spremeniUporabnika = async (req, res) => {
    try {
        const userId = login.getUserId();
        await axios.put(`/api/v1/users/${userId}`, {
            surname: req.body.surname,
            name: req.body.name,
            phone: req.body.phone,
            mail: req.body.mail,
            pass: req.body.password,
        });
        console.log();
    } catch (err) {
        console.error(err);
    }
    // neki.data;
};

//spremeniUporabnika();

const pogled = (req, res, podatkiUporabnika, stevilo) => {
    res.render("settings", {
        title: "Nastavitve profila",
        uporabnik: podatkiUporabnika,
        stevilo: stevilo,
        stylesheets_load: ["/stylesheets/style-profil.css"],
        scripts_load: [],
    });
};

module.exports = {
    settings,
    pogled,
    spremeniUporabnika,
};
