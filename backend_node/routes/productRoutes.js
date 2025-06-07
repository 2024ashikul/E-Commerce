const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/product/:id', productController.product);

module.exports = router;