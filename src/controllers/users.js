//conexion a la database 
const database = require('../database');


const registerUser= async (req,res) =>{
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

const getUsers=async (req,res) => {
    try {
        const users =await database.query('SELECT id, name, email FROM users');
        res.json(users.rows);
    } catch (error) {
        console.log(error.message);
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await database.query("DELETE FROM users WHERE id = $1", [id]);
        res.status(200).json({ message: "Usuario eliminado correctamente." });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar usuario, esta ligado a un libro." });
    }
}

const modifyUser= async (req,res) => {
    const {id} =req.params;
    const {name, email}=req.body;
    try {
        const result=await database.query("UPDATE users SET name=$1, email=$2 WHERE id= $3 RETURNING*", [name, email, id])
        if(result.rowCount>0){
            res.status(200).json(result.rows[0]);
        }
    } catch (error) {
        res.status(500).json({ message: "Error al modificar usuario!" });
    }
}

const getUserID=async (req,res) => {
    const { id } = req.params;
    try {
        const users =await database.query('SELECT id, name, email FROM users WHERE id=$1',[id]);
        res.json(users.rows);
    } catch (error) {
        console.log(error.message);
    }
}
module.exports={
    getUsers,
    deleteUser,
    registerUser,
    modifyUser,
    getUserID
}