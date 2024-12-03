const express = require('express');
const { getPost } = require('../controllers/tests.controller')

const router = express.Router();

router.get("/test", getPost);

module.exports = router;