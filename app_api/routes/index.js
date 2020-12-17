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
router.get("/users/name/:name", ctrlUser.getUserByName);
router.get("/users/:userId/groups", ctrlUser.getGroupByUserId);
router.post("/users/login", ctrlUser.validateUser);
router.post("/users", ctrlUser.addUser);
router.get("/users/:userId", ctrlUser.getUserById);
router.delete("/users/:userId", ctrlUser.deleteUser);
router.put("/users/:idUser", ctrlUser.updateUser);
router.delete("/users/:idU/groups/:idG", ctrlUser.deleteUserFromGroupId);
// END----------------------------USERS---------------------------------END

// START--------------------------EXPENSES-------------------------------START
router.get("/expenses", ctrlExpenses.getExpenses);
router.get("/expenses/:id", ctrlExpenses.getExpenseById);

router.post("/groups/:idGroup/expenses", ctrlExpenses.addExpense);

router.delete("/groups/:idGroup/expenses/:idExpense", ctrlExpenses.deleteExpense);

router.get("/groups/:id/expenses", ctrlExpenses.getExpensesByGroupId2);
router.put("/groups/:idGroup/expenses/:idExpense", ctrlExpenses.updateExpense);
// END----------------------------EXPENSES---------------------------------END

// START--------------------------GROUPS-------------------------------START
router.get("/groups", ctrlGroups.getAllGroups);
router.get("/groups/:id", ctrlGroups.getGroupById);
router.post("/groups", ctrlGroups.addGroup);
router.delete("/groups/:idGroup", ctrlGroups.removeGroupById);
router.put("/groups/:idGroup", ctrlGroups.updateGroup);
router.post("/groups/:idGroup", ctrlGroups.addUserToGroup);
router.delete("/groups/:idGroup/users/:idUser", ctrlGroups.deleteUserFromGroup);
// END----------------------------GROUPS---------------------------------END

// START--------------------------DB IMPORT-------------------------------START
router.get("/db/import", ctrlDb.importDbData);
router.get("/db/drop", ctrlDb.dropDb);
// END----------------------------DB IMPORT---------------------------------END

module.exports = router;
