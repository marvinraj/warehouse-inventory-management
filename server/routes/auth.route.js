const express = require('express');
const { getAuth } = require('../controllers/auth.controller')

const router = express.Router();

// list all products
// router.get("/", getAllProducts);

// add a new product
router.post("/", getAuth);

// // update an existing product
// router.put("/:id", updateProduct);

// // delete a product
// router.delete("/:id", deleteProduct)

module.exports = router;