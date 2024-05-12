//en esta seccion haremos la verificacion de que un usuario este con token 
const { verifyToken }=require('../helpers/token');

const checkToken=async (req,res,next) =>{
    try {
        
        const token=req.headers.authorization.split(' ').pop();
        const tokenData=await verifyToken(token);

        if(tokenData.id){
            next();
        }
    } catch (error) {
        res.status(409);
        res.send({error: 'You have to login first and send the given token' })
    }
}

module.exports = {
    checkToken
}