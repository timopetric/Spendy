const express = require("express");
const router = express.Router();

// controllers
const ctrlUser = require("../controllers/users");
const ctrlExpenses = require("../controllers/expenses");
const ctrlGroups = require("../controllers/groups");

//START--------------------------USERS-------------------------------START
router.get("/v1/users", ctrlUser.getAllUsers);
router.post("/v1/users/login", ctrlUser.validateUser);
router.post("/v1/users", ctrlUser.addUser);
router.get("/v1/users/:id", ctrlUser.getUserById);
router.delete("/v1/users/:userId", ctrlUser.deleteUser);
router.put("/v1/users/:idUser", ctrlUser.updateUser);
// todo: za prijavo userja

//END----------------------------USERS---------------------------------END

//START--------------------------EXPENSES-------------------------------START

router.get("/v1/expenses", ctrlExpenses.getExpenses);
router.get("/v1/expenses/:id", ctrlExpenses.getExpenseById);

router.post("/v1/groups/:idGroup/expenses", ctrlExpenses.addExpense);

router.delete(
  "/v1/groups/:idGroup/expenses/:idExpense",
  ctrlExpenses.deleteExpense
);

router.get("/v1/groups/:id/expenses", ctrlExpenses.getExpensesByGroupId);
router.put(
  "/v1/groups/:idGroup/expenses/:idExpense",
  ctrlExpenses.updateExpense
);

//END----------------------------EXPENSES---------------------------------END

//START--------------------------GROUPS-------------------------------START

//get
router.get("/v1/groups", ctrlGroups.getAllGroups);
router.get("/v1/groups/:id", ctrlGroups.getGroupById);
router.post("/v1/groups", ctrlGroups.addGroup);
router.delete("/v1/groups/:idGroup", ctrlGroups.removeGroupById);
router.put("/v1/groups/:idGroup", ctrlGroups.updateGroup);
router.post("/v1/groups/:idGroup", ctrlGroups.addUserToGroup);
router.delete(
  "/v1/groups/:idGroup/users/:idUser",
  ctrlGroups.deleteUserFromGroup
);
//post

//END----------------------------GROUPS---------------------------------END

module.exports = router;
