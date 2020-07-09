const mongoose = require('mongoose');

const MONGO_HOST = 'osipuk.ru';
const MONGO_PORT = '27017';
const MONGO_DB = 'DomClick';

const url = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('MongoDB has been started!')
})
.catch(() => {
    console.log('MongoDB is not start!')
});