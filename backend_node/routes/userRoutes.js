const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/auth')
const profileController = require('../controllers/profileController')
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/addtocart', authenticateToken , profileController.addtocart);

module.exports = router;


