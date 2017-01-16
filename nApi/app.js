const express = require('express');
const bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cons = require('consolidate');
var cookieParser = require('cookie-parser');
const app = express()
app.use(cookieParser());
const router = express.Router()

const uuidV4 = require('uuid/v4');
var uuid = uuidV4();
console.log(uuid);

app.use(cookieParser(uuid, {
  maxAge: 60 * 60 * 24 * 7
}))
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json());

// load api
var models = require("./models/customer.js");
app.use(models);

// load admin ui
app.engine('html', cons.swig)
app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

var admin = require('./router/admin');
var dashboard = require('./router/dashboard');

app.use(express.static('public'));
app.use('/', admin);
app.use('/dashboard', dashboard);

app.listen(3000, () => {
  console.log('Express server listening on port 3000')
})
