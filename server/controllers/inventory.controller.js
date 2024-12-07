const db = require('../config/db');

// logic to get all products
const getAllProducts = (req,res) => {
    const { search } = req.query; // Get the search query parameter
    // store sql query
    let q = "SELECT * FROM inventory"

    if (search) {
        q = `SELECT * FROM inventory WHERE name LIKE ? OR category LIKE ? OR description LIKE ?`;
        db.query(q, [`%${search}%`, `%${search}%`, `%${search}%`], (err, data) => {
            if (err) {
                console.log(err);
                return res.json(err);
            }
            return res.json(data);
        });
    } else {
        // send stored query to database
        db.query(q, (err, data) => {
            if (err) {
            console.log(err);
            return res.json(err);
            }
            return res.json(data);
        });
    }
};

// logic to add a new product
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

// logic to update a produc
const updateProduct = (req,res) => {
    // store sql query
    const productID = req.params.id;
    const q = "UPDATE inventory SET `name` = ?,`description` = ?,`quantity` = ?,`category` = ?,`price` = ? WHERE id = ?";
    const values = [
        req.body.name,
        req.body.description,
        req.body.quantity,
        req.body.category,
        req.body.price
    ];
    // send stored query to database
    db.query(q, [...values, productID], (err,data) => {
        if (err) return res.send(err);
        return res.send("product has been deleted successfully!!!!");
    })
};

// update to delete a product
const deleteProduct = (req,res) => {
    // store sql query
    const productID = req.params.id;
    const q = "DELETE FROM inventory WHERE id = ?";

    // send stored query to database
    db.query(q, [productID], (err,data) => {
        if (err) return res.send(err);
        return res.send("product has been updated successfully!!!!");
    })
};

module.exports = { getAllProducts, addProduct, updateProduct, deleteProduct };