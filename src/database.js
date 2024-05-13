const {Pool}=require('pg');

//en esta sección de codigo hare la conexion a la db
//estarán mis datos de mis postgres favor de poner los propios
//no los agregue al .env para su manipulacion sencilla si ustedes cambian algo
const database=new Pool({
    user:'postgres',
    password:'naarsee',
    host:'localhost',
    port:5432,
    database:'Library'
});

module.exports=database;