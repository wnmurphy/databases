var db = require('../db');


db.query("SELECT * FROM users", function(err, results) {
  console.log('results from users: ' + results);
});

db.query("SELECT * FROM messages", function(err, results) {
  console.log('results length from messages: ' + results.length);
});


module.exports = {

  messages: {
    // id, text, username, roomname
    get: function (callback) {
      var string = "select * from messages";
      //var string = "SELECT messages.messageID, message.messageText, messages.roomName, users.userName from messages \ LEFT OUTER JOIN users ON (messages.userID = users.userID) \ ORDER BY messages.messageID DESC";
      db.query(string, function(err, data) {
        if (err) {
          console.error(err);
          return;
        }
        console.log('MESSAGES MODEL GET data:', data);
        callback(data);
      });
    },







    post: function (params, callback) {
      var string = "INSERT INTO messages (userID, roomName, messageText) values ((SELECT userID FROM users WHERE userName = ? LIMIT 1), ?, ?)";
      db.query(string, params, function(data){
        console.log('in models.messages.post');
        if(err){
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
        console.log('USERS GET data:', data);
        callback(data);
      })
    },

    post: function (params, callback) {
      var string = "INSERT into USERS (userName) values (?)"
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

