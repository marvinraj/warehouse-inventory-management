const db = require('../config/db');

const getAllProducts = (req,res) => {
    // store sql query
    const q = "SELECT * FROM inventory"
    // send stored query to database
    db.query(q, (err, data) => {
        if (err) {
          console.log(err);
          return res.json(err);
        }
        return res.json(data);
    });
};

const addProduct = (req,res) => {
    // store sql query
    const q = "INSERT INTO inventory(`name`,`description`,`quantity`,`category`,`price`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.description,
        req.body.quantity,
        req.body.category,
        req.body.price
    ];
    // send stored query to database
    db.query(q, [values], (err,data) => {
        if (err) return res.send(err);
        return res.send(data);
    });
};

const updateProduct = (req,res) => {}

const deleteProduct = (req,res) => {
    // store sql query
    const productID = req.params.id;
    const q = "DELETE FROM inventory WHERE id = ?";

    // send stored query to database
    db.query(q, [productID], (err,data) => {
        if (err) return res.send(err);
        return res.send("product has been deleted successfully!!!!");
    })
};

module.exports = { getAllProducts, addProduct, updateProduct, deleteProduct };