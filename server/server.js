const express = require('express');
// const cors = require('cors');
const bodyParser = require('body-parser');
const testRouter = require('./routes/tests.route')
const inventoryRoutes = require('./routes/inventory.route')
const connectDB = require('./config/db')


require('dotenv').config(); // loads the env variables

const app = express(); // create express app
const port = process.env.PORT || 5000; // store port from env variable

// app.use(cors); // allows request from different origins
app.use(bodyParser.json()) // parses incoming json data in req body

// testing post route
app.use("/api/posts", testRouter)

// inventory route
app.use("/api/inventory", inventoryRoutes)

// test db connection
connectDB.connect((err) => {
    if (err){
        console.log("error connecting to mysql");
    } else {
        console.log("successful connection with mysql!");
    }
})

// start server
app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
});