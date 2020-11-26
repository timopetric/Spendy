const express = require("express");
const router = express.Router();

// controllers
const ctrlUser = require("../controllers/users");
const ctrlExpenses = require("../controllers/expenses");
const ctrlGroups = require("../controllers/groups");

// rest api for user (implement CRUD)
router.get("/v1/users", ctrlUser.getAllUsers);
router.post("/v1/users", ctrlUser.addUser);
// todo: za prijavo userja

//router.post("/v1/groups", ctrlUser.addGroup);
// router.get('/v1/users/:userId', ctrlUser.getUserById);
// router.put('/v1/users/:userId', ctrlUser.updateUser);
// router.delete('/v1/users/:userId', ctrlUser.deleteUser);

//START--------------------------EXPENSES-------------------------------START

//get
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
//post

//END----------------------------GROUPS---------------------------------END

module.exports = router;
