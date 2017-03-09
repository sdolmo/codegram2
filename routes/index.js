var express = require('express'),
    router = express.Router()
    // passport = require('passport'),
    // User = require('../models/user.js');

//set the route path & initialize the API
router.get('/', function(req, res) {
  res.json({ message: 'API Initialize!' });
});

module.exports = router;
