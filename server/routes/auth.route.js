const express = require('express');
const { getAuth } = require('../controllers/auth.controller')

const router = express.Router();

// login
router.post("/", getAuth);

module.exports = router;