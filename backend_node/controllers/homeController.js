const { Product, ProductImages } = require("../models");

exports.topproducts = async (req , res) => {
    console.log("top products");
    try{
        const items = await Product.findAll({
            limit : 5,
            include :{
                model : ProductImages
            }
        });
        
        if(!items){
            res.json({message : 'no items found'});
        }
        
        res.json({items:items});
    }catch(error){
        console.log("an error was encountered");
    }
};
