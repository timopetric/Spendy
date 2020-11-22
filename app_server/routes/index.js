var express = require('express');
var router = express.Router();

// controllers
const ctrlFirstPage = require('../controllers/first_page'); // first page controller


// GET first page
router.get('/first_page', ctrlFirstPage.page);


module.exports = router;
