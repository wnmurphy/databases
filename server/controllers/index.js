var models = require('../models');
var bluebird = require('bluebird');
//Send info to client from server

module.exports = {
  messages: {


    get: function (req, res) {
      models.messages.get(function(data){
         if(err){
          console.error(err);
          return;
        }
        console.log('MESSAGES CONTROLLER get data:',data);
        res.json(data);
      });
    }, 








    post: function (req, res) {
      // How to get info from JSON [roomName, userName, messageText]
      var params = [req.body.username, req.body.roomname, req.body.text];
      models.messages.post(params, function(data){
        //  if(err){
        //   console.error(err);
        //   return;
        // }
        console.log('MESSAGES CONTROLLER post data:',data);
        res.json(data);
      });
    } 
  },

  users: {
    get: function (req, res) {
      models.users.get(function(data){
        //  if(err){
        //   console.error(err);
        //   return;
        // }
        console.log('USER CONTROLLER get data:',data);
        res.json(data);
      });
    },
    post: function (req, res) {
      var params = [req.body.username]; //get username from client
      models.users.post(params, function(data){
        //  if(err){
        //   console.error(err);
        //   return;
        // }
        console.log('USER CONTROLLER post data:',data);
        res.json(data);
      });
    }
  }
};

