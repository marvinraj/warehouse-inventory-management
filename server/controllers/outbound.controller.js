const db = require('../config/db');

// get all outbound
const getAllOutbounds = (req,res) => {
    const { search } = req.query;
    // store sql query
    let q = "SELECT * FROM outbound;"

    if (search) {
        q = `SELECT * FROM outbound WHERE product_name LIKE ? OR customer LIKE ?`;
        db.query(q, [`%${search}%`, `%${search}%`], (err, data) => {
            if (err) {
                console.log(err);
                return res.json(err);
            }
            return res.json(data);
        });
    } else {
        // send stored query to database
        db.query(q, (err, data) => {
            if(err) {
                return res.json(err)
            }
            else {
                return res.json(data)
            }
        });
    }
};

// logic to add new outbound
const addOutbound = (req, res) => {
    const { product_id, product_name, customer, quantity, date_shipped } = req.body;

    const insertOutbound = `INSERT INTO outbound (product_id, product_name, customer, quantity, date_shipped) VALUES (?, ?, ?, ?, ?)`;
    const checkInventory = "SELECT quantity FROM inventory WHERE id = ?";
    const updateInventory = "UPDATE inventory SET quantity = quantity - ? WHERE id = ?";

    // check if product exists and if there are suffienciet quantity in inventory
    db.query(checkInventory, [product_id], (err, data) => {
        if (err) {
            console.error("Error checking inventory:", err);
            return res.status(500).json({ error: "Error checking inventory." });
        }

        if (data.length === 0) {
            // product does not exist in inventory
            return res.status(404).json({ error: "Product does not exist in inventory." });
        }

        const currentQuantity = data[0].quantity;

        if (currentQuantity < quantity) {
            // insufficient inventory
            return res.status(400).json({ error: "Insufficient quantity in inventory." });
        }

        // add outbound record and update inventory
        db.query(insertOutbound, [product_id, product_name, customer, quantity, date_shipped], (err) => {
            if (err) {
                console.error("Error inserting outbound record:", err);
                return res.status(500).json({ error: "Error inserting outbound record." });
            }
            db.query(updateInventory, [quantity, product_id], (err) => {
                if (err) {
                    console.error("Error updating inventory:", err);
                    return res.status(500).json({ error: "Error updating inventory." });
                }
                return res.status(200).json({ message: "Outbound added and inventory updated successfully." });
            });
        });
    });
};


// logic to update a purchase
const updateOutbound = (req,res) => {
    // store sql query
    const outboundID = req.params.id;
    const q = "UPDATE outbound SET `product_id` = ?, `product_name` = ?,`customer` = ?,`quantity` = ?,`date_shipped` = ? WHERE id = ?";
    const values = [
        req.body.product_id,
        req.body.product_name,
        req.body.customer,
        req.body.quantity,
        req.body.date_shipped
    ];
    // send stored query to database
    db.query(q, [...values, outboundID], (err,data) => {
        if (err) return res.send(err);
        return res.send("product has been updated successfully!!!!");
    })
};

// update to delete a product
const deleteOutbound = (req,res) => {
    // store sql query
    const outboundID = req.params.id;
    const q = "DELETE FROM outbound WHERE id = ?";

    // send stored query to database
    db.query(q, [outboundID], (err,data) => {
        if (err) return res.send(err);
        return res.send("outbound has been deleted successfully!!!!");
    })
};

module.exports = { getAllOutbounds, addOutbound, updateOutbound, deleteOutbound }