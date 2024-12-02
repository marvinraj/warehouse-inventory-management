const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config(); // loads the env variables

// create express app
const app = express();

// store port from env variable
const port = process.env.PORT || 5000;

// allows request from different origins
app.use(cors);

// parses incoming json data in req body
app.use(bodyParser.json())

// start server
app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
})