//conexion a la database 
const database = require('../database');
const{format}=require('date-fns');
const jwt = require('jsonwebtoken');


const getAllBooks = async (req, res) => {
    try {

        const books=await database.query ("SELECT books.*, users.name AS user_name FROM books JOIN users ON books.user_id = users.id");
        res.json(books.rows)
    } catch (error) {
        console.log(error.message )
    }
}

const addBook = async (req, res) => {
    const { author, title, isbn } = req.body;
    try {
        // Verificar el token para obtener el id y asi guardarlo
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;

        //ahora obtengamos la fecha 
        const dateNow=new Date();
        const datePostgres=format(dateNow,'dd/MM/yyyy');

        // Query para guardar el libro en bd 
        const result = await database.query("INSERT INTO books (author, title, isbn, user_id,release_date) VALUES ($1, $2, $3, $4,$5) RETURNING *", [
            author, title, isbn, userId,datePostgres
        ]);

        if (result.rowCount > 0) {
            const bookCreated = result.rows[0];
            const idBook = bookCreated.id;

            res.send('El id del libro es: ' + idBook);
        } else {
            res.status(400).send({ error: 'ISBN has already been registered' });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteBook = async (req, res) => {
    try {
        
    const{id}=req.params;

    const result=await database.query("DELETE FROM books WHERE id= $1", 
    [id]);
    if (result.rowCount==0){
        return res.status(404).json({
            message:"Libro no encontrado"
        })
    }

    res.status(200).json(true);


    } catch (error) {
        res.json({error: error.message});
    }
}

module.exports = {
    getAllBooks,
    addBook,
    deleteBook
}