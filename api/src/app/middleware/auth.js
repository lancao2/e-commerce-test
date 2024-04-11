const jwt = require('jsonwebtoken')
require('dotenv').config();

module.exports = (req, res, next) => {
 try {
    const authHeader = req.headers.authorization;

    if (!authHeader){
        throw new Error('token is required');
    }
    const tokenParts = authHeader.split(' ');
    
    if (!tokenParts.length === 2){
        throw new Error('invalid token');
    }

    const [scheme, token ] = tokenParts;
    if (!/\bBearer$\b/.test(scheme)){
        throw new Error('invalid token');
    }

    jwt.verify(token, process.env.TOKEN_HASH, (err, decoded)=> {
        if (err) throw new Error(err.message);

        req.userId = decoded.id

        return next()
    })

 } catch (error) {
    return res.status(401).json({message: error.message});
 }
}