/*
input row:
2d522e2c-b2ac-4696-94b9-7dc95cd80ce6,21.591581,2018-06-27 10:05:45 +0200 CEST
expected output :
{“id”:“2d522e2c-b2ac-4696-94b9-7dc95cd80ce6",“price”:“21.591581","expiration_date":“2018-06-27 10:05:45"}
*/
const express = require('express')
const { Pool } = require('pg')
const HTTP_SUCCESS = 200;
const HTTP_NOT_FOUND = 404;
const HTTP_ERROR = 400;

const pool = new Pool({
 host: 'localhost',
 user: 'postgres',
 database: 'postgres',
 max: 20,
 idleTimeoutMillis: 30000,
 connectionTimeoutMillis: 2000,
})
let tableName = 'Promotions';
let portNo = 1321;
const app = express()

app.get('/promotions/:id', (req, res) => {
 pool.connect(function(err,client,done) {
   if(err){
       console.error("Cannot get Postgres connection " + err);
       res.status(HTTP_ERROR).send(err);
   }

   client.query(`SELECT * FROM ${tableName} where id = $1`, [req.params.id],function(err,result) {
       done();
       if(err){
           console.log(err);
           res.status(HTTP_NOT_FOUND).send(err);
       }
       if (result && result.rows && result.rows.length === 0){
         res.status(HTTP_NOT_FOUND).send('id not found');
       } else {
         let json = result.rows[0];
         json["expiration_date"] = json["expiration_date"].substring(0,19);
         res.status(HTTP_SUCCESS).send(json);
       }
   });
 });
 });

app.get('/', (req, res, next) => {
   res.send('Promotions server! please use /promotions/id to retrieve json.');
})

app.listen(portNo, () => {
   console.log('Server listening.')
})
