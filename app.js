var createError = require("http-errors");
var express = require("express");
var hbs = require("hbs");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//START--------------------------SWAGGER-------------------------------START
var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");

var swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Spendy API docs",
            version: "1.0.0",
            description: "Spendy REST API",
        },
        license: {
            name: "GNU LGPLv3",
            url: "https://choosealicense.com/licenses/lgpl-3.0",
        },
        contact: {
            name: "Skupina Spendy",
            // url: "",
            email: "a@a.si",
        },
        servers: [
            { url: "http://localhost:3000/api/v1" },
            { url: "http://sp-spendy.herokuapp.com/api/v1" },
        ],
    },
    apis: [
        "app_api_v2/models/schemes-models.js",
        "app_api_v2/controllers/users.js",
        "app_api_v2/controllers/groups.js",
        "app_api_v2/routes/index.js",
    ],
};
const swaggerDocument = swaggerJsdoc(swaggerOptions);
//END----------------------------SWAGGER---------------------------------END

require("./app_server/views/helpers/hbsh.js");

require("./app_api_v2/models/db");

var indexRouter = require("./app_server/routes/index");
var indexApi = require("./app_api/routes/index");
var indexApiV2 = require("./app_api_v2/routes/index");

var app = express();

hbs.registerPartials(path.join(__dirname, "app_server/views/partials")); // partials (navbar, ...)

// view engine setup
app.set("views", path.join(__dirname, "app_server", "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "app_public")));

// CORS
app.use("/api", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/", indexRouter);
app.use("/api/v1", indexApi);
app.use("/api/v2", indexApiV2);

app.use(express.static(path.join(__dirname, "public")));

//START--------------------------SWAGGER-------------------------------START
indexApiV2.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
indexApiV2.get("/swagger.json", (req, res) => {
    res.status(200).json(swaggerDocument);
});
//END--------------------------SWAGGER-------------------------------END

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error", {
        title: "Napaka",
        stylesheets_load: ["/stylesheets/first-pages.css"],
        scripts_load: [],
    });
});

module.exports = app;
