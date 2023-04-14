const express = require('express');

const config = require('../config.js');
const post = require('./components/post/network.js');
const errors = require('../network/errors.js')

const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json())

//Routes
app.use('/api/post', post);


app.use(errors)


app.listen(config.post.port, ( )=> {
    console.log('Servicio posts escuchando en el puerto ', config.post.port)
})