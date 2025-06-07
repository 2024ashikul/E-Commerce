const { where } = require("sequelize");
const { Product , Cart , CartItems, Purchase } = require("../models");
const cart = require("../models/cart");


exports.cartitems = async (req,res)=>{
    console.log("cartitems");
    try{
        const userid = req.user.userId;
        console.log(userid);
        const cart = await Cart.findOne({where : {UserId : userid}});
        const id = cart.id;
        console.log(cart);
        const cartitem = await CartItems.findAll({
            where : {cartId : cart.id },
            include : {model : Product}
        })
        console.log(cartitem);
        res.json(cartitem);
    }catch(error){
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
                cartId : cart.id,
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
        const cartitemid = req.body.cartitemid;
        const cartitem = await CartItems.destroy({where : {id : cartitemid}});
        res.status(201).json({message : "deleted" , cartitemid : cartitem.id});
    }catch(error){
        console.log(error);
    }
}

exports.increasecart = async (req , res) => {
    console.log("increasecart");
    try{
        const cartitemid = req.body.cartitemid;
        const cartitem = await CartItems.findOne({where : {id : cartitemid}});
       // let cartitem = await CartItems.findOne({where : {productId : productid}});
        console.log(cartitem);
        cartitem.quantity+=1;
        await cartitem.save();
        console.log("saved");
        res.status(201).json({message: 'increased', quantity : cartitem.quantity});
    }catch(error){
        console.log(error);
    }
}

exports.decreasecart = async (req , res) => {
    console.log("decreasequantity");
    try{
        const cartitemid = req.body.cartitemid;
        const cartitem = await CartItems.findOne({where : {id : cartitemid}});
       // let cartitem = await CartItems.findOne({where : {productId : productid}});
        console.log(cartitem);
        if(cartitem.quantity <= 1){
            res.status(200).json({message: 'cannot decrease', quantity : cartitem.quantity});
        }else{
        cartitem.quantity-=1;
        await cartitem.save();
        console.log("saved and decreased");
        res.status(201).json({message: 'increased', quantity : cartitem.quantity});
        }
    }catch(error){
        console.log(error);
    }
}

exports.purchase = async (req , res) => {
    console.log("purchasing");
    try {
        const cartitemid = req.body.cartitemid;
        const userid = req.user.userId;
        
        const cartitem = await CartItems.findOne({
            where : {id : cartitemid},
            include : {model : Product}
            
        });
        const productid = cartitem.Product.id;
        const totalprice = cartitem.quantity* cartitem.Product.price;
        const purchase = await Purchase.create({
            quantity : cartitem.quantity,
            userId : userid,
            productId : productid,
            unitPrice : cartitem.Product.price,
            totalPrice : totalprice
        });
        console.log(purchase);
        await CartItems.destroy({where : {id : cartitemid}});
        res.status(201).json({message : 'deleted'});

        
    }catch(err){
        console.log(err);
    }
}

exports.purchaseitems = async (req ,res) => {
    console.log("purchase items");
    try{
        const userid = req.user.userId;
        const purchases = await Purchase.findAll({
            where : {userId : userid},
            include : {model : Product}
        })
        console.log(purchases);
        res.status(201).json({message: 'success', purchases : purchases});
    }catch(err){
        console.log(err);
    }
}