const db = require('../config/db');

// get all inbounds
const getAllInbounds = (req,res) => {
    // store sql query
    const q = "SELECT * FROM inbound;"
    // send stored query to database
    db.query(q, (err, data) => {
        if(err) {
            return res.send("error occured")
        }
        else {
            return res.send(data)
        }
    });
};

// add new inbound
const addInbound = (req,res) => {
    const { product_id, product_name, supplier, quantity, date_received } = req.body;
    const q = "INSERT INTO inbound (`product_id`, `product_name`, `supplier`,`quantity`,`date_received`) VALUES (?)"
    const updateInventory = "UPDATE inventory SET `quantity` = `quantity` + ? WHERE id = ?"
    const values = [
        product_id,
        product_name,
        supplier,
        quantity,
        date_received
    ]

    // add new inbound record
    db.query(q, [values], (err,data) => {
        if(err) {
            return res.json(err)
        }
        else {
            // update the inventory
            db.query(updateInventory, [quantity, product_id], (err, data) =>{
                if (err) {
                    return res.json(err)
                }
                else{
                    return res.json(data)
                }
            })
        }
    });
}

// logic to update a purchase
const updateInbound = (req,res) => {
    // store sql query
    const inboundID = req.params.id;
    const q = "UPDATE inbound SET `product_id` = ?, `product_name` = ?,`supplier` = ?,`quantity` = ?,`date_received` = ? WHERE id = ?";
    const values = [
        req.body.product_id,
        req.body.product_name,
        req.body.supplier,
        req.body.quantity,
        req.body.date_received
    ];
    // send stored query to database
    db.query(q, [...values, inboundID], (err,data) => {
        if (err) return res.send(err);
        return res.send("product has been updated successfully!!!!");
    })
};

// update to delete a product
const deleteInbound = (req,res) => {
    // store sql query
    const inboundID = req.params.id;
    const q = "DELETE FROM inbound WHERE id = ?";

    // send stored query to database
    db.query(q, [inboundID], (err,data) => {
        if (err) return res.send(err);
        return res.send("inbound has been deleted successfully!!!!");
    })
};

module.exports = { getAllInbounds, addInbound, deleteInbound, updateInbound }