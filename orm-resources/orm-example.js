var Sequelize = require("sequelize");
var sequelize = new Sequelize("chatter", "root", "");

var User = sequelize.define("User", {
  username: Sequelize.STRING
});

var Message = sequelize.define("Message" {
  userid: Sequelize.INTEGER,
  text: Sequelize.STRING,
  roomname: Sequelize.STRING
});

//Create the database table for us if it doesn't exist already
User.sync().success(function() {

  // instantiate an object and save it
  var newUser = User.build({username: "Jean Valjean"});
  newUser.save().success(function() {

    // Retrieve objects from the database
    User.findAll({ where: {username: "Jean Valjean"} }).success(function (usrs) {
      // This function is called back with an array of matches.
      for (var i = 0; i < usrs.length; i++) {
        console.log(usrs[i].username + " exists");
      }
    });
  });
});
