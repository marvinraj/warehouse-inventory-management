const db = require('./db');

const initDB = () => {
    const usersTable = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            role ENUM('admin', 'manager', 'operator') NOT NULL)
            UNIQUE (username)`;

    const inventoryTable = `
        CREATE TABLE IF NOT EXISTS inventory (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description VARCHAR(255) NOT NULL,
            quantity INT NOT NULL,
            category VARCHAR(255) NOT NULL,
            price DECIMAL(10, 2) NOT NULL)`;

    const inboundTable = `
        CREATE TABLE IF NOT EXISTS inbound (
            id INT AUTO_INCREMENT PRIMARY KEY,
            product_id INT NOT NULL,
            supplier VARCHAR(255) NOT NULL,
            quantity INT NOT NULL,
            date_received DATE NOT NULL,
            FOREIGN KEY (product_id) REFERENCES inventory(id))`;

    const outboundTable = `
        CREATE TABLE IF NOT EXISTS outbound (
            id INT AUTO_INCREMENT PRIMARY KEY,
            product_id INT NOT NULL,
            customer VARCHAR(255) NOT NULL,
            quantity INT NOT NULL,
            date_shipped DATE NOT NULL,
            FOREIGN KEY (product_id) REFERENCES inventory(id))`;
            
    const defaultAdmin = `INSERT IGNORE INTO users (username, password, role) VALUES ('admin', 'admin123', 'admin')`;

    // create users table
    db.query(usersTable, (err) => {
        if (err) {
            console.error("Error creating 'users' table:", err.message);
        } else {
            console.log("'users' table created or already exists.");
        }
    });
    // create inventory table
    db.query(inventoryTable, (err) => {
        if (err) {
            console.error("Error creating 'inventory' table:", err.message);
        } else {
            console.log("'inventory' table created or already exists.");
        }
    });
    // create inbound table
    db.query(inboundTable, (err) => {
        if (err) {
            console.error("Error creating 'inbound' table:", err.message);
        } else {
            console.log("'inbound' table created or already exists.");
        }
    });
    // create outbound table
    db.query(outboundTable, (err) => {
        if (err) {
            console.error("Error creating 'outbound' table:", err.message);
        } else {
            console.log("'outbound' table created or already exists.");
        }
    });
    // create default admin if one does not exists already
    db.query(defaultAdmin, (err) => {
        if (err) {
            console.error("Error inserting default admin user:", err.message);
        } else {
            console.log("Default admin user created or already exists.");
        }
    });
    
    console.log('Database initialization completed.');
};

module.exports = initDB;