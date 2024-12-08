const db = require('../config/db');

// logic to handle login authentication
const getAuth = (req, res) => {
    const { username, password } = req.body;
    const q = "SELECT username, role FROM users WHERE username = ? AND password = ?";

    db.query(q, [username, password], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "database error" });
        }
        if (data.length > 0) {
            res.status(200).json(data);
        } else {
            res.status(401).json({ message: "wrong username/password combination" });
        }
    });
};

module.exports = { getAuth };
