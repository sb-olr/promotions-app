# promotions-app
import csv to pg db and server to search by id


# Instructions

We assume that the postgres database is installed and we know the database name is known

1) clone the repo 

2) run npm install

3) use scripts in db_scripts folders to create Table and insert a data row to test

4) make sure to check the db name matches the one in the scripts ('postgres') or update it in the scripts

5) import data:
run:
node import_csv_pg.js

6) run server:
run:
node server_promotions.js

 7) test it:
curl http://localhost:1321/promotions/1

