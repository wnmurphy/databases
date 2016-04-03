var db = require('../db');


db.query("SELECT * FROM users", function(err, results) {
  console.log("results from users: " + results);
});

db.query("SELECT * FROM messages", function(err, results) {
  console.log("results length from messages: " + results.length);
});


module.exports = {

  messages: {
    get: function (callback) {
      var string = "select * from messages";
      db.query(string, function(err, data) {
        if (err) {
          console.error(err);
          return;
        }
        callback(data);
      });
    },

    post: function (params, callback) {
      var string = "INSERT INTO messages (userID, roomName, messageText) values ((SELECT userID FROM users WHERE userName = ? LIMIT 1), ?, ?)";
      db.query(string, params, function (data) {
        if (err) {
          console.error(err);
          return;
        }
        callback(data);
      });
    }
  },

  users: {
    get: function (callback) {
      var string = "SELECT * from USERS";
      db.query(string, function(data) {
        if(err){
          console.error(err);
          return;
        }
        callback(data);
      })
    },

    post: function (params, callback) {
      var string = "INSERT into USERS (userName) values (?)";
      db.query(string, params, function(data) {
        if (err) {
          console.error(err);
          return;
        }
        callback(data);
      });
    }
  }
};
