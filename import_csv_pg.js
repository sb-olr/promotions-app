const fs = require("fs");

const csv = require("fast-csv");
const { Pool } = require('pg')

const pool = new Pool({
 host: 'localhost',
 user: 'postgres',
 database: 'postgres',
 max: 20,
 idleTimeoutMillis: 30000,
 connectionTimeoutMillis: 2000,
})
let tableName = 'Promotions';

const csvFile='./data/data_10k_rows.csv';

const DEBUG = false;

const csvImport = (inFile) => {
let counter = 0;
const startTime = new Date;
console.log('start: ', startTime);

var stream = fs.createReadStream(inFile);

pool.connect(function(err,client,done) {
  if(err){
      console.error("Cannot get Postgres connection " + err);
  }
  client.query(`DELETE FROM ${tableName}`, [] ,function(err,result) {
        done();
        if(err){
            console.log(err);
        }
    });
  csv
   .fromStream(stream, {headers : ['id','price','expiration_date'],   strictColumnHandling: true, ignoreEmpty: true})
   .on("data", function(data){
       counter++;
       if (DEBUG) {console.log(data);}
       client.query(`INSERT INTO ${tableName} values ($1, $2, $3)`, [data.id, data.price, data.expiration_date] ,function(err,result) {
             done();
             if(err){
                 console.log(err);
             }
         });
   })
   .on("end", function(){
       const endTime = new Date();
       console.log('end  : ', endTime);

       let timeDiff = parseFloat(((endTime - startTime)/1000).toFixed(2));

       console.log(`done: Read ${counter} records`);
       console.log(`duration: ${timeDiff} (s)`);
   });
// return;
});

}

csvImport(csvFile);
