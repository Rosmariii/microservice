const express = require('express');

const config = require('../config.js');
const user = require('./components/user/network')
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json())
//Routes
app.use('/api/user', user);


app.listen(config.api.port, ( )=> {
    console.log('api escuchando en el puerto ', config.api.port)
})