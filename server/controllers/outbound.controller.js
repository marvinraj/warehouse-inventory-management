const db = require('../config/db');

// get all outbound
const getAllOutbounds = (req,res) => {
    // store sql query
    const q = "SELECT * FROM outbound;"
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
const addOutbound = (req,res) => {
    const q = "INSERT INTO outbound (`product_id`,`supplier`,`quantity`,`date_shipped`) VALUES (?)"
    const values = [
        req.body.product_id,
        req.body.supplier,
        req.body.quantity,
        req.body.date_shipped
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

module.exports = { getAllOutbounds, addOutbound }