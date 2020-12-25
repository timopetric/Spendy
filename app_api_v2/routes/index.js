const express = require("express");
const router = express.Router();

// controllers
const ctrlUser = require("../controllers/users");
const ctrlExpenses = require("../controllers/expenses");
const ctrlGroups = require("../controllers/groups");
const ctrlDb = require("../controllers/db");
var ctrlAuthentication = require("../controllers/authentication");

const jwt = require("express-jwt");
const avtentikacija = jwt({
    secret: process.env.JWT_GESLO,
    userProperty: "payload",
    algorithms: ["HS256"],
});

/* Avtentikacija */
router.post("/registracija", ctrlAuthentication.registracija);
router.post("/prijava", ctrlAuthentication.prijava);

//START--------------------------USERS-------------------------------START
router.get("/users", ctrlUser.getAllUsers);
router.get("/users/:idUser", ctrlUser.getUserById);
router.put("/users/:idUser", ctrlUser.updateUser); //pri teh se lahko doda avtentikacija spredaj. Primer: router.post("/users/:idUser", avtentikacija, ctrlUser.updateUser);
router.delete("/users/:idUser", ctrlUser.deleteUser);
// router.post("/users", ctrlUser.addUser);
router.get("/users/name/:name", ctrlUser.getUserByName);

router.get("/users/:idUser/groups", ctrlUser.getGroupsByUserId);
// END----------------------------USERS---------------------------------END

// START--------------------------EXPENSES-------------------------------START
router.get("/expenses", ctrlExpenses.getAllExpenses);
router.get("/expenses/:idExpense", ctrlExpenses.getExpenseById);
// END----------------------------EXPENSES---------------------------------END

// START--------------------------GROUPS-------------------------------START
//router.get("/groups/:id/expenses", ctrlExpenses.getExpensesByGroupId);
router.get("/groups/:idGroup/expenses", ctrlExpenses.getExpensesByGroupIdWithQueries);
router.delete("/groups/:idGroup/expenses/:idExpense", ctrlExpenses.deleteExpenseOfGroup);
router.put("/groups/:idGroup/expenses/:idExpense", ctrlExpenses.updateExpense);
router.post("/groups/:idGroup/expenses", ctrlExpenses.addExpenseToGroup);

router.get("/groups", ctrlGroups.getAllGroups);
router.post("/groups/:idGroup/users", ctrlGroups.addUserToGroup);
router.delete("/groups/:idGroup", ctrlGroups.removeGroupById);
// END----------------------------GROUPS---------------------------------END

// START--------------------------DB IMPORT-------------------------------START

// END----------------------------DB IMPORT---------------------------------END

//START--------------------------SWAGGER-------------------------------START
var swaggerJsdoc = require("swagger-jsdoc");
var swaggerUi = require("swagger-ui-express");

var swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Spendy API docs",
            version: "2.0.0",
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
        servers: [{ url: "http://localhost:3000/api/v2" }, { url: "http://sp-spendy.herokuapp.com/api/v2" }],
    },
    apis: [
        "app_api_v2/documentation/expenses.js",
        "app_api_v2/documentation/groups.js",
        "app_api_v2/documentation/users.js",
        "app_api_v2/documentation/basics.js",
        "app_api_v2/documentation/schemes.js",
    ],
};
const swaggerDocument = swaggerJsdoc(swaggerOptions);

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.get("/swagger.json", (req, res) => {
    res.status(200).json(swaggerDocument);
});
//END--------------------------SWAGGER-------------------------------END

// CORS fix - send response to OPTIONS call
router.options("/*", function (req, res) {
    res.status(200).json("OK");
});

//Api endpoint for all invalid urls
//if you get this check your params and path
router.all("/*", function (req, res) {
    res.status(404).json({ message: "This url does not exists, check your params and url path" });
});

module.exports = router;
