const jwt = require('jsonwebtoken')

const JWT_SECRET = 'HOWAREYOU';

module.exports = (req, res, next) => {
    const authHeader = req.headers?.authorization;
    if(!authHeader){
        return res.status(401).json({error : "no token found"});
    }
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Malformed token' });

    try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch(err){
    res.status(403).json({ error: 'Invalid token' });
  }

};