const {User} = require('../models');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'HOWAREYOU';

exports.signup= async (req , res) => {
    console.log("signup");
    try{
        const {name , username, email,password} = req.body;
        const user = await User.create({name,username,email,password});
        res.status(201).json({id : user.id , email : user.email});
    }catch(err){
        res.status(500).json({error : err.message});
    }
};

exports.login = async (req , res ) => {

    try{
        const {email,password} = req.body;
        const user = await User.findOne({where : {email} });
        if(!user){
            console.log("not found");
            return res.status(401).json({message : "Invalid creditials"});
        }
        const valid = await user.validatePassword(password);
        if(!valid){
            console.log("not valid");
            return res.status(401).json({message : "Invalid credentials"});
        }
        const token = jwt.sign({userId : user.id},JWT_SECRET,{'expiresIn':'1h'});
        console.log("jswt");
        res.json({token});
    }catch(err){
        console.log("eror");
        res.status(500).json({error : err.message});
    }
};

