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
    const q = "INSERT INTO inbound (`product_id`,`supplier`,`quantity`,`date_received`) VALUES (?)"
    const values = [
        req.body.product_id,
        req.body.supplier,
        req.body.quantity,
        req.body.date_received
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

module.exports = { getAllInbounds, addInbound }