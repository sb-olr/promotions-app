# promotions-app
This is a set of two tools to import csv to pg db and serve it (search by id) RESTfully


# Instructions

We assume that a postgres database is installed and we know the database name is known.

1) clone the repo:
git clone https://github.com/sb-olr/promotions-app.git

2) run:
npm install

3) Please use scripts in db_scripts folders to create Table and insert a data row to test. Ask DBA/DEVOPS team if not sure how it works.

4) Please make sure to check the db name matches the one in the scripts ('postgres') or update it in the scripts

5) import data:
run:
node import_csv_pg.js

6) run server:
run:
node server_promotions.js

 7) test it:
 run:
 curl http://localhost:1321/promotions/fff89049-8121-4810-88dd-0811df3dc3f3

# Known Issues

1) There is currently an unhandled promise exception which breaks the import script in the end. It works for upto 25k rows. A fix is being worked on.

2) The next refactor of the script will include chunking and batch inserts for a fixed number of records (eg 10k). This will also help when data file is extremely large by using several server threads.

3) Test data is provided. However suitable automated test were not provided due to time constraints. They are being added.

4) A server such as nginx will be required if https is to be used. It's out of scope for this project.

5) The import tool should be setup in a cron job to import new data.
