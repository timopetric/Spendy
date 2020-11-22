var express = require('express');
var router = express.Router();

// controllers
const ctrlFirstPage = require('../controllers/first_page'); // first page controller
const ctrlIndex = require('../controllers/index'); // first page controller


// GET first page
router.get('/first_page', ctrlFirstPage.page);
router.get('/index', ctrlIndex.index);
router.get('/add_expenses', ctrlIndex.add_expenses);
router.get('/analysis', ctrlIndex.analysis);
router.get('/graphs', ctrlIndex.graphs);

module.exports = router;
