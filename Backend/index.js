require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const serverPort = process.env.PORT || 8080;

mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true}, () => {});
const db = mongoose.connection;
if (!db) {
    console.error("DB FAILED TO CONNECT!")
    process.exit(1);
}

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json({limit: '50mb'}));

app.get('/', (req, res) => res.send('Hello World for avans-app API'));
app.use('/api/v1', require("./api-routes"))

app.listen(serverPort, function () {
    console.log("Running avans-app API on http://127.0.0.1:" + serverPort);
});
