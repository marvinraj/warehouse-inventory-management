const express = require('express');
const { getAllUsers, addUser, updateUser, deleteUser } = require('../controllers/users.controller')

const router = express.Router();

// list all users
router.get("/", getAllUsers);

// add a new user
router.post("/", addUser);

// update an existing user
router.put("/:id", updateUser);

// delete a user
router.delete("/:id", deleteUser);

module.exports = router;