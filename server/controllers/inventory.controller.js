const db = require('../config/db');

const getAllProducts = (req,res) => {
    // store sql query
    const q = "SELECT * FROM inventory;"
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

const addProduct = (req,res) => {
    const q = "INSERT INTO inventory (`name`,`description`,`quantity`,`category`,`price`) VALUES (?)"
    const values = [
        req.body.name,
        req.body.description,
        req.body.quantity,
        req.body.category,
        req.body.price
    ]

    db.query(q, [values], (err,data) => {
        if(err) {
            return res.json(err)
        }
        else {
            return res.json(data)
        }
    });
}

const updateProduct = (req,res) => {}

const deleteProduct = (req,res) => {}

module.exports = { getAllProducts, addProduct, updateProduct, deleteProduct };