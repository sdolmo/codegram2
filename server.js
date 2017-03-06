var bodyParser = require('body-parser'),
    express = require('express'),
    mysql = require('mysql'),
    app = express();

// create connection to db
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'sylvia',
  password: 'Chobits',
  database: 'sitepoint'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack) ;
    return;
  }

  console.log('connected as id ' + connection.threadId);
});
