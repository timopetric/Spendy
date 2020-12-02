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

const linkDoPodatkov = "/api/v1/groups/IDDDD/expenses";

function pridobiPrihodkeSkupine(skupinaId) {
    try {
        return axios.get(`/api/v1/groups/${skupinaId}/expenses?isExpenditure=false&date=desc`);
    } catch (error) {
        console.error(error);
    }
}
function pridobiOdhodkeSkupine(skupinaId) {
    try {
        return axios.get(`/api/v1/groups/${skupinaId}/expenses?isExpenditure=true&date=desc`);
    } catch (error) {
        console.error(error);
    }
}

const graphs = (req, res) => {
    if (login.getUser() == null) return res.redirect("/login");

    let odhodki = [];
    let prihodki = [];

    let selectedGroup = req.query.groupId;
    console.log(selectedGroup);
    if (selectedGroup) {
        pridobiOdhodkeSkupine(selectedGroup)
            .then((response) => {
                if (response.data) {
                    for (let i = 0; i < response.data.expenses.length; i++) {
                        let tmp = [0, 0];
                        tmp[0] = new Date(response.data.expenses[i].date).getTime();
                        tmp[1] = response.data.expenses[i].cost;
                        odhodki.unshift(tmp);
                    }
                    pridobiPrihodkeSkupine(selectedGroup)
                        .then((res1) => {
                            if (res1.data) {
                                for (let i = 0; i < res1.data.expenses.length; i++) {
                                    let tmp = [0, 0];
                                    tmp[0] = new Date(res1.data.expenses[i].date).getTime();
                                    tmp[1] = res1.data.expenses[i].cost;
                                    prihodki.unshift(tmp);
                                }
                            }
                            console.log("POSODOBLJENI");
                            console.log(prihodki);
                            const user = login.getUser();
                            res.render("graphs", {
                                title: "Grafično",
                                navbar_button_selected_graphs: true,
                                stylesheets_load: [
                                    "https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css",
                                ],
                                scripts_load: [
                                    "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js",
                                    "/javascripts/first-page-chart.js",
                                ],
                                skupine: user.groupIds,
                                uporabnik: user,
                                expenses: {
                                    prihodki: prihodki,
                                    odhodki: odhodki,
                                },
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    } else {
        const user = login.getUser();
        res.render("graphs", {
            title: "Grafično",
            navbar_button_selected_graphs: true,
            stylesheets_load: [
                "https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css",
            ],
            scripts_load: [
                "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js",
                "/javascripts/first-page-chart.js",
                "/javascripts/graphs_script.js",
            ],
            skupine: user.groupIds,
            uporabnik: user,
            expenses: {
                prihodki: prihodki,
                odhodki: odhodki,
            },
        });
    }
};

module.exports = {
    graphs,
};
