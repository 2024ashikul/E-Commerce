const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/auth')

const homeController = require('../controllers/homeController')

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/send-mail', userController.sendmail);
router.get('/topproduct', homeController.topproducts);

module.exports = router;


