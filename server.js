var bodyParser = require('body-parser'),
    express = require('express'),
    mysql = require('mysql'),
    router = express.Router(),
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

  // connection.query('CREATE TABLE people(id int primary key, name varchar(255), age int, address text)', function(err, result) {
  //   if (err) {
  //     console.error('error connecting: ' + err.stack) ;
  //     return;
  //   }
    connection.query('INSERT INTO people (name, age, address) VALUES (?,?,?)', ['Larry', '41', 'California, USA'], function(err, result) {
      if (err) {
        console.error('error connecting: ' + err.stack) ;
        return;
      }
      connection.query('SELECT * FROM people', function(err, results) {
        if (err) {
          console.error('error connecting: ' + err.stack) ;
          return;
        }
        console.log(results[0].id)
        console.log(results[0].name)
        console.log(results[0].age)
        console.log(results[0].address)
      })
    })
  // })
});

// set up port to either a predetermined port number or 3001
var port = process.env.API_PORT || 3001;

// configure API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// prevent errors from Cross Origin Resource Sharing, we will set
// headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods',
  'GET, HEAD, OPTIONS, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  // and remove caching to get the omost recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//set the route path & initialize the API
router.get('/', function(req, res) {
  res.json({ message: 'API Initialize!' });
});

// use router configuration when we call /api
app.use('/api', router);

// starts th server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
