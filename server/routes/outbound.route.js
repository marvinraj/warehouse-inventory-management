const express = require('express');
const { getAllOutbounds, addOutbound, updateOutbound, deleteOutbound } = require('../controllers/outbound.controller');

const router = express.Router();

// list all outbounds
router.get("/", getAllOutbounds);

// add a new outbound
router.post("/", addOutbound)

// update an existing outbound
router.put("/:id", updateOutbound);

// delete an outbound
router.delete("/:id", deleteOutbound)

module.exports = router;