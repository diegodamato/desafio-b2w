let express = require('express');
let bodyParser = require('body-parser');
let consign = require('consign');
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

consign({cwd:'app'})
    .include('util')
    .then('database')
    .then('model')
    .then('service')
    .then('repository')
    .then('controller')
    .then('beans')
    .then('route')
    .into(app);


module.exports = () => app;