const {User, EmailVerify} = require('../models');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require("crypto");
const sendMail = require('./emailController');
const emailverify = require('../models/emailverify');

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
        const token = jwt.sign({userId : user.id},JWT_SECRET,{'expiresIn':'10h'});
        const username = user.name;
        console.log("jswt");
        res.json({token , username});
    }catch(err){
        console.log("eror");
        res.status(500).json({error : err.message});
    }
};

exports.sendmail = async (req , res) => {
    // const {to , subject , body } = req.body;
    const to = req.body.to;
    const subject = req.body.subject;
    const body = req.body.body;
    console.log('sending email');
    try{
        const info = sendMail({to,subject,body});

        res.status(200).json({ message: 'Email sent', id: info.messageId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error sending email' });
  }
}

exports.sendverificationcode = async (req , res) => {
    console.log("sending verification code");
    const to = req.body.email;
    const buffer = crypto.randomBytes(3);
    const temp = parseInt(buffer.toString("hex"), 16) % 1000000;
    const body = temp.toString().padStart(6, '0');
    console.log({body,to});
    const subject = 'give the verificaiont';
    try{
        
        const info = await sendMail({to, subject , body});
        if(info){
            const verify = EmailVerify.create({
                email : to,
                code : body
            });
        }else{
            res.status(201).json({message : "could not sent"});
        }
        
        res.status(201).json({message : "code sent"});
    }catch(err){
        console.log(err);
    }
}
    

exports.verifycode = async (req , res) => {
    console.log("verifying");
    const code = req.body.code;
    const email = req.body.email;
    try{
        const find = EmailVerify.findOne({
            where :{
                email : email,
                code : code
            }
 
        });
        if(find){
            res.json({message : 'success'});
        }else{
            console.log("could not veryify");
            res.json({message : 'failed'});
        }
        
    }catch(err){
        console.log(err);
    }
}