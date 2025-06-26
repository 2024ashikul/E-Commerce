const { Product, ProductImages} = require("../models");
const { Op } = require('sequelize');

exports.searchpending = async (req , res) => {
    console.log("searhing");
    try{
        const value = req.params.value;
        const pendingProducts = await Product.findAll({
            limit : 5,
            where : {
                name : {
                  [Op.like]: `%${value}%`
                }
            }
        }  );
        
        //const keywords = (pendingProducts.map(c=> c.name));
        console.log(pendingProducts)
       
        
        res.status(200).json({products : pendingProducts});
    }catch(err){
        console.log(err);
    }
}


exports.searchresults = async (req , res) => {
    console.log("searhing page");
    try{
        const value = req.params.value;
        const pendingProducts = await Product.findAll({
            limit : 5,
            where : {
                name : {
                  [Op.like]: `%${value}%`
                }
            }
            ,
            include : {model : ProductImages}
        }  );
        
        //const keywords = (pendingProducts.map(c=> c.name));
        console.log(pendingProducts);
        
        res.status(201).json({products : pendingProducts});
    }catch(err){
        console.log(err);
    }
}