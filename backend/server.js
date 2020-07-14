const consolidate = require('consolidate');
const express = require('express');
const path = require('path');
const connect = require('./mongoCfg.js');
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');

const mongoose = require("mongoose");
// const passport = require('./passport');

const PORT = 4000;
const app = express();

app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, 'views'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

//Routes
const admin = require('./routes/admin');
const users = require('./routes/users');
const flats = require('./routes/flats');
app.use('/admin', admin);
app.use('/users', users);

app.use('/flats', flats);

//default route
app.get('*', function (req, res) {
  res.status(404).json({ "error": 404 });
});

//server listen
app.listen(PORT, () => {
  console.log(`Server has been started http://localhost:${PORT}`);
});
