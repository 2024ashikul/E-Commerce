const { Product } = require("../models");


exports.searchpending = async (req , res) => {
    console.log("searhing");
    try{
        const value = req.params.value;
        const pendingProducts = await Product.findAll({
            limit : 5,
            where : {
                name : value
            }
        });
        
        //const keywords = (pendingProducts.map(c=> c.name));
        console.log(pendingProducts);
        
        res.status(200).json({products : pendingProducts});
    }catch(err){
        console.log(err);
    }
}