require('dotenv').config()

const express = require('express')
const app = express();
const port = process.env.PORT || 8080;

app.get('/', (req, res) => res.send('Hello World with Express'));

// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
// Deprecated: mongoose.connect('mongodb://localhost/resthub');
mongoose.connect('mongodb://localhost/resthub', { useNewUrlParser: true});
const db = mongoose.connection;

app.listen(port, function () {
    console.log("Running RestHub on http://127.0.0.1:" + port);
});


app.use('/api', require("./api-routes"))