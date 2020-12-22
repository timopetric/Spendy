const express = require("express");
const router = express.Router();

// controllers
const ctrlUser = require("../controllers/users");
const ctrlExpenses = require("../controllers/expenses");
const ctrlGroups = require("../controllers/groups");
const ctrlDb = require("../controllers/db");

/**
 * Categories
 * @swagger
 * tags:
 *  - name: Users
 *    description: Everything about users
 *  - name: Groups
 *    description: Everything about groups
 *  - name: Expenses
 *    description: Everything about expenses
 */

/**
 * Varnostna shema dostopa
 * @swagger
 * components:
 *  securitySchemes:
 *   jwt:
 *    type: http
 *    scheme: bearer
 *    in: header
 *    bearerFormat: JWT
 */

//START--------------------------USERS-------------------------------START
router.get("/users", ctrlUser.getAllUsers);

// END----------------------------USERS---------------------------------END

// START--------------------------EXPENSES-------------------------------START
router.get("/expenses", ctrlExpenses.getAllExpenses);
router.get("/expenses/:idExpense", ctrlExpenses.getExpenseById);
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

//Api endpoint for all invalid urls
//if you get this check your params and path
router.all("/*", function (req, res) {
    res.status(404).json({ message: "This url does not exists, check your params and url path" });
});

module.exports = router;
