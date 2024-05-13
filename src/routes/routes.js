// función Router y lo declaro en variable para poder crear rutas que se usaran en la navegación
const {Router} =require('express');
const router=Router();

//conexion a la database 
const database=require('../database');

//conecto el controlador para login y register (auth), tambien a token
const { login, register }=require('../controllers/auth');
const {checkToken}=require('../middleware/auth');

//conecto el controlador
const {getAllBooks, deleteBook, addBook, updateBook}=require('../controllers/controller');

router.get('/books', getAllBooks);

router.post('/books',checkToken, addBook);

router.delete('/books/:id',checkToken, deleteBook);

router.put('/books/:id', updateBook);


//Rutas de auth
router.post('/auth/login',login);

router.post('/auth/register', register)

module.exports=router;