let express = require('express');
let bodyParser = require('body-parser');
let consign = require('consign');
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

consign({cwd:'app'})
    .include('database')
    .then('model')
    .then('repository')
    .then('middleware')
    .then('controller')
    .then('route')
    .into(app);


module.exports = () => app;