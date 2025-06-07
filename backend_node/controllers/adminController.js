const {Product , Cart , CartItems , Purchase, sequelize, ProductImages} = require('../models');
const multer = require('multer');




exports.addproduct = async (req , res) => {
    console.log("adding product");
    try{
        const transaction = await sequelize.transaction();

        try{
            console.log(req.files);
            const product = await Product.create({
                name : req.body.name,
                description : req.body.description,
                price : req.body.price,
                stock : req.body.stock,
                category : req.body.category,
                brand : req.body.brand,
                releasedate : req.body.releasedate,
                availability : req.body.availability,
            },{transaction});
            console.log("here");
            console.log(product);
            const images = req.files.map(file => ({
                name: file.filename,
                path: file.path,
                productId: product.id
            }));

            await ProductImages.bulkCreate(images, { transaction });

            await transaction.commit();
      
            res.status(201).json({
                message: 'Product created successfully',
                productId: product.id
            });
            }catch(err){
                await transaction.rollback();
                throw err;
        }
    }catch(err){
        
        res.status(500).json({ err: 'Internal server error' });
        }

}

