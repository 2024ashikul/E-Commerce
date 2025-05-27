const { Product } = require("../models");



exports.addtocart = async (req , res) => {
    console.log("addtocart");
    try{
        const userid = req.user.userId;
        const {productid} = req.body;
        const product = await Product.findOne({where:{id : productid }});
        const cartitem = await Cart.create({
            userid : userid,
            productid : productid,
            quantity : 1
        });
    }catch(error){
        console.log(error);
    }
}