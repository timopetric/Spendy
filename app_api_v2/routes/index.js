const express = require("express");
const router = express.Router();
const jwt_2 = require("jsonwebtoken");

// controllers
const ctrlUser = require("../controllers/users");
const ctrlExpenses = require("../controllers/expenses");
const ctrlGroups = require("../controllers/groups");
const ctrlDb = require("../controllers/db");
const ctrlCategories = require("../controllers/categories");
const ctrlAuthentication = require("../controllers/authentication");

//START-------------------------- Authentication middleware -------------------------------START
// add jwt available information to req.user if he is authenticated correctly (jwt is signed by the server)
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt_2.verify(token, process.env.JWT_GESLO, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            // console.log(user);
            // {
            //   _id: '5fe8ff7f67c57310401aca3c',
            //   username: 'janez.novak@gmail.com',
            //   mail: 'janez.novak@gmail.com',
            //   name: 'Janez',
            //   surname: 'Novak',
            //   exp: 1610011277,
            //   iat: 1609406477
            // }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// a user can only do actions to himself, not other users
const authLimitToLoggedOnUser = (req, res, next) => {
    if (req.user && req.user._id && req.params.idUser === req.user._id) {
        next();
    } else {
        res.sendStatus(401);
    }
};
// END---------------------------- Authentication middleware ---------------------------------END

/* Avtentikacija */
router.post("/registracija", ctrlAuthentication.registracija);
router.post("/prijava", ctrlAuthentication.prijava);

//START--------------------------USERS-------------------------------START
// router.get("/users", ctrlUser.getAllUsers);
router.get("/users/:idUser", authenticateJWT, authLimitToLoggedOnUser, ctrlUser.getUserById);
router.put("/users/:idUser", authenticateJWT, authLimitToLoggedOnUser, ctrlUser.updateUser);
router.delete("/users/:idUser", authenticateJWT, authLimitToLoggedOnUser, ctrlUser.deleteUser);
// router.post("/users", ctrlUser.addUser);
router.get("/users/name/:name", ctrlUser.getUserByName); // TODO: is this needed? @dsfsd

router.get("/users/:idUser/groups", authenticateJWT, authLimitToLoggedOnUser, ctrlGroups.getGroupsByUserId);
// END----------------------------USERS---------------------------------END

// START--------------------------EXPENSES-------------------------------START
router.get("/expenses", ctrlExpenses.getAllExpenses);
router.get("/expenses/:idExpense", ctrlExpenses.getExpenseById);
// END----------------------------EXPENSES---------------------------------END

// START--------------------------GROUPS-------------------------------START
//router.get("/groups/:id/expenses", ctrlExpenses.getExpensesByGroupId);
router.get("/groups/:idGroup/expenses", ctrlExpenses.getExpensesByGroupIdWithQueries);
router.get("/groups/:idGroup/expenses/pages", ctrlExpenses.getExpensesByGroupIdWithQueriesWithPagination);
router.delete("/groups/:idGroup/expenses/:idExpense", ctrlExpenses.deleteExpenseOfGroup);
router.put("/groups/:idGroup/expenses/:idExpense", ctrlExpenses.updateExpense);
router.post("/groups/:idGroup/expenses", ctrlExpenses.addExpenseToGroup);
router.put("/groups/:idGroup", ctrlGroups.updateGroup);

router.get("/groups", ctrlGroups.getAllGroups);
router.post("/groups", ctrlGroups.createAndAddToUser);
router.get("/groups/:idGroup", ctrlGroups.getGroupById);
router.post("/groups/:idGroup/users", ctrlGroups.addUserToGroup);
router.delete("/groups/:idGroup/users/:idUser", ctrlGroups.removeUserFromGroup);
router.delete("/groups/:idGroup", ctrlGroups.removeGroupById);
// END----------------------------GROUPS---------------------------------END

// START--------------------------CATEGORIES-------------------------------START
router.post("/groups/:idGroup/categories/add", ctrlCategories.createCategoriesForGroup);
router.post("/groups/:idGroup/categories", ctrlCategories.createCategoryAndAddToGroup);
router.get("/groups/:idGroup/categories", ctrlCategories.getCategoriesByGroupId);
router.delete("/groups/:idGroup/categories", ctrlCategories.deleteCategoryForGroup);
router.put("/groups/:idGroup/categories", ctrlCategories.updateCategoryForGroup);

// END----------------------------CATEGORIES---------------------------------END

// START--------------------------DB IMPORT-------------------------------START
router.get("/db/import", ctrlDb.importDbData);
router.get("/db/drop", ctrlDb.dropDb);
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
        "app_api_v2/documentation/expenses.yaml",
        "app_api_v2/documentation/groups.yaml",
        "app_api_v2/documentation/users.yaml",
        "app_api_v2/documentation/basics.yaml",
        "app_api_v2/documentation/schemes.yaml",
        "app_api_v2/documentation/categories.yaml",
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
