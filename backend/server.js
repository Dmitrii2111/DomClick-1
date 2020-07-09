const consolidate = require('consolidate');
const express = require('express');
const path = require('path');
const connect = require('./mongoCfg.js');
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const base64 = require('base-64');
const mongoose = require("mongoose");
// const passport = require('./passport');




const PORT = 4000;
const app = express();

//models db
const Flats = require("./models/flats");
const Users = require("./models/users");

// app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, 'views'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

//Admin

app.use('/admin', (req, res, next) => {
  const username = 'user';
  const password = 'password';
  if (req.header('Authorization') !== 'Basic ' + base64.encode(username + ":" + password)) {
    res.header('WWW-Authenticate', 'Basic');
    res.sendStatus(401);
  } else {
    next();
  }
});

app.use('/admin', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/admin', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/admin/edit', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/admin/edit', express.static(__dirname + '/node_modules/jquery/dist'));

app.get('/admin/main', async (req, res) => {
  let flats = await Flats.find();
  flats = JSON.parse(JSON.stringify(flats));
  res.render('main', { flats });
});

app.get('/admin/add', async (req, res) => {
  let flats = await Flats.find();
  flats = JSON.parse(JSON.stringify(flats));
  res.render('add');
});


app.post('/admin/edit/:id', async (req, res) => {
  let flat = await Flats.findById(req.params.id);
  flat = JSON.parse(JSON.stringify(flat));
  res.render('edit', { flat });
});

//API user
app.get('/users', async (req, res) => {
  const users = await Users.find();
  res.status(200).json(users);
});

app.get('/users/:id', async (req, res) => {
  const id = req.params.id;
  await Users.findById(id, (err, item) => {
    if (err) {
      res.status(204).send({ 'error': 'An error has occurred' });
    } else {
      res.status(200).send(item);
    }
  });
});

app.post('/users', async (req, res) => {
  const user = new Users(req.body);
  await user.save(user, (err, item) => {
    if (err) {
      let data = {}
      for (let i in req.body) {
        data[i] = typeof i
      }
      res.status(400).send({
        'error': 'Ошибка записи в бд',
        'data': data,
        'description': err,
      });
    } else {
      res.status(200).send(item);
    }
  });
});

//API flats
app.get('/flats', async (req, res) => {
  flats = await Flats.find();
  res.status(200).json(flats);
});

app.get('/flats/:id', async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const flat = await Flats.findById(req.params.id);
    res.status(200).json(flat);
  }
});

app.post('/flats/add', async (req, res) => {
  //new flat
  const flat = new Flats(req.body);
  const savedFlat = await flat.save(
    (err, item) => {
      if (err) {
        res.status(204).send({ 'error': 'An error has occurred' });
      } else {
        res.redirect('/admin/main');
      }
    }
  )
  // res.status(200).res.json(savedFlat);
});

app.post('/flats/delete', async (req, res) => {
  //delete one or many flats
  await Flats.deleteMany({ _id: { $in: req.body.checkBoxFlat } },
    (err, item) => {
      if (err) {
        res.status(204).send({ 'error': 'An error has occurred' });
      } else {
        res.redirect('/admin/main');
      }
    }
  );
})

app.post('/flats/:id', async (req, res) => {
  //update flat
  let body = {}
  for (let i in req.body) {
    body[i] = req.body[i]
  }
  const flat = await Flats.updateMany(
    { _id: req.params.id },
    {
      $set: {
        ...body
      }
    },
    (err, item) => {
      if (err) {
        res.status(204).send({ 'error': 'An error has occurred' });
      } else {
        res.redirect('/admin/main');
      }
    }
  )
});

//default route
app.get('*', function (req, res) {
  res.status(404).json({ "error": 404 });
});

//server listen
app.listen(PORT, () => {
  console.log(`Server works in ${PORT} port`);
});
