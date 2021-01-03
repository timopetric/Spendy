const express = require("express");
const router = express.Router();
const jwt_2 = require("jsonwebtoken");

// db models
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Group = mongoose.model("Group");

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
                // return res.sendStatus(403);
                return res.status(401).json({ message: "Unauthorized" });
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
            return next();
        });
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};

// a user can only do actions to himself, not other users
const authUserIsLoggedOnUser = (req, res, next) => {
    // console.log("Je: " + req.user._id);
    // console.log("Zeli: " + req.params.idUser);

    if (req.user && req.user._id && req.params.idUser === req.user._id) {
        return next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};

// a user is a member of the group in params
const authUserIsMemberInGroup = (req, res, next) => {
    let idUser = req.user ? req.user._id.toString() : "-";
    let idGroupParam = req.params.idGroup;
    let notAuthorized = false;

    // console.log("v user is member in group");

    Group.findById(idGroupParam)
        .then((group) => {
            let idGroupDb = group._id.toString();

            // console.log("############## users");
            // console.log(group.userIds);
            // console.log(idUser);
            // console.log(idGroupDb === idGroupParam && group.userIds.includes(idUser.toString()));
            if (idGroupDb === idGroupParam && group.userIds.includes(idUser.toString())) return next();
            else notAuthorized = true;
        })
        .catch(() => {
            notAuthorized = true;
        })
        .then(() => {
            if (notAuthorized) {
                // console.log("send 401");
                res.status(401).json({ message: "Unauthorized" });
            }
        });
};

// a user is an admin of the group in params
const authUserIsAdminInGroup = (req, res, next) => {
    let idUser = req.user ? req.user._id.toString() : "-";
    let idGroupParam = req.params.idGroup;
    let notAuthorized = false;

    Group.findById(idGroupParam)
        .then((group) => {
            let idGroupDb = group._id.toString();
            // console.log("############## admins");
            // console.log(group.adminIds);
            // console.log(idUser);
            // console.log(group._id);
            // console.log(idGroupParam);
            // console.log(idGroupDb === idGroupParam);
            // console.log("user is admin:" + (idGroupDb === idGroupParam && group.adminIds.includes(idUser)));
            if (idGroupDb === idGroupParam && group.adminIds.includes(idUser)) return next();
            else notAuthorized = true;
        })
        .catch(() => {
            notAuthorized = true;
        })
        .then(() => {
            if (notAuthorized) {
                // console.log("send 401");
                res.status(401).json({ message: "Unauthorized" });
            }
        });
};

// a user is the user that wants to create a new group for himself
const authCreateGroup = (req, res, next) => {
    if (req.user && req.user._id && req.body.idUser === req.user._id) {
        return next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};

// authorize if the requested expense id is in any of the groups a user belongs to
const authUserCanAccessExpense = (req, res, next) => {
    let idUser = req.user ? req.user._id.toString() : "-";
    let idExpenseParam = req.params.idExpense;
    let notAuthorized = false;

    User.findById(idUser)
        .populate("groupIds")
        .then((user) => {
            let expensesList = user.groupIds.map((group) => group.expenses);
            let expenseParamIsInOneOfTheGroupsAUserHas = expensesList.some((expenses) =>
                expenses.includes(idExpenseParam)
            );
            if (expenseParamIsInOneOfTheGroupsAUserHas) return next();
            else notAuthorized = true;
        })
        .catch((err) => {
            console.log(err);
            notAuthorized = true;
        })
        .then(() => {
            if (notAuthorized) {
                // console.log("send 401");
                res.status(401).json({ message: "Unauthorized" });
            }
        });
};
// END---------------------------- Authentication middleware ---------------------------------END

/* Avtentikacija */
router.post("/registracija", ctrlAuthentication.registracija);
router.post("/prijava", ctrlAuthentication.prijava);

//START--------------------------USERS-------------------------------START
// router.get("/users", ctrlUser.getAllUsers);
router.get("/users/:idUser", authenticateJWT, authUserIsLoggedOnUser, ctrlUser.getUserById);
router.put("/users/:idUser", authenticateJWT, authUserIsLoggedOnUser, ctrlUser.updateUser);
router.delete("/users/:idUser", authenticateJWT, authUserIsLoggedOnUser, ctrlUser.deleteUser);
// router.post("/users", ctrlUser.addUser);
// router.get("/users/name/:name", ctrlUser.getUserByName); // TODO: is this needed? @dsfsd

router.get("/users/:idUser/groups", authenticateJWT, authUserIsLoggedOnUser, ctrlGroups.getGroupsByUserId);
// END----------------------------USERS---------------------------------END

// START--------------------------EXPENSES-------------------------------START
// router.get("/expenses", ctrlExpenses.getAllExpenses);
router.get("/expenses/:idExpense", authenticateJWT, authUserCanAccessExpense, ctrlExpenses.getExpenseById);
// END----------------------------EXPENSES---------------------------------END

// START--------------------------GROUPS-------------------------------START
//router.get("/groups/:id/expenses", ctrlExpenses.getExpensesByGroupId);
router.get(
    "/groups/:idGroup/expenses",
    authenticateJWT,
    authUserIsMemberInGroup,
    ctrlExpenses.getExpensesByGroupIdWithQueries
);
router.get(
    "/groups/:idGroup/expenses/pages",
    authenticateJWT,
    authUserIsMemberInGroup,
    ctrlExpenses.getExpensesByGroupIdWithQueriesWithPagination
);
router.delete(
    "/groups/:idGroup/expenses/:idExpense",
    authenticateJWT,
    authUserIsMemberInGroup, // TODO: pogledamo tud expense creator_id == toked.user.id?
    ctrlExpenses.deleteExpenseOfGroup
);
router.put(
    "/groups/:idGroup/expenses/:idExpense",
    authenticateJWT,
    authUserIsMemberInGroup,
    ctrlExpenses.updateExpense
);
router.post("/groups/:idGroup/expenses", authenticateJWT, authUserIsMemberInGroup, ctrlExpenses.addExpenseToGroup);
router.put("/groups/:idGroup", authenticateJWT, authUserIsAdminInGroup, ctrlGroups.updateGroup);

// router.get("/groups", ctrlGroups.getAllGroups);
router.post("/groups", authenticateJWT, authCreateGroup, ctrlGroups.createAndAddToUser);
router.get("/groups/:idGroup", authenticateJWT, authUserIsMemberInGroup, ctrlGroups.getGroupById);
router.post("/groups/:idGroup/users", authenticateJWT, authUserIsAdminInGroup, ctrlGroups.addUserToGroup);
router.delete(
    "/groups/:idGroup/users/:idUser",
    authenticateJWT,
    authUserIsAdminInGroup,
    ctrlGroups.removeUserFromGroup
);
router.delete("/groups/:idGroup", authenticateJWT, authUserIsAdminInGroup, ctrlGroups.removeGroupById);
// END----------------------------GROUPS---------------------------------END

// START--------------------------CATEGORIES-------------------------------START
// router.post("/groups/:idGroup/categories/add", ctrlCategories.createCategoriesForGroup);
router.post(
    "/groups/:idGroup/categories",
    authenticateJWT,
    authUserIsMemberInGroup,
    ctrlCategories.createCategoryAndAddToGroup
);
router.get(
    "/groups/:idGroup/categories",
    authenticateJWT,
    authUserIsMemberInGroup,
    ctrlCategories.getCategoriesByGroupId
);
router.delete(
    "/groups/:idGroup/categories",
    authenticateJWT,
    authUserIsMemberInGroup,
    ctrlCategories.deleteCategoryForGroup
);
router.put(
    "/groups/:idGroup/categories",
    authenticateJWT,
    authUserIsMemberInGroup,
    ctrlCategories.updateCategoryForGroup
);

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
        "app_api_v2/documentation/authentication.yaml",
    ],
};
const swaggerDocument = swaggerJsdoc(swaggerOptions);
const swaggerSetup = swaggerUi.setup(swaggerDocument);
router.get("/docs/index.html", swaggerSetup);
router.use("/docs", swaggerUi.serve);
router.get("/docs", swaggerSetup);

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
