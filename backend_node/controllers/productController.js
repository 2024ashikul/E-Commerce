const { Model } = require("sequelize");
const { Product, ProductImages } = require("../models");

exports.product = async (req , res) => {
    console.log("here");
    try{
        const productid = req.params.id;
        console.log(productid);
        const productinfo = await Product.findOne({
            where : {id : productid},
            include : {
                model : ProductImages
            }
        });
        console.log(productinfo);
        return res.json({productinfo:productinfo});
    }catch(err){
        console.log(err);
    }
}