const { Product } = require("../models");

exports.topproducts = async (req , res) => {
    console.log("top products");
    try{
        const items = await Product.findAll({limit : 10});
        res.json(items);
    }catch(error){
        console.log("an error was encountered");
    }
};
