const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticateToken = require('../middleware/auth');


/**
 * @swagger
 * /api/v1/product/{id}:
 *   get:
 *     summary: Get a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 price:
 *                   type: number
 */
router.get('/product/:id', productController.product);

router.get('/categoryall', productController.categories);
router.get('/c/:category' , productController.category);
router.post('/submitrating', authenticateToken , productController.submitratings);
router.post('/submitcomment', authenticateToken , productController.submitcomments);
router.post('/comment',productController.comment);
router.post('/getratings', productController.getratings);

module.exports = router;