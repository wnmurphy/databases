var mysql = require('mysql');

var dbConnect = mysql.createConnection({
  user: "root",
  password: "",
  database: "chat"
});

dbConnect.connect();

module.exports = dbConnect;
