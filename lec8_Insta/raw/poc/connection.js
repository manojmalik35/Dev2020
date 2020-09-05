var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root98125',
  database: 'insta_pp'
})

connection.connect();
console.log("Connected to DB");
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
// flush privileges;
// If that doesn't work, try it without @'localhost' part.