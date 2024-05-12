const {Pool}=require('pg');

//en esta sección de codigo hare la conexion a la db
//estarán mis datos de mis postgres favor de poner los propios

const database=new Pool({
    user:'postgres',
    password:'naarsee',
    host:'localhost',
    port:5432,
    database:'Library'
});

module.exports=database;