//Requiero modulos
require('dotenv').config();
const express=require('express');
const morgan=require('morgan');

//Rutas
const routes=require('./routes/routes');

const app = express();
//morgan para ver en consola las peticiones usado para dev  
app.use(morgan('dev'));

//para que express pueda interpretar los json 
app.use(express.json());

app.use(routes);
const port=process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});