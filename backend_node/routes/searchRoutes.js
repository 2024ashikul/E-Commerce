const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const { route } = require('./userRoutes');


router.get('/searchpending/:value', searchController.searchpending );
router.get(`/search/:value`, searchController.searchresults );

module.exports = router;