var createError = require('http-errors');
var express = require('express');
var hbs = require("hbs");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('./app_api/models/db');

var indexRouter = require('./app_server/routes/index');
var indexApi = require('./app_api/routes/index');


const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


var app = express();

hbs.registerPartials(path.join(__dirname, "app_server/views/partials"));  // partials (navbar, ...)

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/api', indexApi);

app.use(express.static(path.join(__dirname, 'public')));

//START--------------------------SWAGGER-------------------------------START
// Swagger set up
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Spendy API docs",
      version: "1.0.0",
      description:
        "Documentation for spendy API",
      contact: {
        name: "Spendy development github",
        url: "https://github.com/sp-2020-2021/LP-02",
      }
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1"
      }
    ]
  },
  apis: ["app_api/models/schemes-models.js", "app_api/controllers/users.js", "app_api/controllers/groups.js"]
};
const specs = swaggerJsdoc(options);
app.use("/docs", swaggerUi.serve);
app.get("/docs", swaggerUi.setup(specs, { explorer: true }));
//END----------------------------SWAGGER---------------------------------END

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    title: 'Napaka',
    stylesheets_load: ["/stylesheets/first-pages.css"],
    scripts_load: []
  });
});

module.exports = app;