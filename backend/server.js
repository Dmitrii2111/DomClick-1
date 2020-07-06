const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
// const passport = require('./passport');

//Connect
mongoose.connect("mongodb://osipuk.ru:27017/DomClick", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Flats = require("./models/flats");
const Users = require("./models/users");

const app = express();
app.use(express.json());
app.use(cors());

app.get('/users', async (req, res) => {
  const users = await Users.find();
  res.status(200).json(users);
});

app.get('/users/:id', async (req, res) => {
  const user = await Users.findById(req.params.id);
  res.status(200).res.json(user);
});

app.post('/users', async (req, res) => {
  const user = new Users(req.body);
  const savedUser = await user.save();
  res.status(200).res.json(savedUser);
});

app.get('/flats', async (req, res) => {
  flats = await Flats.find();
  res.status(200).json(flats);
});

app.get('/flats/:id', async (req, res) => {
  const flat = await Flats.findById(req.params.id);
  res.status(200).json(flat);
});

app.post('/flats', async (req, res) => {
  const flat = new Flats(req.body);
  const savedFlat = await flat.save();
  res.status(200).res.json(savedFlat);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server works in ${PORT}`);
});
