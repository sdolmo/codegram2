var bodyParser = require('body-parser'),
    express = require('express'),
    router = express.Router(),
    db = require('./db.js'),
    // People = require('./model/people.js'),
    app = express();


// Routes
var indexRoutes = require("./routes/index.js")

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

  // and remove caching to get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// adding /people route to /api router
// router.route('/people')
//   .get(function(req, res) {
//     People.getAll(function(err, people){
//       if (err)
//         res.send(err);
//         res.json(people)
//     });
//   })

// use router configuration when we call /api
app.use('/', indexRoutes);

// connect to MySQL
db.connect(db.MODE_TEST, function(err) {
  if (err) {
    console.log('Unable toconnect to MySQL.')
    process.exit(1)
  } else {
    app.listen(port, function() {
      console.log(`api running on port ${port}`);
    })
  }
})

// // starts th server and listens for requests
// app.listen(port, function() {
//   console.log(`api running on port ${port}`);
// });
