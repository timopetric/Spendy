const axios = require('axios');

const getGraphData = (ime, dni) => {
  try {
    return axios.get('https://api.coingecko.com/api/v3/coins/' + ime + '/market_chart?vs_currency=eur&days=' + dni + '&interval=daily');
  } catch (error) {
    console.error(error);
  }
};


let bitcoinGraph;
let bitcashGraph;
let rippleGraph;

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






const analysis = (req, res) => {
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
    }
  });
};

module.exports = {
  analysis,
};