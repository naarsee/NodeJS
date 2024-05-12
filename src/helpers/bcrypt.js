//bcrypt code
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');

const encrypt=async (textPlain)=>{
    const hash =await bcrypt.hash(textPlain,10);
    return hash;
}

const compare=async(password, hashPassword) =>{
    return await bcrypt.compare(password, hashPassword)
}

module.exports = {
    encrypt, 
    compare
}