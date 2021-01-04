require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var expressStaticGzip = require("express-static-gzip");
var hbs = require("hbs");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
//za passport
var passport = require("passport");
var compression = require("compression");

require("./app_server/views/helpers/hbsh.js");

require("./app_api_v2/models/db");
//za passport
require("./app_api_v2/configuration/passport");

// var indexRouter = require("./app_server/routes/index");
// var indexApi = require("./app_api/routes/index");
var indexApiV2 = require("./app_api_v2/routes/index");

var app = express();

app.use(
    compression({
        level: 6,
    })
);
// Preusmeritev na HTTPS na Heroku
if (process.env.NODE_ENV === "production") {
    app.use((req, res, next) => {
        if (req.header("x-forwarded-proto") !== "https") res.redirect(`https://${req.header("host")}${req.url}`);
        else next();
    });
}

if (process.env.NODE_ENV === "docker") {
    const nocache = require("nocache");
    app.use(nocache());
    console.log("USING NOCACHE");
}

hbs.registerPartials(path.join(__dirname, "app_server/views/partials")); // partials (navbar, ...)

// Preusmeritev na HTTPS na Heroku
if (process.env.NODE_ENV === "production") {
    app.use((req, res, next) => {
        if (req.header("x-forwarded-proto") !== "https") res.redirect(`https://${req.header("host")}${req.url}`);
        else next();
    });
}

// view engine setup
app.set("views", path.join(__dirname, "app_server", "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(expressStaticGzip(path.join(__dirname, "app_public", "build")));
app.use("/stylesheets", expressStaticGzip(path.join(__dirname, "public", "stylesheets")));
app.use("/javascripts", expressStaticGzip(path.join(__dirname, "public", "javascripts")));
app.use("/icons", expressStaticGzip(path.join(__dirname, "public", "icons")));

//za inicializacijo passporta
app.use(passport.initialize());

// CORS
app.use("/api", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT,OPTIONS");
    next();
});

//Handles robots.txt
app.all("/robots.txt", (req, res) => {
    res.type("text/plain");
    res.send("User-agent: *Allow: /");
});

//app.use("/api", indexApiV2);

// app.use("/", indexRouter);
// app.use("/api/v1", indexApi);
app.use("/api/v2", indexApiV2);

app.get(
    /(^\/overview$)|(^\/graphs$)|(^\/analysis$)|(^\/search$)|(^\/groups$)|(^\/first-page$)|(^\/profile$)|(^\/settings$)|(^\/login$)|(^\/signup$)|(^\/add_expenses$)|(^\/db$)/,
    (req, res, next) => {
        res.sendFile(path.join(__dirname, "app_public", "build", "index.html"));
    }
);

// app.use(expressStaticGzip(path.join(__dirname, "public")));

// Obvladovanje napak zaradi avtentikacije
app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        res.status(401).json({ message: err.name + ": " + err.message });
    } else {
        next();
    }
});

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
