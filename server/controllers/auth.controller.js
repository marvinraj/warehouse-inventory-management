const db = require('../config/db');

// Logic to handle login authentication
const getAuth = (req, res) => {
    const { username, password } = req.body;

    // Query to check if username and password match
    const q = "SELECT * FROM users WHERE username = ? AND password = ?";

    db.query(q, [username, password], (err, data) => {
        if (err) {
            return res.status(500).json({ err: err });
        }

        if (data.length > 0) {
            // If login is successful, send user data back to frontend (including role if needed)
            res.json(data);  // You could send only specific data like username and role
        } else {
            // If no match, send error message
            res.status(401).json({ message: "Wrong username/password combination" });
        }
    });
};

module.exports = { getAuth };
