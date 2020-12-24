const express = require("express");
const router = express.Router();

// controllers
const ctrlUser = require("../controllers/users");
const ctrlExpenses = require("../controllers/expenses");
const ctrlGroups = require("../controllers/groups");
const ctrlDb = require("../controllers/db");
var ctrlAuthentication = require("../controllers/authentication");

const jwt = require('express-jwt');
const avtentikacija = jwt({
    secret: process.env.JWT_GESLO,
    userProperty: 'payload',
    algorithms: ['HS256']
});

/* Avtentikacija */
router.post('/registracija', ctrlAuthentication.registracija);
router.post('/prijava', ctrlAuthentication.prijava);


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
router.post("/users/:idUser", avtentikacija, ctrlUser.updateUser);
router.delete("/users/:userId", avtentikacija, ctrlUser.deleteUser);

// END----------------------------USERS---------------------------------END

// START--------------------------EXPENSES-------------------------------START

// END----------------------------EXPENSES---------------------------------END

// START--------------------------GROUPS-------------------------------START

// END----------------------------GROUPS---------------------------------END

// START--------------------------DB IMPORT-------------------------------START

// END----------------------------DB IMPORT---------------------------------END

module.exports = router;
