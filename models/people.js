var db = require('../db.js')

exports.create = function(name, age, address, done) {
  var values = [name, age, address]

  db.get().query('INSERT INTO people (name, age, address) VALUES(?, ?, ?)', values, function(err, result) {
    if (err) {
      console.log('There was an error: ' + err.stack);
      return;
    }
    done(null, result.insertId)
  })
}

exports.getAll = function(done) {
  db.get().query('SELECT * FROM people', function(err, rows) {
    if (err) {
      console.log('There was an error: ' + err.stack);
      return;
    }
    done(null, rows)
  })
}

exports.getAllByName = function(name, done) {
  db.get().query('SELECT * FROM people WHERE name = ?', name, function(err, rows) {
    if (err) {
      console.log('There was an error: ' + err.stack);
      return;
    }
    done(null, rows)
  })
}
