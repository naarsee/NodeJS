//libreria para poder crear tokens conn jwt 
const jwt = require('jsonwebtoken');

require('dotenv').config();


const tokenSign=async (user)=>{
    
    const secretKey=process.env.JWT_SECRET;
    return jwt.sign(
        {
            id:user.id,
            name:user.name
        },secretKey,
        {
            expiresIn:"24h"
        }
    );
}

const verifyToken=async (token)=>{
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
}

const decodeSign=async (user)=>{
    
}

module.exports={
    tokenSign, 
    verifyToken,
    decodeSign
}