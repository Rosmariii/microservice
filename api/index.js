const express = require('express');

const config = require('../config.js');
const user = require('./components/user/network');
const auth = require('./components/auth/network');
const errors = require('../network/errors.js')

const bodyParser = require('body-parser');
const app = express();
const swaggerUi = require('swagger-ui-express');

app.use(bodyParser.json())
const swaggerDoc = require('./swagger.json');

//Routes
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.use(errors)


app.listen(config.api.port, ( )=> {
    console.log('api escuchando en el puerto ', config.api.port)
})