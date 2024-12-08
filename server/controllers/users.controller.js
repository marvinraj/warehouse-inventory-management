const db = require('../config/db');

// get all user
const getAllUsers = (req, res) => {
    const { search } = req.query;
    let q = "SELECT * FROM users";

    if (search) {
        q = "SELECT * FROM users WHERE username LIKE ? OR role LIKE ?";
        db.query(q, [`%${search}%`, `%${search}%`], (err, data) => {
            if (err) {
                console.log(err);
                return res.json(err);
            }
            return res.json(data);
        });
    } else {
        db.query(q, (err, data) => {
            if (err) {
                return res.json(err)
            }
            return res.json(data);
        });
    }
};

// logic to add new user
const addUser = (req, res) => {
    const { username, password, role } = req.body;
    const q = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
    db.query(q, [username, password, role], (err, data) => {
        if (err) {
            return res.json(err)
        }
        return res.json(data);
    });
};


// logic to update a user
const updateUser = (req,res) => {
    const { id } = req.params;
    const { username, role } = req.body;
    const q = "UPDATE users SET username = ?, role = ? WHERE id = ?";
    db.query(q, [username, role, id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
};

// logic to delete a user
const deleteUser = (req,res) => {
    const { id } = req.params;
    const q = "DELETE FROM users WHERE id = ?";
    db.query(q, [id], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
};

module.exports = { getAllUsers, addUser, updateUser, deleteUser }