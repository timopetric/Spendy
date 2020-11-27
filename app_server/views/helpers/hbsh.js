const hbs = require('hbs');

hbs.registerHelper("if", function(conditional, options) {
    if (conditional) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});