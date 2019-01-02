var connectionString = "postgres://bsytgkcjhiejcw:0357afb17e6e302a4cf676592f8bcc88443affac85e1a9c88243e38e69d0061a@ec2-79-125-119-244.eu-west-1.compute.amazonaws.com:5432/daj2jh3uums4hj";

var express = require('express');
var app = express();
/*const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();*/

app.set( 'port', ( process.env.PORT || 5000 ));

app.listen( app.get( 'port' ), function() {
  console.log( 'Node server is running on port ' + app.get( 'port' ));
});

app.get("/", (req, res)=> { 
    
  //connect to DB Postgres
  const { Client } = require('pg');
  const client = new Client({
    connectionString: connectionString,
    ssl: true,
  });
  client.connect();

  client.query("SELECT Count(*) FROM records", (err, result) => {
    if(err){
      res.status(400).send(err);
      client.end();
    } else {
      res.status(200).send('Count of records => ' + JSON.stringify(result.rows));
    }
    client.end();
  })

});

app.get("/records", (req, res)=> { 
    
  //connect to DB Postgres
  const { Client } = require('pg');
  const client = new Client({
    connectionString: connectionString,
    ssl: true,
  });
  client.connect();

  client.query("SELECT * FROM records", (err, result) => {
    if(err){
      res.status(400).send(err);
      client.end();
    } else {
      res.status(200).send('All records => ' + JSON.stringify(result.rows));
    }
    client.end();
  })

});