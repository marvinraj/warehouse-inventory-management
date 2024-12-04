const express = require('express');
const { getAllInbounds, addInbound } = require('../controllers/inbound.controller');

const router = express.Router();

// list all inbounds
router.get("/", getAllInbounds);

// add a new inbound
router.post("/", addInbound)

module.exports = router;