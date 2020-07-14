const express = require('express');
const router = express.Router();

const Users = require("../models/users");

router.get('/users', async (req, res) => {
    const users = await Users.find();
    res.status(200).json(users);
});

router.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    await Users.findById(id, (err, item) => {
        if (err) {
            res.status(204).send({ 'error': 'An error has occurred' });
        } else {
            res.status(200).send(item);
        }
    });
});

router.post('/users', async (req, res) => {
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


module.exports = router;