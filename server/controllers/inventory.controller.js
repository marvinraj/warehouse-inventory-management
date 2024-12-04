const db = require('../config/db');

const getAllProducts = (req,res) => {
    // store sql query
    const q = "SELECT * FROM testtable;"
    // send stored query to database
    db.query(q, (err, data) => {
        if(err) {
            return res.send("error occured")
        }
        else {
            return res.send(data)
        }
    });
}

const addProduct = (req,res) => {}

const updateProduct = (req,res) => {}

const deleteProduct = (req,res) => {}

module.exports = { getAllProducts, addProduct, updateProduct, deleteProduct };