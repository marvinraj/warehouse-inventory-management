const express = require('express');
const { getAllProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/inventory.controller')

const router = express.Router();

// list all products
router.get("/", getAllProducts);

// add a new product
router.post("/", addProduct);

// update an existing product
router.put("/", updateProduct);

// delete a product
router.delete("/:id", deleteProduct)

module.exports = router;