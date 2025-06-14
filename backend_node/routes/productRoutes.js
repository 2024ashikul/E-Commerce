const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticateToken = require('../middleware/auth');

router.get('/product/:id', productController.product);

router.get('/categoryall', productController.categories);
router.get('/c/:category' , productController.category);
router.post('/submitrating', authenticateToken , productController.submitratings);
router.post('/submitcomment', authenticateToken , productController.submitcomments);
router.post('/comment',productController.comment);
router.post('/getratings', productController.getratings);

module.exports = router;