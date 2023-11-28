const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Shivraj#2501",
  database: "taskmanagement",
});

module.exports=db