const { Model ,Sequelize, where } = require("sequelize");
const { Product, ProductImages, ProductRating, Comments, User  } = require("../models");
const { raw } = require("body-parser");


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
        
        return res.json({productinfo:productinfo });
    }catch(err){
        console.log(err);
    }
}

exports.category = async (req ,res) => {
    console.log("categories");
    try{
        const category = req.params.category;
        console.log(category);
        const products = await Product.findAll({
            where :{category : category},
            include : {model : ProductImages}
        });
        res.json({products:products});
    }catch(err){
        console.log(err);
    }
}

exports.categories = async (req ,res) => {
    console.log("getting categories");

    try{
        const categories = await Product.findAll({
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('category')), 'category']],
            raw: true,
            limit:10
        });
        const category = (categories.map(c => c.category));
        console.log(category);
        res.json(category);
    }catch(err){
        console.log(err);
    }
}

exports.submitratings = async(req, res) => {
    console.log("submitting ratings");
    try{
        const userid = req.user.userId;
        const productid = req.body.productid;
        const rating = req.body.starRating;
        console.log(rating);
        console.log(productid);
        const Rating = await ProductRating.findOne({
            where :{
                productId : productid,
                userId : userid
            }
        });
        const newRating = new ProductRating();
        if(Rating){
            Rating.rating = rating;
            await Rating.save();
        }else{
                newRating = await ProductRating.create({
                rating : rating,
                userId : userid,
                productId : productid
            });
        }
        console.log("succcessfully submitted ratings");
        console.log(newRating);
        res.status(201).json(newRating);
        
    }catch(err){
        console.log(err);
    }
}

exports.submitcomments = async(req, res) => {
    console.log("submitting comments");
    try{
        const userid = req.user.userId;
        const productid = req.body.productid;
        const comment = req.body.selfComment;
        console.log(comment);
        console.log(productid);
       

        const newComment = await Comments.create({
                comment : comment,
                userId : userid,
                productId : productid,
            });
        const fullComment = await Comments.findOne({
            where: { id: newComment.id },
            include: [
                        {
                            model: User,
                            attributes: ['name'],
                        },
                    ],
            });
        
        console.log("succcessfully submitted comments");
        console.log(fullComment);
        res.status(201).json({comment : fullComment});
        
    }catch(err){
        console.log(err);
    }
}

exports.comment = async(req,res) => {
    console.log("comments");
    try{
        const productid = req.body.productid;
        console.log(productid);
        const comments = await Comments.findAll({
            where : {
                productId : productid
            },
            include : [
                {
                    model : User,
                    attributes : ['name']
                }
            ]
        });


        console.log(comments);
        return res.json({comment : comments});
    }catch(err){
        console.log(err)
    }
}