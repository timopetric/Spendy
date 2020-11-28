const hbs = require('hbs');


hbs.registerHelper("if", function(conditional, options) {
    if (conditional) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

hbs.registerHelper('formatirajDatum', (nizDatum) => {
    const datum = new Date(nizDatum);
    const imenaMesecev = ["januar", "februar", "marec", "april", "maj", "junij", "julij", "avgust", "september", "oktober", "november", "december"];
    const d = datum.getDate();
    const m = imenaMesecev[datum.getMonth()];
    const l = datum.getFullYear();
    return `${d}. ${m}, ${l}`;


hbs.registerHelper('openModal', (aktivnost) => {
    

});