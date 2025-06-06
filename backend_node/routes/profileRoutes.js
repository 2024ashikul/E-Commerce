const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController')
const authenticateToken = require('../middleware/auth')

router.post('/addtocart', authenticateToken , profileController.addtocart);
router.get('/profile' ,authenticateToken, (req,res) => {
    console.log("done logiing");
    res.json({user: req.user});
})

router.post('/cartitems',authenticateToken, profileController.cartitems);
router.post('/increasecart',authenticateToken, profileController.increasecart);
router.post('/decreasecart',authenticateToken, profileController.decreasecart);
router.post('/removefromcart',authenticateToken, profileController.removefromcart);

module.exports = router;