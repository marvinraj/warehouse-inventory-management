const express = require('express');
const { getAllInbounds, addInbound, deleteInbound } = require('../controllers/inbound.controller');

const router = express.Router();

// list all inbounds
router.get("/", getAllInbounds);

// add a new inbound
router.post("/", addInbound)

// delete an inbound
router.delete("/:id", deleteInbound)

module.exports = router;