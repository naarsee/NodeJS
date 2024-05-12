//conexion a la database 
const database = require('../database');
const {encrypt, compare}=require('../helpers/bcrypt');
const { tokenSign } = require('../helpers/token');
const jwt = require('jsonwebtoken');


const login=async (req,res) =>{
    const {email, password}=req.body;
    try {
        const result=await database.query("SELECT * FROM users WHERE email=$1",[email]);
        if(result.rowCount>0){
            const user=result.rows[0];
            const passwordHash=user.password;
            const comparePassword=await compare(password, passwordHash);
            if (comparePassword){
                //creo el token ya que veo que si existe el usuario y la contraseña es valida
                const tokenSession=await tokenSign(user);
                // Decodificar el token para obtener el ID y el nombre del usuario
                const decodedToken = jwt.verify(tokenSession, process.env.JWT_SECRET);
                const { id, name } = decodedToken;

                res.status(200).json({tokenSession});
            }else{
                res.status(409).send({error: 'Invalid password'})
            }
        }else{
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.json({error:error.message})
    }

}

const register= async (req,res) =>{
    const {name, email, password}=req.body;
    //aqui hago que sean obliogatorios los campos, si no los pasa manda error
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Name, email and password are required!" });
    }else{
        const passwordHash=await encrypt(password);
        try {
            const result= await database.query("INSERT INTO users (name, email,password) VALUES ($1, $2,$3)",[
                name, email, passwordHash
            ]);

            if(result.rowCount >0){
                res.status(200).json(true);
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

module.exports = {
    login,
    register
}