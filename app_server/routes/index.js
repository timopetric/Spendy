var express = require('express');
var router = express.Router();

// controllers
const ctrlFirstPage = require('../controllers/first_page'); // first page controller
const ctrlLogin = require('../controllers/login');
const ctrlSignup = require('../controllers/signup');
const ctrlProfil = require('../controllers/profil');

// GET first page
router.get('/first_page', ctrlFirstPage.page);
router.get('/login', ctrlLogin.page);
router.get('/signup', ctrlSignup.page);
router.get('/profil', ctrlProfil.page);


module.exports = router;
