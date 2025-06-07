const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

const multer = require('multer');

const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // adjust path
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-z0-9.]/gi, '_');
    const uniqueName = `${Date.now()}-${safeName}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } });


router.post('/products',upload.array('images', 5), adminController.addproduct);

module.exports = router;