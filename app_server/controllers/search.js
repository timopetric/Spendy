const { Console } = require("console");
const { query } = require("express");
const url = require("url");
const login = require("./login");

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

const seznamAktivnosti = (req, res) => {
    console.log("jouuuuuuuuuuuuuuuuuuuuuuuu");
    // console.log(req._parsedUrl)
    // console.log(req.url)
    // console.log(Object.keys(req.query))

    let q = url.parse(req.originalUrl, true);
    let querySearch;
    let groupId;
    if (q != null) {
        let params = new URLSearchParams(q.search);
        //console.log(q.search);
        //console.log(params);
        groupId = params.get("groupId");
        if (groupId != null) {
            params.delete(groupId);
        }
        querySearch = "?" + params.toString();

        //console.log(querySearch);
        //console.log("queryserach: " + querySearch);
    }
    if (groupId == null) {
        //console.log(login.getUser().groupIds[0]._id)
        groupId = login.getUser().groupIds[0]._id;
    }
    axios
        .get(`/api/v1/groups/${groupId}/expenses${querySearch}`)
        .then((odgovor) => {
            let sporocilo = odgovor.data.length ? null : "Ni aktivnosti.";
            console.log(odgovor.data);
            // odgovor.data.map(lokacija => {
            //   return lokacija;
            // });
            search(req, res, odgovor.data.expenses, sporocilo);
        })
        .catch((err) => {
            console.log(err);
            search(req, res, [], "Napaka API-ja pri iskanju expensov.");
        });
};

const seznamAktivnostiDelete = (req, res) => {
    console.log("SeznamAktivnostiDelete in search.js");
    let expenseId = req.params.expenseId;
    let groupId = req.params.groupId;
    axios
        .delete(`api/v1/groups/${groupId}/expenses/${expenseId}`)
        .then((odgovor) => {
            let sporocilo = odgovor.data.length ? null : "Izbris ni bil uspešen.";
            console.log(odgovor.data);

            search(req, res, odgovor.data.expenses, sporocilo);
        })
        .catch((err) => {
            console.log(err);
            search(req, res, [], "Napaka API-ja pri iskanju expensov.");
        });
};

const seznamAktivnostiPut = (req, res) => {
    console.log("SeznamAktivnostiPut in search.js");
    console.log(req.params);
    console.log(req.body);
    let expenseId = req.params.expenseId;
    let groupId = req.params.groupId;
    axios
        .put(`api/v1/groups/${groupId}/expenses/${expenseId}`, req.body)
        .then((odgovor) => {
            let sporocilo = odgovor.data.length ? null : "Izbris ni bil uspešen.";
            console.log(odgovor.data);

            search(req, res, odgovor.data.expenses, sporocilo);
        })
        .catch((err) => {
            console.log(err);
            search(req, res, [], "Napaka API-ja pri iskanju expensov.");
        });
};

const search = (req, res, aktivnosti, sporocilo) => {
    const user = login.getUser();
    res.render("search", {
        title: "Poišči aktivnosti",
        navbar_button_selected_search: true,
        subtitle: "Poglej si svoje aktivnosti in jih urejaj ",
        stylesheets_load: [
            "https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css",
        ],
        scripts_load: [
            "https://kit.fontawesome.com/a076d05399.js",
            "/javascripts/modal_script.js",
            "/javascripts/searchInput.js",
            "/javascripts/getSelectedGroup.js",
            " /javascripts/secondModal.js",
        ],
        aktivnosti: aktivnosti,
        sporocilo: sporocilo,
        uporabnik: user,
        skupine: user.groupIds,
    });
};

module.exports = {
    search,
    seznamAktivnosti,
    seznamAktivnostiDelete,
    seznamAktivnostiPut,
};
