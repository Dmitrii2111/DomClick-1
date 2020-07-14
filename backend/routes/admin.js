const express = require('express');
const router = express.Router();
const base64 = require('base-64');

const Flats = require("../models/flats");

router.use('/', (req, res, next) => {
    const username = 'user';
    const password = 'password';
    if (req.header('Authorization') !== 'Basic ' + base64.encode(username + ":" + password)) {
        res.header('WWW-Authenticate', 'Basic');
        res.sendStatus(401);
    } else {
        next();
    }
});

router.use('/', express.static(__dirname + '/../node_modules/bootstrap/dist'));
router.use('/', express.static(__dirname + '/../node_modules/jquery/dist'));
router.use('/edit', express.static(__dirname + '/../node_modules/bootstrap/dist'));
router.use('/edit', express.static(__dirname + '/../node_modules/jquery/dist'));

router.get('/main', async (req, res) => {
    let flats = await Flats.find();
    flats = JSON.parse(JSON.stringify(flats));
    res.render('main', { flats });
});

router.get('/add', async (req, res) => {
    let flats = await Flats.find();
    flats = JSON.parse(JSON.stringify(flats));
    res.render('add');
});


router.post('/edit/:id', async (req, res) => {
    let flat = await Flats.findById(req.params.id);
    flat = JSON.parse(JSON.stringify(flat));
    res.render('edit', { flat });
});

module.exports = router;