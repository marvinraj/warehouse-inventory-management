// logic of CRUD operations in here
const db = require('../config/db');

const getPost = (req,res) => {
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
};

module.exports = { getPost };