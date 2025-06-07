// const express = require('express');
// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//     destination:(res,file,cb) => {
//         cb(null,'/uploads');
//     },filename : (req,file,cb) => {
//         cb(null.Date.now()+path.extname(file.originalname));
//     }
// });

// const upload = multer({storage});

// router.post('/',upload.single('file'), (req,res) => {
//     const file = req.file;
//     const {name} = req.body;
//     if(!file){
//         return res.status(400).json({error : 'no file uploaded'});
//     }

//     res.json({
//         message: 'File uploaded successfully',
//         filename: file.filename,
//         name,
//     })
// });

// module.exports = router;