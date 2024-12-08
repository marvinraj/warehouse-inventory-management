const db = require('../config/db');

// get all inbounds
const getAllInbounds = (req,res) => {
    const { search } = req.query;
    // store sql query
    let q = "SELECT * FROM inbound;"

    if (search) {
        q = `SELECT * FROM inbound WHERE product_name LIKE ? OR supplier LIKE ?`;
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

// logic to add new inbound
const addInbound = (req, res) => {
    const { product_id, product_name, supplier, quantity, date_received } = req.body;

    const insertInbound = `INSERT INTO inbound (product_id, product_name, supplier, quantity, date_received) VALUES (?, ?, ?, ?, ?)`;
    const checkInventory = "SELECT * FROM inventory WHERE id = ?";
    const updateInventory = "UPDATE inventory SET quantity = quantity + ? WHERE id = ?";
    const insertInventory = `INSERT INTO inventory (id, name, description, quantity, category, price) VALUES (?, ?, ?, ?, ?, ?)`;

    // add new inbound record
    db.query(insertInbound, [product_id, product_name, supplier, quantity, date_received], (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }

        // check if product exists in inventory
        db.query(checkInventory, [product_id], (err, data) => {
            if (err) {
                console.log(err);
                return res.json(err);
            }
            if (result.length > 0) {
                // product exists, hence update inventory
                db.query(updateInventory, [quantity, product_id], (err, data) => {
                    if (err) {
                        console.log(err);
                            return res.json(err);
                    }
                    return res.json(data);
                });
            } else {
                // product doesn't exist, hence insert it into inventory
                const description = "Unknown";
                const category = "Uncategorized";
                const price = 0;
                db.query(
                    insertInventory, [product_id, product_name, description, quantity, category, price],
                    (err, data) => {
                        if (err) {
                            console.log(err);
                            return res.json(err);
                        }
                        return res.json(data);
                    }
                );
            }
        });
    });
};



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