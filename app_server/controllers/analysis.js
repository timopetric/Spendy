const axios = require('axios');

const getGraphData = (ime, dni) => {
  try {
    return axios.get('https://api.coingecko.com/api/v3/coins/' + ime + '/market_chart?vs_currency=eur&days=' + dni + '&interval=daily');
  } catch (error) {
    console.error(error);
  }
};

function toUnix (date){
    return parseInt(date.getTime() / 1000).toFixed(0);
}

const getGraphDataInterval = (ime, start,finish) => {
    try {
        return axios.get('https://api.coingecko.com/api/v3/coins/' + ime + '/market_chart/range?vs_currency=eur&from=' + toUnix(start) + '&to=' + toUnix(finish));
    } catch (error) {
        console.error(error);
    }
};

let bitcoinGraph;
let bitcashGraph;
let rippleGraph;
/*
getGraphData("bitcoin","30").then(response =>{
    if(response.data.prices) {

        bitcoinGraph = response.data.prices;
    }
}).catch(error =>{
    console.log(error);
});

getGraphData("bitcash","30").then(response =>{
    if(response.data.prices) {

        bitcashGraph = response.data.prices;
    }
}).catch(error =>{
    console.log(error);
});

getGraphData("ripple","30").then(response =>{
    if(response.data.prices) {

        rippleGraph = response.data.prices;
    }
}).catch(error =>{
    console.log(error);
});

*/

const login = require("./login");

const analysis = (req, res) => {
    const user = login.getUser();

    let dateStart = new Date(req.query.start || 2020-11-15) ;
    let dateFinish = new Date(req.query.finish || 2020-11-20);



    getGraphDataInterval("bitcash",dateStart,dateFinish).then(response =>{
        if(response.data.prices) {
            bitcashGraph = response.data.prices;
            getGraphDataInterval("ripple",dateStart,dateFinish).then(response =>{
                if(response.data.prices) {

                    rippleGraph = response.data.prices;
                    getGraphDataInterval("bitcoin",dateStart,dateFinish).then(response =>{
                        if(response.data.prices) {
                            bitcoinGraph = response.data.prices;
                            res.render('analysis',{
                                title: 'Analiza',
                                navbar_button_selected_analysis: true,
                                stylesheets_load: [""],
                                scripts_load: ["https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js",
                                    "/javascripts/first-page-chart.js","/javascripts/analysis_script.js"],
                                graphData: {
                                    'bitcoin': bitcoinGraph,
                                    'bitcash': bitcashGraph,
                                    'ripple' : rippleGraph,
                                },
                                uporabnik: user,
                                skupine: user.groupIds,
                            });

                        }
                    }).catch(error =>{
                        console.log(error);
                    });
                }
            }).catch(error =>{
                console.log(error);
            });
        }
    }).catch(error =>{
        console.log(error);
    });
};

module.exports = {
  analysis,
};