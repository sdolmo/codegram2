var mysql = require('mysql'),
    async = require('async');

var TEST_DB = 'sitepoint';

exports.MODE_TEST = 'mode_test';

var state = {
  pool: null,
  mode: null
}

exports.connect = function(mode, done) {
  state.pool = mysql.createPool({
    host: 'localhost',
    user: 'sylvia',
    password: 'Chobits',
    database: mode === exports.MODE_TEST ? TEST_DB : null
  })

  state.mode = mode
  done()
}

exports.get = function() {
  return state.pool
}

exports.fixtures = function(data) {
  var pool = state.pool
  if (!pool) return done(new Error('Missing database connection.'))

  var names = Object.keys(data.tables)
  async.each(names, function(name, cd) {
    async.each(data.tables[name], function(row, cb) {
      var keys = Object.keys(row)
      , values = keys.map(function(key) { return "'" + row[key] + "'" })

      pool.query('INSERT INTO ' + name + ' ( ' + keys.join(',') + ' ) VALUES (' + values.join(',') + ')', cb)
    }, cb)
  }, done)
}

exports.drop = function(tables, done) {
  var pool = state.pool
  if (!pool) return done(new Error('Missing database connection.'))

  async.each(tables, function(name, cb) {
    pool.query('DELETE * FROM ' + name, cb)
  }, done)
}
