const mysql = require('mysql2');

// establishing database connection
const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"Marvin@010608",
    database:"warehouse_inventory"
})

module.exports = db;