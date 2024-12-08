const mysql = require('mysql2');

// establishing database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Marvin@010608",
});

// initialize the database
const initializeDatabase = () => {
    return new Promise((resolve, reject) => {
        // create the database if it doesn't exist
        db.query(`CREATE DATABASE IF NOT EXISTS warehouse_inventory`, (err) => {
            if (err) {
                console.error('error creating database:', err.message);
                return reject(err);
            }
            console.log('database "warehouse_inventory" is ready.');
            // switch to the created database
            db.changeUser({ database: "warehouse_inventory" }, (err) => {
                if (err) {
                    console.error('error switching to database:', err.message);
                    return reject(err);
                }
                console.log('using database "warehouse_inventory".');
                resolve();
            });
        });
    });
};

// call initializeDatabase function
initializeDatabase()
    .then(() => {
        console.log('database initialized successfully.');
    })
    .catch((err) => {
        console.error('dailed to initialize database:', err.message);
        process.exit(1);
    });

module.exports = db;