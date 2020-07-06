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

//Middleware for Auth
// const checkAuth = (req, res, next) => {
//     //Bearer <token>

//     if(req.headers.authorization){
//         const [type, token] = req.headers.authorization.split(' ');

//         //Валидация токена
//          jwt.verify(token, 'Very secret code', (err, decoded) => {
//              if(err){
//                  return res.status(403).send();
//              }

//              req.user = decoded;
//              next();
//          });
//     } else {
//         return res.status(403).send();
//     }
// };

// app.use('/tasks', checkAuth);

app.get('/users', async (req, res) => {
  const users = await Users.find();
  res.status(200).json(users);
});

app.get('/users/:id', async (req, res) => {
  console.log(req.params.id)
  const user = await Users.findById(req.params.id);
  res.json(user);
});

app.post('/users', async (req, res) => {
  const user = new Users(req.body);
  const savedUser = await user.save();
  console.log(savedUser)
  res.json(savedUser);
});

// app.post('/tasks', async (req, res) => {
//   const {_id} = req.user;
//   const task = new taskMongoose({...req.body, user: _id});
//   await task.save();
//   res.redirect('/tasks');
// });


app.get('/flats', async (req, res) => {
  data = await Flats.find();
  res.status(200).json(data);
});


app.listen(4000, () => {
  console.log("Server works in 4000");
});
