const { where } = require("sequelize");
const { Product , Cart , CartItems } = require("../models");


exports.cartitems = async (req,res)=>{
    console.log("cartitems");
    try{
        const userid = req.user.userId;
        console.log(userid);
        const cartitem = await Cart.findAll({where : {UserId : userid}});
        console.log(cartitem);
        res.json(cartitem);
    }catch{
        console.log(error);
    }
}

exports.addtocart = async (req , res) => {
    console.log("addtocart");
    try{
        const userId = req.user.userId;
        const { productid } = req.body;
        console.log(userId);
        let cart = await Cart.findOne({where : {userId : userId}});
        if (!cart) {
            cart = await Cart.create({ userId });
        }

        let cartitem = await CartItems.findOne({where : {productId : productid}});
        
        if(!cartitem){
            const a = await CartItems.create({
                productId : productid,
                quantity : 1
            });
            
        }else{
            cartitem.quantity+=1;
            await cartitem.save();
            console.log("increased");
        }
        console.log(productid);
        //const product = await Product.findOne({where:{id : productid }});
       
        res.status(201).json({message : "added"});
    }catch(error){
        console.log(error);
        res.status(500).json({error : error.message});
    }
}

exports.removefromcart = async (req , res) => {
    console.log("removefromcart");
    try{
        const userid = req.user.userId;
        const {productid} = req.body;
    
    }catch(error){
        console.log(error);
    }
}

exports.increasecart = async (req , res) => {
    console.log("removefromcart");
    try{
        const userid = req.user.userId;
        const {productid} = req.body;
    
    }catch(error){
        console.log(error);
    }
}

exports.decreasecart = async (req , res) => {
    console.log("removefromcart");
    try{
        const userid = req.user.userId;
        const {productid} = req.body;
    
    }catch(error){
        console.log(error);
    }
}
