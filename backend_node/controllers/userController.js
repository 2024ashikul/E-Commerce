const {User} = require('../models');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

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
    console.log(subject);
    console.log(to);
    console.log(body);
    console.log('sending email');
    try{
        const transporter = nodemailer.createTransport({
            service: 'gmail', // or 'smtp.ethereal.email' for testing
            auth: {
                user: '2024ashikul@gmail.com',
                pass: 'lkmp dfgm vwsd bgck', // use env vars or app passwords!
            },
        });

        const info = await transporter.sendMail({
            from: '"Tech Bangladesh" 2024ashikul@gmail.com',
            to,
            subject,
            body,
        });

        res.status(200).json({ message: 'Email sent', id: info.messageId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error sending email' });
  }
}
    
