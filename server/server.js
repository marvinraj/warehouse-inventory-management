const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
const testRouter = require('./routes/tests.route')
const inventoryRoutes = require('./routes/inventory.route')
const inBoundRoutes = require('./routes/inbound.route')
const outBoundRoutes = require('./routes/outbound.route')
const authRoutes = require('./routes/auth.route')
const connectDB = require('./config/db')


require('dotenv').config(); // loads the env variables

const app = express(); // create express app
const port = process.env.PORT || 5000; // store port from env variable

// app.use(cors); // allows request from different origins
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// })

// middlewares
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");  // this is to allow all origins
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");  // this is to allow GET, POST, PUT, DELETE methods
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  // this is to allow specific headers
    next();
});
app.use(express.urlencoded({extended: true}));
app.use(express.json()) // parse the incoming requests with JSON payloads

// ALL ROUTES
// testing post route
app.use("/api/posts", testRouter);
// inventory route
app.use("/api/inventory", inventoryRoutes);
// inbound route
app.use("/api/inbound", inBoundRoutes);
// outbound route
app.use("/api/outbound", outBoundRoutes);
// login route
app.use("/api/auth", authRoutes)

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