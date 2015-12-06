'use strict';

var query = require('./query');

module.exports.add = function addToWall (userId, text, cb) {
  var values = [userId, text, new Date()];
  var q = 'INSERT INTO wall ("userId", text, date) VALUES($1, $2, $3)';

  query(q, values, function (err, result) {
    if (err) {
      return cb(err);
    } else {
      return cb(null, result);
    }
  });
};

module.exports.getWall = function getWall (limit, cb) {
  var values = [limit];
  var q = 'SELECT wall.text, wall.date, users.username ' +
          'FROM wall LEFT JOIN users ON wall."userId" = users.id ' +
          'ORDER BY wall.date DESC LIMIT $1';

  query(q, values, function (err, result) {
    if (err) {
      return cb(err);
    } else {
      return cb(null, result);
    }
  });
};