const mysql = require('mysql2');

// establishing database connection
const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"Marvin@010608",
    database:"warehouse_inventory"
})

// create the database if it doesn't exist
db.query(`CREATE DATABASE IF NOT EXISTS warehouse_inventory`, (err) => {
    if (err) {
        console.error('error creating database:', err.message);
        process.exit(1);
    } else {
        console.log('Database "warehouse_inventory" is ready.');
        // switch to the created database
        db.changeUser({ database: "warehouse_inventory" }, (err) => {
            if (err) {
                console.error('error switching to database:', err.message);
                process.exit(1);
            } else {
                console.log('using database "warehouse_inventory".');
            }
        });
    }
});

module.exports = db;