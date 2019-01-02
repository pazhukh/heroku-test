var connectionString = "postgres://zndrgpubihikgg:146c1377c6b8a39a937bc5f2795d5ce5ec8d5db478dfc8e162cb2eb379e83fc2@ec2-54-247-74-131.eu-west-1.compute.amazonaws.com:5432/d3gj63qhlmojhs";

var express = require('express');
var app = express();
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

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
      res.status(200).send(result.rows);
    }
    client.end();
  })

});

app.get("/all-records", (req, res)=> { 
    
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
      res.status(200).send(result.rows);
    }
    client.end();
  })

});