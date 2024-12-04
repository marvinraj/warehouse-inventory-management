const express = require('express');
const { getAllOutbounds, addOutbound } = require('../controllers/outbound.controller');

const router = express.Router();

// list all outbounds
router.get("/", getAllOutbounds);

// add a new inbound
router.post("/", addOutbound)

module.exports = router;